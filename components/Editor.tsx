"use client"

import React, { useEffect, useState } from 'react';
import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { thunderclap } from './themes/thunderclap';
import CodeMirror from '@uiw/react-codemirror';

function CodeEditor() {

    const [code, setCode] = useState<string>('')
    const [savedCode, setSavedCode] = useState<string>('')


    const onChange = React.useCallback((val: any, viewUpdate: any) => {
        setCode(val);
    }, []);

    const saveFile = async () => {

    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 's') {
            e.preventDefault()
            saveFile()
        }
    }

    return (
        <CodeMirror
            className='overflow-y-auto mb-[56px]'
            onKeyDownCapture={handleKeyDown}
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