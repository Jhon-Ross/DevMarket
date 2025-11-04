'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Locale = 'pt' | 'en';

type Dict = Record<string, Record<Locale, string>>;

const dict: Dict = {
  'home.title': { pt: 'DevMarket', en: 'DevMarket' },
  'home.subtitle': {
    pt: 'Marketplace para desenvolvedores. Conecte-se com talentos, encontre projetos incríveis e construa o futuro da tecnologia.',
    en: 'Marketplace for developers. Connect with talent, find great projects, and build the future of technology.',
  },
  'home.ctaStart': { pt: 'Começar Agora', en: 'Get Started' },
  'home.ctaLearn': { pt: 'Saiba Mais', en: 'Learn More' },
  'home.dev.title': { pt: 'Para Desenvolvedores', en: 'For Developers' },
  'home.dev.desc': {
    pt: 'Crie seu portfólio, mostre seus projetos e conecte-se com empresas que valorizam seu talento.',
    en: 'Create your portfolio, showcase projects, and connect with companies that value your talent.',
  },
  'home.comp.title': { pt: 'Para Empresas', en: 'For Companies' },
  'home.comp.desc': {
    pt: 'Encontre desenvolvedores qualificados, analise portfólios reais e contrate com confiança.',
    en: 'Find qualified developers, review real portfolios, and hire with confidence.',
  },
  'home.real.title': { pt: 'Projetos Reais', en: 'Real Projects' },
  'home.real.desc': {
    pt: 'Veja projetos em ação, código real e resultados que demonstram a qualidade do trabalho.',
    en: 'See projects in action, real code, and results that demonstrate work quality.',
  },
  // Home — Showcase
  'home.showcase.title': { pt: 'Showcase', en: 'Showcase' },
  'home.showcase.examples.title': { pt: 'Exemplos em destaque', en: 'Featured examples' },
  'home.showcase.examples.1': {
    pt: 'App de Finanças com gráficos em tempo real',
    en: 'Finance App with real-time charts',
  },
  'home.showcase.examples.2': {
    pt: 'Plataforma de Cursos com vídeo e quizzes',
    en: 'Courses platform with video and quizzes',
  },
  'home.showcase.examples.3': {
    pt: 'E-commerce com checkout e processamento de pedidos',
    en: 'E-commerce with checkout and order processing',
  },
  'home.showcase.cta': { pt: 'Ver mais exemplos', en: 'See more examples' },
  // Home — Social Proof
  'home.social.title': { pt: 'Quem usa e recomenda', en: 'Who uses and recommends' },
  'home.social.quotes.1': {
    pt: '“Finalmente um lugar onde meu portfólio fala por si.”',
    en: '“Finally a place where my portfolio speaks for itself.”',
  },
  'home.social.quotes.2': {
    pt: '“Encontramos devs com projetos reais e contratação foi muito mais assertiva.”',
    en: '“We found devs with real projects and hiring was far more accurate.”',
  },
  'home.social.quotes.3': {
    pt: '“Publicar com mídia rica fez toda diferença na visibilidade.”',
    en: '“Publishing with rich media made all the difference in visibility.”',
  },
  // Home — Como funciona
  'home.how.title': { pt: 'Como funciona', en: 'How it works' },
  'home.how.step1.title': { pt: 'Crie seu perfil', en: 'Create your profile' },
  'home.how.step1.desc': {
    pt: 'Adicione nome, bio, skills e links para apresentar quem você é.',
    en: 'Add name, bio, skills and links to present who you are.',
  },
  'home.how.step2.title': { pt: 'Publique projetos com mídia', en: 'Publish media-rich projects' },
  'home.how.step2.desc': {
    pt: 'Inclua capas, imagens, vídeos e arquivos para mostrar seu trabalho.',
    en: 'Include covers, images, videos and files to showcase your work.',
  },
  'home.how.step3.title': {
    pt: 'Ganhe visibilidade e conexões',
    en: 'Gain visibility and connections',
  },
  'home.how.step3.desc': {
    pt: 'Apareça para empresas e devs, compartilhe e receba oportunidades.',
    en: 'Be discovered by companies and devs, share and get opportunities.',
  },
  // Home — Planos (títulos resumidos)
  'home.plans.title': { pt: 'Planos', en: 'Plans' },
  'home.plans.devFree.title': { pt: 'Dev Free', en: 'Dev Free' },
  'home.plans.devFree.benefit1': { pt: 'Perfil básico', en: 'Basic profile' },
  'home.plans.devFree.benefit2': { pt: 'Até 3 projetos', en: 'Up to 3 projects' },
  'home.plans.devFree.benefit3': { pt: '1 vídeo', en: '1 video' },
  'home.plans.devFree.price': { pt: 'Grátis', en: 'Free' },
  'home.plans.devPro.title': { pt: 'Dev Pro', en: 'Dev Pro' },
  'home.plans.devPro.benefit1': { pt: 'Perfil completo', en: 'Full profile' },
  'home.plans.devPro.benefit2': { pt: 'Vídeos ilimitados', en: 'Unlimited videos' },
  'home.plans.devPro.benefit3': { pt: 'Destaque no ranking', en: 'Ranking highlight' },
  'home.plans.devPro.price': { pt: 'R$ 19,90/mês', en: '$19.90/mo' },
  'home.plans.devPremium.title': { pt: 'Dev Premium', en: 'Dev Premium' },
  'home.plans.devPremium.benefit1': { pt: 'Tudo do Pro', en: 'Everything in Pro' },
  'home.plans.devPremium.benefit2': { pt: 'Insights de visitas', en: 'Visit insights' },
  'home.plans.devPremium.benefit3': { pt: 'Suporte prioritário', en: 'Priority support' },
  'home.plans.devPremium.price': { pt: 'R$ 39,90/mês', en: '$39.90/mo' },
  // Home — FAQ
  'home.faq.title': { pt: 'Perguntas Frequentes', en: 'Frequently Asked Questions' },
  'home.faq.q1': { pt: 'O DevMarket é gratuito?', en: 'Is DevMarket free?' },
  'home.faq.a1': {
    pt: 'Há um plano Free para Devs com recursos limitados e planos pagos opcionais para benefícios extras.',
    en: 'There is a Free plan for Devs with limited features and optional paid plans for extra benefits.',
  },
  'home.faq.q2': {
    pt: 'Posso publicar vídeos nos projetos?',
    en: 'Can I publish videos in projects?',
  },
  'home.faq.a2': {
    pt: 'Sim. Suportamos imagens, vídeos e arquivos para demonstrar seu trabalho com mídia rica.',
    en: 'Yes. We support images, videos, and files to showcase your work with rich media.',
  },
  'home.faq.q3': {
    pt: 'Empresas podem avaliar portfólios?',
    en: 'Can companies review portfolios?',
  },
  'home.faq.a3': {
    pt: 'Empresas podem pesquisar perfis, analisar projetos e entrar em contato diretamente com talentos.',
    en: 'Companies can search profiles, review projects, and contact talents directly.',
  },
  // Navegação
  'nav.uiPreview': { pt: 'Preview de UI', en: 'UI Preview' },
  'nav.projects': { pt: 'Feed', en: 'Feed' },
  'nav.profile': { pt: 'Perfil', en: 'Profile' },
  'nav.login': { pt: 'Entrar', en: 'Sign in' },
  // Projetos
  'projects.title': { pt: 'Projetos', en: 'Projects' },
  'projects.empty': { pt: 'Nenhum projeto público encontrado.', en: 'No public projects found.' },
  'projects.filters': { pt: 'Filtros', en: 'Filters' },
  'projects.all': { pt: 'Todos', en: 'All' },
  'projects.by': { pt: 'por', en: 'by' },
  // Perfil público
  'profile.title': { pt: 'Perfil de', en: 'Profile of' },
  'profile.skills': { pt: 'Skills', en: 'Skills' },
  'profile.links': { pt: 'Links', en: 'Links' },
  'profile.projects': { pt: 'Projetos', en: 'Projects' },
  'profile.empty': { pt: 'Nenhum projeto publicado ainda.', en: 'No projects published yet.' },
  'profile.notFound.title': { pt: 'Perfil não encontrado', en: 'Profile not found' },
  'profile.notFound.desc': {
    pt: 'O perfil solicitado não existe ou foi removido.',
    en: 'The requested profile does not exist or was removed.',
  },
  'profile.notFound.back': { pt: 'Voltar para a Home', en: 'Back to Home' },
  // Meu Perfil (área autenticada)
  'myProfile.title': { pt: 'Meu Perfil', en: 'My Profile' },
  'myProfile.desc': {
    pt: 'Edite seu perfil público. Publicações de projetos entram como "pendentes" para moderação.',
    en: 'Edit your public profile. Project publications enter as "pending" for moderation.',
  },
  // Feed
  'feed.title': { pt: 'Feed', en: 'Feed' },
  'feed.subtitle': {
    pt: 'Projetos, eventos, notícias e interesses publicados por devs e empresas.',
    en: 'Projects, events, news, and interests published by devs and companies.',
  },
  'feed.filter.all': { pt: 'Todos', en: 'All' },
  'feed.filter.project': { pt: 'Projetos', en: 'Projects' },
  'feed.filter.event': { pt: 'Eventos', en: 'Events' },
  'feed.filter.news': { pt: 'Notícias', en: 'News' },
  'feed.filter.interest': { pt: 'Interesses', en: 'Interests' },
  'feed.type.project': { pt: 'Projeto', en: 'Project' },
  'feed.type.event': { pt: 'Evento', en: 'Event' },
  'feed.type.news': { pt: 'Notícia', en: 'News' },
  'feed.type.interest': { pt: 'Interesse', en: 'Interest' },
  // UI Preview
  'uiPreview.title': { pt: 'Preview de UI', en: 'UI Preview' },
  'uiPreview.section.button': { pt: 'Botão', en: 'Button' },
  'uiPreview.section.card': { pt: 'Card', en: 'Card' },
  'uiPreview.section.avatar': { pt: 'Avatar', en: 'Avatar' },
  'uiPreview.section.tag': { pt: 'Tag', en: 'Tag' },
  'uiPreview.section.grid': { pt: 'Grid', en: 'Grid' },
  'uiPreview.section.media': { pt: 'Galeria de Mídia', en: 'MediaGallery' },
  'uiPreview.button.primary': { pt: 'Primário', en: 'Primary' },
  'uiPreview.button.secondary': { pt: 'Secundário', en: 'Secondary' },
  'uiPreview.button.outline': { pt: 'Contorno', en: 'Outline' },
  'uiPreview.button.ghost': { pt: 'Ghost', en: 'Ghost' },
  'uiPreview.button.destructive': { pt: 'Destrutivo', en: 'Destructive' },
  'uiPreview.button.loading': { pt: 'Carregando', en: 'Loading' },
  'uiPreview.card.title': { pt: 'Título do Card', en: 'Card Title' },
  'uiPreview.card.body': {
    pt: 'Corpo do card usando tokens CSS semânticos.',
    en: 'This is the card body using semantic CSS tokens.',
  },
  'uiPreview.card.action': { pt: 'Ação', en: 'Action' },
  'uiPreview.tag.default': { pt: 'Padrão', en: 'Default' },
  'uiPreview.tag.primary': { pt: 'Primária', en: 'Primary' },
  'uiPreview.tag.success': { pt: 'Sucesso', en: 'Success' },
  'uiPreview.tag.warning': { pt: 'Aviso', en: 'Warning' },
  'uiPreview.tag.danger': { pt: 'Perigo', en: 'Danger' },
  'uiPreview.grid.item': { pt: 'Item', en: 'Item' },
  'uiPreview.media.alt.mountain': { pt: 'Montanha', en: 'Mountain' },
  'uiPreview.media.alt.dog': { pt: 'Cachorro', en: 'Dog' },
  'uiPreview.media.alt.bridge': { pt: 'Ponte', en: 'Bridge' },
  // Sobre
  'about.title': { pt: 'Sobre o DevMarket', en: 'About DevMarket' },
  'about.subtitle': {
    pt: 'Conectamos desenvolvedores a oportunidades reais, com portfólios ricos em mídia, projetos verificados e uma experiência pensada para valorizar o trabalho técnico.',
    en: 'We connect developers to real opportunities, with rich media portfolios, verified projects, and an experience designed to showcase technical work.',
  },
  'about.highlights.portfolios.title': { pt: 'Portfólios reais', en: 'Real portfolios' },
  'about.highlights.portfolios.desc': {
    pt: 'Projetos com imagens, vídeos e links que mostram seu trabalho em ação.',
    en: 'Projects with images, videos and links that show your work in action.',
  },
  'about.highlights.audience.title': { pt: 'Para Devs e Empresas', en: 'For Devs and Companies' },
  'about.highlights.audience.desc': {
    pt: 'Benefícios e planos sob medida para quem quer publicar e para quem quer contratar.',
    en: 'Benefits and plans tailored for those who want to publish and those who want to hire.',
  },
  'about.highlights.design.title': { pt: 'Design System', en: 'Design System' },
  'about.highlights.design.desc': {
    pt: 'Interface consistente com componentes reutilizáveis e acessíveis.',
    en: 'Consistent interface with reusable and accessible components.',
  },
  'about.showcase.title': { pt: 'Showcase', en: 'Showcase' },
  'about.portfolios.title': { pt: 'Exemplos de Portfólios', en: 'Portfolio Examples' },
  'about.portfolios.view': { pt: 'Ver perfil', en: 'View profile' },
  'about.cta': { pt: 'Começar Agora', en: 'Get Started' },
  // Signup
  'signup.title': { pt: 'Crie sua conta', en: 'Create your account' },
  'signup.subtitle': {
    pt: 'Comece a publicar projetos e construir seu portfólio.',
    en: 'Start publishing projects and building your portfolio.',
  },
  'signup.form.title': { pt: 'Cadastro', en: 'Sign up' },
  'signup.field.name': { pt: 'Nome', en: 'Name' },
  'signup.field.email': { pt: 'Email', en: 'Email' },
  'signup.field.password': { pt: 'Senha', en: 'Password' },
  'signup.field.confirm': { pt: 'Confirmar senha', en: 'Confirm password' },
  'signup.error.required': { pt: 'Preencha todos os campos.', en: 'Fill in all fields.' },
  'signup.error.mismatch': { pt: 'Senhas não coincidem.', en: 'Passwords do not match.' },
  'signup.error.generic': { pt: 'Erro ao cadastrar', en: 'Error signing up' },
  'signup.error.emailTaken': { pt: 'Email já cadastrado', en: 'Email already taken' },
  'signup.submit': { pt: 'Criar conta', en: 'Create account' },
  'signup.success': { pt: 'Cadastro enviado! (mock)', en: 'Signup submitted! (mock)' },
  // Auth / Login
  'auth.login.title': { pt: 'Entrar', en: 'Sign in' },
  'auth.login.submit': { pt: 'Entrar', en: 'Sign in' },
  'auth.login.toSignup': { pt: 'Não tem conta? Cadastre-se', en: "Don't have an account? Sign up" },
  'auth.email': { pt: 'Email', en: 'Email' },
  'auth.email.placeholder': { pt: 'seu@email.com', en: 'you@example.com' },
  'auth.password': { pt: 'Senha', en: 'Password' },
  'auth.password.placeholder': { pt: '••••••••', en: '••••••••' },
  // Common
  'common.loading': { pt: 'Carregando...', en: 'Loading...' },
  'common.redirecting': { pt: 'Redirecionando...', en: 'Redirecting...' },
};

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: keyof typeof dict) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
  // Inicializa sempre em 'pt' para evitar mismatch de hidratação entre SSR e cliente
  const [locale, setLocale] = useState<Locale>('pt');

  useEffect(() => {
    try {
      localStorage.setItem('locale', locale);
    } catch {}
    document.documentElement.setAttribute('lang', locale === 'pt' ? 'pt-BR' : 'en-US');
    document.documentElement.setAttribute('data-locale', locale);
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key) => (dict[key] ? dict[key][locale] : ''),
    }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('LocaleProvider ausente');
  return ctx;
}
