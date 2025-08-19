# Sistema NPS - Net Promoter Score

Sistema completo para coleta e análise de Net Promoter Score (NPS) com frontend React/Next.js e backend FastAPI.

## 📋 Sobre o Projeto

Este sistema permite gerenciar empresas e suas avaliações de NPS, calculando automaticamente as métricas de satisfação do cliente. Inclui uma interface web intuitiva para coleta de avaliações e um painel administrativo para visualização de relatórios.

## 🚀 Tecnologias Utilizadas

### **Backend (API)**
- **Python 3.9+** - Linguagem de programação
- **FastAPI** - Framework web moderno e rápido
- **SQLAlchemy** - ORM para banco de dados
- **Alembic** - Gerenciamento de migrações
- **Pydantic** - Validação de dados e serialização
- **PostgreSQL** - Banco de dados principal
- **SQLite** - Banco de dados para testes
- **Pytest** - Framework de testes
- **Structlog** - Logging estruturado

### **Frontend (Interface Web)**
- **Next.js 14** - Framework React com SSR
- **React 18** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **Material-UI (MUI)** - Componentes de interface
- **React Query** - Gerenciamento de estado servidor
- **React Hook Form** - Formulários performáticos
- **Zod** - Validação de schemas
- **Axios** - Cliente HTTP

### **Desenvolvimento**
- **Docker & Docker Compose** - Containerização
- **ESLint & Prettier** - Qualidade de código (Frontend)
- **Black & Flake8** - Formatação e linting (Backend)
- **Jest** - Testes unitários (Frontend)

## 📊 Cálculo do NPS

O Net Promoter Score é calculado com base nas avaliações dos clientes em uma escala de 0 a 5:

### **Categorias de Clientes:**
- **Detratores (0-2)**: Clientes insatisfeitos que podem prejudicar a marca
- **Neutros (3)**: Clientes satisfeitos mas não entusiasmados
- **Promotores (4-5)**: Clientes leais que recomendam a empresa

### **Fórmula do NPS:**
```
NPS = (% Promotores) - (% Detratores)
```

### **Exemplo de Cálculo:**
```
Total de respostas: 100
- Promotores (4-5): 60 pessoas = 60%
- Neutros (3): 20 pessoas = 20%
- Detratores (0-2): 20 pessoas = 20%

NPS = 60% - 20% = 40
```

### **Interpretação:**
- **NPS > 50**: Excelente
- **NPS 0-50**: Bom
- **NPS < 0**: Precisa melhorar

## 🛠️ Instalação e Execução

### **Pré-requisitos**
- Node.js 18+ (para frontend)
- Python 3.9+ (para backend)
- PostgreSQL (para produção)
- Docker e Docker Compose (opcional)

### **1. Execução com Docker (Recomendado)**

#### **1.1. Clonar o repositório**
```bash
git clone <repository-url>
cd nps-score
```

#### **1.2. Executar com Docker Compose**
```bash
# Subir todos os serviços (backend + frontend + banco)
docker-compose up -d

# Verificar logs
docker-compose logs -f
```

**Acessos:**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`
- Documentação API: `http://localhost:8000/docs`

### **2. Execução Local (Desenvolvimento)**

## 🔧 Backend (API)

### **2.1. Configurar Backend**
```bash
cd back-end

# Criar ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows

# Instalar dependências
pip install -e ".[dev]"

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações

# **IMPORTANTE: Banco de dados**
# Para execução local, você precisa ter o PostgreSQL rodando
# Opção 1: Usar apenas o banco via Docker
docker-compose up postgres -d

# Opção 2: Instalar PostgreSQL localmente e criar o banco
# createdb -U nps_user nps_db

# Executar migrações
alembic upgrade head
```

### **2.2. Executar Backend**
```bash
# Desenvolvimento
uvicorn app.main:app --reload

# Produção
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### **2.3. Testes do Backend**
```bash
# Executar todos os testes
pytest

# Com cobertura
pytest --cov=app --cov-report=html

# Testes específicos
pytest tests/test_routes/
```

### **2.4. Qualidade de Código (Backend)**
```bash
# Formatação
black app/ tests/

# Linting
flake8 app/ tests/
```

## 🎨 Frontend (Interface Web)

### **2.5. Configurar Frontend**
```bash
cd front-end

# Instalar dependências
npm install
# ou
yarn install

# Configurar variáveis de ambiente (opcional)
cp .env.example .env.local
# Editar .env.local se necessário
```

### **2.6. Executar Frontend**
```bash
# Desenvolvimento
npm run dev
# ou
yarn dev

# Build para produção
npm run build
npm start
```

### **2.7. Testes do Frontend**
```bash
# Executar testes
npm test
# ou
yarn test

# Testes com cobertura
npm run test:coverage

# Testes em modo watch
npm run test:watch
```

### **2.8. Qualidade de Código (Frontend)**
```bash
# Linting
npm run lint

# Formatação
npm run format

# Verificar formatação
npm run format:check
```

## 📚 Documentação da API

### **Swagger UI**
Acesse: `http://localhost:8000/docs`

