"use client"

import React, { useEffect, useState } from 'react';
import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { thunderclap } from './themes/thunderclap';
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import useDebounce from './hooks/useDebounce';

interface props {
    value: string
    onValueChange: (val: string) => void
}

function CodeEditor({ value, onValueChange }: props) {

    const [code, setCode] = useState<string>(value)
    const debouncedCode = useDebounce(code, 1000)

    useEffect(() => {
        onValueChange(debouncedCode)
    }, [debouncedCode])

    const onChange = React.useCallback((val: any, viewUpdate: any) => {
        setCode(val);
    }, []);


    // const handleKeyDown = (e: React.KeyboardEvent) => {
    //     if ((e.metaKey || e.ctrlKey) && e.key === 's') {
    //         e.preventDefault()
    //     }
    // }

    return (
        <CodeMirror
            className='overflow-y-auto mb-[56px]'
            // onKeyDownCapture={handleKeyDown}
            value={code}
            onChange={onChange}
            theme={thunderclap}
            extensions={[
                basicSetup,
                javascript(),
                css(),
                html(),
            ]}
        />
    )
}

export default CodeEditor