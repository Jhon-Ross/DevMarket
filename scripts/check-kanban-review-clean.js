/*
  Bloqueia push se houver itens não concluídos em "Em Revisão" no Kanban.
  Procura por a seção "## Em Revisão" em docs/kanban/devmarket-kanban.md
  e verifica se há tarefas com o padrão "- [ ]" até a próxima seção "## ".
*/

const fs = require('fs');
const path = require('path');

const kanbanPath = path.join(process.cwd(), 'docs', 'kanban', 'devmarket-kanban.md');

function fail(message) {
  console.error(`\n🚫 ${message}\n`);
  process.exit(1);
}

try {
  if (!fs.existsSync(kanbanPath)) {
    // Se não existir Kanban, não bloqueia
    process.exit(0);
  }

  const content = fs.readFileSync(kanbanPath, 'utf8');
  const reviewHeader = '## Em Revisão';
  const start = content.indexOf(reviewHeader);
  if (start === -1) {
    // Sem seção Em Revisão → não bloqueia
    process.exit(0);
  }

  const nextSectionIdx = content.indexOf('\n## ', start + reviewHeader.length);
  const section =
    nextSectionIdx === -1 ? content.slice(start) : content.slice(start, nextSectionIdx);

  const hasUnchecked = /- \[ \]/.test(section);
  if (hasUnchecked) {
    fail(
      'Push bloqueado: há itens não concluídos na seção "Em Revisão" do Kanban.\n' +
        'Finalize a revisão e mova para "Concluído" antes de fazer push.'
    );
  }

  console.log('\n✅ Kanban limpo: nenhuma tarefa pendente em "Em Revisão". Push permitido.\n');
  process.exit(0);
} catch (err) {
  // Por segurança, se der erro inesperado, permitir push, mas avisar.
  console.warn(
    '\n⚠️ Não foi possível verificar o Kanban. Permitindo push. Detalhes:',
    err.message,
    '\n'
  );
  process.exit(0);
}
