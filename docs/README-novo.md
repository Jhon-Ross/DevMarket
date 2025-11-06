# 🧠 Projeto: DevMarket

## 💡 Visão Geral
O **DevMarket** é uma **rede social voltada para o ecossistema de tecnologia**, criada para conectar **profissionais, estudantes e empresas** do setor.  
Na plataforma, os usuários podem criar **perfis personalizados e dinâmicos**, publicar seus **projetos, vídeos, ideias e conquistas**, e interagir por meio de um **feed social** semelhante às principais redes modernas — porém com foco exclusivo em **conteúdo técnico e oportunidades profissionais.**

---

## 🎯 Propósito
Ser o **ponto de encontro central da comunidade tech**, unindo:
- Profissionais e criadores que desejam exibir seu trabalho e ganhar visibilidade.  
- Empresas e recrutadores em busca de talentos qualificados.  
- Instituições de ensino e eventos que queiram promover inovação e conexões.

---

## 👥 Público-alvo
- Desenvolvedores, designers, analistas, QAs, devops, estudantes e freelancers.  
- Startups, empresas e recrutadores do setor de tecnologia.  
- Escolas, universidades e instituições que promovem formações técnicas ou eventos de TI.

---

## 🧩 Principais Funcionalidades

### 🔹 1. Feed Social Interativo
- Centraliza tudo o que é publicado na plataforma.  
- Exibe postagens de **projetos, vídeos, atualizações e anúncios**.  
- Suporte a **curtidas, comentários, compartilhamentos e filtros personalizados**.  
- Algoritmo de destaque que prioriza conteúdos relevantes por área ou popularidade.

### 🔹 2. Perfis Ricos e Customizáveis
- O perfil é **modular e dinâmico**, adaptando-se conforme o usuário preenche o formulário de cadastro.  
- Seções personalizáveis para:  
  - **Sobre mim / Biografia**  
  - **Tecnologias dominadas**  
  - **Projetos com imagens, vídeos e links externos (GitHub, Figma etc.)**  
  - **Certificações, experiências e contribuições open-source**  
- Suporte para **temas visuais e layout personalizável**, deixando cada perfil único.  
- Perfis **públicos ou privados**, com controle de visibilidade.  

### 🔹 3. Tipos de Perfis
- **🧑‍💻 Profissional:** voltado para quem quer exibir projetos, se destacar e buscar oportunidades.  
- **🏢 Empresa:** voltado para empresas e instituições — permite divulgar **vagas, eventos, editais, parcerias e anúncios de contratação.**

### 🔹 4. Planos e Benefícios
| Plano | Preço | Recursos |
|-------|--------|----------|
| **Free** | Gratuito | Perfil básico, até 3 projetos, 1 vídeo |
| **Pro** | R$ 19,90/mês | Perfil completo, vídeos ilimitados, destaque no feed e ranking |
| **Topzera** | R$ 39,90/mês | Tudo do Pro + insights de visitas + suporte prioritário + métricas avançadas |

> Os planos estão em definição e poderão incluir vantagens como **verificação de perfil**, **estatísticas de engajamento** e **impulsionamento de publicações**.

---

## 🚀 Diferenciais
- **Feed social nativo**, com publicações de projetos, vagas e eventos.  
- **Perfis altamente personalizáveis**, criados via formulários inteligentes e modulares.  
- **Experiência moderna e responsiva**, com foco em UI/UX profissional.  
- **Ambiente exclusivo para o público tech**, diferente de redes genéricas.  
- **Integração entre CMS (Sanity)** e banco relacional (Prisma) garantindo controle e consistência de dados.  
- **Sistema de planos e destaques**, incentivando a evolução do perfil.  

---

## ⚙️ Tecnologias em Uso
| Categoria | Tecnologia |
|------------|-------------|
| Framework | **Next.js 16 (App Router)** |
| Linguagem | **TypeScript** |
| Front-end | **React** |
| CMS | **Sanity** — schemas de `userProfile`, moderação e webhooks |
| Banco de Dados | **Prisma** — em expansão para dados relacionais |
| Pacotes | **pnpm workspaces** |
| Qualidade | **ESLint**, **Prettier**, **Husky (pre-commit/push)** |
| Deploy | **Vercel / Node** (planejado) |

---

## 🧱 Arquitetura do Projeto
- Estrutura **monorepo**, separando apps e pacotes reutilizáveis.  
- **Next API Routes (`route.ts`)** para endpoints backend com revalidação automática.  
- **Integração Sanity ↔ Next.js** via webhooks para atualizações em tempo real.  
- **Prisma** para dados estruturados de usuários, projetos, planos e interações sociais.  
- Sistema de **autenticação e roles** (usuário / empresa / admin) em desenvolvimento.

---

## 🔮 Roadmap (Próximos Passos)
1. Expandir o **feed social** com interações (comentários e ranking de destaque).  
2. Concluir os **planos de assinatura e gateway de pagamento**.  
3. Criar **painel de insights** com dados de visitas e alcance.  
4. Implementar **notificações e chat interno** entre perfis.  
5. Lançar **versão beta pública** para testes com comunidade tech.  

---

## 🧭 Missão
Dar **visibilidade real** a quem cria, inova e compartilha conhecimento em tecnologia — conectando pessoas e empresas de forma transparente, criativa e interativa.

---

## 📈 Visão de Futuro
Transformar o **DevMarket** na principal **rede profissional e criativa da comunidade tech**, sendo referência em conexões, portfólios e oportunidades em toda a América Latina.

---

## 💬 Contato
**Projeto DevMarket**  
Desenvolvido por **Jhon Ross Abdo de Lara**  
🧩 *Em desenvolvimento — Next.js, React, Sanity e Prisma*
