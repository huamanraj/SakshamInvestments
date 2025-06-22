import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import NewNavbar from '../components/NewNavbar';
import Footer from '../components/Footer';
import { useBlog } from '../contexts/BlogContext';

const BlogPage = () => {
  const { blogs, fetchBlogs, loading, getThumbnailUrl } = useBlog();
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs(); // This will fetch only published blogs by default
  }, [fetchBlogs]);

  // Get unique categories from fetched blogs
  const categories = useMemo(() => {
    if (!blogs || blogs.length === 0) return ['All'];
    const uniqueCategories = [...new Set(blogs.map(blog => blog.category))];
    return ['All', ...uniqueCategories];
  }, [blogs]);

  // Filter blogs based on selected category
  const filteredBlogs = useMemo(() => {
    if (!blogs) return [];
    return selectedCategory === 'All' 
      ? blogs 
      : blogs.filter(blog => blog.category === selectedCategory);
  }, [blogs, selectedCategory]);

  const formatDate = useCallback((dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  // Loading component
  const LoadingState = () => (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white border border-slate-200 rounded-2xl overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-3 bg-gray-200 rounded w-20 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-7xl text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            {selectedCategory === 'All' ? 'No blogs published yet' : `No blogs found in "${selectedCategory}"`}
          </h3>
          <p className="text-slate-600">
            {selectedCategory === 'All' 
              ? 'Check back soon for new content!' 
              : 'Try selecting a different category or check back later.'}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar with dark background for visibility */}
      <div className="bg-slate-800">
        <NewNavbar />
      </div>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-emerald-400">Blog</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest insights, market analysis, and investment strategies from our expert team
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      {!loading && categories.length > 1 && (
        <section className="py-12 bg-gray-50 border-b">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      {loading ? (
        <LoadingState />
      ) : filteredBlogs.length > 0 ? (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <Link
                  key={blog.$id}
                  to={`/blog/${blog.$id}`}
                  className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-emerald-200 cursor-pointer block"
                >
                  {/* Blog Image */}
                  <div className="h-48 relative overflow-hidden">
                    {blog.thumbnailId && getThumbnailUrl(blog.thumbnailId) ? (
                      <img
                        src={getThumbnailUrl(blog.thumbnailId)}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className={`${blog.thumbnailId && getThumbnailUrl(blog.thumbnailId) ? 'hidden' : 'flex'} w-full h-full bg-gradient-to-br from-emerald-100 to-blue-100 items-center justify-center`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 group-hover:from-emerald-500/30 group-hover:to-blue-500/30 transition-all duration-300"></div>
                      <div className="relative z-10 text-center text-slate-600">
                        <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className="bg-white/90 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-sm text-slate-500">
                      <span>{formatDate(blog.publishedAt)}</span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-slate-900 transition-colors duration-200 blog-title-clamp">
                      {blog.title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 blog-excerpt-clamp">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-emerald-600 font-semibold text-sm">
                            {blog.author?.charAt(0) || 'A'}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-slate-800 text-truncate-title">{blog.author}</p>
                          <p className="text-xs text-slate-500 text-truncate-title">{blog.role}</p>
                        </div>
                      </div>
                      
                      <div className="w-10 h-10 bg-slate-100 group-hover:bg-emerald-500 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <svg 
                          className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <EmptyState />
      )}

      {/* Newsletter Subscription */}
      <section className="bg-slate-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-slate-300 mb-8">
            Subscribe to our newsletter to get the latest insights delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage; 