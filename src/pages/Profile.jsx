import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useAuth } from "../App";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  Save, 
  X, 
  LogOut,
  Shield,
  Bell,
  CreditCard,
  Settings
} from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345",
    bio: "Banking customer since 2020. Passionate about financial planning and investment.",
    dateJoined: "January 2020",
    accountType: "Premium",
    accountNumber: user?.accountNumber || "****1234"
  });

  const [editData, setEditData] = useState({...profileData});

  const handleSave = () => {
    setProfileData({...editData});
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated."
    });
  };

  const handleCancel = () => {
    setEditData({...profileData});
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Profile</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account information and preferences
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            {!isEditing ? (
              <Button 
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  onClick={handleCancel}
                  className="flex items-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </Button>
                <Button 
                  onClick={handleSave}
                  className="flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Your account details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar and Basic Info */}
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="text-lg">
                    {getInitials(isEditing ? editData.name : profileData.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">
                    {isEditing ? editData.name : profileData.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {profileData.accountType} Member
                  </p>
                  <Badge variant="outline" className="mt-1">
                    Account {profileData.accountNumber}
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Contact Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editData.name}
                      onChange={(e) => setEditData({...editData, name: e.target.value})}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-md">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>{profileData.name}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({...editData, email: e.target.value})}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-md">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{profileData.email}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editData.phone}
                      onChange={(e) => setEditData({...editData, phone: e.target.value})}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-md">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{profileData.phone}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={editData.address}
                      onChange={(e) => setEditData({...editData, address: e.target.value})}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-md">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{profileData.address}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={editData.bio}
                    onChange={(e) => setEditData({...editData, bio: e.target.value})}
                    rows={3}
                  />
                ) : (
                  <div className="p-3 bg-muted/50 rounded-md">
                    <span>{profileData.bio}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Account Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge className="bg-success/10 text-success">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Member Since</span>
                  <span className="text-sm font-medium">{profileData.dateJoined}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Account Type</span>
                  <Badge variant="outline">{profileData.accountType}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  Notification Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Security Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Manage Cards
                </Button>
                <Separator />
                <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Sign Out</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to sign out of your account?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsLogoutDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleLogout}>
                        Sign Out
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;