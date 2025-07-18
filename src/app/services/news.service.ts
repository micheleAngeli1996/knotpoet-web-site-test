import { Injectable } from "@angular/core"

export interface NewsItem {
  slug: string
  date: string
  title: string
  excerpt: string
  content: string
  image?: string
  imageAlt?: string
  keywords?: string[]
}

@Injectable({
  providedIn: "root",
})
export class NewsService {
  private newsItems: NewsItem[] = [
    {
      slug: "cosmic-reverie-album-announced",
      date: "2025-01-15",
      title: 'New Album "Cosmic Reverie" Announced',
      excerpt:
        'We are thrilled to announce our upcoming album "Cosmic Reverie", a journey through the depths of space and consciousness.',
      content: `
        <p>After months of crafting sonic landscapes in the studio, we are ready to share our most ambitious work yet. "Cosmic Reverie" represents a new chapter in our artistic evolution, exploring themes of cosmic consciousness and the interconnectedness of all things.</p>
        
        <p>The album features eight tracks that take listeners on a journey through different dimensions of existence. From the crushing opener "Stellar Collapse" to the ethereal closing track "Infinite Drift," each song represents a different aspect of our cosmic exploration.</p>
        
        <p>We've incorporated new elements into our sound, including ambient synthesizers, field recordings from observatories, and even sounds captured from deep space radio telescopes. The result is our most atmospheric and immersive work to date.</p>
        
        <p>The album will be available on all major streaming platforms starting March 15th, 2025. Pre-orders begin February 1st, with special limited edition vinyl variants available exclusively through our website.</p>
      `,
      image: "/placeholder.svg?height=400&width=800",
      imageAlt: "Cosmic Reverie album artwork featuring swirling galaxies and nebulae",
      keywords: ["cosmic reverie", "new album", "dreaming metal", "space music", "ambient metal"],
    },
    {
      slug: "stellar-festival-performance",
      date: "2025-01-08",
      title: "Live Performance at Stellar Festival",
      excerpt: "Join us for an otherworldly performance at the Stellar Music Festival this spring.",
      content: `
        <p>We are excited to announce our participation in the Stellar Music Festival, taking place April 12-14, 2025, in the high desert of Nevada. This will be our first major festival appearance and our debut of the new cosmic stage production.</p>
        
        <p>Our performance will feature a completely reimagined stage setup, including a 360-degree LED dome that will display real-time visualizations synchronized with our music. We've partnered with visual artists and astronomers to create an immersive experience that truly captures the essence of our cosmic sound.</p>
        
        <p>The setlist will include tracks from our upcoming album "Cosmic Reverie" alongside reimagined versions of fan favorites from our previous releases. Expect extended instrumental sections and new arrangements that take full advantage of the festival's state-of-the-art sound system.</p>
        
        <p>Tickets are available now at stellarfestival.com. We'll be performing on the main stage Saturday night at 10 PM, under the desert stars.</p>
      `,
      image: "/placeholder.svg?height=400&width=800",
      imageAlt: "Stellar Festival stage setup with cosmic LED dome and desert landscape",
      keywords: ["stellar festival", "live performance", "cosmic stage", "nevada", "festival"],
    },
    {
      slug: "studio-sessions-behind-scenes",
      date: "2024-12-20",
      title: "Studio Sessions: Behind the Scenes",
      excerpt: "Take a glimpse into our creative process as we work on new material.",
      content: `
        <p>Our latest studio sessions have been pushing the boundaries of our sound, incorporating ambient textures with crushing metal foundations. We've been working at Nebula Studios, a remote facility nestled in the mountains, where the isolation and natural acoustics have profoundly influenced our creative process.</p>
        
        <p>The studio's unique setup includes a live room with a 30-foot ceiling and natural stone walls, creating reverb that we've never experienced before. We've been experimenting with recording techniques that capture not just our instruments, but the space itself as an instrument.</p>
        
        <p>One of the most exciting developments has been our collaboration with sound designer Luna Voss, who has helped us integrate field recordings and synthesized textures that complement our heavy foundation. We've recorded everything from wind through mountain caves to the subtle hum of distant radio telescopes.</p>
        
        <p>The sessions have yielded material that will appear on "Cosmic Reverie" and have opened new creative pathways for future projects. We'll be sharing more behind-the-scenes content and studio footage in the coming weeks.</p>
      `,
      image: "/placeholder.svg?height=400&width=800",
      imageAlt: "Recording studio with mountain views and cosmic-themed equipment setup",
      keywords: ["studio sessions", "behind the scenes", "nebula studios", "recording process", "sound design"],
    },
  ]

  getAllNews(): NewsItem[] {
    return this.newsItems
  }

  getNewsBySlug(slug: string): NewsItem | undefined {
    return this.newsItems.find((item) => item.slug === slug)
  }
}
