"use client"

import { useState } from "react"
import { Download } from "lucide-react"

interface DownloadButtonProps {
  imageUrl: string
  filename?: string
  className?: string
}

export default function DownloadButton({
  imageUrl,
  filename = "image",
  className = "",
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    try {
      setIsDownloading(true)

      // Fetch the image
      const response = await fetch(imageUrl)

      if (!response.ok) {
        throw new Error(`Failed to download: ${response.status} ${response.statusText}`)
      }

      // Convert to blob
      const blob = await response.blob()

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob)

      // Create a temporary link element
      const link = document.createElement("a")
      link.href = url

      // Set the download attribute with filename
      const extension = blob.type.split("/")[1] || "png"
      link.download = `${filename}.${extension}`

      // Append to body, click, and clean up
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Release the blob URL
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <button onClick={handleDownload} disabled={isDownloading} className={className}>
      <Download className="h-[28px] w-[28px]" color="black" />
      {isDownloading ? "Downloading..." : ""}
    </button>
  )
}

