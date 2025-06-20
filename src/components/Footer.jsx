import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us / Contact Links */}
        <div className="space-y-2">
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul>
            <li><a href="/about-us" className="hover:text-white">About Us</a></li>
            <li><a href="/careers" className="hover:text-white">Careers</a></li>
            <li><a href="/blog" className="hover:text-white">Blog</a></li>
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        {/* Investment Categories */}
        <div className="space-y-2">
          <h3 className="text-white font-semibold mb-4">Investments</h3>
          <ul>
            <li><a href="/pms" className="hover:text-white">PMS</a></li>
            <li><a href="#" className="hover:text-white">Factor Investing</a></li>
            <li><a href="#" className="hover:text-white">Fixed Deposit</a></li>
            <li><a href="#" className="hover:text-white">Loan</a></li>
          </ul>
        </div>

        {/* Legal and Other Links */}
        <div className="space-y-2">
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <ul>
            <li><a href="/faqs" className="hover:text-white">FAQs</a></li>
            <li><a href="/privacy-policy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Disclaimer</a></li>
          </ul>
        </div>

        {/* Contact Info / Social Media */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
          {/* Social Media Icons - Placeholder */}
          <div className="flex space-x-4">
            <a href="https://in.linkedin.com/company/growthfiniti" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin"></i>LinkedIn</a> {/* You'd use an actual icon library or SVG here */}
            <a href="https://x.com/i/flow/login?redirect_after_login=%2Fgrowthfiniti" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i>Twitter</a> {/* You'd use an actual icon library or SVG here */}
          </div>
          <p className="text-sm">Email: <a href="mailto:compliance@growthfiniti.com" className="hover:underline">compliance@growthfiniti.com</a></p>
          <p className="text-sm">Phone: +91 77159 82515</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-center text-sm">
        <p className="mb-2">
          Growthfiniti Wealth Pvt. Ltd. is a SEBI-registered Portfolio Manager (INP000009418), AMFI Registered Mutual Fund Distributor (ARN-168766), APMI Registered PMS Distributor (APRN00443), and an Associated Person with Motilal Oswal Financial Services Limited. CIN: U65991MH2010PTC198452.
        </p>
        <p className="mb-2">
          Investments in securities are subject to market risks. Please read all scheme and PMS-related documents carefully before investing. Past performance is not indicative of future results. SEBI does not verify or endorse portfolio management strategies.
        </p>
        <p className="mb-2">
          For investor grievances, mail us at <a href="mailto:compliance@growthfiniti.com" className="hover:underline">compliance@growthfiniti.com</a> or call us at +91 77159 82515. You can also lodge your grievances with SEBI at <a href="https://scores.gov.in" target="_blank" rel="noopener noreferrer" className="hover:underline">https://scores.gov.in</a>.
        </p>
        <p className="mb-2">
          Direct on-boarding - As per SEBI Circular dated April 28, 2025, clients have an option to be on-boarded directly by the Portfolio Manager without intermediation of persons engaged in distribution services. For more details, you may refer to the Disclosure Document available on our website or contact us at<a href="mailto:compliance@growthfiniti.com" className="hover:underline">compliance@growthfiniti.com</a>.
        </p>
        <p className="mb-2">
          CIN No - U65991MH2010PTC198452, SEBI PMS Reg. No - INP000009418 ©2025 Growthfiniti.com. All rights reserved | <a href="#" className="hover:underline">Disclaimer</a>
        </p>
        <p className="mb-2">
          AMFI REGISTERED DISTRIBUTORS, ARN 168766 Validity 30 December 2025
        </p>
        <p className="mb-2">
          2024 GROWTHFINITI. ALL RIGHTS RESERVED.
        </p>
        <p>
          DESIGN & DEVELOPED BY <a href="https://leo9studio.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">LEO9STUDIO</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer; 