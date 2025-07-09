import React, { useRef, useState } from 'react';
import Layout from '../layouts/Layout';
import { toast } from 'react-hot-toast';
import { databases, storage } from '../lib/appwrite';
import { ID } from 'appwrite';
import { 
  DATABASE_ID, 
  JOB_APPLICATIONS_COLLECTION_ID, 
  STORAGE_BUCKET_ID 
} from '../lib/appwrite';

const CareersPage = () => {
  const benefitsRef = useRef(null);
  const applyRef = useRef(null);
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    const resumeFile = data.resume;

    if (!resumeFile || resumeFile.size === 0) {
      toast.error('Please upload your resume.');
      setLoading(false);
      return;
    }
    
    if (!STORAGE_BUCKET_ID || !DATABASE_ID || !JOB_APPLICATIONS_COLLECTION_ID) {
        toast.error('Appwrite is not configured correctly. Please contact support.');
        setLoading(false);
        return;
    }

    try {
      // 1. Upload resume to Appwrite Storage
      const fileResponse = await storage.createFile(
        STORAGE_BUCKET_ID,
        ID.unique(),
        resumeFile
      );
      const resumeFileId = fileResponse.$id;

      // 2. Create document in Appwrite Database
      await databases.createDocument(
        DATABASE_ID,
        JOB_APPLICATIONS_COLLECTION_ID,
        ID.unique(),
        {
          name: data.name,
          email: data.email,
          coverLetter: data.message,
          resumeFileId: resumeFileId
        }
      );

      toast.success('Application sent successfully!');
      formRef.current.reset();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to send application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen pt-10 bg-[#0c1c20] text-white">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Careers <span className="text-[#40B8A6]">With Us</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-300 text-lg md:text-xl mb-10">
            Build a rewarding career packed with purpose, stability and opportunities for growth. Join our budding Saksham Investments family today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollToSection(benefitsRef)}
              className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection(applyRef)}
              className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all"
            >
              Apply Now
            </button>
          </div>
        </div>

        {/* Benefits Section */}
        <div ref={benefitsRef} className="container mx-auto px-4 md:px-8 py-16">
          <div className="w-full md:w-[70%] mx-auto bg-[#0c1c20]/80 rounded-[2rem] p-8 backdrop-blur-lg border border-white/10 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
              Benefits of being a part of <span className="text-[#40B8A6]">Saksham Investments</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
              {/* Growth */}
              <div className="bg-gradient-to-br from-sky-300 to-sky-500 rounded-2xl p-6 flex flex-col justify-between min-h-[140px]">
                <h3 className="text-white font-bold text-lg mb-2">Growth</h3>
                <p className="text-white text-sm font-medium leading-relaxed">Scale high and scale faster</p>
              </div>
              {/* Goals */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 flex flex-col justify-between min-h-[140px]">
                <h3 className="text-white font-bold text-lg mb-2">Goals</h3>
                <p className="text-white text-sm font-medium leading-relaxed">Achieve your goals and aspirations</p>
              </div>
              {/* Rewards */}
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-6 flex flex-col justify-between min-h-[140px]">
                <h3 className="text-white font-bold text-lg mb-2">Rewards</h3>
                <p className="text-white text-sm font-medium leading-relaxed">Enjoy all the perks and benefits</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Apply / Contact Section */}
        <div ref={applyRef} className="container mx-auto px-4 md:px-8 py-16">
          <div className="w-full md:w-[70%] mx-auto bg-[#0c1c20]/80 rounded-[2rem] p-8 backdrop-blur-lg border border-white/10 shadow-2xl">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Apply For a Position</h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                We can't wait to hear from you! Please fill out the form below to apply.
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 focus:ring-2 focus:ring-[#40B8A6] focus:border-[#40B8A6] transition-colors duration-200"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 focus:ring-2 focus:ring-[#40B8A6] focus:border-[#40B8A6] transition-colors duration-200"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-300 mb-2">
                  Upload Your Resume
                </label>
                <input
                  type="file"
                  name="resume"
                  id="resume"
                  required
                  className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#40B8A6]/20 file:text-[#40B8A6] hover:file:bg-[#40B8A6]/30"
                />
              </div>

              <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Cover Letter / Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 focus:ring-2 focus:ring-[#40B8A6] focus:border-[#40B8A6] transition-colors duration-200 resize-none"
                    placeholder="Tell us why you're a great fit..."
                  ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-[#40B8A6]/80 hover:bg-[#40B8A6] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center ${
                    loading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CareersPage; 