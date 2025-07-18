import { Component, inject } from '@angular/core';
import { BandMember, BandMembersService } from '../../services/band-members.service';
import { SeoService } from '../../services/seo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [],
  template: `
   <div class="container mx-auto px-4 py-20">
      <div class="max-w-6xl mx-auto">
        <h1>About</h1>

        <!-- Hero Section -->
        <div class="mb-16 text-center">
          <div class="space-y-8 text-white/70 text-lg leading-relaxed max-w-4xl mx-auto">
            <p>
              Knot Poet emerges from the depths of cosmic consciousness, weaving intricate soundscapes that blur the
              boundaries between dream and reality. Our music explores the liminal spaces where metal meets the
              ethereal.
            </p>
          </div>
        </div>

        <!-- Band Story Section -->
        <section class="mb-20">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-3xl font-light text-white/90 mb-6">The Journey Begins</h2>
              <div class="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Born from a vision of transcendent heavy music, Knot Poet crafts sonic experiences that transport
                  listeners through celestial realms while maintaining the raw power and intensity that defines our
                  metallic core.
                </p>
                <p>
                  Each composition is a journey through the vast expanse of human emotion, channeled through crushing
                  riffs, atmospheric passages, and otherworldly melodies that speak to the soul's deepest yearnings.
                </p>
                <p>
                  Our sound draws inspiration from the cosmos itself - the birth and death of stars, the silence between
                  galaxies, and the infinite dance of celestial bodies across the void.
                </p>
              </div>
            </div>
            <div class="relative">
              <img
                src="/img/members/band.png"
                alt="Band members"
                class="w-full h-80 object-cover rounded-lg"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg"></div>
            </div>
          </div>
        </section>

       <!-- Band Members Section -->
        <section class="mb-20">
          <h2 class="text-3xl font-light text-white/90 mb-12 text-center">The Cosmic Collective</h2>
          <div class="flex flex-wrap justify-center gap-8">
            @for(member of bandMembers; track member.id) {
              <div
                class="max-w-[350px] bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-colors cursor-pointer"
                (click)="navigateToMember(member.id)"
              >
                <div class="mb-4">
                  <img
                    [src]="member.image"
                    [alt]="member.imageAlt"
                    class="w-full h-48 object-cover rounded-lg mb-4"
                  />
                </div>
                <div class="flex items-center mb-3">
                  <span class="text-2xl mr-3">{{ member.roleIcon }}</span>
                  <div>
                    <h3 class="text-xl font-light text-white/90">{{ member.name }}</h3>
                    <p class="text-purple-400 text-sm">{{ member.role }}</p>
                  </div>
                </div>
                <p class="text-white/70 text-sm leading-relaxed">{{ member.shortDescription }}</p>
                <div class="mt-4 text-purple-400 hover:text-purple-300 transition-colors text-sm">
                  Learn more →
                </div>
              </div>
            }
          </div>
        </section>

        <!-- Musical Evolution Section -->
        <section class="mb-20">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="lg:order-2">
              <h2 class="text-3xl font-light text-white/90 mb-6">Musical Evolution</h2>
              <div class="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Our evolution as artists has been guided by a constant quest to push beyond conventional boundaries.
                  We've incorporated elements from ambient music, post-rock, and even field recordings from space
                  missions.
                </p>
                <p>
                  The integration of synthesizers and atmospheric textures with traditional metal instrumentation
                  creates a unique sonic palette that defines our approach to "dreaming metal."
                </p>
                <p>
                  Each album represents a different phase of our cosmic journey, exploring themes of consciousness,
                  transcendence, and the interconnectedness of all existence.
                </p>
              </div>
            </div>
            <div class="lg:order-1 relative">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Recording equipment and synthesizers in a cosmic-themed studio"
                class="w-full h-80 object-cover rounded-lg"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg"></div>
            </div>
          </div>
        </section>

        <!-- Live Experience Section -->
        <section class="mb-20">
          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-3xl font-light text-white/90 mb-6">Live Experience</h2>
              <div class="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Our live performances are immersive experiences that transport audiences beyond the physical realm. We
                  utilize cutting-edge visual technology, including LED installations and projection mapping.
                </p>
                <p>
                  Each show is carefully crafted to create a journey through different emotional and spiritual
                  landscapes, with extended instrumental sections that allow for deep contemplation and transcendence.
                </p>
                <p>
                  The integration of visual art, lighting design, and spatial audio creates an environment where music
                  becomes a gateway to altered states of consciousness.
                </p>
              </div>
            </div>
            <div class="relative">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Live performance with cosmic stage lighting and ethereal atmosphere"
                class="w-full h-80 object-cover rounded-lg"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg"></div>
            </div>
          </div>
        </section>

        <!-- Philosophy Cards -->
        <div class="grid md:grid-cols-2 gap-8 mb-16">
          <div class="bg-white/5 backdrop-blur-sm rounded-lg p-8">
            <div class="mb-4">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Abstract representation of musical philosophy with cosmic elements"
                class="w-full h-32 object-cover rounded-lg mb-4"
              />
            </div>
            <h3 class="text-xl font-light text-white/90 mb-4">Musical Philosophy</h3>
            <p class="text-white/70">
              We believe music is a conduit for transcendence, a bridge between the physical and metaphysical realms.
              Our approach combines technical precision with emotional depth, creating soundscapes that resonate with
              the fundamental frequencies of existence.
            </p>
          </div>

          <div class="bg-white/5 backdrop-blur-sm rounded-lg p-8">
            <div class="mb-4">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Artistic vision represented through cosmic imagery and sound waves"
                class="w-full h-32 object-cover rounded-lg mb-4"
              />
            </div>
            <h3 class="text-xl font-light text-white/90 mb-4">Artistic Vision</h3>
            <p class="text-white/70">
              Drawing inspiration from cosmic phenomena and human consciousness, we create immersive soundscapes that
              challenge conventional boundaries of heavy music. Our vision extends beyond entertainment to spiritual and
              emotional transformation.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './about.css'
})
export class About {
  private seoService = inject(SeoService);
  private bandMembersService = inject(BandMembersService)
  private router = inject(Router);
  
  bandMembers: BandMember[] = [];

  ngOnInit(): void {
    this.bandMembers = this.bandMembersService.getAllMembers()

    this.seoService.updateSeoData({
      title: "About Knot Poet - The Story Behind Dreaming Metal",
      description:
        "Learn about Knot Poet's journey from cosmic consciousness to dreaming metal. Discover our musical philosophy, artistic vision, and meet the band members behind our ethereal heavy sound.",
      keywords:
        "knot poet about, band story, dreaming metal philosophy, cosmic consciousness, ethereal metal, musical evolution, band members",
      image: "/placeholder.svg?height=630&width=1200",
      url: "https://knotpoet.com/about",
      type: "website",
      author: "Knot Poet",
    })

    // Add structured data for the about page
    this.seoService.addStructuredData({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Knot Poet",
      description:
        "Learn about Knot Poet's journey from cosmic consciousness to dreaming metal and meet the band members.",
      mainEntity: {
        "@type": "MusicGroup",
        name: "Knot Poet",
        genre: "Dreaming Metal",
        description:
          "Cosmic metal band exploring the boundaries between heavy music and ethereal soundscapes through dreaming metal.",
        foundingDate: "2018",
        url: "https://knotpoet.com",
        member: this.bandMembers.map((member) => ({
          "@type": "Person",
          name: member.name,
          jobTitle: member.role,
          description: member.shortDescription,
        })),
      },
    })
  }

  navigateToMember(memberId: string): void {
    this.router.navigate(['/band', memberId]);
  }
}
