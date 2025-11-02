/*
 * DevMarket — Changelog Generator (Layered)
 * Gera/atualiza a seção [Unreleased] do docs/CHANGELOG.md com camadas:
 *  - Camada 1: Resumo executivo
 *  - Camada 2: Áreas e tópicos (mapeadas por tipo de commit)
 *  - Camada 3: Referências a arquivos (por commit)
 *  - Camada 4: Notas comportamentais e compatibilidade (heurísticas simples)
 *
 * Regras:
 *  - Usa convenções de commit (feat, fix, docs, chore, refactor, perf, style, test, build, ci)
 *  - Se existir tag: usa range <lastTag>..HEAD; caso contrário, todo histórico
 *  - Não altera releases anteriores; substitui apenas a seção [Unreleased]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function sh(cmd) {
  try { return execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim(); }
  catch (e) { return null; }
}

function getLastTag() {
  return sh('git describe --tags --abbrev=0');
}

function getCommits(range) {
  const cmd = range ? `git log ${range} --pretty=format:%H|%ad|%s --date=short` : 'git log --pretty=format:%H|%ad|%s --date=short';
  const out = sh(cmd);
  if (!out) return [];
  return out.split('\n').filter(Boolean).map(line => {
    const [hash, date, subject] = line.split('|');
    return { hash, date, subject };
  });
}

function getFilesForCommit(hash) {
  const out = sh(`git show --name-only --pretty="" ${hash}`);
  if (!out) return [];
  return out.split('\n').filter(Boolean);
}

function classify(subject) {
  const m = subject.match(/^(\w+)(\(.+\))?:\s+/);
  const type = m ? m[1].toLowerCase() : 'other';
  const scoped = m ? (m[2] || '') : '';
  const breaking = /!|BREAKING CHANGE/i.test(subject);
  return { type, scoped, breaking };
}

function aggregate(commits) {
  const buckets = {
    feat: [], fix: [], docs: [], chore: [], refactor: [], perf: [], style: [], test: [], build: [], ci: [], other: []
  };
  const filesMap = {};
  let breakingCount = 0;
  for (const c of commits) {
    const { type, scoped, breaking } = classify(c.subject);
    (buckets[type] || buckets.other).push({ ...c, scoped });
    if (breaking) breakingCount++;
    const files = getFilesForCommit(c.hash);
    filesMap[c.hash] = files;
  }
  return { buckets, filesMap, breakingCount };
}

function layer1Summary(buckets, breakingCount) {
  const count = Object.values(buckets).reduce((acc, arr) => acc + arr.length, 0);
  const added = buckets.feat.length;
  const fixed = buckets.fix.length;
  const changed = buckets.docs.length + buckets.refactor.length + buckets.chore.length + buckets.perf.length + buckets.style.length + buckets.test.length + buckets.build.length + buckets.ci.length + buckets.other.length;
  return `- ${count} commits processados — Added: ${added}, Changed: ${changed}, Fixed: ${fixed}${breakingCount ? `, Breaking: ${breakingCount}` : ''}.`;
}

function layer2Areas(buckets) {
  const lines = [];
  const map = {
    'Componentes UI': ['feat', 'style'],
    'Correções': ['fix'],
    'Docs & Config': ['docs', 'chore', 'build', 'ci'],
    'Refactors & Perf & Testes': ['refactor', 'perf', 'test']
  };
  for (const [area, types] of Object.entries(map)) {
    const items = types.flatMap(t => buckets[t].map(c => `  - ${c.subject}`));
    if (items.length) {
      lines.push(`- ${area}`);
      lines.push(...items);
    }
  }
  return lines.join('\n');
}

function layer3Files(commits, filesMap) {
  const lines = [];
  for (const c of commits) {
    const files = filesMap[c.hash] || [];
    if (files.length) {
      lines.push(`- ${c.subject}`);
      for (const f of files) lines.push(`  - ${f}`);
    }
  }
  return lines.join('\n');
}

function layer4Notes(breakingCount) {
  const notes = [];
  if (breakingCount) notes.push(`- ${breakingCount} mudança(s) potencialmente BREAKING detectadas por heurística (! ou BREAKING CHANGE).`);
  notes.push('- Tokens CSS permitem theming via custom properties.');
  notes.push('- Pacote UI declara peer deps de React — manter versões compatíveis no workspace.');
  notes.push('- CSS marcado como sideEffect para inclusão correta em bundlers.');
  return notes.join('\n');
}

function acpSections(buckets) {
  const added = buckets.feat.map(c => `- ${c.subject}`).join('\n');
  const changed = ['docs','refactor','chore','perf','style','test','build','ci','other']
    .flatMap(t => buckets[t].map(c => `- ${c.subject}`)).join('\n');
  const fixed = buckets.fix.map(c => `- ${c.subject}`).join('\n');
  return { added, changed, fixed };
}

function buildUnreleased(commits, agg) {
  const { buckets, filesMap, breakingCount } = agg;
  const L1 = layer1Summary(buckets, breakingCount);
  const L2 = layer2Areas(buckets);
  const L3 = layer3Files(commits, filesMap);
  const L4 = layer4Notes(breakingCount);
  const { added, changed, fixed } = acpSections(buckets);
  return [
    '## [Unreleased]',
    '',
    '### Camada 1 — Resumo executivo',
    L1,
    '',
    '### Camada 2 — Áreas e tópicos',
    L2 || '- Sem mudanças classificadas.',
    '',
    '### Camada 3 — Referências a arquivos (diff-friendly)',
    L3 || '- Sem arquivos relevantes listados.',
    '',
    '### Camada 4 — Notas comportamentais e compatibilidade',
    L4,
    '',
    '### Added',
    added || '- (vazio)',
    '',
    '### Changed',
    changed || '- (vazio)',
    '',
    '### Fixed',
    fixed || '- (vazio)',
    ''
  ].join('\n');
}

function replaceUnreleased(changelogPath, content) {
  const current = fs.readFileSync(changelogPath, 'utf8');
  const start = current.indexOf('## [Unreleased]');
  if (start === -1) {
    const updated = current + '\n\n' + content + '\n';
    fs.writeFileSync(changelogPath, updated, 'utf8');
    return;
  }
  // Find end of Unreleased (next heading)
  const rest = current.slice(start);
  const nextIdxRel = rest.indexOf('\n## [');
  const end = nextIdxRel !== -1 ? start + nextIdxRel : current.length;
  const updated = current.slice(0, start) + content + current.slice(end);
  fs.writeFileSync(changelogPath, updated, 'utf8');
}

function main() {
  const repoRoot = process.cwd();
  const changelogPath = path.join(repoRoot, 'docs', 'CHANGELOG.md');
  if (!fs.existsSync(changelogPath)) {
    console.error('Arquivo docs/CHANGELOG.md não encontrado.');
    process.exit(1);
  }
  const lastTag = getLastTag();
  const range = lastTag ? `${lastTag}..HEAD` : null;
  const commits = getCommits(range);
  if (commits.length === 0) {
    console.log('Nenhum commit encontrado para gerar Unreleased.');
    process.exit(0);
  }
  const agg = aggregate(commits);
  const unreleased = buildUnreleased(commits, agg);
  replaceUnreleased(changelogPath, unreleased);
  console.log('Changelog [Unreleased] atualizado com sucesso.');
}

main();