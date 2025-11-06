import React, { useMemo, useState } from 'react';
import { definePlugin, type DocumentActionComponent, useDocumentOperation } from 'sanity';

const RejectAction: DocumentActionComponent = (props) => {
  const { patch, publish } = useDocumentOperation(props.id, props.type);
  const { isPending, alreadyRejected } = useMemo(() => {
    const doc = (props.draft || props.published) as any;
    const status = doc?.status;
    return {
      isPending: status === 'pending',
      alreadyRejected: status === 'rejected',
    };
  }, [props.draft, props.published]);

  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState('');

  // Oculta a ação quando não está pendente
  if (!isPending) return null;

  return {
    label: 'Rejeitar publicação',
    tone: 'critical',
    disabled: alreadyRejected,
    onHandle: () => setOpen(true),
    dialog: open
      ? {
          type: 'dialog',
          onClose: () => setOpen(false),
          content: (
            <div style={{ padding: 16, maxWidth: 520 }}>
              <h3 style={{ marginBottom: 8 }}>Rejeitar publicação</h3>
              <p style={{ marginBottom: 12 }}>
                Informe o motivo da rejeição. O projeto será marcado como não público.
              </p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.currentTarget.value)}
                placeholder="Motivo da rejeição..."
                rows={5}
                style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button
                  onClick={() => {
                    patch.execute([
                      { set: { status: 'rejected', isPublic: false, moderationNotes: notes || '' } },
                    ]);
                    publish.execute();
                    setOpen(false);
                    props.onComplete();
                  }}
                  style={{
                    background: 'var(--danger-600)',
                    color: 'white',
                    border: 0,
                    padding: '8px 12px',
                    borderRadius: 6,
                  }}
                >
                  Confirmar rejeição
                </button>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: 'transparent',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-default)',
                    padding: '8px 12px',
                    borderRadius: 6,
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          ),
        }
      : undefined,
  };
};

export const rejectPublicationPlugin = definePlugin({
  name: 'reject-publication-plugin',
  document: {
    actions: (prev, context) => {
      if (context.schemaType === 'project') {
        return [...prev, RejectAction];
      }
      return prev;
    },
  },
});