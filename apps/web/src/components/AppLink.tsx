import React from 'react';
import Link from 'next/link';

type Props = React.ComponentProps<typeof Link> & { prefetch?: boolean };

export default function AppLink({ prefetch = false, ...rest }: Props) {
  return <Link prefetch={prefetch} {...rest} />;
}