/**
 * Extracts the YouTube video ID from various YouTube URL formats
 */
export function getYouTubeVideoId(url: string): string | null {
    if (!url) return null
  
    // Regular expressions to match different YouTube URL formats
    const patterns = [
      // youtu.be short link
      /youtu\.be\/([^/?&]+)/,
      // Standard watch URL
      /youtube\.com\/watch\?v=([^/?&]+)/,
      // Embed URL
      /youtube\.com\/embed\/([^/?&]+)/,
      // Any other URL with v= parameter
      /v=([^/?&]+)/,
    ]
  
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return match[1]
      }
    }
  
    return null
  }
  
  