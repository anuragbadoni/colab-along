'use client';
import BoardList from '@/components/BoardList';
import EmptyOrg from '@/components/EmptyOrg';
import { useOrganization } from '@clerk/nextjs';

import { DashboardPageProps } from '@/types';

export default function Dashboard({ searchParams }: DashboardPageProps) {
  const { organization } = useOrganization();

  return (
    <main className='w-full px-5 flex-1 h-[calc(100%-80px)]'>
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList
          orgId={organization.id}
          query={searchParams}
        />
      )}
    </main>
  );
}
