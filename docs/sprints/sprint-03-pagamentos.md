# Sprint 3 — Pagamentos & Assinaturas (1–2 semanas)

Objetivo
- Stripe Checkout, webhook de reconciliação e gating de features Pro.

Critérios de aceitação
- Fluxo de checkout funcionando; atualização de `Subscription` via webhook.
- Gating de features (ex.: projetos ilimitados, destaque).
- Página de conta/assinatura com status atual.

Plano passo a passo
1) Stripe Checkout
   - Endpoint para criar sessão e retornar URL de pagamento.
2) Webhook Stripe
   - Rota `POST /webhooks/stripe` reconciliando `Subscription` no Postgres.
3) Gating
   - Middleware/guards para checar plano ativo.
4) UI
   - Páginas de conta, status e gestão básica.

Entregáveis
- Fluxo de pagamento completo e controle de acesso às features Pro.

Riscos
- Casos de economia fiscal e chargebacks: registrar eventos e logs.