import React, { useState } from "react";
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
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
    >
      {/* Logo Icon */}
      <div className="w-8 h-8 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 text-white"
          fill="currentColor"
        >
          <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
          <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="font-medium text-white text-lg">Growthfiniti</span>
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
      name: "PMS",
      link: "/pms",
    },
    {
      name: "Careers",
      link: "/careers",
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

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody className="bg-transparent">
          <GrowthfinitiLogo />
          <NavItems 
            items={navItems} 
            className="text-white"
            onItemClick={() => {}}
          />
          <div className="flex items-center gap-4">
            <NavbarButton 
              variant="gradient"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              href="https://growthfiniti.investwell.app/app/#/login"
            >
              Login
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav className="bg-transparent">
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
            className="bg-slate-800/95 backdrop-blur-md border border-slate-700/50"
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
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="gradient"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-200"
                href="https://growthfiniti.investwell.app/app/#/login"
              >
                Login
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
};

export default NewNavbar; 