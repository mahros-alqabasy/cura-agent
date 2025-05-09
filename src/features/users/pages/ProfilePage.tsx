
import { useState } from "react";
import { useAuth } from "@/shared/contexts/AuthContext";
import PageLayout from "@/shared/components/PageLayout";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Separator } from "@/shared/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    mobile: "+201123456789", // Example data
    address: "123 Main St, Cairo, Egypt", // Example data
    specialty: user?.role === "doctor" ? "Cardiology" : "", // Example data for doctors
    nationalId: "2910284714", // Example data
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    // In a real app, you would call an API to update the user's profile
    alert("Profile updated successfully!");
  };

  const handleChangePassword = () => {
    // In a real app, you would call an API to change the user's password
    alert("Password changed successfully!");
  };

  return (
    <PageLayout title="My Profile" actionButton={null} showSearch={false}>
      <div className="space-y-6">
        <Tabs defaultValue="personal">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-2xl font-medium">
                        {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          name="firstName" 
                          value={profileData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          name="lastName" 
                          value={profileData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={profileData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="mobile">Mobile Number</Label>
                        <Input 
                          id="mobile" 
                          name="mobile" 
                          type="tel" 
                          value={profileData.mobile}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nationalId">National ID</Label>
                        <Input 
                          id="nationalId" 
                          name="nationalId" 
                          value={profileData.nationalId}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address" 
                        name="address" 
                        value={profileData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    {user?.role === "doctor" && (
                      <div className="space-y-2">
                        <Label htmlFor="specialty">Specialty</Label>
                        <Input 
                          id="specialty" 
                          name="specialty" 
                          value={profileData.specialty}
                          onChange={handleInputChange}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveProfile}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleChangePassword}>Change Password</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-500">
                  Two-factor authentication adds an additional layer of security to your
                  account by requiring more than just a password to sign in.
                </p>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Status: <span className="text-red-500">Not Enabled</span></p>
                    <p className="text-sm text-gray-500">
                      Enable two-factor authentication for enhanced account security
                    </p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Profile;
