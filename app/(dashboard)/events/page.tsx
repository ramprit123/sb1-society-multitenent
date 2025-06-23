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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Search,
  Filter,
  Plus,
  MapPin,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useSociety } from "@/contexts/society-context";

const mockEvents = [
  {
    id: "1",
    title: "Diwali Celebration 2024",
    description:
      "Join us for a grand Diwali celebration with traditional decorations, cultural performances, and delicious food.",
    date: "2024-11-13T18:00:00Z",
    location: "Community Hall",
    organizer: "Cultural Committee",
    contributionRequired: 500,
    contributionsPaid: 12500,
    totalContributors: 25,
    maxAttendees: 150,
    currentAttendees: 89,
    status: "upcoming",
    category: "festival",
  },
  {
    id: "2",
    title: "Society Annual Meeting",
    description:
      "Annual general meeting to discuss society matters, budget approval, and committee elections.",
    date: "2024-11-15T19:00:00Z",
    location: "Conference Room",
    organizer: "Management Committee",
    contributionRequired: 0,
    contributionsPaid: 0,
    totalContributors: 0,
    maxAttendees: 50,
    currentAttendees: 32,
    status: "upcoming",
    category: "meeting",
  },
  {
    id: "3",
    title: "Health & Wellness Camp",
    description:
      "Free health checkup camp with qualified doctors and health screening facilities.",
    date: "2024-11-20T09:00:00Z",
    location: "Garden Area",
    organizer: "Health Committee",
    contributionRequired: 200,
    contributionsPaid: 8400,
    totalContributors: 42,
    maxAttendees: 100,
    currentAttendees: 67,
    status: "upcoming",
    category: "health",
  },
  {
    id: "4",
    title: "Children's Day Celebration",
    description:
      "Fun-filled day with games, competitions, and prizes for all children in the society.",
    date: "2024-11-14T16:00:00Z",
    location: "Playground",
    organizer: "Kids Club",
    contributionRequired: 300,
    contributionsPaid: 7200,
    totalContributors: 24,
    maxAttendees: 80,
    currentAttendees: 45,
    status: "completed",
    category: "celebration",
  },
];

export default function EventsPage() {
  const { currentSociety } = useSociety();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || event.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || event.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "festival":
        return "bg-purple-100 text-purple-800";
      case "meeting":
        return "bg-orange-100 text-orange-800";
      case "health":
        return "bg-green-100 text-green-800";
      case "celebration":
        return "bg-pink-100 text-pink-800";
      case "sports":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Clock className="h-4 w-4" />;
      case "ongoing":
        return <AlertCircle className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Events & Activities
            </h1>
            <p className="text-muted-foreground mt-2">
              Organize and manage community events for {currentSociety?.name}
            </p>
          </div>
          <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>
                  Organize a new community event or activity.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input id="title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="festival">Festival</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="celebration">Celebration</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date & Time
                  </Label>
                  <Input
                    id="date"
                    type="datetime-local"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input id="location" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contribution" className="text-right">
                    Contribution
                  </Label>
                  <Input
                    id="contribution"
                    type="number"
                    className="col-span-3"
                    placeholder="Optional"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="maxAttendees" className="text-right">
                    Max Attendees
                  </Label>
                  <Input
                    id="maxAttendees"
                    type="number"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="description" className="col-span-3" rows={4} />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateEventOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateEventOpen(false)}>
                  Create Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Events
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockEvents.length}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockEvents.filter((e) => e.status === "upcoming").length}
              </div>
              <p className="text-xs text-muted-foreground">Events scheduled</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Attendees
              </CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {mockEvents.reduce(
                  (sum, event) => sum + event.currentAttendees,
                  0
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Registered participants
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Contributions
              </CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                ₹
                {mockEvents
                  .reduce((sum, event) => sum + event.contributionsPaid, 0)
                  .toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Total collected</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="festival">Festival</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="celebration">Celebration</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Events List */}
      <div className="space-y-6">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(event.status)}
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusBadgeColor(event.status)}>
                        {event.status}
                      </Badge>
                      <Badge className={getCategoryBadgeColor(event.category)}>
                        {event.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        {new Date(event.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{event.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Organized by {event.organizer}</span>
                  </div>
                </div>

                {/* Attendance Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Attendance</span>
                    <span>
                      {event.currentAttendees} / {event.maxAttendees}
                    </span>
                  </div>
                  <Progress
                    value={(event.currentAttendees / event.maxAttendees) * 100}
                    className="h-2"
                  />
                </div>

                {/* Contribution Progress */}
                {event.contributionRequired > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Contributions</span>
                      <span>
                        ₹{event.contributionsPaid.toLocaleString()} (₹
                        {event.contributionRequired}/person)
                      </span>
                    </div>
                    <Progress
                      value={
                        (event.contributionsPaid /
                          (event.contributionRequired *
                            event.totalContributors)) *
                        100
                      }
                      className="h-2"
                    />
                    <div className="text-xs text-muted-foreground">
                      {event.totalContributors} contributors
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-xs text-muted-foreground">
                    {event.status === "upcoming" && (
                      <span>
                        Starts in{" "}
                        {Math.ceil(
                          (new Date(event.date).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days
                      </span>
                    )}
                    {event.status === "completed" && (
                      <span>
                        Completed on {new Date(event.date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {event.status === "upcoming" && (
                      <Button size="sm">Register</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
