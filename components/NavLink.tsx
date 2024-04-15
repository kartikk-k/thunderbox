"use client"

import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function NavLink({href, children}: {href: string, children: React.ReactNode}) {

    const orgId = useSearchParams().get('orgId')

    return (
        <Link href={`${href}?orgId=${orgId}`} className={`flex gap-3 items-center text -[#BCC7CE]`}>
            {children}
        </Link>
    )
}

export default NavLink