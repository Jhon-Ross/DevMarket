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
  // Novo Projeto
  'newProject.title': { pt: 'Novo Projeto', en: 'New Project' },
  'newProject.desc': {
    pt: 'Publique seu projeto. Ele começará com status pendente para moderação.',
    en: 'Publish your project. It will start pending for moderation.',
  },
  'newProject.form.title': { pt: 'Título', en: 'Title' },
  'newProject.form.titlePlaceholder': {
    pt: 'Ex.: Dashboard de Vendas',
    en: 'e.g., Sales Dashboard',
  },
  'newProject.form.techTags': {
    pt: 'Tags de tecnologia (separadas por vírgula)',
    en: 'Tech tags (comma-separated)',
  },
  'newProject.form.techTagsPlaceholder': {
    pt: 'Next.js, TypeScript, Stripe',
    en: 'Next.js, TypeScript, Stripe',
  },
  'newProject.form.description': { pt: 'Descrição', en: 'Description' },
  'newProject.form.descriptionPlaceholder': {
    pt: 'Resumo do projeto, objetivo, desafios e resultados.',
    en: 'Project summary, purpose, challenges, and results.',
  },
  'newProject.form.coverUrl': { pt: 'Imagem de capa (URL)', en: 'Cover image (URL)' },
  'newProject.form.coverUrlPlaceholder': { pt: 'https://...', en: 'https://...' },
  'newProject.form.submit': { pt: 'Enviar para moderação', en: 'Submit for moderation' },
  'newProject.form.error.missingTitle': { pt: 'Informe um título.', en: 'Please provide a title.' },
  'newProject.form.error.create': { pt: 'Erro ao criar projeto', en: 'Error creating project' },
  'newProject.form.error.internal': {
    pt: 'Erro interno ao criar projeto',
    en: 'Internal error creating project',
  },
  'newProject.form.success': {
    pt: 'Projeto enviado para moderação.',
    en: 'Project submitted for moderation.',
  },
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
  'myProfile.form.name': { pt: 'Nome', en: 'Name' },
  'myProfile.form.namePlaceholder': { pt: 'Seu nome público', en: 'Your public name' },
  // Removed: avatarUrl text field (now asset-only)
  'myProfile.form.bio': { pt: 'Bio', en: 'Bio' },
  'myProfile.form.bioPlaceholder': {
    pt: 'Resumo sobre você, foco, interesses.',
    en: 'Summary about you, focus, interests.',
  },
  'myProfile.form.skills': { pt: 'Skills (separadas por vírgula)', en: 'Skills (comma-separated)' },
  'myProfile.form.skillsPlaceholder': {
    pt: 'React, Next.js, TypeScript',
    en: 'React, Next.js, TypeScript',
  },
  'myProfile.form.links': {
    pt: 'Links (um por linha, formato: Título|URL|Tipo)',
    en: 'Links (one per line, format: Title|URL|Type)',
  },
  'myProfile.form.linksPlaceholder': {
    pt: 'GitHub|https://github.com/seuuser|github\nSite|https://seusite.com|website',
    en: 'GitHub|https://github.com/youruser|github\nWebsite|https://yourwebsite.com|website',
  },
  'myProfile.form.submit': { pt: 'Salvar Perfil', en: 'Save Profile' },
  'myProfile.form.error.save': { pt: 'Erro ao salvar perfil', en: 'Error saving profile' },
  'myProfile.form.error.internalSave': {
    pt: 'Erro interno ao salvar perfil',
    en: 'Internal error saving profile',
  },
  // Meu Perfil — Tagline & Customização
  'myProfile.section.tagline': { pt: 'Destaque', en: 'Tagline' },
  'myProfile.form.tagline': { pt: 'Frase de destaque (tagline)', en: 'Highlight phrase (tagline)' },
  'myProfile.form.taglinePlaceholder': {
    pt: 'Ex.: Desenvolvedor Fullstack focado em performance',
    en: 'e.g., Fullstack developer focused on performance',
  },
  'myProfile.section.customization': { pt: 'Customização', en: 'Customization' },
  'myProfile.form.theme': { pt: 'Tema', en: 'Theme' },
  'myProfile.form.theme.primaryColor': { pt: 'Cor Primária', en: 'Primary Color' },
  'myProfile.form.theme.backgroundColor': { pt: 'Cor de Fundo', en: 'Background Color' },
  'myProfile.form.theme.textColor': { pt: 'Cor do Texto', en: 'Text Color' },
  'myProfile.form.theme.accentColor': { pt: 'Cor de Acento', en: 'Accent Color' },
  'myProfile.form.layout': { pt: 'Layout', en: 'Layout' },
  'myProfile.form.sections.showAbout': { pt: 'Mostrar Sobre', en: 'Show About' },
  'myProfile.form.sections.showSkills': { pt: 'Mostrar Skills', en: 'Show Skills' },
  'myProfile.form.sections.showProjects': { pt: 'Mostrar Projetos', en: 'Show Projects' },
  'myProfile.form.sections.showExperience': { pt: 'Mostrar Experiência', en: 'Show Experience' },
  'myProfile.form.sections.showTestimonials': {
    pt: 'Mostrar Depoimentos',
    en: 'Show Testimonials',
  },
  'myProfile.form.sections.showContact': { pt: 'Mostrar Contato', en: 'Show Contact' },
  // Meu Perfil — Erros específicos de configuração Sanity
  'myProfile.form.error.sanityEnvMissing': {
    pt: 'Configuração do Sanity ausente. Defina SANITY_PROJECT_ID e SANITY_DATASET em .env.local.',
    en: 'Sanity configuration missing. Set SANITY_PROJECT_ID and SANITY_DATASET in .env.local.',
  },
  'myProfile.form.error.sanityWriteTokenMissing': {
    pt: 'Token de escrita do Sanity ausente. Defina SANITY_TOKEN com permissões de escrita.',
    en: 'Sanity write token missing. Set SANITY_TOKEN with write permissions.',
  },
  'myProfile.form.error.sanityUnauthorized': {
    pt: 'Token do Sanity sem permissão. Gere um token com escopo de escrita (Editor).',
    en: 'Sanity token unauthorized. Create a token with write scope (Editor).',
  },
  'myProfile.form.success': { pt: 'Perfil atualizado.', en: 'Profile updated.' },
  'myProfile.form.viewPublic': { pt: 'Ver perfil público', en: 'View public profile' },
  // Meu Perfil — Validações
  'myProfile.validation.name': {
    pt: 'Informe um nome válido (2-60 caracteres).',
    en: 'Provide a valid name (2-60 characters).',
  },
  'myProfile.validation.bio': {
    pt: 'Bio muito longa (máx. 500 caracteres).',
    en: 'Bio too long (max 500 characters).',
  },
  'myProfile.validation.avatarUrl': { pt: 'URL de avatar inválida.', en: 'Invalid avatar URL.' },
  'myProfile.validation.skills': {
    pt: 'Revise suas skills (até 30 itens, 1-30 chars).',
    en: 'Review your skills (up to 30 items, 1-30 chars).',
  },
  'myProfile.validation.links': {
    pt: 'Cada linha deve ser Título|URL|Tipo com URL válida.',
    en: 'Each line must be Title|URL|Type with valid URL.',
  },
  'myProfile.validation.tagline': {
    pt: 'Tagline muito longa (máx. 140 caracteres).',
    en: 'Tagline too long (max 140 characters).',
  },
  'myProfile.validation.customization': {
    pt: 'Configuração de customização inválida.',
    en: 'Invalid customization configuration.',
  },
  // Seções do formulário de perfil
  'myProfile.section.basic': { pt: 'Informações básicas', en: 'Basic information' },
  'myProfile.section.avatar': { pt: 'Imagem de perfil', en: 'Profile image' },
  'myProfile.section.skills': { pt: 'Habilidades', en: 'Skills' },
  'myProfile.section.links': { pt: 'Links', en: 'Links' },
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
  'feed.action.like': { pt: 'Curtir', en: 'Like' },
  'feed.action.fire': { pt: 'Fogo', en: 'Fire' },
  'feed.action.rocket': { pt: 'Foguete', en: 'Rocket' },
  'feed.comments.toggle': { pt: 'Ver comentários', en: 'View comments' },
  'feed.comments.placeholder': { pt: 'Escreva um comentário...', en: 'Write a comment...' },
  'feed.comments.submit': { pt: 'Publicar', en: 'Post' },
  'feed.cta.viewDetails': { pt: 'Ver detalhes', en: 'View details' },
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
  'signup.success': { pt: 'Cadastro enviado!', en: 'Signup submitted!' },
  // Auth / Login
  'auth.login.title': { pt: 'Entrar', en: 'Sign in' },
  'auth.login.submit': { pt: 'Entrar', en: 'Sign in' },
  'auth.login.toSignup': { pt: 'Não tem conta? Cadastre-se', en: "Don't have an account? Sign up" },
  'auth.email': { pt: 'Email', en: 'Email' },
  'auth.email.placeholder': { pt: 'seu@email.com', en: 'you@example.com' },
  'auth.password': { pt: 'Senha', en: 'Password' },
  'auth.password.placeholder': { pt: '••••••••', en: '••••••••' },
  // Auth — Errors
  'auth.error.credentials.title': { pt: 'Credenciais inválidas', en: 'Invalid credentials' },
  'auth.error.credentials.desc': {
    pt: 'Email ou senha incorretos. Verifique os dados e tente novamente.',
    en: 'Incorrect email or password. Check your details and try again.',
  },
  'auth.error.generic.title': { pt: 'Falha ao entrar', en: 'Sign-in failed' },
  'auth.error.generic.desc': {
    pt: 'Ocorreu um erro ao entrar. Tente novamente em instantes.',
    en: 'An error occurred while signing in. Please try again shortly.',
  },
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
