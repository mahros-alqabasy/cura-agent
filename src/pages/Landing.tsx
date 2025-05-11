import AppLogo from '@/components/AppLogo'
import assistantSectionImage from '/ed714da9-8a46-465a-b959-38edef80c14f.png'
import heroSectionImage from '/4bd34475-5b10-4931-b67d-055fc45cfb0c.png'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { CalendarIcon, Bot } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { appointmentService } from '@/features/appointments/services';
import { isDevelopment } from '@/conf/Conf';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import AppIcon from '@/components/AppIcon';
import ScreenshotGallery from '@/components/ScreenshotGallery';

// Define the form schema with Zod
const appointmentFormSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phoneNumber: z.string().regex(/^01\d{9}$/, {
    message: 'Please enter a valid Egyptian phone number (e.g., 01xxxxxxxxx).'
  }),
  dateOfBirth: z.date({
    required_error: 'Please select a date of birth.',
  }),
  nationalId: z.string().regex(/^\d{14}$/, {
    message: 'National ID must be 14 digits.'
  }),
  details: z.string().min(10, {
    message: 'Please provide details about your appointment (minimum 10 characters).'
  }),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

const Landing = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize the form with react-hook-form
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      nationalId: '',
      details: '',
    },
  });

  const onSubmit = async (data: AppointmentFormValues) => {
    setIsSubmitting(true);
    try {
      // In development, we use the mock service
      if (isDevelopment) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Appointment data submitted:', data);
      } else {
        // In production, use the real API
        await appointmentService.createPublicAppointment(data);
      }

      setIsSuccess(true);
      toast.success('Your appointment request has been received!');
      // Reset form after successful submission
      form.reset();
    } catch (error) {
      console.error('Error submitting appointment:', error);
      toast.error('Failed to submit appointment request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // When dialog is closed, reset success state
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white py-4 px-6 border-b">
        <div className="container mx-auto flex justify-between items-center text-center">
          <AppLogo />
          <nav className="hidden md:flex space-x-8">
            <Link to="/features-backlog" className="text-gray-700 font-medium text-primary hover:text-primary hover:underline hover:bg-primary/10 rounded-md px-2 py-1">Features Backlog</Link>

          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/chat-bot">Try Chat Bot!</Link>
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
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Book an Appointment
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

      {/* Screenshot Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">System Overview</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the key features and user interfaces of Cura Agent
            </p>
          </div>
          <ScreenshotGallery />
        </div>
      </section>

      {/* Appointment Booking Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isSuccess ? 'Thank You!' : 'Book an Appointment'}</DialogTitle>
            <DialogDescription>
              {isSuccess
                ? 'Your appointment request has been received. We will contact you shortly.'
                : 'Fill out the form below to request an appointment with our healthcare providers.'}
            </DialogDescription>
          </DialogHeader>

          {!isSuccess ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="01xxxxxxxxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nationalId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>National ID</FormLabel>
                      <FormControl>
                        <Input placeholder="14-digit national ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Appointment Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe your symptoms or reason for appointment"
                          className="resize-none"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleDialogClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Appointment Request Received</h3>
              <p className="text-gray-600 text-center mb-6">
                We will review your request and get back to you shortly with confirmation details.
              </p>
              <Button onClick={handleDialogClose}>Close</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

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

              <AppLogo />

              <p className="text-gray-600 mb-4">
                Transforming healthcare with intelligent AI solutions.
              </p>
              <div className="flex space-x-4">
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
                <li><Link to='/features-backlog' className="text-gray-600 hover:text-primary">Features</Link></li>
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
