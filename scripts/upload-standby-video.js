import { put } from "@vercel/blob"

async function uploadStandbyVideo() {
  try {
    console.log("📹 Downloading standby video from source...")

    // Fetch the video from the blob URL
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Make_this_image_202506121916_b01xf-eRPX4EIb4US2NejUvTa2tXtrby70qX.mp4",
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch video: ${response.statusText}`)
    }

    const videoBlob = await response.blob()
    console.log(`✅ Video downloaded: ${(videoBlob.size / 1024 / 1024).toFixed(2)} MB`)

    // Upload to Vercel Blob with a descriptive filename
    console.log("☁️ Uploading to Vercel Blob...")
    const blob = await put("karen-standby-mode.mp4", videoBlob, {
      access: "public",
      addRandomSuffix: false, // Keep consistent filename
    })

    console.log("🎉 Upload successful!")
    console.log("📍 Blob URL:", blob.url)
    console.log("📁 Download URL:", blob.downloadUrl)

    // Return the blob info for use in the app
    return {
      url: blob.url,
      downloadUrl: blob.downloadUrl,
      pathname: blob.pathname,
      size: blob.size,
    }
  } catch (error) {
    console.error("❌ Upload failed:", error)
    throw error
  }
}

// Execute the upload
uploadStandbyVideo()
  .then((result) => {
    console.log("\n🔧 Next steps:")
    console.log("1. Copy the Blob URL above")
    console.log("2. Update your hologram component to use this URL")
    console.log("3. The video is now served from Vercel Blob storage")
  })
  .catch((error) => {
    console.error("Script failed:", error)
  })
