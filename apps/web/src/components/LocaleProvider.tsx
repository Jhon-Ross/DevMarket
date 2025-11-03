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
  // Navegação
  'nav.uiPreview': { pt: 'Preview de UI', en: 'UI Preview' },
  'nav.projects': { pt: 'Projetos', en: 'Projects' },
  'nav.profile': { pt: 'Perfil', en: 'Profile' },
  // Projetos
  'projects.title': { pt: 'Projetos', en: 'Projects' },
  'projects.empty': { pt: 'Nenhum projeto público encontrado.', en: 'No public projects found.' },
  'projects.filters': { pt: 'Filtros', en: 'Filters' },
  'projects.all': { pt: 'Todos', en: 'All' },
  'projects.by': { pt: 'por', en: 'by' },
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
  // Perfil
  'profile.title': { pt: 'Perfil:', en: 'Profile:' },
  'profile.projects': { pt: 'Projetos públicos', en: 'Public projects' },
  'profile.empty': { pt: 'Nenhum projeto público encontrado.', en: 'No public projects found.' },
};

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: keyof typeof dict) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('locale') : null;
      return stored === 'en' ? 'en' : 'pt';
    } catch {
      return 'pt';
    }
  });

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
      t: (key) => dict[key][locale],
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
