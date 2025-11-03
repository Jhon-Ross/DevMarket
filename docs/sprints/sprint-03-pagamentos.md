# Sprint 3 — Pagamentos & Assinaturas (1–2 semanas)

Objetivo

- Definir e implementar planos de assinatura (Dev e Empresa).
- Integrar provedor de pagamento (Mercado Pago, PayPal ou Stripe) — decisão em revisão.
- Configurar webhook/IPN de reconciliação e gating de features por plano.

Planos de assinatura

- Dev
  - Free: Perfil básico, até 3 projetos, 1 vídeo. Preço: Grátis.
  - Pro: Perfil completo, vídeos ilimitados, destaque no ranking. Preço sugerido: R$19,90/mês.
  - Premium: Tudo do Pro + insights de visitas no perfil. Preço sugerido: R$39,90/mês.
- Empresa (Recrutador)
  - Basic: Buscar e visualizar perfis. Preço: Grátis.
  - Business: Acesso a contatos diretos + filtros avançados. Preço sugerido: R$49,90/mês.
  - Enterprise: API + destaque da marca + vagas ilimitadas. Preço: Negociável.

Observações

- Os valores e benefícios podem evoluir durante o desenvolvimento.
- A escolha do provedor de pagamento será validada (Mercado Pago, PayPal ou Stripe) conforme viabilidade técnica, custos e compliance.

Critérios de aceitação

- Checkout funcionando no provedor escolhido; criação de `Subscription` e vínculo a `Plan` no Postgres.
- Gating de features por plano (ex.: limites de projeto/vídeo, destaque, filtros avançados).
- Página de conta/assinatura com status atual (active/past_due/canceled) e opção de upgrade/downgrade.

Plano passo a passo

1. Decisão do provedor de pagamento
   - Comparar Mercado Pago, PayPal e Stripe (custos, APIs, suporte a assinaturas).
   - Preparar chaves/sandbox e variáveis de ambiente.
2. Modelagem no banco (Prisma)
   - Criar tabela `Plan` (slug, tipo: dev/empresa, benefícios, preço sugerido).
   - Ajustar `Subscription` para referenciar `Plan` e estados.
3. Checkout
   - Implementar endpoint para iniciar sessão de pagamento no provedor escolhido.
   - Redirecionar/retornar URL de pagamento.
4. Webhook/IPN
   - Rota `POST /webhooks/{provider}` para reconciliar `Subscription` (create/update/cancel).
   - Persistir eventos mínimos para auditoria.
5. Gating
   - Middleware/guards verificando plano e benefícios ao acessar recursos.
   - Limites: Dev Free (3 projetos, 1 vídeo), Pro/Premium ilimitado conforme benefícios.
6. UI
   - Páginas de conta: mostrar plano atual, status e ações.
   - Tabela de planos com call-to-action.

Entregáveis

- Planos Dev e Empresa definidos e persistidos (`Plan`).
- Fluxo de pagamento funcional com webhook/IPN e `Subscription` reconciliada.
- Gating de features conforme plano e páginas de conta operacionais.

Riscos

- Diferenças de API/recorrência entre provedores (Mercado Pago/PayPal/Stripe).
- Chargebacks e disputas: registrar eventos e logs; tratar estado `past_due`.
