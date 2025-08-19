# NPS API

API para sistema de Net Promoter Score (NPS).

## Instalação

### Desenvolvimento

```bash
# Instalar em modo desenvolvimento
pip install -e ".[dev]"

# Ou usando requirements (método antigo)
pip install -r requirements-dev.txt


# Instalar apenas produção
pip install -e .

# Instalar com dependências de desenvolvimento
pip install -e ".[dev]"

# Executar formatação
black app/ tests/

# Executar linting
flake8 app/ tests/

# Executar testes com cobertura
pytest --cov=app

# Construir pacote para distribuição
pip install build
python -m build


Para outras máquinas, o processo será:

# 1. Clonar o repositório
git clone <repo>
cd back-end

# 2. Instalar dependências
pip install -e ".[dev]"

# 3. Configurar banco (se necessário)
cp .env.example .env
# Editar .env com suas configurações

# 4. Executar migrações
alembic upgrade head

# 5. Executar testes
pytest

# 6. Executar aplicação
uvicorn app.main:app --reload