import React from 'react';
import Layout from '../layouts/Layout';

const CareersPage = () => {
  const openPositions = [
    {
      title: "Investment Analyst",
      department: "Research",
      location: "Mumbai",
      type: "Full-time",
      experience: "2-5 years"
    },
    {
      title: "Portfolio Manager",
      department: "Fund Management",
      location: "Delhi",
      type: "Full-time",
      experience: "5-8 years"
    },
    {
      title: "Risk Analyst",
      department: "Risk Management",
      location: "Bangalore",
      type: "Full-time",
      experience: "3-6 years"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-[#1e3e46] to-[#0c1c20]">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            Join Our Team
          </h1>

          {/* Why Join Us Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Innovation",
                description: "Be part of a team that's revolutionizing investment management",
                icon: "💡"
              },
              {
                title: "Growth",
                description: "Continuous learning and development opportunities",
                icon: "📈"
              },
              {
                title: "Culture",
                description: "Collaborative environment focused on excellence",
                icon: "🤝"
              }
            ].map((benefit, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Open Positions */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8">Open Positions</h2>
            <div className="grid grid-cols-1 gap-6">
              {openPositions.map((position, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{position.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="text-emerald-400">{position.department}</span>
                        <span className="text-gray-300">• {position.location}</span>
                        <span className="text-gray-300">• {position.type}</span>
                        <span className="text-gray-300">• {position.experience}</span>
                      </div>
                    </div>
                    <button className="mt-4 md:mt-0 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full transition-colors duration-200">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Don't see a suitable position?</h2>
            <p className="text-gray-300 mb-6">
              We're always looking for talented individuals. Send your resume to{' '}
              <a href="mailto:careers@growthfiniti.com" className="text-emerald-400 hover:text-emerald-300">
                careers@growthfiniti.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CareersPage; 