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
      className="relative z-20 mr-4 flex items-center px-2 py-1"
    >
      {/* Logo Image */}
      <img
        src="/logo.png"
        alt="Growthfiniti Logo"
        className="h-10 w-auto"
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
      name: "Blog",
      link: "/blog",
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
            className="bg-[#1e3e46]/90 backdrop-blur-md border border-[#1e3e46]/30"
            style={{
              background: 'rgba(30, 62, 70, 0.9)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(30, 62, 70, 0.3)',
              boxShadow: '0 8px 32px rgba(30, 62, 70, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-white hover:text-emerald-400 transition-colors duration-200 py-2"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4 pt-4">
              <button
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  openWhatsAppChat(e);
                }}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-2 rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                type="button"
                style={{ cursor: 'pointer' }}
              >
                <MessageCircle size={18} />
                WhatsApp
              </button>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
};

export default NewNavbar; 