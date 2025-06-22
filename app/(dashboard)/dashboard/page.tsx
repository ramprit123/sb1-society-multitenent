"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  CreditCard,
  MessageSquare,
  Shield,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Home,
} from "lucide-react";
import { useSociety } from "@/contexts/society-context";

const stats = [
  {
    title: "Total Units",
    value: "120",
    change: "+2.5%",
    icon: Home,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Active Residents",
    value: "384",
    change: "+5.2%",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Monthly Collection",
    value: "₹4,80,000",
    change: "+12.3%",
    icon: CreditCard,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Pending Complaints",
    value: "12",
    change: "-18.7%",
    icon: MessageSquare,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
];

const recentActivity = [
  {
    type: "payment",
    message: "Maintenance payment received from Unit A-101",
    time: "2 minutes ago",
    status: "success",
  },
  {
    type: "complaint",
    message: "New complaint filed: Water leakage in B-203",
    time: "15 minutes ago",
    status: "warning",
  },
  {
    type: "visitor",
    message: "Visitor check-in: John Doe visiting C-305",
    time: "1 hour ago",
    status: "info",
  },
  {
    type: "event",
    message: "Diwali celebration event created",
    time: "2 hours ago",
    status: "success",
  },
];

export default function DashboardPage() {
  const { currentSociety, currentUser } = useSociety();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {currentUser?.name}!
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's what's happening at {currentSociety?.name} today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-green-600">{stat.change}</span>
                  <span className="text-muted-foreground ml-1">
                    from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Collection Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Monthly Collection Status</CardTitle>
              <CardDescription>
                October 2025 maintenance collection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Collected</span>
                  <span>₹4,80,000 / ₹6,00,000</span>
                </div>
                <Progress value={80} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>80% collected</span>
                  <span>₹1,20,000 pending</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">96</div>
                  <div className="text-xs text-muted-foreground">Paid</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-600">18</div>
                  <div className="text-xs text-muted-foreground">Pending</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-red-600">6</div>
                  <div className="text-xs text-muted-foreground">Overdue</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates from your society
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.status === "success"
                          ? "bg-green-500"
                          : activity.status === "warning"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                Alerts & Reminders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium">Maintenance dues reminder</p>
                  <p className="text-sm text-muted-foreground">
                    6 units have overdue payments
                  </p>
                </div>
                <Badge variant="secondary">Action Required</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">Security guard shift</p>
                  <p className="text-sm text-muted-foreground">
                    Night shift starts in 2 hours
                  </p>
                </div>
                <Badge variant="outline">Scheduled</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium">Festival celebration</p>
                  <p className="text-sm text-muted-foreground">
                    Diwali event tomorrow at 6 PM
                  </p>
                </div>
                <Badge className="bg-green-600">Upcoming</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-2 border-blue-600 pl-3">
                <p className="font-medium">Diwali Celebration</p>
                <p className="text-sm text-muted-foreground">
                  Tomorrow, 6:00 PM
                </p>
                <p className="text-xs text-muted-foreground">Community Hall</p>
              </div>

              <div className="border-l-2 border-green-600 pl-3">
                <p className="font-medium">Society Meeting</p>
                <p className="text-sm text-muted-foreground">Nov 15, 7:00 PM</p>
                <p className="text-xs text-muted-foreground">Conference Room</p>
              </div>

              <div className="border-l-2 border-purple-600 pl-3">
                <p className="font-medium">Health Camp</p>
                <p className="text-sm text-muted-foreground">Nov 20, 9:00 AM</p>
                <p className="text-xs text-muted-foreground">Garden Area</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
