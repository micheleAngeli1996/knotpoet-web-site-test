import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NewsItem, NewsService } from '../../services/news.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-news',
  imports: [DatePipe, RouterModule],
  template: `
    <div class="container mx-auto px-4 py-20">
      <div class="max-w-4xl mx-auto">
        <h1>News</h1>

        <div class="space-y-8">
          @for(item of newsItems; track item.slug) {
             <a
              [routerLink]="['/news', item.slug]"
              class="block bg-white/5 backdrop-blur-sm rounded-lg p-8 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <article>
                <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h2 class="text-2xl font-light text-white/90 mb-2 md:mb-0">{{ item.title }}</h2>
                  <time class="text-white/60 text-sm">{{ item.date | date:'longDate'}}</time>
                </div>

                <p class="text-white/70 text-lg mb-4 leading-relaxed">{{ item.excerpt }}</p>

                <div class="text-purple-400 hover:text-purple-300 transition-colors text-sm font-light">Read more →</div>
              </article>
            </a>
          }
        </div>

        <div class="mt-16 text-center">
          <p class="text-white/60">Stay connected for the latest updates on our cosmic journey.</p>
          <div class="mt-6">
            <button variant="outline" class="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './news.css'
})
export class News implements OnInit {
  private router = inject(Router);
  private newsService = inject(NewsService);
  private seoService = inject(SeoService);

  newsItems: NewsItem[] = []

  ngOnInit(): void {
    this.newsItems = this.newsService.getAllNews()

    this.seoService.updateSeoData({
      title: "News - Knot Poet | Latest Updates and Announcements",
      description:
        "Stay updated with the latest news from Knot Poet. Get the latest information about new albums, live performances, and behind-the-scenes content.",
      keywords: "knot poet news, band updates, new albums, live performances, cosmic metal news",
      image: "/placeholder.svg?height=630&width=1200",
      url: "https://knotpoet.com/news",
      type: "website",
      author: "Knot Poet",
    })

    // Add structured data for news articles
    const newsListStructuredData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Knot Poet News",
      description: "Latest news and updates from Knot Poet",
      itemListElement: this.newsItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          headline: item.title,
          description: item.excerpt,
          datePublished: item.date,
          author: {
            "@type": "MusicGroup",
            name: "Knot Poet",
          },
          url: `https://knotpoet.com/news/${item.slug}`,
        },
      })),
    }

    this.seoService.addStructuredData(newsListStructuredData)
  }

  goToDetail(newsItem: any) {
    this.router.navigate(['/news', newsItem.date]);
  }
}
