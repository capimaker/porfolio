const REEL_EMBED_URL = 'https://www.youtube-nocookie.com/embed/m7yQPP0U4fc'

export default function ReelApp() {
  return (
    <div className="flex h-full flex-col bg-black">
      <iframe
        src={REEL_EMBED_URL}
        title="Carlos Ramos Reel"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="min-h-0 w-full flex-1 border-0"
      />
    </div>
  )
}
