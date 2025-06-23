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
  CreditCard,
  Search,
  Filter,
  Plus,
  Download,
  Eye,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { useSociety } from "@/contexts/society-context";

const mockBills = [
  {
    id: "1",
    unitNumber: "A-101",
    ownerName: "John Smith",
    amount: 4500,
    dueDate: "2024-11-15",
    status: "paid",
    paidDate: "2024-11-10",
    description: "Monthly Maintenance - November 2024",
  },
  {
    id: "2",
    unitNumber: "B-205",
    ownerName: "Sarah Johnson",
    amount: 4500,
    dueDate: "2024-11-15",
    status: "pending",
    description: "Monthly Maintenance - November 2024",
  },
  {
    id: "3",
    unitNumber: "C-302",
    ownerName: "Mike Wilson",
    amount: 4500,
    dueDate: "2024-10-15",
    status: "overdue",
    description: "Monthly Maintenance - October 2024",
  },
  {
    id: "4",
    unitNumber: "D-401",
    ownerName: "Emily Davis",
    amount: 4500,
    dueDate: "2024-11-15",
    status: "paid",
    paidDate: "2024-11-08",
    description: "Monthly Maintenance - November 2024",
  },
];

export default function BillingPage() {
  const { currentSociety } = useSociety();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateBillOpen, setIsCreateBillOpen] = useState(false);

  const filteredBills = mockBills.filter((bill) => {
    const matchesSearch =
      bill.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || bill.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalAmount = mockBills.reduce((sum, bill) => sum + bill.amount, 0);
  const paidAmount = mockBills
    .filter((bill) => bill.status === "paid")
    .reduce((sum, bill) => sum + bill.amount, 0);
  const pendingAmount = mockBills
    .filter((bill) => bill.status === "pending")
    .reduce((sum, bill) => sum + bill.amount, 0);
  const overdueAmount = mockBills
    .filter((bill) => bill.status === "overdue")
    .reduce((sum, bill) => sum + bill.amount, 0);

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
              Billing & Payments
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage maintenance bills and track payments for{" "}
              {currentSociety?.name}
            </p>
          </div>
          <Dialog open={isCreateBillOpen} onOpenChange={setIsCreateBillOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Bill
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Bill</DialogTitle>
                <DialogDescription>
                  Generate a new maintenance bill for a unit.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="unit" className="text-right">
                    Unit
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A-101">A-101</SelectItem>
                      <SelectItem value="B-205">B-205</SelectItem>
                      <SelectItem value="C-302">C-302</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount
                  </Label>
                  <Input id="amount" type="number" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dueDate" className="text-right">
                    Due Date
                  </Label>
                  <Input id="dueDate" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="description" className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateBillOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateBillOpen(false)}>
                  Create Bill
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
                Total Amount
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{totalAmount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Current billing cycle
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
              <CardTitle className="text-sm font-medium">Collected</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ₹{paidAmount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((paidAmount / totalAmount) * 100)}% collection rate
              </p>
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
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Calendar className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                ₹{pendingAmount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {mockBills.filter((b) => b.status === "pending").length} units
                pending
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
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                ₹{overdueAmount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {mockBills.filter((b) => b.status === "overdue").length} units
                overdue
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Collection Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Collection Progress</CardTitle>
            <CardDescription>
              November 2024 maintenance collection status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Collected</span>
                <span>
                  ₹{paidAmount.toLocaleString()} / ₹
                  {totalAmount.toLocaleString()}
                </span>
              </div>
              <Progress
                value={(paidAmount / totalAmount) * 100}
                className="h-2"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  {mockBills.filter((b) => b.status === "paid").length}
                </div>
                <div className="text-xs text-muted-foreground">Paid</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-600">
                  {mockBills.filter((b) => b.status === "pending").length}
                </div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">
                  {mockBills.filter((b) => b.status === "overdue").length}
                </div>
                <div className="text-xs text-muted-foreground">Overdue</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
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
                  placeholder="Search by unit or owner..."
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
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bills Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Bills & Payments</CardTitle>
            <CardDescription>
              Manage maintenance bills and track payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredBills.map((bill, index) => (
                <motion.div
                  key={bill.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">Unit {bill.unitNumber}</h3>
                        <Badge className={getStatusBadgeColor(bill.status)}>
                          {bill.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {bill.ownerName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {bill.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-lg">
                      ₹{bill.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Due: {new Date(bill.dueDate).toLocaleDateString()}
                    </div>
                    {bill.paidDate && (
                      <div className="text-xs text-green-600">
                        Paid: {new Date(bill.paidDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
