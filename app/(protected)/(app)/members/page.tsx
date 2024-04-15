import Avatar from "@/components/Avatar";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedPage({
  searchParams,
}: {
  searchParams?: { orgId?: string | undefined };
}) {

  let orgId: string | undefined = searchParams?.orgId
  if (!orgId) redirect('/projects')

  const supabase = createClient();
  const { data: { user }, } = await supabase.auth.getUser();

  // if everything is fine, continue with main logic

  const members = await supabase.from('members')
    .select(`*`)
    .eq('org_id', orgId)
    .then(res => {
      if (res.error) return []
      else return res.data
    })

  const isMember = members.find(member => member.user === user?.email)
  if (!isMember) redirect('/projects')

  const inviteMember = async (e: FormData) => {
    "use server";
    
    const headersList = headers();
    const currentPath = headersList.get('referer');
    
    const supabase = createClient()

    console.log("Triggered")
    const email = e.get('email')
    if (!email) return console.log('Email is required')

    const { data, error } = await supabase.from('members')
      .insert({
        org_id: orgId,
        user: email,
        role: 'member'
      })
      .select('*')

    console.log("💡",data, error)
    if (error) return console.log('Error inviting member' + error.message)
    // else refres
    console.log('Member invited')
    currentPath ? revalidatePath(currentPath, "layout") : null
  }

  return (
    <div className="h-full p-6 space-y-14">

      <div className="flex items-center justify-between h-12">
        <h1 className="text-[#95A4B2] text-lg">Members</h1>

        <span></span>
      </div>

      <div className="max-w-md space-y-20">

        <div className="space-y-3">
          <p className="text-[#84919A]">Add member</p>
          <form className="flex items-center gap-3">
            <input
              type="text"
              name="email"
              className='bg-[#1e2226] h-10 outline-none rounded-xl outline-3 focus:outline-[#1B3634] px-2 w-full'
            />
            <button
              formAction={inviteMember}
              className="w-32 shrink-0 h-10 hover:brightness-110 text-[#19B785] bg-[#1B3634] rounded-xl"
            >
              Invite
            </button>
          </form>
        </div>

        <div className="space-y-3">
          <p className="text-[#84919A]">Members</p>

          {/* members list */}
          <div className="space-y-5">

            {members.map(member => (
              <div key={member.id} className="flex items-center justify-between max-w-md">
                <div className="flex items-center gap-3">
                  <Avatar
                    value={member.user}
                  />
                  <div>
                    <p className="text-base">{member.user.split('@')[0]}</p>
                    <p className="text-[#737E86] text-[13px]">{member.user}</p>
                  </div>
                </div>
                <button formAction={inviteMember} className="h-10 px-6 w-32 rounded-xl bg-[#1D2226] text-[#808F99]">
                  {member.role === 'admin' ? 'Owner' : 'Member'}
                </button>
              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}
