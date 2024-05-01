import { createClient } from "@/utils/supabase/server"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    const fileId = req.nextUrl.searchParams.get('fileId')
    if (!fileId?.trim() || fileId === undefined) return Response.json({ message: 'file id not found' }, { status: 400 })

    const requestUrl = req.headers.get('referer')

    const isPreviewSite = requestUrl?.includes('webflow.io')

    const supabase = createClient()

    const { data, error } = await supabase.from('files')
        // .select(isPreviewSite ? 'staging_code' : 'production_code')
        .select('staging_code')
        .eq('id', fileId)
        .single()

    if (error) return Response.json({ message: error.message }, { status: 500 })
    // @ts-ignore
    else return new Response(isPreviewSite ? data.staging_code : data.staging_code)

}
