
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Keyboard } from "lucide-react";

const Help = () => {
  return (
    <PageLayout title="Help Center" actionButton={null}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find answers to commonly asked questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I schedule an appointment?</AccordionTrigger>
                <AccordionContent>
                  To schedule an appointment, navigate to the Appointments section in the sidebar, then click on the "New Appointment" button. Fill in the required details and confirm.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I view patient records?</AccordionTrigger>
                <AccordionContent>
                  Navigate to the Patients section, search for the specific patient, and click on their name or the "View" action button to access their complete medical records.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How do I create a prescription?</AccordionTrigger>
                <AccordionContent>
                  To create a prescription, go to the Prescriptions section, click on "New Prescription", select a patient, add medications and dosage instructions, then save the prescription.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How can I update my profile information?</AccordionTrigger>
                <AccordionContent>
                  To update your profile information, click on your profile picture in the sidebar, then select "Profile" or go to Settings and select "Edit Profile" to modify your personal details.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Are there keyboard shortcuts available?</AccordionTrigger>
                <AccordionContent>
                  Yes! Cura Agent provides various keyboard shortcuts to enhance your workflow. You can view all available shortcuts by pressing <kbd className="px-2 py-0.5 bg-gray-100 rounded border">Ctrl + /</kbd> or by visiting our <Link to="/help/keyboard-shortcuts" className="text-primary hover:underline">Keyboard Shortcuts Guide</Link>.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get help from our support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">Our support team is available 24/7 to assist you with any issues you may encounter.</p>
              <div className="space-y-2">
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-gray-500">support@curaagent.com</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-gray-500">+1-800-123-4567</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documentation</CardTitle>
              <CardDescription>Browse our user guides and documentation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">Access comprehensive guides and tutorials to help you use Cura Agent effectively.</p>
              <ul className="space-y-2 text-sm text-primary">
                <li>
                  <a href="#" className="hover:underline">User Manual</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Video Tutorials</a>
                </li>
                <li>
                  <Link to="/help/keyboard-shortcuts" className="hover:underline flex items-center">
                    <Keyboard className="h-4 w-4 mr-1" />
                    Keyboard Shortcuts
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:underline">Feature Guides</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">API Documentation</a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Help;