### **ReDoc**
Acesse: `http://localhost:8000/redoc`

### **Principais Endpoints**

#### **Empresas**
- `GET /api/companies/` - Listar empresas
- `POST /api/companies/` - Criar empresa
- `PUT /api/companies/{id}` - Atualizar empresa
- `DELETE /api/companies/{id}` - Excluir empresa

#### **Avaliações**
- `GET /api/companies/{id}/responses` - Listar avaliações da empresa
- `POST /api/companies/{id}/responses` - Criar avaliação
- `DELETE /api/responses/{id}` - Excluir avaliação

#### **Relatórios NPS**
- `GET /api/reports/nps` - Relatório NPS de todas as empresas
- `GET /api/reports/nps/{company_id}` - Relatório NPS de uma empresa

## 🗂️ Estrutura do Projeto

```
nps-score/
├── back-end/                    # API FastAPI
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/          # Endpoints da API
│   │   ├── core/
│   │   │   ├── config.py        # Configurações
│   │   │   ├── database.py      # Conexão com banco
│   │   │   ├── exceptions.py    # Exceções customizadas
│   │   │   └── logging.py       # Configuração de logs
│   │   ├── models/              # Modelos do banco de dados
│   │   ├── repositories/        # Camada de acesso a dados
│   │   ├── schemas/             # Schemas Pydantic
│   │   ├── services/            # Lógica de negócio
│   │   └── main.py             # Aplicação principal
│   ├── tests/                   # Testes unitários
│   ├── alembic/                 # Migrações do banco
│   ├── pyproject.toml          # Configuração do projeto
│   └── Dockerfile              # Configuração Docker
├── front-end/                   # Interface Next.js
│   ├── app/                     # App Router (Next.js 13+)
│   ├── components/              # Componentes React
│   │   ├── ui/                  # Componentes base
│   │   ├── features/            # Componentes específicos
│   │   └── layout/              # Layout components
│   ├── hooks/                   # Custom hooks
│   ├── services/                # Serviços de API
│   ├── types/                   # Definições TypeScript
│   ├── __tests__/               # Testes unitários
│   ├── package.json            # Dependências Node.js
│   └── Dockerfile              # Configuração Docker
├── docker-compose.yml          # Orquestração dos serviços
└── README.md                   # Este arquivo
```

## 🌍 Variáveis de Ambiente

### **Backend (.env)**
```env
# Banco de dados
DATABASE_URL=postgresql://user:password@localhost:5432/nps_db

# Segurança
SECRET_KEY=your-super-secret-key-here

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:8080

# Aplicação
DEBUG=false
HOST=0.0.0.0
PORT=8000
```

### **Frontend (.env.local)**
```env
# URL da API
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

# Configurações do Next.js
NEXT_PUBLIC_APP_NAME="Sistema NPS"
```

## 🐳 Docker

### **Executar serviços individuais**
```bash
# Apenas backend
docker-compose up backend

# Apenas frontend
docker-compose up frontend

# Apenas banco de dados
docker-compose up postgres
```

### **Rebuild dos containers**
```bash
# Rebuild e restart
docker-compose up --build

# Rebuild serviço específico
docker-compose build backend
docker-compose up backend
```

## 📈 Funcionalidades

### **Interface Web (Frontend)**
- ✅ Formulário de avaliação NPS intuitivo
- ✅ Sistema de estrelas para avaliação
- ✅ Painel administrativo para empresas
- ✅ Relatórios visuais de NPS
- ✅ Interface responsiva (mobile-friendly)
- ✅ Notificações de sucesso/erro
- ✅ Validação de formulários em tempo real

### **API (Backend)**
- ✅ CRUD completo de empresas
- ✅ Coleta de avaliações NPS
- ✅ Cálculo automático de métricas
- ✅ Relatórios detalhados por empresa
- ✅ Validação robusta de dados
- ✅ Logging estruturado
- ✅ Documentação automática (Swagger)
- ✅ Testes unitários abrangentes

## 🧪 Testes

### **Backend**
```bash
cd back-end

# Todos os testes
pytest

# Com cobertura detalhada
pytest --cov=app --cov-report=html

# Testes específicos
pytest tests/test_services/test_nps_service.py
```

### **Frontend**
```bash
cd front-end

# Todos os testes
npm test

# Modo interativo
npm run test:watch

# Cobertura
npm run test:coverage
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### **Padrões de Desenvolvimento**
- Use **TypeScript** no frontend
- Siga **PEP 8** no backend
- Escreva **testes** para novas funcionalidades
- Use **commits semânticos**
- Documente **APIs** e **componentes**

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autores

- **Arthur Lima** - *Desenvolvimento inicial* - [GitHub](https://github.com/arthurlima)

## 🆘 Suporte

Se encontrar problemas:

1. Verifique se todas as dependências estão instaladas
2. Confirme se as variáveis de ambiente estão configuradas
3. Consulte os logs: `docker-compose logs -f`
4. Abra uma issue no GitHub

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela!**