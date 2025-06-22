export interface Society {
  id: string;
  name: string;
  address: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  totalUnits: number;
  createdAt: Date;
  plan: 'basic' | 'premium' | 'enterprise';
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'resident' | 'security';
  societyId?: string;
  unitNumber?: string;
  phone?: string;
  avatar?: string;
}

export interface Unit {
  id: string;
  societyId: string;
  number: string;
  type: 'apartment' | 'villa' | 'penthouse';
  ownerName: string;
  ownerContact: string;
  residents: User[];
  maintenanceBalance: number;
}

export interface MaintenanceBill {
  id: string;
  societyId: string;
  unitId: string;
  amount: number;
  dueDate: Date;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
  createdAt: Date;
}

export interface Complaint {
  id: string;
  societyId: string;
  unitId: string;
  residentId: string;
  category: 'maintenance' | 'security' | 'cleanliness' | 'noise' | 'other';
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Date;
  resolvedAt?: Date;
  managerResponse?: string;
}

export interface Visitor {
  id: string;
  societyId: string;
  unitId: string;
  name: string;
  phone: string;
  purpose: string;
  vehicleNumber?: string;
  checkInTime: Date;
  checkOutTime?: Date;
  approvedBy: string;
  securityNotes?: string;
}

export interface Event {
  id: string;
  societyId: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  organizer: string;
  contributionRequired?: number;
  contributionsPaid: number;
  attendees: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}