import React from 'react'
import Image from 'next/image'
import Logo from '@/assets/logo.svg'
import { ArrowUpDownIcon, MembersIcon, ProjectIcon, SettingsIcon, WorkspaceIcon } from '@/assets/icons'
import Link from 'next/link'

function Sidebar() {
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
                        <Link href={''} className='flex gap-3 items-center text-[#BCC7CE]'>
                            <ProjectIcon />
                            <p>Projects</p>
                        </Link>
                    </li>
                    <li>
                        <Link href={''} className='flex items-center gap-3'>
                            <MembersIcon />
                            <p>Members</p>
                        </Link>
                    </li>
                    <li>
                        <Link href={''} className='flex items-center gap-3'>
                            <SettingsIcon />
                            <p>Settings</p>
                        </Link>
                    </li>
                    <li>
                        <Link href={''} className='flex items-center gap-3'>
                            <WorkspaceIcon />
                            <p>Workspaces</p>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className='p-1.5 rounded-full cursor-pointer flex items-center gap-2 bg-[#23292D]'>
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
            </div>
        </div>
    )
}

export default Sidebar