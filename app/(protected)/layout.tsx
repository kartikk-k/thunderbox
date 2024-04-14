import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default ProtectedLayout