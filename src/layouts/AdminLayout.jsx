import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  LogOut, 
  User,
  Menu,
  X,
  ChevronLeft,
  Mail,
  ClipboardList,
  Briefcase
} from 'lucide-react';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Close sidebar on route change for mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false); // Reset mobile sidebar state on desktop
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/admin');
  };

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      current: location.pathname === '/admin/dashboard'
    },
    {
      name: 'All Blogs',
      href: '/admin/blogs',
      icon: FileText,
      current: location.pathname === '/admin/blogs'
    },
    {
      name: 'Create Blog',
      href: '/admin/blogs/create',
      icon: PlusCircle,
      current: location.pathname === '/admin/blogs/create' || location.pathname.includes('/admin/blogs/edit/')
    },
    {
      name: 'Contacts',
      href: '/admin/contacts',
      icon: Mail,
      current: location.pathname === '/admin/contacts'
    },
    {
      name: 'Quiz Data',
      href: '/admin/quiz-data',
      icon: ClipboardList,
      current: location.pathname === '/admin/quiz-data'
    },
    {
      name: 'Job Applications',
      href: '/admin/job-applications',
      icon: Briefcase,
      current: location.pathname === '/admin/job-applications'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 bg-white shadow-xl border-r border-gray-200
        transform transition-all duration-300 ease-in-out
        lg:z-40
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'}
        w-64
      `}>
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 min-h-[73px]">
            <div className={`flex items-center transition-all duration-300 ${sidebarCollapsed ? 'lg:justify-center' : ''}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">SI</span>
              </div>
              {!sidebarCollapsed && (
                <span className="ml-3 text-xl font-bold text-gray-900 whitespace-nowrap">Admin Panel</span>
              )}
            </div>
            
            {/* Desktop collapse button */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Mobile close button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-3 py-3 text-sm font-medium rounded-xl 
                    transition-all duration-200 group relative
                    ${item.current
                      ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                    ${sidebarCollapsed ? 'lg:justify-center lg:px-2' : ''}
                  `}
                  title={sidebarCollapsed ? item.name : ''}
                >
                  <Icon className={`
                    h-5 w-5 flex-shrink-0
                    ${item.current ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-500'}
                  `} />
                  {!sidebarCollapsed && (
                    <span className="ml-3 truncate">{item.name}</span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 hidden lg:block">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200">
            {!sidebarCollapsed ? (
              <>
                <div className="flex items-center mb-3 px-3 py-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div className="ml-3 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'Admin'}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email || 'admin@example.com'}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors duration-200"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Sign out
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-center">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-emerald-600" />
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex justify-center w-full p-2 text-red-600 rounded-xl hover:bg-red-50 transition-colors duration-200 group relative"
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 hidden lg:block">
                    Sign out
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`min-h-screen transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'}`}>
        {/* Top header */}
        <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
              
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-gray-900">
                  {navigationItems.find(item => item.current)?.name || 'Admin Panel'}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                View Site
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-73px)]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 