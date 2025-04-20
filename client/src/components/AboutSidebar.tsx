import React from 'react';
import { FaTimes, FaAward, FaUsers, FaHome, FaHandshake, FaChartLine } from 'react-icons/fa';

interface AboutSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutSidebar: React.FC<AboutSidebarProps> = ({ isOpen, onClose }) => {
  const achievements = [
    { number: '100+', label: 'Properties Listed', icon: FaHome },
    { number: '500+', label: 'Happy Clients', icon: FaUsers },
    { number: '95%', label: 'Success Rate', icon: FaChartLine },
    { number: '24/7', label: 'Customer Support', icon: FaHandshake },
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Company Founded',
      description: 'Housing Lord was established in Bhubaneswar, Odisha.'
    },
    {
      year: '2023',
      title: 'First 50 Properties',
      description: 'Successfully listed and managed 50+ properties in first quarter.'
    },
    {
      year: '2024',
      title: 'Digital Platform Launch',
      description: 'Launched our state-of-the-art digital platform for seamless property management.'
    },
    {
      year: '2024',
      title: 'Expansion Plans',
      description: 'Planning expansion to major cities across Odisha.'
    }
  ];

  return (
    <div 
      className={`fixed inset-y-0 right-0 w-full md:w-[600px] bg-background/95 backdrop-blur-lg border-l border-primary/10 shadow-xl transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-8">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/70 hover:text-white"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">About Housing Lord</h2>
          <p className="text-white/70 mb-6">
            Housing Lord is revolutionizing the rental property market in Odisha through technology, 
            transparency, and trust. Our platform connects property owners with verified tenants, 
            making the rental process seamless and secure.
          </p>
        </div>

        {/* Our Mission */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-white mb-4">Our Mission</h3>
          <p className="text-white/70 mb-4">
            To transform the rental experience in Odisha by providing a transparent, efficient, 
            and trustworthy platform that connects property owners with verified tenants while 
            ensuring the highest standards of service and security.
          </p>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="text-center p-4 bg-background/40 rounded-lg border border-primary/10"
            >
              <achievement.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-white mb-1">{achievement.number}</div>
              <div className="text-sm text-white/70">{achievement.label}</div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-white mb-4">Our Leadership Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary">
                <img 
                  src="/images/pavitra.jpg" 
                  alt="Pavitra Kumar Panda" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">Pavitra Kumar Panda</h4>
              <p className="text-primary mb-2">CEO & Founder</p>
              <p className="text-white/70 text-sm">
                MBA in International Finance, Co-founder of Hotel Aether
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary">
                <img 
                  src="/images/ranjit.jpg" 
                  alt="Ranjit Kumar Panda" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">Ranjit Kumar Panda</h4>
              <p className="text-primary mb-2">CMO & Co-Founder</p>
              <p className="text-white/70 text-sm">
                Marketing Expert with 5+ years in Real Estate
              </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary">
                <img 
                  src="/images/pusparaj.jpg" 
                  alt="Pusparaj Sahu" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">Pusparaj Sahu</h4>
              <p className="text-primary mb-2">CTO & Co-Founder</p>
              <p className="text-white/70 text-sm">
                Full Stack Developer, Tech Innovation Expert
              </p>
            </div>
          </div>
        </div>

        {/* Company Timeline */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-white mb-6">Our Journey</h3>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-black font-bold">
                    {index + 1}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-primary/30 mt-2"></div>
                  )}
                </div>
                <div>
                  <div className="text-primary font-bold">{milestone.year}</div>
                  <div className="text-white font-semibold mb-1">{milestone.title}</div>
                  <p className="text-white/70 text-sm">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-white mb-4">Why Choose Housing Lord?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-background/40 rounded-lg border border-primary/10">
              <FaAward className="w-6 h-6 text-primary mb-2" />
              <h4 className="text-white font-bold mb-2">Verified Properties</h4>
              <p className="text-white/70 text-sm">All properties are personally verified by our team for quality assurance.</p>
            </div>
            <div className="p-4 bg-background/40 rounded-lg border border-primary/10">
              <FaUsers className="w-6 h-6 text-primary mb-2" />
              <h4 className="text-white font-bold mb-2">Tenant Verification</h4>
              <p className="text-white/70 text-sm">Thorough background checks on all tenants for your peace of mind.</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Get in Touch</h3>
          <p className="text-white/70 mb-2">Email: info@housinglord.com</p>
          <p className="text-white/70 mb-2">Phone: +91 123-456-7890</p>
          <p className="text-white/70">Address: Bhubaneswar, Odisha, India</p>
        </div>
      </div>
    </div>
  );
};

export default AboutSidebar; 