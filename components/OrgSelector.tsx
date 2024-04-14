"use client"

import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/Select'
import { PlusIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'


interface props {
    members: Member[]
}

function OrgSelector({ members }: props) {

    const router = useRouter()

    const orgId = useSearchParams().get('orgId')

    const handleValueChange = (value: string) => {
        if (value === 'new') return router.push('/orgs/new')
        router.push(`/projects?orgId=${value}`)
    }

    const currentOrg = members.find(member => member.org_id === orgId)

    return (
        <div className='relative group'>

            <Select value='' onValueChange={handleValueChange}>
                <SelectTrigger>
                    <div className='rounded-full w-full cursor-pointer flex items-center gap-2 bg-[#23292D]'>
                        <div className='w-10 h-10 shrink-0 rounded-full bg-[#49555F] text-[#94A3AF] flex items-center justify-center font-semibold'>
                            {currentOrg?.orgs?.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className='flex flex-col items-start'>
                            <p>{currentOrg?.orgs?.name}</p>
                            <p className='text-xs text-[#737E86]'>{currentOrg?.role}</p>
                        </div>
                    </div>
                </SelectTrigger>

                <SelectContent className='bg-[#23292D] border-none rounded-xl'>
                    {members.filter(member => member.org_id !== orgId).map(member => (
                        <SelectItem key={member.id} value={member.org_id}>
                            {member.orgs?.name}
                        </SelectItem>
                    ))}

                    <SelectItem value='new'>
                        <div className='items-center gap-1.5 flex'>
                            <PlusIcon size={16} />
                            <p>Create New</p>
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>

        </div>
    )
}

export default OrgSelector