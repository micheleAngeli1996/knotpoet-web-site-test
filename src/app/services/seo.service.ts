import { isPlatformBrowser } from "@angular/common"
import { inject, Injectable, PLATFORM_ID } from "@angular/core"
import { Title, Meta } from "@angular/platform-browser"

export interface SeoData {
  title: string
  description: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
}

@Injectable({
  providedIn: "root",
})
export class SeoService {
  private platformId = inject(PLATFORM_ID);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  updateSeoData(data: SeoData): void {
    // Update title
    this.titleService.setTitle(data.title);

    // Update basic meta tags
    this.metaService.updateTag({ name: "description", content: data.description });
    if (data.keywords) {
      this.metaService.updateTag({ name: "keywords", content: data.keywords });
    }
    if (data.author) {
      this.metaService.updateTag({ name: "author", content: data.author });
    }

    // Update Open Graph tags
    this.metaService.updateTag({ property: "og:title", content: data.title });
    this.metaService.updateTag({ property: "og:description", content: data.description });
    this.metaService.updateTag({ property: "og:type", content: data.type || "website" });
    if (data.image) {
      this.metaService.updateTag({ property: "og:image", content: data.image });
    }
    if (data.url) {
      this.metaService.updateTag({ property: "og:url", content: data.url });
    }
    if (data.publishedTime) {
      this.metaService.updateTag({ property: "article:published_time", content: data.publishedTime });
    }
    if (data.modifiedTime) {
      this.metaService.updateTag({ property: "article:modified_time", content: data.modifiedTime });
    }

    // Update Twitter Card tags
    this.metaService.updateTag({ name: "twitter:card", content: "summary_large_image" });
    this.metaService.updateTag({ name: "twitter:title", content: data.title });
    this.metaService.updateTag({ name: "twitter:description", content: data.description });
    if (data.image) {
      this.metaService.updateTag({ name: "twitter:image", content: data.image });
    }
  }

  addStructuredData(data: any): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

  removeStructuredData(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach((script) => script.remove());
  }
}
