import React, { memo } from 'react';

type Props = {
  active: boolean;
  children: React.ReactNode;
}

function Spinner({ active, children }: Props) {
  if (active) {
    return <div className='Spinner'>{children}</div>;
  } else {
    return <>{children}</>;
  }
}

export default memo(Spinner);
