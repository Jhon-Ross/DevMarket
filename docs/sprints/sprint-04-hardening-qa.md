# Sprint 4 — Hardening & QA (2 semanas)

Objetivo
- Qualidade, segurança e automações de build/deploy.

Critérios de aceitação
- Testes (unit/e2e) e cobertura mínima definida.
- Rate limit, CORS, cabeçalhos de segurança e validações.
- CI/CD com pipelines: lint, type-check, build, test, deploy.

Plano passo a passo
1) Testes
   - Unit com Vitest/Jest; e2e com Playwright.
2) Segurança
   - Rate limit, CORS, CSP, xss filters e validação de payloads.
3) Observabilidade
   - Logs estruturados e métricas básicas.
4) CI/CD
   - GitHub Actions com jobs cacheados (Turborepo).

Entregáveis
- Pipeline estável, testes e segurança aplicadas.

Riscos
- Flaky tests: mitigar com retries e isolamento.