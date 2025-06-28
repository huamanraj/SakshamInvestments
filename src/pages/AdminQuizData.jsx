import React, { useState, useEffect, useMemo } from 'react';
import { databases, storage, DATABASE_ID, QUIZ_COLLECTION_ID, STORAGE_BUCKET_ID } from '../lib/appwrite';
import { Query } from 'appwrite';
import { toast } from 'react-hot-toast';
import { 
  ClipboardList, 
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
  Phone,
  Mail,
  FileText,
  DollarSign
} from 'lucide-react';

// Memoized QuizCard component
const QuizCard = React.memo(({ quiz, onDelete }) => {
  const [deleting, setDeleting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [downloading, setDownloading] = useState(false);

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
    if (!window.confirm('Are you sure you want to delete this quiz response?')) return;
    
    setDeleting(true);
    try {
      // Delete the file if it exists
      if (quiz.portfolio_file_id) {
        try {
          await storage.deleteFile(STORAGE_BUCKET_ID, quiz.portfolio_file_id);
        } catch (fileError) {
          console.warn('File already deleted or not found:', fileError);
        }
      }
      
      // Delete the quiz response
      await databases.deleteDocument(DATABASE_ID, QUIZ_COLLECTION_ID, quiz.$id);
      toast.success('Quiz response deleted successfully');
      onDelete(quiz.$id);
    } catch (error) {
      console.error('Error deleting quiz response:', error);
      toast.error('Failed to delete quiz response');
    } finally {
      setDeleting(false);
    }
  };

  const handleFileDownload = async () => {
    if (!quiz.portfolio_file_id) return;
    
    setDownloading(true);
    try {
      const result = await storage.getFileDownload(STORAGE_BUCKET_ID, quiz.portfolio_file_id);
      
      // Create download link
      const link = document.createElement('a');
      link.href = result;
      link.download = `portfolio_${quiz.name.replace(/\s+/g, '_')}_${quiz.portfolio_file_id}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('File download started');
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Failed to download file');
    } finally {
      setDownloading(false);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  let parsedAnswers = {};
  try {
    parsedAnswers = JSON.parse(quiz.answers);
  } catch (e) {
    console.error('Error parsing answers:', e);
  }

  const questionLabels = {
    1: 'Why looking for wealth solution?',
    2: 'Priorities to achieve?',
    3: 'Current investments are mostly?',
    4: 'Investment portfolio size?',
    5: 'Your role with us?'
  };

  const hasAnswers = Object.keys(parsedAnswers).length > 0;

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <ClipboardList className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{quiz.name}</h3>
            <div className="flex flex-col gap-1 text-sm">
              <p className="text-blue-600 flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {quiz.email}
              </p>
              <p className="text-green-600 flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {quiz.phone}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {quiz.portfolio_file_id && (
            <button
              onClick={handleFileDownload}
              disabled={downloading}
              className="p-2 text-gray-400 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-colors disabled:opacity-50"
              title="Download portfolio file"
            >
              {downloading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
            </button>
          )}
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-2 text-gray-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50"
            title="Delete quiz response"
          >
            {deleting ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Quiz Answers */}
        {hasAnswers && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                Quiz Responses
              </h4>
              <button
                onClick={toggleExpanded}
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-3 h-3" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3" />
                    View Answers
                  </>
                )}
              </button>
            </div>
            
            <div className={`bg-gray-50 rounded-lg p-4 space-y-3 transition-all duration-300 ${
              isExpanded ? 'max-h-none' : 'max-h-32 overflow-hidden'
            }`}>
              {Object.entries(parsedAnswers).map(([questionId, answer]) => (
                <div key={questionId} className="text-sm">
                  <div className="font-medium text-gray-700 mb-1">
                    {questionLabels[questionId] || `Question ${questionId}:`}
                  </div>
                  <div className="text-gray-900 bg-white p-2 rounded border">
                    {answer}
                  </div>
                </div>
              ))}
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none rounded-b-lg"></div>
              )}
            </div>
          </div>
        )}

        {/* Portfolio File Info */}
        {quiz.portfolio_file_id && (
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-700">
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">Portfolio file attached</span>
              </div>
              <button
                onClick={handleFileDownload}
                disabled={downloading}
                className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full transition-colors disabled:opacity-50 flex items-center gap-1"
              >
                {downloading ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="w-3 h-3" />
                    Download
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(quiz.$createdAt)}
          </span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            Quiz Response
          </span>
        </div>
      </div>
    </div>
  );
});

QuizCard.displayName = 'QuizCard';

// Loading skeleton component
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
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-xl"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    ))}
  </div>
));

LoadingSkeleton.displayName = 'LoadingSkeleton';

const AdminQuizData = () => {
  const [quizResponses, setQuizResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalResponses, setTotalResponses] = useState(0);

  const fetchQuizResponses = async (page = 1, limit = itemsPerPage) => {
    try {
      setLoading(true);
      const offset = (page - 1) * limit;
      
      const queries = [
        Query.orderDesc('$createdAt'),
        Query.limit(limit),
        Query.offset(offset)
      ];

      const response = await databases.listDocuments(
        DATABASE_ID,
        QUIZ_COLLECTION_ID,
        queries
      );
      
      setQuizResponses(response.documents);
      setTotalResponses(response.total);
    } catch (error) {
      console.error('Error fetching quiz responses:', error);
      toast.error('Failed to load quiz responses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizResponses(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handleDeleteQuiz = (quizId) => {
    setQuizResponses(prev => prev.filter(quiz => quiz.$id !== quizId));
    setTotalResponses(prev => prev - 1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const refreshQuizData = () => {
    fetchQuizResponses(currentPage, itemsPerPage);
  };

  const totalPages = Math.ceil(totalResponses / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalResponses);

  // Client-side filtering for search
  const filteredQuizResponses = useMemo(() => {
    if (!searchTerm) return quizResponses;
    
    return quizResponses.filter(quiz =>
      quiz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.phone.includes(searchTerm)
    );
  }, [quizResponses, searchTerm]);

  // Statistics
  const stats = useMemo(() => {
    const withFiles = quizResponses.filter(quiz => quiz.portfolio_file_id).length;
    const withoutFiles = quizResponses.length - withFiles;
    
    return {
      total: totalResponses,
      withFiles,
      withoutFiles,
      currentPage: filteredQuizResponses.length
    };
  }, [quizResponses, totalResponses, filteredQuizResponses]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="flex gap-4 mb-6">
            <div className="h-10 bg-gray-200 rounded w-64"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quiz Responses</h1>
          <p className="text-gray-600 mt-1">
            Manage customer quiz submissions and portfolio uploads ({totalResponses} total)
          </p>
        </div>
        <button
          onClick={refreshQuizData}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors shadow-lg"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        <select
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          <option value={6}>6 per page</option>
          <option value={12}>12 per page</option>
          <option value={24}>24 per page</option>
          <option value={48}>48 per page</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Responses</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-blue-600">{stats.currentPage}</div>
          <div className="text-sm text-gray-600">Current Page</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-green-600">{stats.withFiles}</div>
          <div className="text-sm text-gray-600">With Portfolio</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-orange-600">{stats.withoutFiles}</div>
          <div className="text-sm text-gray-600">Without Portfolio</div>
        </div>
      </div>

      {/* Quiz Responses Grid */}
      {filteredQuizResponses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredQuizResponses.map((quiz) => (
            <QuizCard 
              key={quiz.$id} 
              quiz={quiz} 
              onDelete={handleDeleteQuiz}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'No quiz responses found' : 'No quiz responses yet'}
          </h3>
          <p className="text-gray-600">
            {searchTerm 
              ? 'Try adjusting your search terms' 
              : 'Quiz responses will appear here when users complete the quiz'
            }
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-600">
            Showing {startIndex} to {endIndex} of {totalResponses} responses
          </div>
          
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {/* First page */}
              {currentPage > 3 && (
                <>
                  <button
                    onClick={() => handlePageChange(1)}
                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    1
                  </button>
                  {currentPage > 4 && (
                    <span className="px-2 text-gray-400">...</span>
                  )}
                </>
              )}

              {/* Current page and neighbors */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = index + 1;
                } else if (currentPage <= 3) {
                  pageNumber = index + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + index;
                } else {
                  pageNumber = currentPage - 2 + index;
                }

                if (pageNumber < 1 || pageNumber > totalPages) return null;

                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                      currentPage === pageNumber
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {/* Last page */}
              {currentPage < totalPages - 2 && (
                <>
                  {currentPage < totalPages - 3 && (
                    <span className="px-2 text-gray-400">...</span>
                  )}
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQuizData; 