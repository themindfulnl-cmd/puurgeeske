import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getBlogPosts, getBlogCategories } from "@/lib/content";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const posts = getBlogPosts();
  const categories = getBlogCategories();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background">
      <Navbar />
      <main className="flex-grow pt-32 pb-24">
        <section className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs md:text-sm font-medium tracking-[0.3em] text-muted-foreground uppercase">
              Blog
            </h2>
            <h1 className="text-3xl md:text-5xl font-light text-foreground">
              Inspiratie & <span className="font-serif italic text-muted-foreground">Inzichten</span>
            </h1>
            <p className="text-muted-foreground font-light">
              Tips, verhalen en kennis over yoga, ademwerk en mindful leven.
            </p>
          </div>

          {posts.length === 0 && <div className="journal-empty"><span className="eyebrow">Een moment van inspiratie</span><h2>Nieuwe verhalen krijgen de ruimte.</h2><p>Binnenkort lees je hier meer. Ontdek ondertussen het aanbod of maak persoonlijk kennis met Geeske.</p><Link href="/#services" className="action-link">Ontdek het aanbod <ArrowRight size={16}/></Link></div>}
          {/* Categories */}
          <div className={`${posts.length ? "flex" : "hidden"} flex-wrap justify-center gap-3 mb-12`}>
            <span className="px-4 py-2 rounded-full bg-stone-800 text-white text-sm">
              Alles
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-4 py-2 rounded-full bg-accent border border-border text-muted-foreground text-sm hover:bg-secondary cursor-pointer transition-colors"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {posts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.id}
                className="group bg-accent rounded-[2rem] overflow-hidden shadow-sm border border-border hover-lift hover-zoom"
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden bg-secondary">
                  <img
                    src={post.image || "/images/blog-placeholder.jpg"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="px-3 py-1 rounded-full bg-background text-muted-foreground">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString("nl-NL", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground font-light text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                    Lees meer <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
