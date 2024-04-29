import React from "react";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import Link from "next/link";
import {
  AddFileIcon,
  FileIcon,
  JavascriptIcon,
  LinkIcon,
} from "@/assets/icons";
import CodeEditor from "@/components/Editor";

function EditorPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between p-4 border-b h-14 border-border">
        <Image src={Logo} alt="ThunderBox" />

        <button className="flex text-sm items-center gap-2 p-4 pl-3 h-9 hover:brightness-110 text-[#19B785] bg-[#1B3634] rounded-full">
          Push to production
        </button>
      </div>

      <div className="flex h-full text-sm">
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
            {/* active file */}
            <div className="text-[#19B785] bg-[#1B3634] p-4 border-x-4 group border-r-transparent border-l-[#19B785] h-9 w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileIcon />
                <p>index.js</p>
              </div>
              <button className="">
                <LinkIcon />
              </button>
            </div>
            {/* other files */}
            <div className="text-[#8D9AA3] p-4 border-x-4 group border-transparent h-9 w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileIcon />
                <p>script.js</p>
              </div>
              <button className="hidden group-hover:block">
                <LinkIcon />
              </button>
            </div>
          </div>
        </div>

        {/* code editor */}
        <div className="flex flex-col w-full">
          <div className="flex items-center h-10 bg-border shrink-0">
            <div className="border-r border-[#2C343B] px-4 h-full flex items-center">
              <div className="flex items-center gap-2">
                <JavascriptIcon />
                <p>index.js</p>
              </div>

              <span className="w-2 h-2 ml-6 bg-gray-400 rounded-full" />
            </div>
          </div>

          <CodeEditor />
        </div>
      </div>
    </div>
  );
}

export default EditorPage;
