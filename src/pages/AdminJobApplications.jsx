import React, { useState, useEffect, useMemo } from 'react';
import { databases, storage, DATABASE_ID, JOB_APPLICATIONS_COLLECTION_ID, STORAGE_BUCKET_ID } from '../lib/appwrite';
import { Query } from 'appwrite';
import { toast } from 'react-hot-toast';
import { 
  Mail, 
  Calendar, 
  User, 
  MessageSquare, 
  Trash2,
  Search,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Briefcase
} from 'lucide-react';

const ApplicationCard = React.memo(({ application, onDelete }) => {
  const [deleting, setDeleting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    
    setDeleting(true);
    try {
      // Also delete the resume file from storage
      await storage.deleteFile(STORAGE_BUCKET_ID, application.resumeFileId);
      await databases.deleteDocument(DATABASE_ID, JOB_APPLICATIONS_COLLECTION_ID, application.$id);
      toast.success('Application deleted successfully');
      onDelete(application.$id);
    } catch (error) {
      console.error('Error deleting application:', error);
      toast.error('Failed to delete application');
    } finally {
      setDeleting(false);
    }
  };
  
  const handleDownloadResume = () => {
    try {
      const downloadUrl = storage.getFileDownload(STORAGE_BUCKET_ID, application.resumeFileId);
      window.open(downloadUrl, '_blank');
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast.error('Failed to download resume.');
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const isLongMessage = application.coverLetter.length > 200;

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{application.name}</h3>
            <p className="text-emerald-600 text-sm flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {application.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <button
                onClick={handleDownloadResume}
                className="p-2 text-gray-400 hover:text-emerald-600 rounded-xl hover:bg-emerald-50 transition-colors"
                title="Download resume"
            >
                <Download className="w-4 h-4" />
            </button>
            <button
                onClick={handleDelete}
                disabled={deleting}
                className="p-2 text-gray-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50"
                title="Delete application"
            >
                {deleting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            </button>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700">Cover Letter</h4>
            {isLongMessage && (
              <button
                onClick={toggleExpanded}
                className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
              >
                {isExpanded ? 'Show Less' : 'Read More'}
                {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            )}
          </div>
          <div className={`bg-gray-50 rounded-lg p-3 transition-all duration-300 relative ${
            isExpanded ? 'max-h-none' : 'max-h-32 overflow-hidden'
          }`}>
            <p className="text-gray-800 text-sm whitespace-pre-wrap">{application.coverLetter}</p>
            {!isExpanded && isLongMessage && (
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none rounded-b-lg"></div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(application.$createdAt)}
          </span>
          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
            New Applicant
          </span>
        </div>
      </div>
    </div>
  );
});
ApplicationCard.displayName = 'ApplicationCard';

const LoadingSkeleton = React.memo(() => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 animate-pulse">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
            <div>
              <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-40"></div>
            </div>
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded-xl"></div>
        </div>
        <div className="space-y-3">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    ))}
  </div>
));
LoadingSkeleton.displayName = 'LoadingSkeleton';

const AdminJobApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalApplications, setTotalApplications] = useState(0);

  const fetchApplications = async (page = 1, limit = itemsPerPage) => {
    setLoading(true);
    try {
      const offset = (page - 1) * limit;
      const response = await databases.listDocuments(
        DATABASE_ID,
        JOB_APPLICATIONS_COLLECTION_ID,
        [Query.orderDesc('$createdAt'), Query.limit(limit), Query.offset(offset)]
      );
      setApplications(response.documents);
      setTotalApplications(response.total);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handleDeleteApplication = (appId) => {
    setApplications(prev => prev.filter(app => app.$id !== appId));
    setTotalApplications(prev => prev - 1);
  };
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const filteredApplications = useMemo(() => {
    if (!searchTerm) return applications;
    return applications.filter(app =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [applications, searchTerm]);

  const totalPages = Math.ceil(totalApplications / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalApplications);

  if (loading && applications.length === 0) {
    return (
        <div className="space-y-6">
            <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="h-10 bg-gray-200 rounded w-64"></div>
            </div>
            <LoadingSkeleton />
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
          <p className="text-gray-600 mt-1">
            Review and manage job applications ({totalApplications} total)
          </p>
        </div>
        <button
          onClick={() => fetchApplications(1, itemsPerPage)}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl transition-colors shadow-lg"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          />
        </div>

      {filteredApplications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredApplications.map((app) => (
            <ApplicationCard 
              key={app.$id} 
              application={app} 
              onDelete={handleDeleteApplication}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'No applications found' : 'No job applications yet'}
          </h3>
          <p className="text-gray-600">
            {searchTerm 
              ? 'Try adjusting your search terms' 
              : 'New applications will appear here.'
            }
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-600">
            Showing {startIndex} to {endIndex} of {totalApplications} applications
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <select
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          >
            <option value={6}>6 per page</option>
            <option value={12}>12 per page</option>
            <option value={24}>24 per page</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default AdminJobApplications; 