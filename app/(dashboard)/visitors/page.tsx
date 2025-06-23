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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Shield,
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  Car,
  Phone,
  User,
} from "lucide-react";
import { useSociety } from "@/contexts/society-context";

const mockVisitors = [
  {
    id: "1",
    name: "David Johnson",
    phone: "+1 (555) 987-6543",
    purpose: "Delivery - Amazon Package",
    unitNumber: "A-101",
    residentName: "John Smith",
    vehicleNumber: "MH12AB1234",
    checkInTime: "2024-11-12T10:30:00Z",
    checkOutTime: null,
    status: "checked-in",
    approvedBy: "Security Guard",
    securityNotes: "Valid ID verified, package delivery confirmed",
  },
  {
    id: "2",
    name: "Maria Garcia",
    phone: "+1 (555) 876-5432",
    purpose: "Personal Visit",
    unitNumber: "B-205",
    residentName: "Sarah Johnson",
    vehicleNumber: null,
    checkInTime: "2024-11-12T14:15:00Z",
    checkOutTime: "2024-11-12T16:45:00Z",
    status: "checked-out",
    approvedBy: "Sarah Johnson",
    securityNotes: "Pre-approved visitor, family member",
  },
  {
    id: "3",
    name: "Tech Support Team",
    phone: "+1 (555) 765-4321",
    purpose: "Internet Installation",
    unitNumber: "C-302",
    residentName: "Mike Wilson",
    vehicleNumber: "MH14CD5678",
    checkInTime: "2024-11-12T09:00:00Z",
    checkOutTime: "2024-11-12T12:30:00Z",
    status: "checked-out",
    approvedBy: "Mike Wilson",
    securityNotes: "Service provider, work completed successfully",
  },
  {
    id: "4",
    name: "Dr. Priya Sharma",
    phone: "+1 (555) 654-3210",
    purpose: "Medical Consultation",
    unitNumber: "D-401",
    residentName: "Emily Davis",
    vehicleNumber: null,
    checkInTime: "2024-11-12T11:00:00Z",
    checkOutTime: null,
    status: "checked-in",
    approvedBy: "Emily Davis",
    securityNotes: "Doctor visit, emergency consultation",
  },
];

export default function VisitorsPage() {
  const { currentSociety } = useSociety();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);

  const filteredVisitors = mockVisitors.filter((visitor) => {
    const matchesSearch =
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.phone.includes(searchTerm) ||
      visitor.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || visitor.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "checked-in":
        return "bg-green-100 text-green-800";
      case "checked-out":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "checked-in":
        return <CheckCircle className="h-4 w-4" />;
      case "checked-out":
        return <XCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
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
              Visitor Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Track and manage visitors for {currentSociety?.name}
            </p>
          </div>
          <Dialog open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Check In Visitor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Check In Visitor</DialogTitle>
                <DialogDescription>
                  Register a new visitor entry.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="visitorName" className="text-right">
                    Visitor Name
                  </Label>
                  <Input id="visitorName" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="phone" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="unit" className="text-right">
                    Visiting Unit
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A-101">A-101 - John Smith</SelectItem>
                      <SelectItem value="B-205">
                        B-205 - Sarah Johnson
                      </SelectItem>
                      <SelectItem value="C-302">C-302 - Mike Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="purpose" className="text-right">
                    Purpose
                  </Label>
                  <Input
                    id="purpose"
                    className="col-span-3"
                    placeholder="e.g., Personal visit, Delivery"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="vehicle" className="text-right">
                    Vehicle No.
                  </Label>
                  <Input
                    id="vehicle"
                    className="col-span-3"
                    placeholder="Optional"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea id="notes" className="col-span-3" rows={3} />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCheckInOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsCheckInOpen(false)}>
                  Check In
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
                Today's Visitors
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockVisitors.length}</div>
              <p className="text-xs text-muted-foreground">
                Total entries today
              </p>
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
              <CardTitle className="text-sm font-medium">
                Currently Inside
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {mockVisitors.filter((v) => v.status === "checked-in").length}
              </div>
              <p className="text-xs text-muted-foreground">Active visitors</p>
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
              <CardTitle className="text-sm font-medium">Checked Out</CardTitle>
              <XCircle className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">
                {mockVisitors.filter((v) => v.status === "checked-out").length}
              </div>
              <p className="text-xs text-muted-foreground">Completed visits</p>
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
                With Vehicles
              </CardTitle>
              <Car className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockVisitors.filter((v) => v.vehicleNumber).length}
              </div>
              <p className="text-xs text-muted-foreground">Parked vehicles</p>
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
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search visitors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="checked-in">Checked In</SelectItem>
                  <SelectItem value="checked-out">Checked Out</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Visitors List */}
      <div className="space-y-4">
        {filteredVisitors.map((visitor, index) => (
          <motion.div
            key={visitor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {visitor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(visitor.status)}
                        <CardTitle className="text-lg">
                          {visitor.name}
                        </CardTitle>
                        <Badge className={getStatusBadgeColor(visitor.status)}>
                          {visitor.status.replace("-", " ")}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Phone className="h-3 w-3" />
                          <span>{visitor.phone}</span>
                        </div>
                        {visitor.vehicleNumber && (
                          <div className="flex items-center space-x-1">
                            <Car className="h-3 w-3" />
                            <span>{visitor.vehicleNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-medium">Unit {visitor.unitNumber}</div>
                    <div className="text-muted-foreground">
                      {visitor.residentName}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-1">
                    Purpose of Visit
                  </div>
                  <p className="text-muted-foreground">{visitor.purpose}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium mb-1">
                      Check In Time
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(visitor.checkInTime).toLocaleString()}
                    </p>
                  </div>
                  {visitor.checkOutTime && (
                    <div>
                      <div className="text-sm font-medium mb-1">
                        Check Out Time
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(visitor.checkOutTime).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <div className="text-sm font-medium mb-1">Approved By</div>
                  <p className="text-sm text-muted-foreground">
                    {visitor.approvedBy}
                  </p>
                </div>

                {visitor.securityNotes && (
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="text-sm font-medium mb-1">
                      Security Notes
                    </div>
                    <p className="text-sm">{visitor.securityNotes}</p>
                  </div>
                )}

                <div className="flex justify-end space-x-2 pt-2 border-t">
                  {visitor.status === "checked-in" && (
                    <Button size="sm">Check Out</Button>
                  )}
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
