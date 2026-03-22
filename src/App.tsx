/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Shield, 
  Search, 
  CheckCircle, 
  Users, 
  Home, 
  Lock, 
  ArrowRight, 
  Star, 
  Facebook, 
  Twitter, 
  Instagram, 
  MessageCircle,
  Clock,
  Database,
  Eye,
  FileCheck,
  MapPin,
  Heart,
  Ban,
  X,
  AlertCircle,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from './supabase';

// Import components
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/auth/AdminLogin';
import { Login } from './components/auth/Login';
import { StudentRegistration } from './components/auth/StudentRegistration';
import { LandlordRegistration } from './components/auth/LandlordRegistration';
import { BrowseListings } from './components/student/views/BrowseListings';
import { StudentDashboard } from './components/student/StudentDashboard';
import { LandlordDashboard } from './components/landlord/LandlordDashboard';
import { useNotification } from './contexts/NotificationContext';

const Navbar = ({ onLogin, onSignup, onLandlordSignup, onBrowse }: { onLogin: () => void, onSignup: () => void, onLandlordSignup: () => void, onBrowse: () => void }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="flex items-center gap-2">
        <div className="bg-orange-500 p-1.5 rounded-lg">
          <Shield className="w-6 h-6 text-white" fill="currentColor" />
        </div>
        <span className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
          isScrolled ? 'text-slate-900' : 'text-white'
        }`}>SafeStay</span>
      </div>
      
      <div className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors duration-300 ${
        isScrolled ? 'text-slate-600' : 'text-white/90'
      }`}>
        <button onClick={onBrowse} className={`hover:text-orange-500 transition-colors ${isScrolled ? 'hover:text-orange-500' : 'hover:text-white'}`}>Browse</button>
        <a href="#features" className={`hover:text-orange-500 transition-colors ${isScrolled ? 'hover:text-orange-500' : 'hover:text-white'}`}>Features</a>
        <a href="#how-it-works" className={`hover:text-orange-500 transition-colors ${isScrolled ? 'hover:text-orange-500' : 'hover:text-white'}`}>How It Works</a>
        <a href="#listings" className={`hover:text-orange-500 transition-colors ${isScrolled ? 'hover:text-orange-500' : 'hover:text-white'}`}>Listings</a>
        <a href="#testimonials" className={`hover:text-orange-500 transition-colors ${isScrolled ? 'hover:text-orange-500' : 'hover:text-white'}`}>Testimonials</a>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onLandlordSignup}
          className={`hidden lg:block px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
          isScrolled 
            ? 'text-slate-900 border border-slate-200 hover:bg-slate-50' 
            : 'text-white border border-white/30 hover:bg-white/10'
        }`}>
          Want to be a Landlord
        </button>
        <button 
          onClick={onSignup}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
          isScrolled 
            ? 'text-orange-500 bg-white border border-orange-500 hover:bg-orange-50' 
            : 'text-orange-500 bg-white/10 border border-orange-500/30 hover:bg-white/20'
        }`}>
          Student Signup
        </button>
        <button 
          onClick={onLogin}
          className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0 z-0">
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/5/54/Baguio_-_Lower_Bonifacio_%28Baguio%2C_Benguet%29%282018-11-26%29.jpg" 
        alt="Baguio City Landscape" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-900/90"></div>
    </div>

    <div className="relative z-10 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8"
      >
        <Shield className="w-4 h-4 text-orange-500" />
        <span className="text-xs md:text-sm font-medium text-white">Baguio's #1 Verified Student Housing Platform</span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1]"
      >
        Find Safe Housing <br />
        <span className="text-orange-500">Without the Fear</span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed"
      >
        AI-powered fraud detection and verified listings protect Baguio students from rental scams. Every property is verified. Every landlord is screened.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
      >
        <button className="w-full sm:w-auto px-8 py-4 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20">
          Find Your Safe Home
        </button>
        <button className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all">
          List Your Property
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
      >
        {[
          { label: "Protected Students", value: "5,000+" },
          { label: "Verified Properties", value: "847" },
          { label: "Fraud Prevention Rate", value: "98.7%" },
          { label: "Response Time", value: "<2min" },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-left">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs md:text-sm text-white/50 font-medium">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>

    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
        <div className="w-1 h-2 bg-white/50 rounded-full"></div>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section id="features" className="py-24 px-6 bg-white">
    <div className="max-w-7xl mx-auto text-center">
      <span className="text-orange-500 font-bold tracking-widest uppercase text-xs mb-4 block">Why SafeStay</span>
      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Built for Student Safety</h2>
      <p className="text-slate-500 max-w-2xl mx-auto mb-16 text-lg">
        Our platform uses cutting-edge technology to ensure every rental experience is safe, transparent, and fraud-free.
      </p>

      <div className="grid md:grid-cols-4 gap-8">
        {[
          {
            icon: <Users className="w-6 h-6 text-orange-500" />,
            title: "AI Verification",
            desc: "Advanced neural network algorithms automatically verify documents and detect fraudulent listings in real-time."
          },
          {
            icon: <Shield className="w-6 h-6 text-orange-500" />,
            title: "Real-Time Monitoring",
            desc: "24/7 security surveillance system that tracks suspicious activities and alerts users immediately."
          },
          {
            icon: <Database className="w-6 h-6 text-orange-500" />,
            title: "Fraud Database",
            desc: "Comprehensive blacklist checking system cross-referenced with known scam operations and fraud patterns."
          },
          {
            icon: <Lock className="w-6 h-6 text-orange-500" />,
            title: "Secure Payments",
            desc: "Escrow protection ensures your money is safe until you verify the property meets all expectations."
          }
        ].map((feature, i) => (
          <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 text-left hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 px-6 bg-slate-50">
    <div className="max-w-7xl mx-auto text-center">
      <span className="text-orange-500 font-bold tracking-widest uppercase text-xs mb-4 block">Simple Process</span>
      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">How It Works</h2>
      <p className="text-slate-500 max-w-2xl mx-auto mb-16 text-lg">
        Get into your verified safe home in just a few easy steps.
      </p>

      <div className="grid md:grid-cols-3 gap-12 relative">
        {[
          {
            num: "01",
            icon: <Users className="w-6 h-6 text-white" />,
            title: "Create Your Account",
            desc: "Sign up as a student and complete your profile with your university details and verification documents."
          },
          {
            num: "02",
            icon: <Search className="w-6 h-6 text-white" />,
            title: "Browse Verified Listings",
            desc: "Explore hundreds of AI-verified properties near your campus with transparent pricing and landlord profiles."
          },
          {
            num: "03",
            icon: <Home className="w-6 h-6 text-white" />,
            title: "Book with Confidence",
            desc: "Submit your booking request and move in knowing every detail has been verified and secured."
          }
        ].map((step, i) => (
          <div key={i} className="relative p-10 rounded-3xl bg-white border border-slate-100 text-left shadow-sm">
            <div className="absolute top-8 right-8 text-6xl font-black text-slate-100 leading-none">{step.num}</div>
            <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center mb-8 shadow-lg">
              {step.icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
            <p className="text-slate-500 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Listings = ({ onBrowseAll }: { onBrowseAll: () => void }) => {
  const [listings, setListings] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchFeaturedListings = async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('status', 'Active')
        .limit(4);
      
      if (error) {
        console.error('Error fetching featured listings:', error);
      } else {
        setListings(data || []);
      }
      setLoading(false);
    };

    fetchFeaturedListings();
  }, []);

  return (
    <section id="listings" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <span className="text-orange-500 font-bold tracking-widest uppercase text-xs mb-4 block">Featured Properties</span>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Verified Listings Near You</h2>
        <p className="text-slate-500 max-w-2xl mx-auto mb-16 text-lg">
          Every property has been inspected, documented, and approved by our verification team.
        </p>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {listings.map((item, i) => (
              <div key={item.id} className="group rounded-3xl overflow-hidden bg-white border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all">
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image || (item.images && item.images[0])} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </div>
                </div>
                <div className="p-6 text-left">
                  <h4 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1">{item.title}</h4>
                  <div className="flex items-center gap-1 text-slate-400 text-xs mb-4">
                    <MapPin className="w-3 h-3" /> {item.location || item.address}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-500 font-bold">₱{item.price?.toLocaleString()} / month</span>
                    <button 
                      onClick={onBrowseAll}
                      className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button 
          onClick={onBrowseAll}
          className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20"
        >
          Browse All Listings <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

const FraudPrevention = () => (
  <section className="py-24 px-6 bg-slate-950 text-white overflow-hidden relative">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500/5 blur-[120px] rounded-full"></div>
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <span className="text-orange-500 font-bold tracking-widest uppercase text-xs mb-4 block">Zero Tolerance</span>
        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Our Fraud Prevention System</h2>
        <p className="text-slate-400 text-lg mb-12 leading-relaxed">
          We use a multi-layered verification system combining AI technology and human review to ensure every listing and user on our platform is legitimate.
        </p>

        <div className="space-y-8">
          {[
            {
              icon: <FileCheck className="w-6 h-6" />,
              title: "Government ID Cross-Reference",
              desc: "All IDs validated against official databases"
            },
            {
              icon: <Home className="w-6 h-6" />,
              title: "Property Ownership Validation",
              desc: "Deeds verified directly with local authorities"
            },
            {
              icon: <Users className="w-6 h-6" />,
              title: "Tenant History Verification",
              desc: "Comprehensive background checks on all users"
            }
          ].map((item, i) => (
            <div key={i} className="flex gap-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <div className="text-orange-500">{item.icon}</div>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="relative z-10 rounded-[40px] overflow-hidden border border-white/10 shadow-2xl shadow-orange-500/10">
          <img 
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop" 
            alt="Security Shield" 
            className="w-full aspect-square object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-transparent to-transparent"></div>
          
          {/* Floating Badge */}
          <div className="absolute bottom-10 left-10 p-8 rounded-3xl bg-orange-500 text-white shadow-2xl">
            <div className="text-5xl font-black mb-1">156</div>
            <div className="text-sm font-bold opacity-90">Fraud Cases Blocked</div>
          </div>

          {/* Shield Icon Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-20 animate-pulse"></div>
              <Shield className="w-48 h-48 text-orange-500/80 relative z-10" strokeWidth={1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section id="testimonials" className="py-24 px-6 bg-white">
    <div className="max-w-7xl mx-auto text-center">
      <span className="text-orange-500 font-bold tracking-widest uppercase text-xs mb-4 block">Real Stories</span>
      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">What Our Users Say</h2>
      <p className="text-slate-500 max-w-2xl mx-auto mb-16 text-lg">
        Thousands of students and landlords trust SafeStay for safe, verified housing in Baguio City.
      </p>

      <div className="grid md:grid-cols-4 gap-6">
        {[
          {
            name: "Maria Santos",
            role: "Student at SLU",
            text: "Found my safe home within 3 days. The verification process gave me confidence I wasn't being scammed.",
            avatar: "MS"
          },
          {
            name: "Juan Dela Cruz",
            role: "Property Owner",
            text: "As a landlord, this platform helps me find trustworthy tenants while protecting my property from fraud.",
            avatar: "JC"
          },
          {
            name: "Ana Reyes",
            role: "Student at UC",
            text: "The fraud prevention features saved me from a rental scam. I recommend this to all my classmates.",
            avatar: "AR"
          },
          {
            name: "Roberto Tan",
            role: "Property Manager",
            text: "Professional platform that streamlines the rental process while ensuring security for everyone.",
            avatar: "RT"
          }
        ].map((t, i) => (
          <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 text-left">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />)}
            </div>
            <p className="text-slate-600 italic mb-8 leading-relaxed">"{t.text}"</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                {t.avatar}
              </div>
              <div>
                <div className="font-bold text-slate-900">{t.name}</div>
                <div className="text-xs text-slate-400">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTA = ({ onStart, onLandlordSignup }: { onStart: () => void, onLandlordSignup: () => void }) => (
  <section className="py-24 px-6 bg-slate-50">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">
        Ready to Find Your <br />
        <span className="text-orange-500">Safe Home?</span>
      </h2>
      <p className="text-slate-500 text-xl mb-12 max-w-2xl mx-auto">
        Join thousands of students who found verified, safe housing in Baguio City through SafeStay.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          onClick={onStart}
          className="w-full sm:w-auto px-10 py-5 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-2xl shadow-orange-500/30"
        >
          Get Started as Student
        </button>
        <button 
          onClick={onLandlordSignup}
          className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/30">
          List Your Property
        </button>
      </div>
    </div>
  </section>
);

const Footer = ({ onAdminClick }: { onAdminClick: () => void }) => (
  <footer className="bg-slate-950 text-white pt-24 pb-12 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 lg:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-orange-500 p-1.5 rounded-lg">
              <Shield className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">SafeStay</span>
          </div>
          <p className="text-slate-500 mb-8 leading-relaxed max-w-xs">
            Baguio City's most trusted student housing platform. Verified listings, fraud-free rentals, and peace of mind for every student.
          </p>
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, MessageCircle].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-all">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-8">Platform</h4>
          <ul className="space-y-4 text-slate-500 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Browse Listings</a></li>
            <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Fraud Prevention</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-8">Support</h4>
          <ul className="space-y-4 text-slate-500 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Report Fraud</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="relative">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h4 className="text-lg font-bold mb-4">Need help?</h4>
            <p className="text-slate-500 text-sm mb-6">Our support team is available 24/7 to assist you.</p>
            <button className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all">
              Talk with Us
            </button>
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-600 text-sm">© 2025 SafeStay. All rights reserved.</p>
        <div className="flex gap-8 text-xs text-slate-600 font-medium">
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Cookie Policy</a>
          <button onClick={onAdminClick} className="hover:text-white">Admin Portal</button>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [currentView, setCurrentView] = React.useState<'landing' | 'browse' | 'login' | 'student-signup' | 'landlord-signup' | 'admin-login' | 'student' | 'landlord' | 'admin'>('landing');
  const [activeUser, setActiveUser] = React.useState<any>(null);

  const studentUser = {
    id: 'student1',
    email: 'student@example.com',
    full_name: 'Student One',
    username: 'student1',
    role: 'student',
    status: 'Active',
    is_verified: true,
    phone_number: '09171234567'
  };

  const landlordUser = {
    id: 'landlord1',
    email: 'landlord@example.com',
    full_name: 'Landlord One',
    username: 'landlord1',
    role: 'landlord',
    status: 'Active',
    is_verified: true,
    phone_number: '09179876543'
  };

  const handleLogin = (userType: 'student' | 'landlord', email: string, password: string) => {
    // In this offline demo flow, authenticate by role choice and optionally email.
    const user = userType === 'student' ? studentUser : landlordUser;
    setActiveUser(user);
    setCurrentView(userType);
  };

  const handleAdminLogin = async (email: string, password: string) => {
    // Simple admin credential check; customize if needed.
    if (email.toLowerCase() === 'admin@safestay.com' && password === 'admin123') {
      setActiveUser({ id: 'admin1', email, full_name: 'Admin User', role: 'admin' });
      setCurrentView('admin');
      return;
    }
    alert('Admin credentials invalid. Use admin@safestay.com / admin123.');
  };

  const handleLogout = () => {
    setActiveUser(null);
    setCurrentView('landing');
  };

  const goToBrowse = () => {
    if (activeUser?.role === 'student') {
      setCurrentView('student');
    } else if (activeUser?.role === 'landlord') {
      setCurrentView('landlord');
    } else {
      setCurrentView('browse');
    }
  };

  const handleStudentSignup = (data: any) => {
    setActiveUser({
      ...studentUser,
      ...data,
      id: data.id ?? 'student1',
      role: 'student',
      is_verified: false
    });
    setCurrentView('student');
  };

  const handleLandlordSignup = (data: any) => {
    setActiveUser({
      ...landlordUser,
      ...data,
      id: data.id ?? 'landlord1',
      role: 'landlord',
      is_verified: false
    });
    setCurrentView('landlord');
  };

  const handleGoogleLogin = (userType: 'student' | 'landlord') => {
    handleLogin(userType, '', '');
  };

  if (currentView === 'login') {
    return (
      <Login
        onLogin={handleLogin}
        onGoogleLogin={handleGoogleLogin}
        onSignup={() => setCurrentView('student-signup')}
        onLandlordSignup={() => setCurrentView('landlord-signup')}
        onBack={() => setCurrentView('landing')}
      />
    );
  }

  if (currentView === 'student-signup') {
    return (
      <StudentRegistration
        onBack={() => setCurrentView('landing')}
        onSignIn={() => setCurrentView('login')}
        onComplete={handleStudentSignup}
      />
    );
  }

  if (currentView === 'landlord-signup') {
    return (
      <LandlordRegistration
        onBack={() => setCurrentView('landing')}
        onSignIn={() => setCurrentView('login')}
        onComplete={handleLandlordSignup}
      />
    );
  }

  if (currentView === 'admin-login') {
    return <AdminLogin onEmailLogin={handleAdminLogin} onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'student') {
    return <StudentDashboard user={activeUser ?? studentUser} onLogout={handleLogout} />;
  }

  if (currentView === 'landlord') {
    return <LandlordDashboard user={activeUser ?? landlordUser} onLogout={handleLogout} />;
  }

  if (currentView === 'admin') {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  if (currentView === 'browse') {
    return (
      <div className="min-h-screen font-sans selection:bg-orange-500 selection:text-white">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 shadow-sm px-6 py-3 flex items-center justify-between">
          <div className="text-lg font-bold">SafeStay – Browse Listings</div>
          <div className="flex items-center gap-2">
            {activeUser ? (
              <button onClick={handleLogout} className="px-4 py-2 bg-slate-900 text-white rounded-xl">Logout</button>
            ) : (
              <button onClick={() => setCurrentView('login')} className="px-4 py-2 bg-orange-500 text-white rounded-xl">Sign In</button>
            )}
            <button onClick={() => setCurrentView('landing')} className="px-4 py-2 border border-slate-300 rounded-xl">Home</button>
          </div>
        </div>

        <div className="pt-24 px-6 pb-12">
          <BrowseListings user={activeUser} onRequireVerification={() => setCurrentView('login')} onNavigate={() => {}} onLogin={() => setCurrentView('login')} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans selection:bg-orange-500 selection:text-white">
      <Navbar 
        onLogin={() => setCurrentView('login')} 
        onSignup={() => setCurrentView('student-signup')} 
        onLandlordSignup={() => setCurrentView('landlord-signup')}
        onBrowse={goToBrowse}
      />
      <Hero />
      <Features />
      <HowItWorks />
      <Listings onBrowseAll={goToBrowse} />
      <FraudPrevention />
      <Testimonials />
      <CTA onStart={goToBrowse} onLandlordSignup={() => setCurrentView('landlord-signup')} />
      <Footer onAdminClick={() => setCurrentView('admin-login')} />
    </div>
  );
}
