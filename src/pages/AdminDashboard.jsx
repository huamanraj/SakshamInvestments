import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';
import { 
  BarChart3, 
  FileText, 
  Eye, 
  TrendingUp, 
  Plus, 
  Edit3, 
  Users,
  Calendar,
  ArrowUpRight,
  Activity
} from 'lucide-react';

// Memoized StatCard component
const StatCard = React.memo(({ title, value, icon: Icon, trend, color = 'blue' }) => {
  const colorClasses = useMemo(() => ({
    blue: 'from-blue-500 to-blue-600',
    green: 'from-emerald-500 to-emerald-600',
    yellow: 'from-amber-500 to-amber-600',
    purple: 'from-purple-500 to-purple-600'
  }), []);

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className="text-sm text-emerald-600 flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4" />
              +{trend}% from last month
            </p>
          )}
        </div>
        <div className={`w-14 h-14 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </div>
  );
});

StatCard.displayName = 'StatCard';

// Memoized QuickActionCard component
const QuickActionCard = React.memo(({ title, description, icon: Icon, href, color = 'blue' }) => {
  const colorClasses = useMemo(() => ({
    blue: 'text-blue-600 bg-blue-50 hover:bg-blue-100',
    green: 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100',
    purple: 'text-purple-600 bg-purple-50 hover:bg-purple-100'
  }), []);

  return (
    <Link
      to={href}
      className="block p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 group shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]} group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="flex items-center justify-end mt-4">
        <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
      </div>
    </Link>
  );
});

QuickActionCard.displayName = 'QuickActionCard';

// Memoized RecentBlogCard component
const RecentBlogCard = React.memo(({ blog }) => {
  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }, []);

  const formattedDate = useMemo(() => formatDate(blog.publishedAt), [formatDate, blog.publishedAt]);

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
      <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
        <FileText className="w-6 h-6 text-emerald-600" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 admin-title-clamp" title={blog.title}>{blog.title}</h4>
        <p className="text-xs text-gray-500 admin-excerpt-clamp" title={blog.excerpt}>{blog.excerpt}</p>
        <div className="flex items-center gap-3 mt-1 flex-wrap">
          <span className="text-xs text-gray-500 flex items-center gap-1 whitespace-nowrap">
            <Calendar className="w-3 h-3" />
            {formattedDate}
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-1 whitespace-nowrap">
            <Eye className="w-3 h-3" />
            {blog.views || 0} views
          </span>
          <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
            blog.isPublished 
              ? 'bg-emerald-100 text-emerald-700' 
              : 'bg-amber-100 text-amber-700'
          }`}>
            {blog.isPublished ? 'Published' : 'Draft'}
          </span>
        </div>
      </div>
      <Link
        to={`/admin/blogs/edit/${blog.$id}`}
        className="p-2 text-gray-400 hover:text-emerald-600 rounded-xl hover:bg-white transition-colors flex-shrink-0"
        title="Edit blog"
      >
        <Edit3 className="w-4 h-4" />
      </Link>
    </div>
  );
});

RecentBlogCard.displayName = 'RecentBlogCard';

// Memoized Loading component
const LoadingState = React.memo(() => (
  <div className="space-y-6">
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
));

LoadingState.displayName = 'LoadingState';

// Memoized Empty Blogs component
const EmptyBlogsState = React.memo(() => (
  <div className="p-8 text-center">
    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs yet</h3>
    <p className="text-gray-600 mb-4">Get started by creating your first blog post</p>
    <Link
      to="/admin/blogs/create"
      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-colors shadow-lg"
    >
      <Plus className="w-4 h-4" />
      Create Your First Blog
    </Link>
  </div>
));

EmptyBlogsState.displayName = 'EmptyBlogsState';

const AdminDashboard = () => {
  const { blogs, fetchBlogs, loading } = useBlog();

  // Fetch blogs only once on mount
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Memoized stats calculation
  const stats = useMemo(() => {
    if (!blogs) {
      return {
        totalBlogs: 0,
        publishedBlogs: 0,
        draftBlogs: 0,
        totalViews: 0
      };
    }

    const published = blogs.filter(blog => blog.isPublished);
    const drafts = blogs.filter(blog => !blog.isPublished);
    
    return {
      totalBlogs: blogs.length,
      publishedBlogs: published.length,
      draftBlogs: drafts.length,
      totalViews: blogs.reduce((sum, blog) => sum + (blog.views || 0), 0)
    };
  }, [blogs]);

  // Memoized recent blogs
  const recentBlogs = useMemo(() => {
    return blogs ? blogs.slice(0, 5) : [];
  }, [blogs]);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your blog.</p>
      </div>

      {/* Stats Grid - Enhanced for PC */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        <StatCard
          title="Total Blogs"
          value={stats.totalBlogs}
          icon={FileText}
          trend={12}
          color="blue"
        />
        <StatCard
          title="Published"
          value={stats.publishedBlogs}
          icon={Eye}
          trend={8}
          color="green"
        />
        <StatCard
          title="Drafts"
          value={stats.draftBlogs}
          icon={Edit3}
          color="yellow"
        />
        <StatCard
          title="Total Views"
          value={stats.totalViews.toLocaleString()}
          icon={BarChart3}
          trend={24}
          color="purple"
        />
      </div>

      {/* Main Content Grid for PC */}
      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-8">
        {/* Quick Actions - Enhanced Layout */}
        <div className="2xl:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            <QuickActionCard
              title="Create New Blog"
              description="Write and publish a new blog post"
              icon={Plus}
              href="/admin/blogs/create"
              color="blue"
            />
            <QuickActionCard
              title="Manage Blogs"
              description="Edit, delete, or organize existing posts"
              icon={Edit3}
              href="/admin/blogs"
              color="green"
            />
            <QuickActionCard
              title="View Analytics"
              description="Check performance and engagement metrics"
              icon={Activity}
              href="/admin/analytics"
              color="purple"
            />
          </div>
        </div>

        {/* Recent Blogs - Optimized for Sidebar on Large Screens */}
        <div className="2xl:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Blogs</h2>
            <Link
              to="/admin/blogs"
              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium whitespace-nowrap"
            >
              View all →
            </Link>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {recentBlogs.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {recentBlogs.map((blog) => (
                  <RecentBlogCard key={blog.$id} blog={blog} />
                ))}
              </div>
            ) : (
              <EmptyBlogsState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 