import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { databases, DATABASE_ID, CONTACTS_COLLECTION_ID } from '../lib/appwrite';
import { ID } from 'appwrite';
import Layout from '../layouts/Layout';

const ContactPage = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(formRef.current);
      const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        createdAt: new Date().toISOString()
      };

      await databases.createDocument(
        DATABASE_ID,
        CONTACTS_COLLECTION_ID,
        ID.unique(),
        contactData
      );

      toast.success('Message sent successfully! We will get back to you soon.');
      formRef.current.reset();
    } catch (error) {
      console.error('Error saving contact:', error);
      toast.error('Failed to send message. Please try again.');
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
            Get In <span className="text-[#40B8A6]">Touch</span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-300 text-lg md:text-xl">
            Have questions about our services? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Form and Info Section */}
        <div className="container mx-auto px-4 md:px-8 pb-16">
          <div className="w-full lg:w-[80%] mx-auto bg-white rounded-[2rem] p-8 md:p-12 backdrop-blur-lg border border-gray-200 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#40B8A6] focus:border-[#40B8A6] transition-colors duration-200 text-gray-900"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#40B8A6] focus:border-[#40B8A6] transition-colors duration-200 text-gray-900"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#40B8A6] focus:border-[#40B8A6] transition-colors duration-200 text-gray-900"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#40B8A6] focus:border-[#40B8A6] transition-colors duration-200 resize-none text-gray-900"
                    placeholder="Write your message here..."
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
                      'Send Message'
                    )}
                  </button>
                </div>

                {/* Or divider */}
                <div className="flex items-center justify-center">
                  <div className="border-t border-gray-300 flex-grow"></div>
                  <span className="mx-4 text-gray-500 text-sm">OR</span>
                  <div className="border-t border-gray-300 flex-grow"></div>
                </div>

                {/* Google Form Button */}
                <div>
                  <a
                    href="https://forms.gle/7kcMG9wWtEngh4gi9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white border-2 border-[#40B8A6] text-[#40B8A6] hover:bg-[#40B8A6] hover:text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center group"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22,11V3H14L11,6H3A2,2 0 0,0 1,8V18A2,2 0 0,0 3,20H21A2,2 0 0,0 23,18V13H22V11M22,7V9H16V7H22M8,12H16V14H8V12M8,16H13V18H8V16Z"/>
                    </svg>
                                         Schedule Investment Consultation
                    <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </form>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#40B8A6]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#40B8A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#40B8A6]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#40B8A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">info@example.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#40B8A6]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#40B8A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-600">123 Business Street<br />New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage; 