import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getBlogPosts, getBlogCategories } from "@/lib/content";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const posts = getBlogPosts();
  const categories = getBlogCategories();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FDFBF7]">
      <Navbar />
      <main className="flex-grow pt-32 pb-24">
        <section className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs md:text-sm font-medium tracking-[0.3em] text-stone-500 uppercase">
              Blog
            </h2>
            <h1 className="text-3xl md:text-5xl font-light text-stone-800">
              Inspiratie & <span className="font-serif italic text-stone-600">Inzichten</span>
            </h1>
            <p className="text-stone-500 font-light">
              Tips, verhalen en kennis over yoga, ademwerk en mindful leven.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <span className="px-4 py-2 rounded-full bg-stone-800 text-white text-sm">
              Alles
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-4 py-2 rounded-full bg-white border border-stone-200 text-stone-600 text-sm hover:bg-stone-50 cursor-pointer transition-colors"
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
                className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-stone-100 hover-lift hover-zoom"
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={post.image || "/images/blog-placeholder.jpg"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Category & Date */}
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span className="px-3 py-1 rounded-full bg-[#FDFBF7] text-stone-500">
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
                  <h3 className="text-xl font-medium text-stone-800 group-hover:text-[#D4A373] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-stone-500 font-light text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-[#D4A373] text-sm font-medium group-hover:gap-3 transition-all">
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
