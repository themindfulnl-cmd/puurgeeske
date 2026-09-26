import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowLeft, User } from "lucide-react";

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Simple markdown-like rendering (basic support)
function renderContent(content: string) {
  const lines = content.split("\n");
  return lines.map((line, index) => {
    // H1
    if (line.startsWith("# ")) {
      return (
        <h1 key={index} className="text-3xl md:text-4xl font-light text-foreground mb-6 mt-8">
          {line.slice(2)}
        </h1>
      );
    }
    // H2
    if (line.startsWith("## ")) {
      return (
        <h2 key={index} className="text-2xl font-medium text-foreground mb-4 mt-8">
          {line.slice(3)}
        </h2>
      );
    }
    // H3
    if (line.startsWith("### ")) {
      return (
        <h3 key={index} className="text-xl font-medium text-foreground mb-3 mt-6">
          {line.slice(4)}
        </h3>
      );
    }
    // Numbered list
    if (/^\d+\. /.test(line)) {
      return (
        <li key={index} className="text-muted-foreground font-light leading-relaxed ml-6 list-decimal">
          {line.replace(/^\d+\. /, "")}
        </li>
      );
    }
    // Empty line
    if (line.trim() === "") {
      return <div key={index} className="h-4" />;
    }
    // Paragraph
    return (
      <p key={index} className="text-muted-foreground font-light leading-relaxed text-lg">
        {line}
      </p>
    );
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background">
      <Navbar />
      <main className="flex-grow pt-32 pb-24">
        <article className="container mx-auto px-4 md:px-6 max-w-3xl">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug naar blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="px-3 py-1 rounded-full bg-accent border border-border">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("nl-NL", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="rounded-[2rem] overflow-hidden mb-12 shadow-lg">
              <img
                src={post.image}
                alt={post.title}
                className="w-full aspect-[16/9] object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-stone prose-lg max-w-none">
            {renderContent(post.content)}
          </div>

          {/* Share / CTA */}
          <div className="mt-16 p-8 bg-accent rounded-[2rem] border border-border text-center">
            <h3 className="text-xl font-medium text-foreground mb-3">
              Wil je dit ervaren?
            </h3>
            <p className="text-muted-foreground font-light mb-6">
              Boek een les of workshop en ontdek het zelf.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-stone-800 text-white hover:bg-stone-700 transition-colors"
            >
              Neem contact op
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
