import React, { useState, useEffect, useMemo } from 'react';
import { databases, DATABASE_ID, CONTACTS_COLLECTION_ID } from '../lib/appwrite';
import { Query } from 'appwrite';
import { toast } from 'react-hot-toast';
import { 
  Mail, 
  Calendar, 
  User, 
  MessageSquare, 
  Trash2,
  Search,
  Filter,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Memoized ContactCard component
const ContactCard = React.memo(({ contact, onDelete }) => {
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
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    
    setDeleting(true);
    try {
      await databases.deleteDocument(DATABASE_ID, CONTACTS_COLLECTION_ID, contact.$id);
      toast.success('Contact deleted successfully');
      onDelete(contact.$id);
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact');
    } finally {
      setDeleting(false);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const isLongMessage = contact.message.length > 200;

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
            <p className="text-emerald-600 text-sm flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {contact.email}
            </p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="p-2 text-gray-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50"
          title="Delete contact"
        >
          {deleting ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            Subject
          </h4>
          <p className="text-gray-900 font-medium">{contact.subject}</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700">Message</h4>
            {isLongMessage && (
              <button
                onClick={toggleExpanded}
                className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-3 h-3" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3" />
                    Read More
                  </>
                )}
              </button>
            )}
          </div>
          <div className={`bg-gray-50 rounded-lg p-3 transition-all duration-300 relative ${
            isExpanded ? 'max-h-none' : 'max-h-32 overflow-hidden'
          }`}>
            <p className="text-gray-800 text-sm whitespace-pre-wrap">{contact.message}</p>
            {!isExpanded && isLongMessage && (
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none rounded-b-lg"></div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(contact.createdAt)}
          </span>
          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
            New
          </span>
        </div>
      </div>
    </div>
  );
});

ContactCard.displayName = 'ContactCard';

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
          <div className="w-8 h-8 bg-gray-200 rounded-xl"></div>
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

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalContacts, setTotalContacts] = useState(0);

  const fetchContacts = async (page = 1, limit = itemsPerPage) => {
    try {
      setLoading(true);
      const offset = (page - 1) * limit;
      
      const queries = [
        Query.orderDesc('createdAt'),
        Query.limit(limit),
        Query.offset(offset)
      ];

      const response = await databases.listDocuments(
        DATABASE_ID,
        CONTACTS_COLLECTION_ID,
        queries
      );
      
      setContacts(response.documents);
      setTotalContacts(response.total);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handleDeleteContact = (contactId) => {
    setContacts(prev => prev.filter(contact => contact.$id !== contactId));
    setTotalContacts(prev => prev - 1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const refreshContacts = () => {
    fetchContacts(currentPage, itemsPerPage);
  };

  const totalPages = Math.ceil(totalContacts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalContacts);

  // Client-side filtering for search (applied after server-side pagination)
  const filteredContacts = useMemo(() => {
    if (!searchTerm) return contacts;
    
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [contacts, searchTerm]);

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
          <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-gray-600 mt-1">
            Manage and respond to customer inquiries ({totalContacts} total)
          </p>
        </div>
        <button
          onClick={refreshContacts}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl transition-colors shadow-lg"
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
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name">By Name</option>
        </select>
        <select
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
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
          <div className="text-2xl font-bold text-gray-900">{totalContacts}</div>
          <div className="text-sm text-gray-600">Total Messages</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-emerald-600">{filteredContacts.length}</div>
          <div className="text-sm text-gray-600">Current Page</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="text-2xl font-bold text-blue-600">{totalPages}</div>
          <div className="text-sm text-gray-600">Total Pages</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Showing</div>
          <div className="text-lg font-bold text-purple-600">
            {totalContacts > 0 ? `${startIndex}-${endIndex}` : '0'}
          </div>
        </div>
      </div>

      {/* Contacts Grid */}
      {filteredContacts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <ContactCard 
              key={contact.$id} 
              contact={contact} 
              onDelete={handleDeleteContact}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'No contacts found' : 'No contact messages yet'}
          </h3>
          <p className="text-gray-600">
            {searchTerm 
              ? 'Try adjusting your search terms' 
              : 'Contact messages will appear here when customers reach out'
            }
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-600">
            Showing {startIndex} to {endIndex} of {totalContacts} contacts
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
                        ? 'bg-emerald-600 text-white border-emerald-600'
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

export default AdminContacts; 