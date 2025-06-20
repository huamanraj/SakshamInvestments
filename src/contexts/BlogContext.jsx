import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { databases, storage, DATABASE_ID, COLLECTION_ID, STORAGE_BUCKET_ID } from '../lib/appwrite';
import { ID, Query } from 'appwrite';
import { toast } from 'react-hot-toast';

const BlogContext = createContext();

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all blogs
  const fetchBlogs = useCallback(async (includeUnpublished = false) => {
    try {
      setLoading(true);
      const queries = includeUnpublished ? [] : [Query.equal('isPublished', true)];
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        queries
      );
      setBlogs(response.documents);
      return response.documents;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to fetch blogs');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single blog
  const fetchBlog = useCallback(async (blogId) => {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        COLLECTION_ID,
        blogId
      );
      return response;
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error('Failed to fetch blog');
      return null;
    }
  }, []);

  // Create new blog
  const createBlog = useCallback(async (blogData) => {
    try {
      setLoading(true);

      const blogPayload = {
        ...blogData,
        publishedAt: blogData.publishedAt || new Date().toISOString()
      };

      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        blogPayload
      );

      setBlogs(prev => [response, ...prev]);
      return response;
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update blog
  const updateBlog = useCallback(async (blogId, blogData) => {
    try {
      setLoading(true);

      const blogPayload = {
        ...blogData
      };

      const response = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        blogId,
        blogPayload
      );

      setBlogs(prev => prev.map(blog => 
        blog.$id === blogId ? response : blog
      ));
      return response;
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete blog
  const deleteBlog = useCallback(async (blogId, thumbnailId = null) => {
    try {
      setLoading(true);

      // Delete thumbnail if exists
      if (thumbnailId) {
        try {
          await storage.deleteFile(STORAGE_BUCKET_ID, thumbnailId);
        } catch (error) {
          console.warn('Failed to delete thumbnail:', error);
        }
      }

      await databases.deleteDocument(
        DATABASE_ID,
        COLLECTION_ID,
        blogId
      );

      setBlogs(prev => prev.filter(blog => blog.$id !== blogId));
      toast.success('Blog deleted successfully!');
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get thumbnail URL
  const getThumbnailUrl = useCallback((thumbnailId) => {
    if (!thumbnailId) return null;
    try {
      return storage.getFileView(STORAGE_BUCKET_ID, thumbnailId);
    } catch (error) {
      console.error('Error getting thumbnail URL:', error);
      return null;
    }
  }, []);

  const value = {
    blogs,
    loading,
    fetchBlogs,
    fetchBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    getThumbnailUrl
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
}; 