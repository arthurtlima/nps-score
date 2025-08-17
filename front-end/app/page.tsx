import { Metadata } from 'next';
import NpsFormClient from './NpsFormClient';

export const metadata: Metadata = {
  title: 'Avalie Nossa Empresa - Pesquisa de Satisfação NPS',
  description:
    'Sua opinião é muito importante! Avalie sua experiência conosco através desta pesquisa rápida e anônima de satisfação.',
  keywords: ['avaliação', 'pesquisa', 'satisfação', 'feedback', 'opinião', 'experiência'],
  openGraph: {
    title: 'Pesquisa de Satisfação - Sua Opinião Importa',
    description:
      'Participe da nossa pesquisa de satisfação. Sua avaliação nos ajuda a melhorar nossos serviços.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return <NpsFormClient />;
}
