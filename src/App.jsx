import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { BlogProvider } from './contexts/BlogContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './layouts/Layout';
import AdminLayout from './layouts/AdminLayout';
import HeroSection from './components/HeroSection';
import AllocationConundrum from './components/AllocationConundrum';
import CoreCompetency from './components/CoreCompetency';
import DistinctiveApproach from './components/DistinctiveApproach';
import CEOWordSection from './components/CEOWordSection';
import LeadershipPortfolios from './components/LeadershipPortfolios';
import TrendingBlogs from './components/TrendingBlogs';
import ClientTestimonials from './components/ClientTestimonials';
import QuizSection from './components/QuizSection';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import QuizPage from './pages/QuizPage';
import AboutUsPage from './pages/AboutUsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ContactPage from './pages/ContactPage';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminBlogs from './pages/AdminBlogs';
import AdminCreateBlog from './pages/AdminCreateBlog';






// Home Page Component
const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <AllocationConundrum />
      <CoreCompetency />
      <DistinctiveApproach />
      <CEOWordSection />
      <LeadershipPortfolios />
      <TrendingBlogs />
      <ClientTestimonials />
      <QuizSection />
    </Layout>
  );
};

function App() {
  return (
    
    <AuthProvider>
      <BlogProvider>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Admin Login Route */}
            <Route path="/admin" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            } />

            <Route path="/admin/blogs" element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminBlogs />
                </AdminLayout>
              </ProtectedRoute>
            } />

            <Route path="/admin/blogs/create" element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminCreateBlog />
                </AdminLayout>
              </ProtectedRoute>
            } />

            <Route path="/admin/blogs/edit/:id" element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminCreateBlog />
                </AdminLayout>
              </ProtectedRoute>
            } />
          </Routes>

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: 'green',
                  secondary: 'black',
                },
              },
            }}
          />
        </div>
      </BlogProvider>
    </AuthProvider>
  );
}

export default App;
