import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Instagram } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mldvuzkrcjnltzgwtpfc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sZHZ1emtyY2pubHR6Z3d0cGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5Mjg4MjYsImV4cCI6MjA2NjUwNDgyNn0.idcUACM1z8IPkYdpV-oT_R1jZexmC25W7IMZaFvooUc';
const supabase = createClient(supabaseUrl, supabaseKey);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    nationality: '',
    customNationality: '',
    whatsapp: '',
    message: ''
  });

  const [showCustomNationality, setShowCustomNationality] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'nationality' && value === 'Other') {
      setShowCustomNationality(true);
      setFormData({
        ...formData,
        nationality: value,
        customNationality: ''
      });
    } else if (name === 'nationality') {
      setShowCustomNationality(false);
      setFormData({
        ...formData,
        [name]: value,
        customNationality: ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const nationalityToSave = formData.nationality === 'Other' 
        ? formData.customNationality 
        : formData.nationality;

      const { error } = await supabase.from('messages').insert([
        {
          name: formData.name,
          gender: formData.gender,
          nationality: nationalityToSave,
          whatsapp: formData.whatsapp,
          message: formData.message
        }
      ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ 
        name: '', 
        gender: '', 
        nationality: '', 
        customNationality: '',
        whatsapp: '', 
        message: '' 
      });
      setShowCustomNationality(false);

      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "ms.omnia.o@hotmail.com",
      link: "mailto:ms.omnia.o@hotmail.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "WhatsApp",
      value: "+20 10 09058159",
      link: "https://wa.me/+201009058159"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: (
        <>
          Based in Egypt, Cairo<br />
          Avaliable (online) worldwide 
        </>
      ),
      link: "#"
    }
  ];

  // قائمة الجنسيات الشائعة مع الدول المضافة
  const nationalities = [
    "Egyptian", "Saudi", "Emirati", "Kuwaiti", "Qatari", 
    "Bahraini", "Omani", "Jordanian", "Lebanese", "Syrian",
    "Iraqi", "Yemeni", "Palestinian", "Moroccan", "Algerian",
    "Tunisian", "Libyan", "Sudanese", "Austrian", "Spanish",
    "Italian", "Turkish", "Other"
  ];

  return (
<section id="contact" className="py-12 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Connect With Me
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
           Are you ready to take the first step towards your inner light ? Ready to begin your spiritual journey? Reach out to schedule a  session 
            or ask any questions about my services.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
            {contactInfo.map((info, index) => (
              <React.Fragment key={index}>
                <a
                  href={info.link}
                  className="group flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{info.title}</h4>
                    <p className="text-gray-400 group-hover:text-purple-400 transition-colors duration-300">
                    {info.value}
                    </p>
                  </div>
                </a>

                {info.title === "Location" && (
                  <div className="mt-4">
                    <div className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl hover:bg-gray-700/50 transition-all duration-300">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-gray-300 text-sm tracking-wide">Social Media</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-purple-500/0 via-purple-400/40 to-pink-400/0" />
                      </div>

                      <div className="flex space-x-4">
                        <a
                          href="https://www.instagram.com/beyondholistic.eg?igsh=MTQ5Z3k2MDZma3Vocg=="
                          className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-pink-400 hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                        <a
                          href="https://www.tiktok.com/@beyondholistic.eg?_t=ZS-8yhoRbytf55&_r=1"
                          className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-pink-400 hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-pink-400" aria-hidden="true">
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}

{/* 
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-400/20">
              <h4 className="text-white font-semibold mb-3">Why Choose Omnia?</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✨ Scientific base over 5+ years experience</li>
                <li>🔒 100% confidential and secure sessions</li>
                <li>🌟 Personalized approach for every client</li>
                <li>✨Holding a space of non- judgment</li>
                <li>💫 Sees beyond the surface</li>
              </ul>
            </div> */}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="gender" className="block text-gray-300 mb-2 font-medium">
                      Gender *
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nationality" className="block text-gray-300 mb-2 font-medium">
                      Nationality *
                    </label>
                    <select
                      id="nationality"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                    >
                      <option value="">Select Nationality</option>
                      {nationalities.map((nation) => (
                        <option key={nation} value={nation}>{nation}</option>
                      ))}
                    </select>

                    {showCustomNationality && (
                      <div className="mt-3">
                        <label htmlFor="customNationality" className="block text-gray-300 mb-2 font-medium">
                          Specify Your Nationality *
                        </label>
                        <input
                          type="text"
                          id="customNationality"
                          name="customNationality"
                          value={formData.customNationality}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                          placeholder="Enter your nationality"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="whatsapp" className="block text-gray-300 mb-2 font-medium">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                      placeholder="+20 10 09058159"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                    placeholder="Tell me about what you're looking for and how I can help you on your spiritual journey..."
                  />
                </div>

                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                  <p className="text-green-400 text-sm flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Your information is encrypted and secure. Messages are delivered directly to admin.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending Securely...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4 text-green-400 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Message sent successfully! Your message has been securely delivered to admin.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 text-red-400 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Something went wrong. Please try again or contact me directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;