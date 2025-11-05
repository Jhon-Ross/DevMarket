import React, { useMemo } from 'react';
import { definePlugin, type DocumentActionComponent, useDocumentOperation } from 'sanity';

const ApproveAction: DocumentActionComponent = (props) => {
  const { patch, publish } = useDocumentOperation(props.id, props.type);
  const alreadyApproved = useMemo(() => {
    const doc = (props.draft || props.published) as any;
    return doc?.isPublic === true && doc?.status === 'approved';
  }, [props.draft, props.published]);

  return {
    label: 'Aprovar publicação',
    tone: 'positive',
    disabled: alreadyApproved,
    onHandle: () => {
      // Marca como aprovado e público, depois publica o documento
      patch.execute([{ set: { status: 'approved', isPublic: true } }]);
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
