import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { filename: string } }) {
  try {
    const filename = params.filename

    // For the standby video, we'll redirect to the Vercel Blob URL
    // After running the upload script, replace this URL with the actual blob URL
    const blobUrls: Record<string, string> = {
      "karen-standby-mode.mp4":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Make_this_image_202506121916_b01xf-eRPX4EIb4US2NejUvTa2tXtrby70qX.mp4", // Temporary - will be updated
    }

    const blobUrl = blobUrls[filename]

    if (!blobUrl) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    // Redirect to the blob URL
    return NextResponse.redirect(blobUrl)
  } catch (error) {
    console.error("Blob API error:", error)
    return NextResponse.json({ error: "Failed to serve file" }, { status: 500 })
  }
}
