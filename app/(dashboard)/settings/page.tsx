"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Settings,
  Building2,
  Users,
  Bell,
  Shield,
  CreditCard,
  Palette,
  Upload,
  Save,
} from "lucide-react";
import { useSociety } from "@/contexts/society-context";
import { useUser } from "@clerk/nextjs";

export default function SettingsPage() {
  const { currentSociety, updateSociety } = useSociety();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleSocietyUpdate = async (updates: any) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      updateSociety(updates);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-2">
          <Settings className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your society settings and preferences
            </p>
          </div>
        </div>
      </motion.div>

      {/* Settings Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs defaultValue="society" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="society">Society</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          {/* Society Settings */}
          <TabsContent value="society" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Society Information
                </CardTitle>
                <CardDescription>
                  Update your society's basic information and branding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="societyName">Society Name</Label>
                    <Input
                      id="societyName"
                      defaultValue={currentSociety?.name}
                      placeholder="Enter society name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalUnits">Total Units</Label>
                    <Input
                      id="totalUnits"
                      type="number"
                      defaultValue={currentSociety?.totalUnits}
                      placeholder="Enter total units"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    defaultValue={currentSociety?.address}
                    placeholder="Enter complete address"
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <Label>Society Logo</Label>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={currentSociety?.logo} />
                      <AvatarFallback>
                        <Building2 className="h-8 w-8" />
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        defaultValue={currentSociety?.primaryColor}
                        className="w-16 h-10"
                      />
                      <Input
                        defaultValue={currentSociety?.primaryColor}
                        placeholder="#3B82F6"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        defaultValue={currentSociety?.secondaryColor}
                        className="w-16 h-10"
                      />
                      <Input
                        defaultValue={currentSociety?.secondaryColor}
                        placeholder="#10B981"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => handleSocietyUpdate({})}
                  disabled={isLoading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  User Roles & Permissions
                </CardTitle>
                <CardDescription>
                  Manage user roles and access permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Admin Access</h3>
                      <p className="text-sm text-muted-foreground">
                        Full system access and management
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Manager Permissions</h3>
                      <p className="text-sm text-muted-foreground">
                        Complaint resolution and billing management
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Resident Self-Service</h3>
                      <p className="text-sm text-muted-foreground">
                        Allow residents to update their own information
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Security Access</h3>
                      <p className="text-sm text-muted-foreground">
                        Visitor management and security features
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultRole">
                    Default Role for New Users
                  </Label>
                  <Select defaultValue="resident">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="resident">Resident</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save User Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Configure notification settings for different events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Payment Reminders</h3>
                      <p className="text-sm text-muted-foreground">
                        Send reminders for pending maintenance payments
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Complaint Updates</h3>
                      <p className="text-sm text-muted-foreground">
                        Notify when complaint status changes
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Event Announcements</h3>
                      <p className="text-sm text-muted-foreground">
                        Send notifications for new events and activities
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Visitor Alerts</h3>
                      <p className="text-sm text-muted-foreground">
                        Notify residents about visitor arrivals
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Emergency Alerts</h3>
                      <p className="text-sm text-muted-foreground">
                        Send urgent notifications for emergencies
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="emailFreq">Email Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                        <SelectItem value="weekly">Weekly Summary</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smsFreq">SMS Frequency</Label>
                    <Select defaultValue="urgent">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Notifications</SelectItem>
                        <SelectItem value="urgent">Urgent Only</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security & Privacy
                </CardTitle>
                <CardDescription>
                  Configure security settings and privacy options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Login Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Get notified of new login attempts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Data Export</h3>
                      <p className="text-sm text-muted-foreground">
                        Allow users to export their data
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Activity Logging</h3>
                      <p className="text-sm text-muted-foreground">
                        Keep logs of user activities
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    defaultValue="30"
                    placeholder="30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passwordPolicy">Password Policy</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Basic (8+ characters)</SelectItem>
                      <SelectItem value="medium">
                        Medium (8+ chars, mixed case, numbers)
                      </SelectItem>
                      <SelectItem value="high">
                        Strong (12+ chars, mixed case, numbers, symbols)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Security Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Settings */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Billing & Subscription
                </CardTitle>
                <CardDescription>
                  Manage your subscription and billing preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Current Plan</h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {currentSociety?.plan} Plan
                      </p>
                    </div>
                    <Button variant="outline">Upgrade Plan</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Auto-renewal</h3>
                      <p className="text-sm text-muted-foreground">
                        Automatically renew subscription
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Billing Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Get notified about billing events
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Usage Alerts</h3>
                      <p className="text-sm text-muted-foreground">
                        Alert when approaching plan limits
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billingEmail">Billing Email</Label>
                  <Input
                    id="billingEmail"
                    type="email"
                    defaultValue={user?.emailAddresses[0]?.emailAddress}
                    placeholder="billing@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billingCycle">Billing Cycle</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Billing Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
