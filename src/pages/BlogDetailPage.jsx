import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import NewNavbar from '../components/NewNavbar';
import Footer from '../components/Footer';
import { useBlog } from '../contexts/BlogContext';

const BlogDetailPage = () => {
  const { id } = useParams();
  const { fetchBlog, blogs, fetchBlogs, getThumbnailUrl } = useBlog();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch the specific blog and all blogs for related articles
  useEffect(() => {
    const loadBlogData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch the specific blog
        const blogData = await fetchBlog(id);
        if (blogData) {
          setBlog(blogData);
        } else {
          setError('Blog not found');
        }
        
        // Also fetch all blogs for related articles if not already loaded
        if (!blogs || blogs.length === 0) {
          await fetchBlogs();
        }
      } catch (err) {
        console.error('Error loading blog:', err);
        setError('Failed to load blog');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadBlogData();
    }
  }, [id, fetchBlog, fetchBlogs, blogs]);

  // Parse blog content
  const parsedContent = useMemo(() => {
    if (!blog?.content) return '';
    
    try {
      // If content is a JSON string, parse it and extract text
      if (typeof blog.content === 'string' && blog.content.startsWith('{')) {
        const contentObj = JSON.parse(blog.content);
        // Extract text from various possible structures
        if (contentObj.blocks) {
          return contentObj.blocks
            .filter(block => block.type === 'paragraph' || block.type === 'text')
            .map(block => block.data?.text || block.text || '')
            .join('\n\n');
        } else if (contentObj.content) {
          return contentObj.content;
        } else if (typeof contentObj === 'object') {
          return JSON.stringify(contentObj, null, 2);
        }
      }
      // If it's plain text, return as is
      return blog.content;
    } catch (error) {
      console.warn('Failed to parse blog content:', error);
      return blog.content || '';
    }
  }, [blog?.content]);

  // Get related blogs
  const relatedBlogs = useMemo(() => {
    if (!blogs || !blog) return [];
    
    return blogs
      .filter(relatedBlog => 
        relatedBlog.$id !== blog.$id && 
        relatedBlog.category === blog.category &&
        relatedBlog.isPublished
      )
      .slice(0, 3);
  }, [blogs, blog]);

  const formatDate = useCallback((dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-slate-800">
          <NewNavbar />
        </div>
        <div className="animate-pulse">
          {/* Header skeleton */}
          <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="h-6 bg-slate-700 rounded w-24 mb-6"></div>
              <div className="h-8 bg-slate-700 rounded w-32 mb-6"></div>
              <div className="h-12 bg-slate-700 rounded w-3/4 mb-6"></div>
              <div className="h-12 bg-slate-700 rounded w-1/2 mb-6"></div>
              <div className="flex items-center gap-6">
                <div className="w-10 h-10 bg-slate-700 rounded-full"></div>
                <div className="h-4 bg-slate-700 rounded w-32"></div>
                <div className="h-4 bg-slate-700 rounded w-24"></div>
                <div className="h-4 bg-slate-700 rounded w-20"></div>
              </div>
            </div>
          </section>
          
          {/* Content skeleton */}
          <article className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="h-96 bg-gray-200 rounded-2xl mb-12"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </article>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-slate-800">
          <NewNavbar />
        </div>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            {error === 'Blog not found' ? 'Blog Not Found' : 'Error Loading Blog'}
          </h1>
          <p className="text-slate-600 mb-8">
            {error === 'Blog not found' 
              ? "The blog post you're looking for doesn't exist or has been removed."
              : 'There was an error loading the blog post. Please try again later.'
            }
          </p>
          <Link 
            to="/blog" 
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <div className="bg-slate-800">
        <NewNavbar />
      </div>

      {/* Blog Header */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
          
          <div className="mb-6">
            <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {blog.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex items-center gap-6 text-slate-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {blog.author?.charAt(0) || 'A'}
                </span>
              </div>
              <div>
                <p className="font-medium text-white">{blog.author}</p>
                <p className="text-sm">{blog.role}</p>
              </div>
            </div>
            <span>•</span>
            <span>{formatDate(blog.publishedAt)}</span>
            <span>•</span>
            <span>{blog.readTime}</span>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <article className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Featured Image */}
          <div className="h-96 rounded-2xl mb-12 relative overflow-hidden">
            {blog.thumbnailId && getThumbnailUrl(blog.thumbnailId) ? (
              <img
                src={getThumbnailUrl(blog.thumbnailId)}
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className={`${blog.thumbnailId && getThumbnailUrl(blog.thumbnailId) ? 'hidden' : 'flex'} w-full h-full bg-gradient-to-br from-emerald-100 to-blue-100 items-center justify-center`}>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20"></div>
              <div className="relative z-10 text-center text-slate-600">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm opacity-75">Featured Image</p>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-xl text-slate-600 mb-8 leading-relaxed">
              {blog.excerpt}
            </div>
            
            <div className="text-slate-700 leading-relaxed space-y-6">
              {parsedContent.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Share this article</h3>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => {
                  const url = window.location.href;
                  const text = `Check out this article: ${blog.title}`;
                  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                }}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                <span className="hidden sm:inline">Twitter</span>
              </button>
              <button 
                onClick={() => {
                  const url = window.location.href;
                  const title = blog.title;
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                }}
                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="hidden sm:inline">LinkedIn</span>
              </button>
              <button 
                onClick={async () => {
                  const url = window.location.href;
                  try {
                    await navigator.clipboard.writeText(url);
                    alert('Link copied to clipboard!');
                  } catch (err) {
                    console.error('Failed to copy:', err);
                    alert('Failed to copy link');
                  }
                }}
                className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span className="hidden sm:inline">Copy Link</span>
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog.$id}
                  to={`/blog/${relatedBlog.$id}`}
                  className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:border-emerald-200"
                >
                  <h3 className="text-lg font-bold text-slate-800 mb-3 leading-tight group-hover:text-slate-900 transition-colors duration-200">
                    {relatedBlog.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {relatedBlog.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">{formatDate(relatedBlog.publishedAt)}</span>
                    <div className="w-8 h-8 bg-slate-100 group-hover:bg-emerald-500 rounded-full flex items-center justify-center transition-all duration-300">
                      <svg className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogDetailPage; 