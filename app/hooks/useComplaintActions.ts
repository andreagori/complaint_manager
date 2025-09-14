"use client";
// Check if this file and useComplaint are really different.
import { useState } from 'react';
import type { Complaint } from '@/types/complaint';

interface UpdateComplaintData {
  status?: 'open' | 'in_progress' | 'closed';
  dueDate?: string;
  notes?: string;
}

export const useComplaintActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const updateComplaint = async (complaintId: number, data: UpdateComplaintData): Promise<Complaint | null> => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/complaints/${complaintId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: Please login again');
        }
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update complaint');
      }

      const updatedComplaint: Complaint = await response.json();
      return updatedComplaint;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateComplaint,
    loading,
    error,
    setError
  };
};