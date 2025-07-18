import { Component, type OnInit, type OnDestroy, inject } from "@angular/core"
import { ActivatedRoute, Router, RouterModule } from "@angular/router"

import { SeoService } from "../../services/seo.service"
import { BandMember, BandMembersService } from "../../services/band-members.service"

@Component({
  selector: "app-band-member-detail",
  imports: [RouterModule],
  template: `
  @if(member) {
    <div class="container mx-auto px-4 py-20">
      <div class="max-w-4xl mx-auto">
        <a
          routerLink="/about"
          class="inline-flex items-center text-white/60 hover:text-white transition-colors mb-8"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to About
        </a>

        <div class="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
          <!-- Hero Image -->
          <div class="relative h-64 md:h-96">
            <img [src]="member.image" [alt]="member.imageAlt" class="w-full h-full object-cover {{member.id === 'fede' ? 'object-center': 'object-top'}}" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div class="absolute bottom-8 left-8 right-8">
              <div class="flex items-center mb-4">
                <span class="text-4xl mr-4">{{ member.roleIcon }}</span>
                <div>
                  <h1 class="text-4xl md:text-6xl font-thin text-white/90 mb-2">{{ member.name }}</h1>
                  <p class="text-purple-400 text-xl">{{ member.role }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-8">
            <!-- Bio Section -->
            <div class="mb-12">
              <h2 class="text-2xl font-light text-white/90 mb-6">Biography</h2>
              <div class="text-white/70 text-lg leading-relaxed space-y-6">
                <div [innerHTML]="member.longDescription"></div>
              </div>
            </div>

            <!-- Details Grid -->
            <div class="grid md:grid-cols-2 gap-8 mb-12">
              <!-- Personal Info -->
              <div class="bg-white/5 backdrop-blur-sm rounded-lg p-6">
                <h3 class="text-xl font-light text-white/90 mb-4 flex items-center">
                  <span class="mr-2">📍</span>
                  Personal Info
                </h3>
                <div class="space-y-3 text-white/70">
                  @if(member.birthPlace) {
                    <div>
                      <span class="text-white/50 text-sm">Origin:</span>
                      <p>{{ member.birthPlace }}</p>
                    </div>
                  }
                  <div>
                    <span class="text-white/50 text-sm">Years Active:</span>
                    <p>{{ member.yearsActive }}</p>
                  </div>
                  <div>
                    <span class="text-white/50 text-sm">Role:</span>
                    <p class="flex items-center">
                      <span class="mr-2">{{ member.roleIcon }}</span>
                      {{ member.role }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Influences -->
              <div class="bg-white/5 backdrop-blur-sm rounded-lg p-6">
                <h3 class="text-xl font-light text-white/90 mb-4 flex items-center">
                  <span class="mr-2">🎵</span>
                  Influences
                </h3>
                <div class="space-y-2">
                  @for(influence of member.influences; track influence) {
                    <div class="text-white/70">
                      • {{ influence }}
                    </div>
                  }
                </div>
              </div>
            </div>

            <!-- Equipment Section -->
             @if(member.equipment && member.equipment.length > 0) {
               <div class="mb-12">
                 <div class="bg-white/5 backdrop-blur-sm rounded-lg p-6">
                   <h3 class="text-xl font-light text-white/90 mb-4 flex items-center">
                     <span class="mr-2">🎛️</span>
                     Equipment & Gear
                   </h3>
                   <div class="grid md:grid-cols-2 gap-4">
                     @for(item of member.equipment; track item) {
                       <div class="text-white/70">
                         • {{ item }}
                       </div>
                     }
                   </div>
                 </div>
               </div>
             }

            <!-- Social Media -->
             @if(member.socialMedia) {
               <div class="text-center">
                 <h3 class="text-xl font-light text-white/90 mb-4">Connect</h3>
                 <div class="flex justify-center space-x-6">
                   @if(member.socialMedia.instagram) {
                       <a
                       [href]="'https://instagram.com/' + member.socialMedia.instagram.replace('@', '')"
                       target="_blank"
                       class="text-white/60 hover:text-white transition-colors flex items-center"
                       >
                       <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                         <path
                         d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                         />
                       </svg>
                       {{ member.socialMedia.instagram }}
                     </a>
                   }
                   @if(member.socialMedia.twitter) {
                     <a
                       [href]="'https://twitter.com/' + member.socialMedia.twitter.replace('@', '')"
                       target="_blank"
                       class="text-white/60 hover:text-white transition-colors flex items-center"
                       >
                       <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                         <path
                         d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                         />
                       </svg>
                       {{ member.socialMedia.twitter }}
                     </a>
                   }
                 </div>
               </div>
             }
          </div>
        </div>

        <div class="mt-12 text-center">
          <a
            routerLink="/about"
            class="inline-flex items-center px-6 py-3 bg-white/10 border border-white/30 text-white hover:bg-white/20 rounded-md transition-colors"
          >
            View All Members
          </a>
        </div>
      </div>
    </div>
  }

    @else {
      <div class="container mx-auto px-4 py-20 text-center">
        <h1 class="text-4xl font-thin text-white/90 mb-4">Member Not Found</h1>
        <p class="text-white/70 mb-8">The band member you're looking for doesn't exist.</p>
        <a
        routerLink="/about"
        class="inline-flex items-center px-6 py-3 bg-white/10 border border-white/30 text-white hover:bg-white/20 rounded-md transition-colors"
        >
        Back to About
      </a>
    </div>
  }
  `,
})
export class BandMemberDetailComponent implements OnInit, OnDestroy {
  member: BandMember | undefined
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private bandMembersService = inject(BandMembersService);
  private seoService = inject(SeoService);

  ngOnInit(): void {
    const memberId = this.route.snapshot.paramMap.get("id")
    if (memberId) {
      this.member = this.bandMembersService.getMemberById(memberId)

      if (this.member) {
        this.seoService.updateSeoData({
          title: `${this.member.name} - ${this.member.role} | Knot Poet`,
          description: this.member.shortDescription,
          keywords: `${this.member.name}, ${this.member.role}, knot poet, dreaming metal, band member`,
          image: this.member.image,
          url: `https://knotpoet.com/band/${this.member.id}`,
          type: "profile",
          author: "Knot Poet",
        })

        // Add structured data for the band member
        this.seoService.addStructuredData({
          "@context": "https://schema.org",
          "@type": "Person",
          name: this.member.name,
          jobTitle: this.member.role,
          description: this.member.shortDescription,
          image: this.member.image,
          birthPlace: this.member.birthPlace,
          memberOf: {
            "@type": "MusicGroup",
            name: "Knot Poet",
            url: "https://knotpoet.com",
          },
          sameAs: this.member.socialMedia?.instagram
            ? [`https://instagram.com/${this.member.socialMedia.instagram.replace("@", "")}`]
            : [],
        })
      } else {
        // Member not found, redirect to about page
        this.router.navigate(["/about"])
      }
    }
  }

  ngOnDestroy(): void {
    this.seoService.removeStructuredData()
  }
}
