import PageLayout from "@/shared/components/PageLayout";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

const Settings = () => {
  return (
    <PageLayout
      title="Settings"
      actionButton={null}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account settings and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-gray-500">Email notifications and communication preferences</p>
            </div>
            <Button variant="outline" size="sm">Manage Email Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Personal Information</p>
              <p className="text-sm text-gray-500">Update your name, contact information, and photo</p>
            </div>
            <Button variant="outline" size="sm">Edit Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Password</p>
              <p className="text-sm text-gray-500">Update your password regularly for better security</p>
            </div>
            <Button variant="outline" size="sm">Change Password</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Customize your notification settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Notification Preferences</p>
              <p className="text-sm text-gray-500">Control what notifications you receive and how</p>
            </div>
            <Button variant="outline" size="sm">Manage Notifications</Button>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Settings;
