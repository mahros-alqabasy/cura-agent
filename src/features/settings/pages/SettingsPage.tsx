
import { useState } from "react";
import PageLayout from "@/shared/components/PageLayout";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";

const SettingsPage = () => {
  const [generalSettings, setGeneralSettings] = useState({
    darkMode: false,
    notifications: true,
    language: "en",
  });

  const handleToggleSetting = (setting: string) => {
    setGeneralSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <PageLayout title="Settings" actionButton={null} showSearch={false} onSearch={null}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure general application settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-gray-500">Use dark theme for the application</p>
              </div>
              <Button
                variant={generalSettings.darkMode ? "default" : "outline"}
                onClick={() => handleToggleSetting("darkMode")}
              >
                {generalSettings.darkMode ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notifications</p>
                <p className="text-sm text-gray-500">Receive notifications for important events</p>
              </div>
              <Button
                variant={generalSettings.notifications ? "default" : "outline"}
                onClick={() => handleToggleSetting("notifications")}
              >
                {generalSettings.notifications ? "Enabled" : "Disabled"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>About this system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Version</p>
              <p>Cura v1.0.0</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Last Updated</p>
              <p>May 9, 2025</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Environment</p>
              <p>Production</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Check for Updates</Button>
          </CardFooter>
        </Card>
      </div>
    </PageLayout>
  );
};

export default SettingsPage;
