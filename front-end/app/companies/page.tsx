import { Metadata } from 'next';
import CompaniesClient from './CompaniesClient';

export const metadata: Metadata = {
  title: 'Gerenciar Empresas',
  description:
    'Painel administrativo para gerenciar empresas e visualizar relatórios de NPS. Acesso restrito a administradores.',
  keywords: ['admin', 'dashboard', 'empresas', 'gerenciamento', 'NPS', 'relatórios'],
  robots: {
    index: false, // Não indexar páginas administrativas
    follow: false,
  },
};

export default function CompaniesPage() {
  return <CompaniesClient />;
}
