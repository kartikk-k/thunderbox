import React from 'react';
import Sidebar from '@/components/Sidebar';

async function ProtectedLayout({ children }: { children: React.ReactNode }) {
   
    return (
        <div className='flex h-screen text-sm'>
            <div className='w-[280px] shrink-0 border-r border-border'>
                <Sidebar />
            </div>
            <main className='w-full'>
                {children}
            </main>
        </div>
    )
}

export default ProtectedLayout