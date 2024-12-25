import Navbar from '@/components/Navbar/Navbar';
import OrganizationSidebar from '@/components/Navbar/OrganizationSidebar';
import Sidebar from '@/components/Navbar/Sidebar';
import React from 'react';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='h-full'>
      <Sidebar />
      <div className='pl-[60px] h-full'>
        <div className='flex gap-x-3 h-full'>
          <OrganizationSidebar />
          <div className='h-full flex-1'>
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
