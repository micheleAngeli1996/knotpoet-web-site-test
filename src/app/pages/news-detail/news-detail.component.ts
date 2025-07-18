import { Component, type OnInit, type OnDestroy, inject } from "@angular/core"
import { ActivatedRoute, Router, RouterModule } from "@angular/router"
import { NewsService, NewsItem } from "../../services/news.service"
import { SeoService } from "../../services/seo.service"
import { DatePipe } from "@angular/common"

@Component({
  selector: "app-news-detail",
  imports: [DatePipe, RouterModule],
  template: `
  @if(article) {
    <div class="container mx-auto px-4 py-20">
      <div class="max-w-4xl mx-auto">
        <a
          routerLink="/news"
          class="inline-flex items-center text-white/60 hover:text-white transition-colors mb-8"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to News
        </a>

        <article class="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
          @if(article.image) {
            <div class="relative h-64 md:h-96">
              <img [src]="article!.image" [alt]="article.imageAlt" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          }

          <div class="p-8">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 class="text-3xl md:text-5xl font-thin text-white/90 mb-4 md:mb-0 leading-tight">
                {{ article.title }}
              </h1>
              <time class="text-white/60 text-sm">{{ article.date | date:'longDate' }}</time>
            </div>

            <div class="text-white/70 text-lg leading-relaxed space-y-6">
              <div [innerHTML]="article.content"></div>
            </div>
          </div>
        </article>

        <div class="mt-12 text-center">
          <a
            routerLink="/news"
            class="inline-flex items-center px-6 py-3 bg-white/10 border border-white/30 text-white hover:bg-white/20 rounded-md transition-colors"
          >
            View All News
          </a>
        </div>
      </div>
    </div>
  }
  @else {
    <div class="container mx-auto px-4 py-20 text-center">
      <h1 class="text-4xl font-thin text-white/90 mb-4">Article Not Found</h1>
      <p class="text-white/70 mb-8">The article you're looking for doesn't exist.</p>
      <a
        routerLink="/news"
        class="inline-flex items-center px-6 py-3 bg-white/10 border border-white/30 text-white hover:bg-white/20 rounded-md transition-colors"
      >
        Back to News
      </a>
    </div>
  }
  `,
})
export class NewsDetailComponent implements OnInit, OnDestroy {
  article: NewsItem | undefined
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private newsService = inject(NewsService);
  private seoService = inject(SeoService);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get("slug")
    if (slug) {
      this.article = this.newsService.getNewsBySlug(slug)

      if (this.article) {
        this.seoService.updateSeoData({
          title: `${this.article.title} - Knot Poet News`,
          description: this.article.excerpt,
          keywords: this.article.keywords?.join(", ") || "knot poet, news, dreaming metal",
          image: this.article.image || "/placeholder.svg?height=630&width=1200",
          url: `https://knotpoet.com/news/${this.article.slug}`,
          type: "article",
          author: "Knot Poet",
          publishedTime: this.article.date,
          modifiedTime: this.article.date,
        })

        // Add structured data for the article
        this.seoService.addStructuredData({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: this.article.title,
          description: this.article.excerpt,
          image: this.article.image,
          datePublished: this.article.date,
          dateModified: this.article.date,
          author: {
            "@type": "MusicGroup",
            name: "Knot Poet",
            url: "https://knotpoet.com",
          },
          publisher: {
            "@type": "Organization",
            name: "Knot Poet",
            logo: {
              "@type": "ImageObject",
              url: "https://knotpoet.com/logo.png",
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://knotpoet.com/news/${this.article.slug}`,
          },
        })
      } else {
        // Article not found, redirect to news page
        this.router.navigate(["/news"])
      }
    }
  }

  ngOnDestroy(): void {
    this.seoService.removeStructuredData()
  }
}
