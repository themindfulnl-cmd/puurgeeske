import fs from 'fs';
import path from 'path';
import { cache } from 'react';

const dataDir = path.join(process.cwd(), 'lib/data');

/**
 * Content store.
 *
 * Reads are memoised per render pass, so a page that needs reviews, events and
 * config does one read of each instead of one per component.
 *
 * Writes only work where the filesystem is writable. On Vercel the serverless
 * filesystem is read-only and ephemeral, so a "save" in the admin panel used to
 * report success and change nothing. It now fails loudly instead.
 */

export class ReadOnlyContentError extends Error {
  constructor() {
    super(
      'De inhoud kan op deze omgeving niet worden opgeslagen. ' +
        'Op Vercel is het bestandssysteem alleen-lezen — wijzigingen moeten via de repository.'
    );
    this.name = 'ReadOnlyContentError';
  }
}

/** Vercel sets VERCEL=1 on every deployment. */
function isReadOnlyEnvironment(): boolean {
  return process.env.VERCEL === '1' || process.env.CONTENT_READONLY === '1';
}

function readJsonFileUncached<T>(filename: string): T {
  const filePath = path.join(dataDir, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents) as T;
}

const readJsonFile = cache(readJsonFileUncached) as <T>(filename: string) => T;

function writeJsonFile<T>(filename: string, data: T): void {
  if (isReadOnlyEnvironment()) throw new ReadOnlyContentError();
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Types
export interface Service {
  duration?: string;
  price?: string;
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  active: boolean;
}

export interface Event {
  id: string;
  date: string;
  time: string;
  title: string;
  description: string;
  price: number;
  location: string;
  spotsTotal: number;
  spotsRemaining: number;
  bookingUrl: string;
  active: boolean;
}

export interface Review {
  id: string;
  name: string;
  photo: string | null;
  rating: number;
  text: string;
  date: string;
  active: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  active: boolean;
}

export interface SiteConfig {
  siteName: string;
  tagline: string;
  missionStatement: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  coordinates: { lat: number; lng: number };
  social: { instagram: string; facebook: string };
  bookingUrl: string;
}

// Services
export function getServices(): Service[] {
  return readJsonFile<Service[]>('services.json').filter(s => s.active);
}

export function getAllServices(): Service[] {
  return readJsonFile<Service[]>('services.json');
}

export function saveServices(services: Service[]): void {
  writeJsonFile('services.json', services);
}

// Events - Filter out past events automatically
export function getEvents(): Event[] {
  const events = readJsonFile<Event[]>('events.json');
  const today = new Date().toISOString().split('T')[0];
  return events
    .filter(e => e.active && e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getAllEvents(): Event[] {
  return readJsonFile<Event[]>('events.json');
}

export function saveEvents(events: Event[]): void {
  writeJsonFile('events.json', events);
}

// Reviews
export function getReviews(): Review[] {
  return readJsonFile<Review[]>('reviews.json')
    .filter(r => r.active)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllReviews(): Review[] {
  return readJsonFile<Review[]>('reviews.json');
}

export function saveReviews(reviews: Review[]): void {
  writeJsonFile('reviews.json', reviews);
}

// Blog
export function getBlogPosts(): BlogPost[] {
  return readJsonFile<BlogPost[]>('blog.json')
    .filter(p => p.active)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllBlogPosts(): BlogPost[] {
  return readJsonFile<BlogPost[]>('blog.json');
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = readJsonFile<BlogPost[]>('blog.json');
  return posts.find(p => p.slug === slug && p.active);
}

export function getBlogCategories(): string[] {
  const posts = readJsonFile<BlogPost[]>('blog.json').filter(p => p.active);
  return [...new Set(posts.map(p => p.category))];
}

export function saveBlogPosts(posts: BlogPost[]): void {
  writeJsonFile('blog.json', posts);
}

// Site Config
export function getSiteConfig(): SiteConfig {
  return readJsonFile<SiteConfig>('config.json');
}

export function saveSiteConfig(config: SiteConfig): void {
  writeJsonFile('config.json', config);
}
