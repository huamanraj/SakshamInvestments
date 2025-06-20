import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff,
  Calendar,
  User,
  Tag,
  MoreVertical
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// Memoized BlogCard component
const BlogCard = React.memo(({ blog, onDelete }) => {
  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }, []);

  const handleDeleteClick = useCallback(() => {
    onDelete(blog);
  }, [onDelete, blog]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
              blog.isPublished 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'bg-amber-100 text-amber-700'
            }`}>
              {blog.isPublished ? 'Published' : 'Draft'}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium whitespace-nowrap">
              {blog.category}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 admin-title-clamp hover:text-emerald-600 transition-colors" title={blog.title}>
            {blog.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 admin-excerpt-clamp" title={blog.excerpt}>
            {blog.excerpt}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
            <span className="flex items-center gap-1 whitespace-nowrap">
              <User className="w-3 h-3" />
              <span className="text-truncate-title max-w-[100px]">{blog.author}</span>
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Calendar className="w-3 h-3" />
              {formatDate(blog.publishedAt)}
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Eye className="w-3 h-3" />
              {blog.readTime}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2 flex-shrink-0">
          <Link
            to={`/admin/blogs/edit/${blog.$id}`}
            className="p-2.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
            title="Edit blog"
          >
            <Edit3 className="w-4 h-4" />
          </Link>
          <button
            onClick={handleDeleteClick}
            className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            title="Delete blog"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

BlogCard.displayName = 'BlogCard';

// Memoized Stats component
const BlogStats = React.memo(({ blogs }) => {
  const stats = useMemo(() => {
    if (!blogs) return { total: 0, published: 0, drafts: 0 };
    
    return {
      total: blogs.length,
      published: blogs.filter(blog => blog.isPublished).length,
      drafts: blogs.filter(blog => !blog.isPublished).length
    };
  }, [blogs]);

  return (
    <div className="flex gap-6 mt-4 pt-4 border-t border-gray-200">
      <div className="text-sm">
        <span className="text-gray-500">Total: </span>
        <span className="font-medium">{stats.total}</span>
      </div>
      <div className="text-sm">
        <span className="text-gray-500">Published: </span>
        <span className="font-medium text-emerald-600">{stats.published}</span>
      </div>
      <div className="text-sm">
        <span className="text-gray-500">Drafts: </span>
        <span className="font-medium text-amber-600">{stats.drafts}</span>
      </div>
    </div>
  );
});

BlogStats.displayName = 'BlogStats';

// Memoized Loading component
const LoadingState = React.memo(() => (
  <div className="space-y-6">
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="grid gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
));

LoadingState.displayName = 'LoadingState';

// Memoized Empty State component
const EmptyState = React.memo(({ searchTerm, filterStatus }) => {
  const hasFilters = searchTerm || filterStatus !== 'all';
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {hasFilters ? 'No blogs found' : 'No blogs yet'}
      </h3>
      <p className="text-gray-600 mb-6">
        {hasFilters 
          ? 'Try adjusting your search or filter criteria'
          : 'Get started by creating your first blog post'
        }
      </p>
      {!hasFilters && (
        <Link
          to="/admin/blogs/create"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Create First Blog
        </Link>
      )}
    </div>
  );
});

EmptyState.displayName = 'EmptyState';

const AdminBlogs = () => {
  const { blogs, fetchBlogs, deleteBlog, loading } = useBlog();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  // Fetch blogs only once on mount
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Memoized filtered and sorted blogs
  const filteredBlogs = useMemo(() => {
    if (!blogs) return [];
    
    let filtered = blogs;

    // Filter by search term
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(lowerSearchTerm) ||
        blog.excerpt.toLowerCase().includes(lowerSearchTerm) ||
        blog.category.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Filter by status
    if (filterStatus === 'published') {
      filtered = filtered.filter(blog => blog.isPublished);
    } else if (filterStatus === 'draft') {
      filtered = filtered.filter(blog => !blog.isPublished);
    }

    // Sort blogs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [blogs, searchTerm, filterStatus, sortBy]);

  // Memoized event handlers
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleFilterStatusChange = useCallback((e) => {
    setFilterStatus(e.target.value);
  }, []);

  const handleSortByChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);

  const handleDeleteClick = useCallback((blog) => {
    setBlogToDelete(blog);
    setShowDeleteModal(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (blogToDelete) {
      try {
        await deleteBlog(blogToDelete.$id);
        setShowDeleteModal(false);
        setBlogToDelete(null);
        toast.success('Blog deleted successfully');
      } catch (error) {
        toast.error('Failed to delete blog');
      }
    }
  }, [blogToDelete, deleteBlog]);

  const handleDeleteCancel = useCallback(() => {
    setShowDeleteModal(false);
    setBlogToDelete(null);
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Blogs</h1>
          <p className="text-gray-600 mt-1">Manage all your blog posts</p>
        </div>
        <Link
          to="/admin/blogs/create"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
          New Blog
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={handleFilterStatusChange}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={handleSortByChange}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>

        {/* Stats */}
        <BlogStats blogs={blogs} />
      </div>

      {/* Blogs Grid */}
      {filteredBlogs.length > 0 ? (
        <div className="grid gap-6 xl:grid-cols-2 2xl:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.$id} blog={blog} onDelete={handleDeleteClick} />
          ))}
        </div>
      ) : (
        <EmptyState searchTerm={searchTerm} filterStatus={filterStatus} />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Blog</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{blogToDelete?.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDeleteCancel}
                className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-4 py-3 text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs; 