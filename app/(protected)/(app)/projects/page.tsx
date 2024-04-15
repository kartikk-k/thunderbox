import { createClient } from "@/utils/supabase/server";
import { PlusIcon } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProtectedPage({
  searchParams,
}: {
  searchParams?: { orgId?: string | undefined };
}) {

  let orgId: string | undefined = searchParams?.orgId
  const supabase = createClient();

  const { data: { user }, } = await supabase.auth.getUser();

  if (!orgId?.trim() || orgId === 'undefined') {

    orgId = await supabase.from('members')
      .select("*").eq('user', user?.email)
      .single()
      .then(res => {
        if (res.error) return undefined
        else return redirect(`/projects?orgId=${res.data.org_id}`)
      })
  }

  if (!orgId) redirect('/orgs/new')


  // if everything is fine, continue with main logic

  const isMember = await supabase.from('members')
    .select('id')
    .eq('org_id', orgId)
    .eq('user', user?.email)
    .single()

  if (isMember.error) redirect('/orgs/new')

  const projects = await supabase.from('projects')
    .select('*')
    .eq('org_id', orgId)
    .then(res => {
      if (res.error) return []
      else return res.data
    })

  return (
    <div className="h-full p-6 space-y-14">

      <div className="flex items-center justify-between h-12">
        <h1 className="text-[#95A4B2] text-lg">Projects</h1>

        <Link href={`/projects/new?orgId=${orgId}`} className="flex items-center gap-2 p-4 pl-3 h-10 hover:brightness-110 text-[#19B785] bg-[#1B3634] rounded-full">
          <PlusIcon size={18} />
          Create Project
        </Link>
      </div>

      <div className="items-center gap-6 sm:grid lg:grid-cols-2 xl:grid-cols-3">

        {projects.length > 0 ? projects.map((project) => (

          <div key={project.id} className="bg-[#1D2226] w-full text-xs group flex flex-col justify-between h-32 p-4 rounded-3xl text-[#95A4B2]">
            <div className="flex justify-between ">
              <div className="space-y-1">
                <h1 className="text-base text-white">{project.name}</h1>
                <p>updated: {moment(project.updated_at).fromNow()}</p>
              </div>

              <svg className="relative left-0 duration-300 group-hover:brightness-150 group-hover:left-2" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.1614 14.6651L12.6797 10.097C12.536 9.97732 12.3612 9.90108 12.1758 9.8772C11.9903 9.85332 11.8019 9.88278 11.6326 9.96214C11.4633 10.0415 11.3201 10.1675 11.2198 10.3253C11.1196 10.4831 11.0663 10.6662 11.0664 10.8532V18.9491C11.0666 19.136 11.12 19.3189 11.2203 19.4766C11.3207 19.6342 11.4639 19.76 11.6331 19.8392C11.8024 19.9184 11.9907 19.9478 12.1761 19.9238C12.3614 19.8999 12.5361 19.8237 12.6797 19.7041L18.1614 15.1372C18.196 15.1084 18.2238 15.0723 18.2429 15.0315C18.262 14.9907 18.2719 14.9462 18.2719 14.9012C18.2719 14.8561 18.262 14.8116 18.2429 14.7708C18.2238 14.73 18.196 14.6939 18.1614 14.6651Z" fill="#434B52" />
              </svg>

            </div>

            <div className="flex items-center gap-4">
              <p>Javascript: {project.js_files_count}</p>
              <hr className="bg-[#313B42] rotate-90 w-4" />
              <p>CSS: {project.css_files_count}</p>
            </div>

          </div>

        )) : (
          <Link href={`/projects/new?orgId=${orgId}`} className="border-[#19B785] cursor-pointer brightness-75 border-2 bg-[#1B3634]  w-full group flex items-center justify-center h-32 p-4 rounded-3xl text-[#19B785]">
            Create New
          </Link>
        )}

      </div>

    </div>
  );
}
