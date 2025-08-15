import jsonServer from 'json-server';
import { readFileSync } from 'node:fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const path = (p) => new URL(p, import.meta.url).pathname;

const server = jsonServer.create();
const router = jsonServer.router(path('./db.json'));
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);

function computeNpsForCompany(responses) {
  const total = responses.length;
  const promoters = responses.filter((r) => r.rating >= 4).length;
  const neutrals = responses.filter((r) => r.rating === 3).length;
  const detractors = responses.filter((r) => r.rating <= 2).length;
  const nps = total === 0 ? null : Math.round(((promoters / total) * 100 - (detractors / total) * 100) * 100) / 100;
  return { nps, promoters, neutrals, detractors, total };
}

// GET /api/reports/nps
server.get('/api/reports/nps', (req, res) => {
  const db = router.db;
  const companies = db.get('companies').value();
  const responses = db.get('responses').value();
  const map = companies.map((c) => {
    const rs = responses.filter((r) => r.company_id === c.id);
    const breakdown = computeNpsForCompany(rs);
    return { id: c.id, name: c.name, ...breakdown };
  });
  res.json(map);
});

// GET /api/reports/nps/:companyId
server.get('/api/reports/nps/:companyId', (req, res) => {
  const db = router.db;
  const { companyId } = req.params;
  const rs = db.get('responses').filter({ company_id: companyId }).value();
  const breakdown = computeNpsForCompany(rs);
  res.json(breakdown);
});

// POST /api/companies/:id/responses (atalho do contrato)
server.post('/api/companies/:id/responses', (req, res, next) => {
  console.log("CHEGOU NO BACK")
  const { id } = req.params;
  const { rating, comment } = req.body;
  if (typeof rating !== 'number' || rating < 0 || rating > 5) {
    return res.status(400).json({ message: 'rating deve ser um número entre 0 e 5' });
  }
  
  const newItem = {
    id: `r_${Date.now()}`,
    company_id: id,
    rating,
    comment: comment || null,
    created_at: new Date().toISOString()
  };
  router.db.get('responses').push(newItem).write();
  return res.status(201).json(newItem);
});

// DELETE /api/responses/:id (para compatibilidade explícita)
server.delete('/api/responses/:id', (req, res) => {
  const { id } = req.params;
  const found = router.db.get('responses').find({ id }).value();
  if (!found) return res.status(404).json({ message: 'not found' });
  router.db.get('responses').remove({ id }).write();
  return res.status(204).send();
});

// Rewrites para manter o contrato /api
server.use(jsonServer.rewriter(require('./routes.json')));

server.use(router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Mock API on http://localhost:${PORT}/api`);
});

