import React from 'react';
import Layout from '../layouts/Layout';

const PrivacyPolicyPage = () => {
  return (
    <Layout>
      <div className="min-h-screen" style={{ backgroundColor: '#09252c' }}>
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Privacy <span className="text-emerald-400">Policy</span>
          </h1>
          
          <div className="space-y-8">
            {/* Last Updated Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <p className="text-gray-300">Last Updated: March 15, 2024</p>
            </div>

            {/* Introduction Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  At Saksham Investments ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our investment advisory services.
                </p>
                <p>
                  Please read this Privacy Policy carefully. By accessing or using our services, you agree to this Privacy Policy and our Terms of Service.
                </p>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
              <div className="space-y-4 text-gray-300">
                <h3 className="text-xl font-medium text-emerald-400 mb-2">2.1 Personal Information</h3>
                <p>We may collect the following personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name, email address, and contact information</li>
                  <li>PAN card details and other KYC documents</li>
                  <li>Bank account information for transactions</li>
                  <li>Investment preferences and financial goals</li>
                  <li>Communication history with our team</li>
                </ul>

                <h3 className="text-xl font-medium text-emerald-400 mb-2">2.2 Automatically Collected Information</h3>
                <p>When you visit our website, we automatically collect:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Device information and IP address</li>
                  <li>Browser type and version</li>
                  <li>Usage patterns and preferences</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <div className="space-y-4 text-gray-300">
                <p>We use your information for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide and maintain our investment advisory services</li>
                  <li>Process your transactions and maintain your account</li>
                  <li>Comply with regulatory requirements and legal obligations</li>
                  <li>Send important updates and communications</li>
                  <li>Improve our services and user experience</li>
                  <li>Detect and prevent fraudulent activities</li>
                </ul>
              </div>
            </div>

            {/* Data Security */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information. However, no electronic transmission or storage system is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
              <div className="space-y-4 text-gray-300">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your information</li>
                  <li>Withdraw consent for data processing</li>
                  <li>Receive a copy of your data</li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-4">6. Contact Us</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p>Email: privacy@sakshaminvestments.com</p>
                  <p>Phone: +91 XXXXXXXXXX</p>
                  <p>Address: [Your Business Address]</p>
                </div>
              </div>
            </div>

            {/* AMFI Registration Notice */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-semibold text-white mb-2">AMFI Registered</h2>
                  <p className="text-emerald-400 font-medium">Mutual Fund Distributor</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-emerald-400/10 text-emerald-400 rounded-full text-sm font-medium">
                    AMFI Registered
                  </span>
                  <span className="px-4 py-2 bg-emerald-400/10 text-emerald-400 rounded-full text-sm font-medium">
                    Mutual Fund Distributor
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage; 