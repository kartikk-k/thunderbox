import Sidebar from '@/components/Sidebar';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react'

async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

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