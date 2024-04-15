import Image from 'next/image'
import Logo from '@/assets/logo.svg'
import { MembersIcon, ProjectIcon, SettingsIcon, WorkspaceIcon } from '@/assets/icons'
import Link from 'next/link'
import OrgSelector from './OrgSelector'
import { createClient } from '@/utils/supabase/server'
import NavLink from './NavLink'

async function Sidebar() {

    const supabase = createClient()
    const user = (await supabase.auth.getUser()).data.user
    
    const members = (await supabase.from('members')
        .select(`*, orgs(*)`)
        .eq('user', (user!.email as string))
    ).data || []

    return (
        <div className='flex flex-col justify-between h-full p-6'>
            <div className='space-y-14'>
                <div className='flex items-center h-12'>
                    <Image
                        src={Logo}
                        alt='ThunderBox'
                    />
                </div>

                <ul className='space-y-6 text-[#737E86]'>
                    <li>
                        <NavLink href={'/projects'}>
                            <ProjectIcon />
                            <p>Projects</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href={'/members'}>
                            <MembersIcon />
                            <p>Members</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href={''}>
                            <SettingsIcon />
                            <p>Settings</p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href={''}>
                            <WorkspaceIcon />
                            <p>Workspaces</p>
                        </NavLink>
                    </li>
                </ul>
            </div>

            <OrgSelector
                members={members}
            />

            {/* <div className='p-1.5 rounded-full cursor-pointer flex items-center gap-2 bg-[#23292D]'>
                <div className='w-10 h-10 shrink-0 rounded-full bg-[#49555F] text-[#94A3AF] flex items-center justify-center font-semibold'>
                    TC
                </div>
                <div className='flex items-center justify-between w-full pr-2'>
                    <div>
                        <p>Thunderclap</p>
                        <p className='text-xs text-[#737E86]'>admin</p>
                    </div>
                    <button className='text-[#546068] scale-110'>
                        <ArrowUpDownIcon />
                    </button>
                </div>
            </div> */}
        </div>
    )
}

export default Sidebar