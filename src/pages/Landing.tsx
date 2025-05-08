import assistantSectionImage from '/ed714da9-8a46-465a-b959-38edef80c14f.png'
import heroSectionImage from '/4bd34475-5b10-4931-b67d-055fc45cfb0c.png'
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';

import AppIcon from '@/components/AppIcon';
const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white py-4 px-6 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="cura-logo text-white text-lg font-bold mr-2">
              <AppIcon />
            </div>
            <span className="text-xl font-semibold">Cura Agent</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>
            <Link to="/authors" className="text-gray-700 hover:text-primary">Authors</Link>
            <Link to="/team" className="text-gray-700 hover:text-primary">Team</Link>
            <Link to="/docs" className="text-gray-700 hover:text-primary">Docs</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Request Demo</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 bg-primary-50 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                The Future of Healthcare
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Powered by AI
              </h2>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                Transform your healthcare facility with Cura Agent's intelligent system. Streamline operations, enhance patient care, and empower your staff with AI-driven insights.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/ai-assistant">Try LLM?</Link>

                </Button>
              </div>
              <div className="mt-8 flex items-center">
                <div className="flex -space-x-2 mr-4">
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/44.jpg" alt="User" />
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/91.jpg" alt="User" />
                </div>
                <div className="text-sm">
                  <div className="text-yellow-500 flex">★★★★★</div>
                  <p className="text-gray-600">Trusted by 500+ Healthcare Providers</p>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src={heroSectionImage}
                alt="Cura Agent Dashboard"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Intelligent Healthcare Management</h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">Streamline your operations with our comprehensive suite of AI-powered tools and features</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Assistant</h3>
              <p className="text-gray-600">24/7 intelligent support for all healthcare professionals. Automate routine tasks and get instant insights.</p>
            </div>

            <div className="border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Analytics</h3>
              <p className="text-gray-600">Real-time insights and predictive analytics to improve patient care and operational efficiency.</p>
            </div>

            <div className="border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Platform</h3>
              <p className="text-gray-600">HIPAA-compliant security with advanced encryption and role-based access control.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-primary-50 text-primary px-4 py-1 rounded-full text-sm font-semibold mb-4">AI-POWERED ASSISTANCE</div>
              <h2 className="text-3xl font-bold mb-6">Meet Your Intelligent Healthcare Assistant</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Experience the power of AI in healthcare. Our intelligent assistant helps you manage appointments, access patient records, and make informed decisions - all through natural conversation.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Natural language processing for effortless interaction</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Voice commands for hands-free operation</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Contextual awareness for personalized assistance</span>
                </div>
              </div>
            </div>
            <div>
              <img
                src={assistantSectionImage}
                alt="AI Assistant Interface"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Trusted by Leading Healthcare Providers</h2>
          <div className="text-center mb-12">
            <p className="text-gray-600">See what healthcare professionals say about Cura Agent</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img className="w-12 h-12 rounded-full mr-4" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Dr. Emily Clark" />
                <div>
                  <h4 className="font-semibold">Dr. Emily Clark</h4>
                  <p className="text-sm text-gray-500">Cardiologist</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Cura Agent has revolutionized how I manage patient care. The AI assistant saves me hours every week by automating routine tasks."
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img className="w-12 h-12 rounded-full mr-4" src="https://randomuser.me/api/portraits/men/54.jpg" alt="Dr. Marcus Johnson" />
                <div>
                  <h4 className="font-semibold">Dr. Marcus Johnson</h4>
                  <p className="text-sm text-gray-500">Chief of Medicine</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The analytics and reporting features have given us unprecedented insights into our hospital operations and helped us improve patient outcomes."
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img className="w-12 h-12 rounded-full mr-4" src="https://randomuser.me/api/portraits/men/68.jpg" alt="Sarah Thompson" />
                <div>
                  <h4 className="font-semibold">Sarah Thompson</h4>
                  <p className="text-sm text-gray-500">Hospital Administrator</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The implementation was seamless and the support team has been exceptional. We've seen a 30% increase in efficiency since adopting Cura Agent."
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Read More Success Stories
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
            <p className="text-lg text-gray-700 mb-8">
              We're always looking for talented individuals passionate about healthcare innovation and technology.
            </p>
            <Button size="lg">
              View Open Positions
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="cura-logo text-white text-lg font-bold mr-2">
                  <AppIcon />
                </div>
                <span className="text-xl font-semibold">Cura Agent</span>
              </div>
              <p className="text-gray-600 mb-4">
                Transforming healthcare with intelligent AI solutions.
              </p>
              <div className="flex space-x-4">
                {/* <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a> */}
                <a href="https://linkedin.com/in/ma7ros" className="text-gray-400 hover:text-gray-500" target='_blank'>
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="https://github.com/mahros-alqabasy/cura-agent" className="text-gray-400 hover:text-gray-500" target='_blank'>
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Case Studies</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Reviews</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Updates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Team</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Press</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Documentation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Privacy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center">
            <p className="text-gray-500">&copy; 2025 Cura Agent. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
