import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface SeoMetaInput {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  setMeta(input: SeoMetaInput): void {
    this.titleService.setTitle(input.title);

    this.updateTag('name="description"', 'description', input.description);
    this.updateTag('property="og:title"', 'og:title', input.title);
    this.updateTag('property="og:description"', 'og:description', input.description);
    this.updateTag('property="twitter:title"', 'twitter:title', input.title);
    this.updateTag('property="twitter:description"', 'twitter:description', input.description);

    if (input.keywords) {
      this.updateTag('name="keywords"', 'keywords', input.keywords);
    }

    if (input.image) {
      this.updateTag('property="og:image"', 'og:image', input.image);
      this.updateTag('property="twitter:image"', 'twitter:image', input.image);
    }

    if (input.url) {
      this.updateTag('property="og:url"', 'og:url', input.url);
      this.setCanonical(input.url);
    }
  }

  setJsonLd(id: string, payload: object): void {
    const existing = this.document.getElementById(id);
    if (existing) {
      existing.remove();
    }

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.text = JSON.stringify(payload);
    this.document.head.appendChild(script);
  }

  private setCanonical(url: string): void {
    let canonical = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }

    canonical.href = url;
  }

  private updateTag(selector: string, propertyName: string, content: string): void {
    this.metaService.updateTag({ [propertyName.includes(':') ? 'property' : 'name']: propertyName, content }, selector);
  }
}
