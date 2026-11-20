import type { ReactNode } from 'react';

interface Fact {
  label: string;
  value: ReactNode;
}

export function FactList({ facts }: { facts: Fact[] }) {
  return (
    <dl className='flex flex-col gap-4'>
      {facts.map((fact) => (
        <div key={fact.label} className='flex flex-col gap-1'>
          <dt className='text-sm text-tertiary'>{fact.label}</dt>
          <dd className='text-md text-primary'>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
