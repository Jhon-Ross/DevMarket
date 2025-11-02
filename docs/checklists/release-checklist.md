# Checklist de Release

Pré-release
- [ ] Lint e type-check passam
- [ ] Tests unit/e2e passam
- [ ] Variáveis `.env` válidas (validadas por `zod`)
- [ ] SEO verificado (title/description/og)
- [ ] Acessibilidade básica verificada
- [ ] Webhooks do Sanity/Stripe configurados e testados
- [ ] Custos atualizados no README (Sanity/Vercel/DB/CDN/Stripe/Domínio)

Pós-release
- [ ] Monitoramento de erros e métricas
- [ ] Revalidação correta em alterações de conteúdo
- [ ] Revisão de egress e otimizações de mídia