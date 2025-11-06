import React, { useMemo } from 'react';
import { definePlugin, type DocumentActionComponent, useDocumentOperation } from 'sanity';

const ApproveAction: DocumentActionComponent = (props) => {
  const { patch, publish } = useDocumentOperation(props.id, props.type);
  const { isPending, alreadyApproved } = useMemo(() => {
    const doc = (props.draft || props.published) as any;
    const status = doc?.status;
    return {
      isPending: status === 'pending',
      alreadyApproved: doc?.isPublic === true && status === 'approved',
    };
  }, [props.draft, props.published]);

  // Oculta a ação quando não está pendente
  if (!isPending) return null;

  return {
    label: 'Aprovar publicação',
    tone: 'positive',
    disabled: alreadyApproved,
    onHandle: () => {
      patch.execute([{ set: { status: 'approved', isPublic: true, moderationNotes: null } }]);
      publish.execute();
      props.onComplete();
    },
  };
};

export const approvePublicationPlugin = definePlugin({
  name: 'approve-publication-plugin',
  document: {
    actions: (prev, context) => {
      if (context.schemaType === 'project') {
        return [...prev, ApproveAction];
      }
      return prev;
    },
  },
});
