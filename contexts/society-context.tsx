"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Society, User } from '@/types';
import { useUser } from '@clerk/nextjs';

interface SocietyContextType {
  currentSociety: Society | null;
  currentUser: User | null;
  societies: Society[];
  switchSociety: (societyId: string) => void;
  updateSociety: (society: Partial<Society>) => void;
  isLoading: boolean;
}

const SocietyContext = createContext<SocietyContextType | undefined>(undefined);

export function SocietyProvider({ children }: { children: React.ReactNode }) {
  const { user: clerkUser } = useUser();
  const [currentSociety, setCurrentSociety] = useState<Society | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [societies, setSocieties] = useState<Society[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - In production, this would fetch from your API
  useEffect(() => {
    if (clerkUser) {
      // Mock societies data
      const mockSocieties: Society[] = [
        {
          id: '1',
          name: 'Green Valley Apartments',
          address: '123 Main St, City, State 12345',
          primaryColor: '#3B82F6',
          secondaryColor: '#10B981',
          totalUnits: 120,
          createdAt: new Date(),
          plan: 'premium'
        },
        {
          id: '2',
          name: 'Sunset Residency',
          address: '456 Oak Ave, City, State 67890',
          primaryColor: '#F59E0B',
          secondaryColor: '#EF4444',
          totalUnits: 85,
          createdAt: new Date(),
          plan: 'basic'
        }
      ];

      // Mock user data
      const mockUser: User = {
        id: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        name: clerkUser.fullName || 'User',
        role: 'admin', // This would be determined by your backend
        societyId: '1',
        unitNumber: 'A-101',
        phone: '+1234567890'
      };

      setSocieties(mockSocieties);
      setCurrentUser(mockUser);
      setCurrentSociety(mockSocieties[0]);
      setIsLoading(false);
    }
  }, [clerkUser]);

  const switchSociety = (societyId: string) => {
    const society = societies.find(s => s.id === societyId);
    if (society) {
      setCurrentSociety(society);
    }
  };

  const updateSociety = (updates: Partial<Society>) => {
    if (currentSociety) {
      const updatedSociety = { ...currentSociety, ...updates };
      setCurrentSociety(updatedSociety);
      setSocieties(societies.map(s => s.id === updatedSociety.id ? updatedSociety : s));
    }
  };

  return (
    <SocietyContext.Provider value={{
      currentSociety,
      currentUser,
      societies,
      switchSociety,
      updateSociety,
      isLoading
    }}>
      {children}
    </SocietyContext.Provider>
  );
}

export function useSociety() {
  const context = useContext(SocietyContext);
  if (context === undefined) {
    throw new Error('useSociety must be used within a SocietyProvider');
  }
  return context;
}