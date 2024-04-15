"use client"

import Avvvatars from 'avvvatars-react'
import React from 'react'

function Avatar({ value }: { value: string }) {
    return (
        <Avvvatars
            value={value}
            style="character"
            size={40}
        />
    )
}

export default Avatar