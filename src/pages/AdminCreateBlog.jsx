import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';
import BlogEditor from '../components/BlogEditor';
import { 
  Save, 
  Eye, 
  Upload, 
  X, 
  Image as ImageIcon, 
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Clock
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { storage, STORAGE_BUCKET_ID } from '../lib/appwrite';

// Memoized Input Field Component
const InputField = React.memo(({ label, name, type = 'text', placeholder, required = false, as = 'input', value, onChange, error }) => {
  const Component = as;
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Component
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        rows={as === 'textarea' ? 4 : undefined}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <span className="w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
          {error}
        </p>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

const AdminCreateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = useMemo(() => Boolean(id), [id]);
  const { createBlog, updateBlog, fetchBlog, loading } = useBlog();

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: null,
    category: '',
    author: '',
    role: '',
    readTime: '',
    thumbnailId: '',
    isPublished: false
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [initialLoad, setInitialLoad] = useState(true);

  // Memoized handlers to prevent re-rendering
  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleEditorChange = useCallback((data) => {
    setFormData(prev => ({ ...prev, content: data }));
    if (errors.content) {
      setErrors(prev => ({ ...prev, content: '' }));
    }
  }, [errors.content]);

  const handleThumbnailSelect = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size should be less than 10MB');
        return;
      }

      setThumbnail(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setThumbnailPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const removeThumbnail = useCallback(() => {
    setThumbnail(null);
    setThumbnailPreview('');
    setFormData(prev => ({ ...prev, thumbnailId: '' }));
  }, []);

  const uploadThumbnail = useCallback(async () => {
    if (!thumbnail) return formData.thumbnailId;

    setUploadingThumbnail(true);
    try {
      const fileId = `blog_${Date.now()}`;
      const response = await storage.createFile(
        STORAGE_BUCKET_ID, 
        fileId, 
        thumbnail,
        ['read("any")'] // Allow public read access to thumbnails
      );
      setUploadingThumbnail(false);
      return response.$id;
    } catch (error) {
      setUploadingThumbnail(false);
      console.error('Thumbnail upload error:', error);
      throw new Error(`Failed to upload thumbnail: ${error.message}`);
    }
  }, [thumbnail, formData.thumbnailId]);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    
    // Check if content exists and has blocks
    if (!formData.content || 
        (typeof formData.content === 'object' && (!formData.content.blocks || formData.content.blocks.length === 0)) ||
        (typeof formData.content === 'string' && !formData.content.trim())) {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.role.trim()) newErrors.role = 'Author role is required';
    if (!formData.readTime.trim()) newErrors.readTime = 'Read time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSave = useCallback(async (publishNow = false) => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      let thumbnailId = formData.thumbnailId;
      
      // Upload thumbnail if new one is selected
      if (thumbnail) {
        thumbnailId = await uploadThumbnail();
      }

      // Serialize content to JSON string for database storage
      let contentString = '';
      if (formData.content) {
        contentString = typeof formData.content === 'string' 
          ? formData.content 
          : JSON.stringify(formData.content);
      }

      const blogData = {
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim(),
        content: contentString,
        category: formData.category.trim(),
        author: formData.author.trim(),
        role: formData.role.trim(),
        readTime: formData.readTime.trim(),
        thumbnailId: thumbnailId || '',
        isPublished: publishNow || formData.isPublished,
        publishedAt: publishNow || formData.isPublished ? new Date().toISOString() : formData.publishedAt || new Date().toISOString()
      };

      let result;
      if (isEditing) {
        result = await updateBlog(id, blogData);
        toast.success('Blog updated successfully!');
      } else {
        result = await createBlog(blogData);
        toast.success('Blog created successfully!');
      }

      if (result) {
        navigate('/admin/blogs');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} blog: ${error.message || 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  }, [formData, thumbnail, uploadThumbnail, validateForm, isEditing, id, updateBlog, createBlog, navigate]);

  const loadBlogData = useCallback(async () => {
    if (!isEditing || !id) return;
    
    try {
      const blog = await fetchBlog(id);
      if (blog) {
        // Parse content from JSON string back to object
        let contentData = null;
        if (blog.content) {
          try {
            contentData = typeof blog.content === 'string' 
              ? JSON.parse(blog.content) 
              : blog.content;
          } catch (error) {
            console.warn('Failed to parse content JSON:', error);
            contentData = blog.content; // fallback to raw content
          }
        }

        setFormData({
          title: blog.title || '',
          excerpt: blog.excerpt || '',
          content: contentData,
          category: blog.category || '',
          author: blog.author || '',
          role: blog.role || '',
          readTime: blog.readTime || '',
          thumbnailId: blog.thumbnailId || '',
          isPublished: blog.isPublished || false
        });

        // Load thumbnail preview if exists
        if (blog.thumbnailId) {
          const thumbnailUrl = storage.getFileView(STORAGE_BUCKET_ID, blog.thumbnailId);
          setThumbnailPreview(thumbnailUrl);
        }
      }
    } catch (error) {
      toast.error('Failed to load blog data');
      navigate('/admin/blogs');
    } finally {
      setInitialLoad(false);
    }
  }, [isEditing, id, fetchBlog, navigate]);

  // Load blog data only once when component mounts
  useEffect(() => {
    if (initialLoad) {
      loadBlogData();
    }
  }, [loadBlogData, initialLoad]);

  const handleGoBack = useCallback(() => {
    navigate('/admin/blogs');
  }, [navigate]);

  // Memoized form sections
  const basicInfoSection = useMemo(() => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <User className="w-5 h-5 text-emerald-600" />
        Basic Information
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <InputField
            label="Blog Title"
            name="title"
            placeholder="Enter an engaging title"
            required
            value={formData.title}
            onChange={handleInputChange}
            error={errors.title}
          />
        </div>
        
        <div className="lg:col-span-2">
          <InputField
            label="Excerpt"
            name="excerpt"
            as="textarea"
            placeholder="Write a brief description of your blog post"
            required
            value={formData.excerpt}
            onChange={handleInputChange}
            error={errors.excerpt}
          />
        </div>

        <InputField
          label="Category"
          name="category"
          placeholder="e.g., Technology, Business, Travel"
          required
          value={formData.category}
          onChange={handleInputChange}
          error={errors.category}
        />

        <InputField
          label="Read Time"
          name="readTime"
          placeholder="e.g., 5 min read"
          required
          value={formData.readTime}
          onChange={handleInputChange}
          error={errors.readTime}
        />

        <InputField
          label="Author Name"
          name="author"
          placeholder="Author name"
          required
          value={formData.author}
          onChange={handleInputChange}
          error={errors.author}
        />

        <InputField
          label="Author Role"
          name="role"
          placeholder="e.g., Senior Developer, CEO"
          required
          value={formData.role}
          onChange={handleInputChange}
          error={errors.role}
        />
      </div>
    </div>
  ), [formData, handleInputChange, errors]);

  const thumbnailSection = useMemo(() => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-emerald-600" />
        Blog Thumbnail
      </h2>
      
      {thumbnailPreview ? (
        <div className="relative rounded-xl overflow-hidden">
          <img
            src={thumbnailPreview}
            alt="Thumbnail preview"
            className="w-full h-64 object-cover"
          />
          <button
            type="button"
            onClick={removeThumbnail}
            className="absolute top-3 right-3 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-sm">
            Click the X to remove
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors">
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-sm font-medium text-gray-900 mb-2">Upload thumbnail</h3>
          <p className="text-sm text-gray-600 mb-4">
            PNG, JPG, GIF up to 10MB
          </p>
          <label className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl cursor-pointer inline-flex items-center gap-2 transition-colors">
            <Upload className="w-4 h-4" />
            Choose file
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailSelect}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  ), [thumbnailPreview, handleThumbnailSelect, removeThumbnail]);

  if (initialLoad && isEditing) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleGoBack}
          className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Edit Blog' : 'Create New Blog'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditing ? 'Update your blog post' : 'Share your thoughts with the world'}
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Basic Information */}
        {basicInfoSection}

        {/* Thumbnail Upload */}
        {thumbnailSection}

        {/* Content Editor */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Tag className="w-5 h-5 text-emerald-600" />
            Blog Content <span className="text-red-500">*</span>
          </h2>
          <BlogEditor
            data={formData.content}
            onChange={handleEditorChange}
            placeholder="Start writing your blog content..."
          />
          {errors.content && (
            <p className="mt-3 text-sm text-red-600 flex items-center gap-1">
              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
              {errors.content}
            </p>
          )}
        </div>

        {/* Publishing Options */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            Publishing Options
          </h2>
          
          <div className="space-y-4">
            <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleInputChange}
                className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">
                  Publish immediately
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  Make this blog visible to readers right away
                </p>
              </div>
            </label>
            
            <div className="p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl border border-blue-200">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    {formData.isPublished ? 'Publishing Status' : 'Draft Status'}
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    {formData.isPublished 
                      ? 'This blog will be published and visible to readers immediately after saving.'
                      : 'This blog will be saved as a draft. You can publish it later from the blogs list.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={handleGoBack}
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium"
            >
              Cancel
            </button>
            
            <button
              type="button"
              onClick={() => handleSave(false)}
              disabled={saving || uploadingThumbnail}
              className="px-6 py-3 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50 font-medium"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Draft'}
            </button>
            
            <button
              type="button"
              onClick={() => handleSave(true)}
              disabled={saving || uploadingThumbnail}
              className="px-6 py-3 text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50 font-medium shadow-lg"
            >
              <Eye className="w-4 h-4" />
              {saving ? 'Publishing...' : 'Publish Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateBlog; 