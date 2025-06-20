import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';

const TrendingBlogs = () => {
  const { blogs, fetchBlogs, loading, getThumbnailUrl } = useBlog();

  // Fetch blogs when component mounts
  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      fetchBlogs();
    }
  }, [fetchBlogs, blogs]);

  // Get trending blogs (first 3 published blogs)
  const trendingBlogs = useMemo(() => {
    if (!blogs) return [];
    
    return blogs
      .filter(blog => blog.isPublished)
      .slice(0, 3);
  }, [blogs]);

  // Loading state
  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Don't render if no trending blogs
  if (!trendingBlogs || trendingBlogs.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800">Trending Posts</h2>
          <Link 
            to="/blog" 
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trendingBlogs.map((blog) => (
            <Link
              key={blog.$id}
              to={`/blog/${blog.$id}`}
              className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-emerald-200"
            >
              {/* Blog thumbnail if available */}
              {blog.thumbnailId && getThumbnailUrl(blog.thumbnailId) && (
                <div className="h-48 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={getThumbnailUrl(blog.thumbnailId)}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.parentElement.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-slate-900 transition-colors duration-200 blog-title-clamp">
                {blog.title}
              </h3>
              
              <p className="text-slate-600 leading-relaxed blog-excerpt-clamp mb-4">
                {blog.excerpt}
              </p>
              
              {/* Blog metadata */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-emerald-100 text-emerald-600 px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
                    {blog.category}
                  </span>
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    {new Date(blog.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="w-8 h-8 bg-slate-100 group-hover:bg-emerald-500 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0">
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
  );
};

export default TrendingBlogs; 