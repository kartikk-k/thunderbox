import Image from "next/image";
import Logo from "@/assets/logo.svg";
import Editor from "@/components/Editor";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

async function EditorPage({
    searchParams,
  }: {
    searchParams?: { projectId?: string | undefined };
  }) {

    if(!searchParams?.projectId?.trim() || searchParams?.projectId === 'undefined') redirect('/projects')

    const supabase = createClient();
    const files = await supabase.from('files')
        .select('*')
        .eq('project', searchParams?.projectId)
    

  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between p-4 border-b h-14 border-border">
        <Image src={Logo} alt="ThunderBox" />

        {/* <button className="flex text-sm items-center gap-2 p-4 h-9 hover:brightness-110 text-[#19B785] bg-[#1B3634] rounded-full">
          Push to production
        </button> */}
      </div>

      <Editor 
        projectId={searchParams?.projectId}
        files={files.data || []}
      />
    </div>
  );
}

export default EditorPage;
