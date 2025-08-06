import { Component, inject, OnInit } from '@angular/core';
import { BandMember, BandMembersService } from '../../services/band-members.service';
import { NewsService } from '../../services/news.service';
import { SeoService } from '../../services/seo.service';
import { map, Observable } from 'rxjs';
import { NewsItem } from '../../models/News';
import { RouterModule } from '@angular/router';
import { AsyncPipe, DatePipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterModule, AsyncPipe, NgOptimizedImage, DatePipe],
  template: `
    <section class="flex items-center justify-center min-h-screen px-4 relative">
      <div class="text-center">
        <!--Logo-->
        <div class="flex flex-col items-center justify-center text-center filter-text">
          <div class="relative mb-3">
            <img
              priority
              src="img/logos/logo_plain_white_hd.png"
              alt="Band members"
              class="w-full h-80 object-cover rounded-lg"
              width="200" height="142"/>
          </div>

          <div class="text-white/70 text-lg md:text-xl lg:text-2xl font-light tracking-[0.3em] uppercase">
            Dreaming Metal
          </div>
        </div>

        <div class="mt-12 animate-fade-in">
          <p class="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Exploring the boundaries between heavy music and ethereal soundscapes through cosmic consciousness and
            dreaming metal.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              routerLink="/about"
              class="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-md transition-colors"
            >
              Discover Our Journey
            </a>
            <a
              routerLink="/news"
              class="px-8 py-3 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-400/30 text-white rounded-md transition-colors"
            >
              Latest News
            </a>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
    </section>

    <!-- Latest News Section -->
    <section class="py-20 px-4">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-thin text-white/90 mb-4 tracking-wide">Latest from the Cosmos</h2>
          <p class="text-white/60 text-lg max-w-2xl mx-auto">
            Stay updated with our latest releases, performances, and cosmic explorations
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          @for (article of latestNews$ | async; track $index) {
            <article
              class="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 cursor-pointer group"
              [routerLink]="'/news/'+ article.id"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  src="{{article.image || 'img/news/news_placeholder.png'}}"
                  [alt]="article.imageAlt || article.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  fill/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div class="absolute bottom-4 left-4 right-4">
                  <time class="text-white/60 text-sm">{{ article.date | date:'mediumDate' }}</time>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-light text-white/90 mb-3 group-hover:text-white transition-colors">
                  {{ article.title }}
                </h3>
                <p class="text-white/70 text-sm leading-relaxed mb-4">{{ article.excerpt }}</p>
                <div class="text-purple-400 group-hover:text-purple-300 transition-colors text-sm">Read more →</div>
              </div>
            </article>
          }
        </div>

        <div class="text-center">
          <a
            routerLink="/news"
            class="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-md transition-colors"
          >
            View All News
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Band Members Preview -->
    <section class="py-20 px-4 bg-white/5">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-thin text-white/90 mb-4 tracking-wide">The Cosmic Collective</h2>
          <p class="text-white/60 text-lg max-w-2xl mx-auto">
            Meet the visionaries behind our dreaming metal soundscapes
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          @for (member of bandMembers$ | async; track $index) {
            <div
              class="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/10 transition-all duration-300 cursor-pointer group"
              [routerLink]="'/band/' + member.id"
            >
              <div class="relative mb-4">
                <img
                  src="{{member.image}}"
                  [alt]="member.imageAlt"
                  width="160" height="160"
                  class="w-20 h-20 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"/>
                <div
                  class="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-600/80 rounded-full flex items-center justify-center text-sm"
                >
                  <img
                    src="{{member.roleIcon}}"
                    alt="{{member.roleIcon}}"
                    width="20" height="20"
                    class="rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"/>
                </div>
              </div>
              <h3 class="text-lg font-light text-white/90 mb-1 group-hover:text-white transition-colors">
                {{ member.name }}
              </h3>
              <p class="text-purple-400 text-sm mb-3">{{ member.role }}</p>
              <div class="text-purple-400 group-hover:text-purple-300 transition-colors text-xs">Learn more →</div>
            </div>
          }
        </div>

        <div class="text-center">
          <a
            routerLink="/about"
            class="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-md transition-colors"
          >
            Meet the Band
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- About Preview -->
    <section class="py-20 px-4">
      <div class="container mx-auto max-w-6xl">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-3xl md:text-5xl font-thin text-white/90 mb-6 tracking-wide">Our Cosmic Journey</h2>
            <div class="space-y-6 text-white/70 text-lg leading-relaxed">
              <p>
                Born from a vision of transcendent heavy music, Knot Poet crafts sonic experiences that transport
                listeners through celestial realms while maintaining the raw power and intensity that defines our
                metallic core.
              </p>
              <p>
                We explore the liminal spaces where metal meets the ethereal, drawing inspiration from cosmic phenomena
                and human consciousness to create immersive soundscapes that challenge conventional boundaries.
              </p>
            </div>
            <div class="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                routerLink="/about"
                class="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-md transition-colors"
              >
                Our Story
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
              <a
                routerLink="/contact"
                class="inline-flex items-center px-6 py-3 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-400/30 text-white rounded-md transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>
          <div class="relative">
            <img
              ngSrc="img/home/members_studio.png"
              alt="Knot Poet band members in cosmic studio setting"
              class="w-full h-96 object-cover rounded-lg"
              height="1024" width="1024"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg"></div>
            <div class="absolute bottom-6 left-6 right-6">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-white text-sm font-light">Watch our latest</p>
                  <p class="text-white/80 text-xs">Studio Session</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Music Philosophy -->
    <section class="py-20 px-4 bg-white/5">
      <div class="container mx-auto max-w-4xl text-center">
        <h2 class="text-3xl md:text-5xl font-thin text-white/90 mb-8 tracking-wide">Dreaming Metal</h2>
        <p class="text-white/70 text-xl leading-relaxed mb-12 max-w-3xl mx-auto">
          "We believe music is a conduit for transcendence, a bridge between the physical and metaphysical realms. Our
          approach combines technical precision with emotional depth, creating soundscapes that resonate with the
          fundamental frequencies of existence."
        </p>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-light text-white/90 mb-2">Cosmic Consciousness</h3>
            <p class="text-white/60 text-sm">Exploring the depths of universal awareness through sound</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-light text-white/90 mb-2">Ethereal Power</h3>
            <p class="text-white/60 text-sm">Balancing crushing intensity with atmospheric beauty</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-light text-white/90 mb-2">Emotional Transcendence</h3>
            <p class="text-white/60 text-sm">Creating pathways to higher states of being</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 px-4">
      <div class="container mx-auto max-w-4xl text-center">
        <h2 class="text-3xl md:text-5xl font-thin text-white/90 mb-6 tracking-wide">Join Our Cosmic Journey</h2>
        <p class="text-white/60 text-lg mb-12 max-w-2xl mx-auto">
          Stay connected with our latest releases, live performances, and explorations into the depths of dreaming
          metal.
        </p>

        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <div class="flex space-x-4">
            <a
              href="https://instagram.com/knotpoet_"
              target="_blank"
              class="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors group"
              aria-label="Follow on Instagram"
            >
              <svg class="w-5 h-5 text-white/60 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </svg>
            </a>
            <a
              href="https://facebook.com/knotpoet"
              target="_blank"
              class="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors group"
              aria-label="Follow on Facebook"
            >
              <svg class="w-5 h-5 text-white/60 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </a>
            <a
              href="https://spotify.com/artist/knotpoet"
              target="_blank"
              class="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors group"
              aria-label="Listen on Spotify"
            >
              <svg class="w-5 h-5 text-white/60 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"
                />
              </svg>
            </a>
            <a
              href="https://youtube.com/knotpoet"
              target="_blank"
              class="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors group"
              aria-label="Subscribe on YouTube"
            >
              <svg class="w-5 h-5 text-white/60 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                />
              </svg>
            </a>
          </div>

          <div class="text-white/40">|</div>

          <a
            routerLink="/contact"
            class="px-8 py-3 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-400/30 text-white rounded-md transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .animate-fade-in {
        animation: fadeIn 1s ease-out 0.5s both;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ]
})
export class Home implements OnInit {
  private seoService = inject(SeoService);
  private newsService = inject(NewsService)
  private membersService = inject(BandMembersService);

  latestNews$ = new Observable<NewsItem[]>();
  bandMembers$ = new Observable<BandMember[]>();


  ngOnInit(): void {
    // Get latest 3 news items
    this.latestNews$ = this.newsService.getNews().pipe(map(news => news.slice(0, 3)));
    this.bandMembers$ = this.membersService.getAllMembers();

    this.seoService.updateSeoData({
      title: "Knot Poet - Dreaming Metal | Official Website",
      description:
        "Official website of Knot Poet, the cosmic metal band exploring the boundaries between heavy music and ethereal soundscapes. Experience dreaming metal through cosmic consciousness.",
      keywords: "knot poet, dreaming metal, cosmic metal, ambient metal, space music, heavy music, ethereal metal",
      image: "/placeholder.svg?height=630&width=1200",
      url: "https://knotpoet.com",
      type: "website",
      author: "Knot Poet",
    })

    this.bandMembers$.subscribe(members => {
      // Add structured data for the band
      this.seoService.addStructuredData({
        "@context": "https://schema.org",
        "@type": "MusicGroup",
        name: "Knot Poet",
        genre: "Dreaming Metal",
        description:
          "Cosmic metal band exploring the boundaries between heavy music and ethereal soundscapes through dreaming metal.",
        url: "https://knotpoet.com",
        foundingDate: "2018",
        member: members.map((member) => ({
          "@type": "Person",
          name: member.name,
          jobTitle: member.role,
        })),
        sameAs: [
          "https://instagram.com/knotpoet",
          "https://facebook.com/knotpoet",
          "https://spotify.com/artist/knotpoet",
          "https://youtube.com/knotpoet",
        ],
      })
    });
  }
}
