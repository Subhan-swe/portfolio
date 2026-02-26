import { useState, useEffect } from 'react';
import { Calendar, Clock, Search, Tag, Loader, ArrowRight, ArrowLeft, MessageSquare } from 'lucide-react';
import { supabase, BlogPost, isSupabaseConfigured } from '../lib/supabase';

const fallbackPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable APIs with Node.js and Express',
    slug: 'building-scalable-apis',
    content: 'A comprehensive guide to building production-ready REST APIs with Node.js. We cover routing, middleware patterns, error handling, validation, rate limiting, and deployment best practices. Learn how to structure your Express application for maintainability and scale.',
    excerpt: 'A comprehensive guide to building production-ready REST APIs with Node.js, covering routing, middleware, and deployment.',
    category: 'Backend',
    image_url: null,
    published: true,
    published_at: '2024-12-15',
    views: 245,
    created_at: '2024-12-15',
    updated_at: '2024-12-15',
  },
  {
    id: '2',
    title: 'Modern React Patterns You Should Know in 2025',
    slug: 'modern-react-patterns-2025',
    content: 'React has evolved significantly. This post covers the most important patterns for modern React development: Server Components, Suspense boundaries, concurrent features, custom hooks, and the new use() hook. Understanding these patterns will dramatically improve your React applications.',
    excerpt: 'Explore the latest React patterns including Server Components, Suspense, concurrent features, and the new use() hook.',
    category: 'Frontend',
    image_url: null,
    published: true,
    published_at: '2024-12-10',
    views: 412,
    created_at: '2024-12-10',
    updated_at: '2024-12-10',
  },
  {
    id: '3',
    title: 'Why TypeScript is Essential for Large Projects',
    slug: 'why-typescript-essential',
    content: 'TypeScript has become the standard for professional web development. In this post, I share my experience migrating a large JavaScript codebase to TypeScript, the challenges faced, and the significant improvements in code quality, developer experience, and bug prevention.',
    excerpt: 'My experience migrating a large codebase to TypeScript and the improvements in code quality and developer experience.',
    category: 'Engineering',
    image_url: null,
    published: true,
    published_at: '2024-12-05',
    views: 189,
    created_at: '2024-12-05',
    updated_at: '2024-12-05',
  },
  {
    id: '4',
    title: 'Database Design Principles for Web Applications',
    slug: 'database-design-principles',
    content: 'Good database design is the foundation of any successful application. This article covers normalization, indexing strategies, query optimization, and when to choose SQL vs NoSQL databases for your next web project.',
    excerpt: 'Essential database design patterns covering normalization, indexing, query optimization, and SQL vs NoSQL decisions.',
    category: 'Backend',
    image_url: null,
    published: true,
    published_at: '2024-11-28',
    views: 167,
    created_at: '2024-11-28',
    updated_at: '2024-11-28',
  },
  {
    id: '5',
    title: 'Deploying Full-Stack Apps with Vercel and Supabase',
    slug: 'deploying-fullstack-vercel-supabase',
    content: 'A step-by-step guide to deploying modern full-stack applications using Vercel for the frontend and Supabase for the backend. Cover CI/CD pipelines, environment variable management, database migrations, and monitoring.',
    excerpt: 'Step-by-step guide to deploying modern full-stack applications using Vercel and Supabase with CI/CD and monitoring.',
    category: 'DevOps',
    image_url: null,
    published: true,
    published_at: '2024-11-20',
    views: 298,
    created_at: '2024-11-20',
    updated_at: '2024-11-20',
  },
  {
    id: '6',
    title: 'The Art of Clean Code: Lessons from Real Projects',
    slug: 'art-of-clean-code',
    content: 'Clean code is not just about aesthetics — it is about maintainability, readability, and collaboration. This post shares practical lessons learned from real-world projects on writing code that your future self and teammates will thank you for.',
    excerpt: 'Practical lessons from real projects on writing maintainable, readable code that teams can collaborate on effectively.',
    category: 'Engineering',
    image_url: null,
    published: true,
    published_at: '2024-11-12',
    views: 334,
    created_at: '2024-11-12',
    updated_at: '2024-11-12',
  },
];

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [searchQuery, selectedCategory, posts]);

  const fetchPosts = async () => {
    if (!isSupabaseConfigured) {
      setPosts(fallbackPosts);
      setFilteredPosts(fallbackPosts);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      const postsData = data && data.length > 0 ? data : fallbackPosts;
      setPosts(postsData);
      setFilteredPosts(postsData);
    } catch {
      setPosts(fallbackPosts);
      setFilteredPosts(fallbackPosts);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = posts;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  };

  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  // Individual Blog Post View
  if (selectedPost) {
    return (
      <section
        id="blog"
        className="section-padding bg-section-alt transition-colors duration-200"
      >
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <button
            onClick={() => setSelectedPost(null)}
            className="mb-10 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all posts</span>
          </button>

          <article className="bg-card rounded-2xl border border-border/50 p-8 md:p-12">
            {/* Post Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(selectedPost.published_at)}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{estimateReadTime(selectedPost.content)} min read</span>
              </span>
              <span className="px-2.5 py-0.5 text-xs font-mono font-medium bg-accent/10 text-accent rounded-md">
                {selectedPost.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 tracking-tight text-balance">
              {selectedPost.title}
            </h1>

            {/* Post Content */}
            <div className="text-muted-foreground leading-relaxed text-lg whitespace-pre-wrap">
              {selectedPost.content}
            </div>

            {/* Comments Section */}
            <div className="mt-16 pt-8 border-t border-border/50">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold text-foreground">Comments</h3>
              </div>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-section-alt border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground placeholder:text-muted-foreground/50 text-sm"
                />
                <textarea
                  placeholder="Share your thoughts..."
                  rows={4}
                  className="w-full px-4 py-3 bg-section-alt border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground placeholder:text-muted-foreground/50 text-sm resize-none"
                />
                <button className="self-start px-6 py-2.5 bg-accent text-accent-foreground rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5">
                  Post Comment
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>
    );
  }

  // Loading State
  if (loading) {
    return (
      <section id="blog" className="section-padding bg-section-alt">
        <div className="container-narrow flex justify-center items-center py-20">
          <Loader className="w-6 h-6 animate-spin text-accent" />
        </div>
      </section>
    );
  }

  // Blog Listing View
  return (
    <section
      id="blog"
      className="section-padding bg-section-alt transition-colors duration-200"
    >
      <div className="container-narrow">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16">
          <p className="text-sm font-mono font-medium tracking-widest uppercase text-accent">
            Writing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
            {'Blog & Insights'}
          </h2>
          <div className="w-12 h-1 rounded-full bg-accent" />
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Thoughts on software development, technology, and my journey.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-card border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-foreground placeholder:text-muted-foreground/50 text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-card text-muted-foreground hover:text-foreground border border-border/50 hover:border-border'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-card rounded-2xl border border-border/50 overflow-hidden hover-lift cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              {/* Post Image / Placeholder */}
              <div className="h-44 overflow-hidden bg-section-alt">
                {post.image_url ? (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/5 to-accent/10">
                    <Tag className="w-8 h-8 text-accent/20" />
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col gap-3">
                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post.published_at)}</span>
                  </span>
                  <span className="px-2 py-0.5 font-mono font-medium bg-accent/10 text-accent rounded">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-200 leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <div className="flex items-center gap-1.5 text-accent text-sm font-medium pt-1">
                  <span>Read article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No posts found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
