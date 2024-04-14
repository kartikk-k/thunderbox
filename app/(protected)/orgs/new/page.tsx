import React from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function page() {


    async function handleSubmit(e: FormData) {
        'use server'

        const supabase = createClient()
        const user = (await supabase.auth.getUser()).data.user

        const name = e.get('name')

        if (!name) return console.log('Name is required')
        const { data, error } = await supabase.from('orgs')
            .insert({
                name: e.get('name')
            })
            .select('*')
            .single()

        if (error) return console.log('Error creating organization')

        const res = await supabase.from('members')
            .insert({
                role: 'admin',
                user_id: user?.id,
                org_id: data.id
            })

        if (res.error) return console.log('Error creating organization')

        redirect(`/projects?orgId=${data.id}`)
    }

    return (
        <div className='flex items-center justify-center h-screen text-sm'>

            <div className='space-y-10'>
                <h1 className='text-lg'>Create new organization</h1>

                <form className='flex flex-col space-y-4'>

                    <div className='flex flex-col space-y-1'>
                        <label htmlFor="name">Name</label>
                        <label className='text-xs text-[#5f6974]'>Pick a name for your new organization</label>
                    </div>

                    <input
                        type="text"
                        name='name'
                        className='bg-[#1e2226] h-10 outline-none rounded-xl outline-3 focus:outline-[#1B3634] px-2 min-w-[400px]'
                    />

                    <div className='flex items-center justify-end gap-2 pt-10'>
                        <Link href={'/projects'} className="flex items-center justify-center w-32 h-10 hover:brightness-110 text-white bg-[#292f34] rounded-full">
                            Back
                        </Link>
                        <button formAction={handleSubmit} className="w-32 h-10 hover:brightness-110 text-[#19B785] bg-[#1B3634] rounded-full">
                            Create
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}
