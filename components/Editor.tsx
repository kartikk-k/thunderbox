"use client"

import { AddFileIcon, CloseIcon, FileIcon, JavascriptIcon, LinkIcon } from '@/assets/icons'
import React, { useEffect } from 'react'
import CodeEditor from './CodeEditor'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'sonner'


interface props {
    projectId: string | undefined
    files: CodeFile[]
}

function Editor({ projectId, files }: props) {

    const [codeFiles, setCodeFiles] = React.useState<CodeFile[]>(files)
    const [activeFile, setActiveFile] = React.useState<CodeFile | null>(null)
    const [openFiles, setOpenFiles] = React.useState<CodeFile[]>([])

    const supabase = createClient()

    const handleClick = (file: CodeFile) => {
        setActiveFile(codeFiles.find(f => f.id === file.id) || null)
        const isExist = openFiles.find(f => f.id === file.id)
        if (isExist) return
        else setOpenFiles([...openFiles, file])
    }

    // useEffect(() => {
    //     setActiveFile(codeFiles.find(f => f.id === activeFile?.id) || null);
    // }, [codeFiles]);

    const handleCopyLink = (id: string) => {
        navigator.clipboard.writeText(`${window.location.origin}/editor?projectId=${projectId}&fileId=${id}`)
    }

    const handleFileChange = async (code: string) => {
        setCodeFiles(codeFiles.map(file => file.id === activeFile?.id ? { ...file, staging_code: code } : file))

        const { data, error } = await supabase.from('files')
            .update({ staging_code: code })
            .eq('id', activeFile?.id)
            .single()
    }

    const closeFile = (id: string) => {
        setActiveFile(null)
        const newFiles = openFiles.filter(file => file.id !== id)
        setOpenFiles(newFiles)
    }

    const pushToProduction = async () => {
        if (!activeFile) return
        const { data, error } = await supabase.from('files')
            .update({ production_code: activeFile.staging_code })
            .eq('id', activeFile.id)
            .single()

        if (error) return toast.error('Failed to push file to production')
        else toast.info('File pushed to production')
    }

    return (
        <div className="flex h-full text-sm">
            <button onClick={pushToProduction} className="flex absolute top-[10px] right-4 text-sm items-center gap-2 p-4 pl-3 h-9 hover:brightness-110 text-[#19B785] bg-[#1B3634] rounded-full">
                Push to production
            </button>
            {/* sidebar */}
            <div className="w-[280px] h-full shrink-0 border-r border-[#2C343B]">
                {/* header */}
                <div className="flex items-center justify-between h-10 p-4 bg-border">
                    <p>Files</p>
                    <button className="opacity-70 hover:opacity-100">
                        <AddFileIcon />
                    </button>
                </div>
                {/* files */}
                <div className="py-6 space-y-2">
                    {codeFiles.map(file => (
                        <div
                            key={file.id}
                            onClick={() => handleClick(file)}
                            className={`${activeFile?.id === file.id ? 'text-[#19B785] bg-[#1B3634] border-r-transparent border-l-[#19B785]' : 'text-[#8D9AA3] hover:bg-black/20'} p-4 border-x-4 group border-transparent h-9 w-full flex items-center justify-between`}
                        >
                            <div className="flex items-center gap-2">
                                <FileIcon />
                                <p>{file.name}</p>
                            </div>
                            <button onClick={() => handleCopyLink(file.id)} className={`${activeFile?.id === file.id ? 'block' : 'hidden'} group-hover:block`}>
                                <LinkIcon />
                            </button>
                        </div>
                    ))}
                    {/* active file */}
                    {/* <div className="text-[#19B785] bg-[#1B3634] p-4 border-x-4 group border-r-transparent border-l-[#19B785] h-9 w-full flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FileIcon />
                            <p>index.js</p>
                        </div>
                        <button className="">
                            <LinkIcon />
                        </button>
                    </div> */}
                </div>
            </div>

            {/* code editor */}
            {/* <Editor /> */}
            <div className="flex flex-col w-full">
                <div className="flex items-center h-10 bg-border shrink-0">
                    {openFiles.map(file => (
                        <div key={file.id} className="border-r border-[#2C343B] px-4 h-full flex items-center">
                            <div onClick={() => handleClick(file)} className="flex items-center gap-2">
                                <JavascriptIcon />
                                <p>{file.name}</p>
                            </div>

                            {/* <span className="w-2 h-2 ml-6 bg-gray-400 rounded-full" /> */}
                            <button onClick={() => closeFile(file.id)} className='h-4 ml-6 text-gray-400 hover:text-white'>
                                <CloseIcon />
                            </button>
                        </div>
                    ))}
                </div>

                {activeFile ? (
                    <CodeEditor
                        key={activeFile.id}
                        value={activeFile?.staging_code || ''}
                        onValueChange={handleFileChange}
                    />
                ) : (
                    <div className='flex items-center justify-center h-full text-gray-500'>
                        <p>Select file to edit code</p>
                    </div>
                )}
            </div>
        </div>

    )
}

export default Editor