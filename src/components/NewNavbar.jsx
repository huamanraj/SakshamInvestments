import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./ui/resizable-navbar";

// Custom Growthfiniti Logo Component
const GrowthfinitiLogo = () => {
  return (
    <a
      href="/"
      className="relative z-20 mr-4 flex items-center  "
    >
      {/* Logo Image */}
      <img
        src="/logo.png"
        alt="Growthfiniti Logo"
        className="h-14 w-auto"
      />
    </a>
  );
};

const NewNavbar = () => {
  const navItems = [
    {
      name: "About Us",
      link: "/about-us",
    },
    {
      name: "Factor Investing",
      link: "/factor-investing",
    },
    {
      name: "Mutual Funds",
      link: "/mutual-funds",
    },
    {
      name: "Blog",
      link: "/blog",
    },
    {
      name: "Careers",
      link: "/careers",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // WhatsApp chat function
  const openWhatsAppChat = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('WhatsApp button clicked'); // Debug log
    
    const phoneNumber = "918051733380";
    const message = "Hi! Just came from website!";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    console.log('Opening WhatsApp URL:', whatsappUrl); // Debug log
    
    // Try multiple methods to ensure it works
    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      // Fallback: try direct location change
      window.location.href = whatsappUrl;
    }
  };

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <GrowthfinitiLogo />
          <NavItems 
            items={navItems} 
            className="text-white"
            onItemClick={() => {}}
          />
          <div className="flex items-center gap-4">
            <button
              onClick={openWhatsAppChat}
              className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-2 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 hover:-translate-y-0.5 cursor-pointer relative z-[70]"
              type="button"
              style={{ cursor: 'pointer' }}
            >
              <MessageCircle size={18} />
            </button>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <GrowthfinitiLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className="bg-[#1e3e46] border border-white/10"
          >
            <div className="flex flex-col w-full space-y-4 p-4">
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-emerald-400 transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-white/10 text-lg font-medium"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4">
                <button
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    openWhatsAppChat(e);
                  }}
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl"
                  type="button"
                >
                  <MessageCircle size={20} />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
};

export default NewNavbar; 