import { Metadata } from 'next';
import ResponsesClient from './ResponsesClient';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: 'Avaliações Recebidas',
    description:
      'Painel administrativo para visualizar avaliações NPS recebidas. Acesso restrito a administradores.',
    keywords: ['admin', 'dashboard', 'avaliações', 'respostas', 'NPS'],
    robots: {
      index: false, // Não indexar páginas administrativas
      follow: false,
    },
  };
}

export default function ResponsesPage({ params }: { params: { id: string } }) {
  return <ResponsesClient />;
}
