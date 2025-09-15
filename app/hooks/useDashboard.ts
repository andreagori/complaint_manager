/**
 * useDashboard Hook
 *
 * Manages fetching and filtering complaints data for the dashboard, including loading and error states:
 * - stats → Holds counts of total, open, in-progress, and closed complaints, as well as the complaints list.
 * - loading → Boolean indicating if initial data is being fetched.
 * - refreshLoading → Boolean indicating if a refresh request is in progress.
 * - error → String containing any error message.
 * - refreshData() → Fetches the latest complaints data, setting refreshLoading state.
 * - filterComplaintsByDate(complaints, dateFilter) → Filters complaints based on creation date ('today', 'week', 'month').
 * - filterComplaintsByDueDate(complaints, filter) → Filters complaints based on due date ('today', 'week', 'month').
 *
 * Returns:
 * - stats: Dashboard statistics and complaints list
 * - loading: Boolean for initial loading state
 * - refreshLoading: Boolean for refresh loading state
 * - error: Error message if fetch fails
 * - refreshData: Function to refresh complaints data
 * - filterComplaintsByDate: Function to filter complaints by created date
 * - filterComplaintsByDueDate: Function to filter complaints by due date
 */

import { useState, useEffect } from 'react';
import type { Complaint } from '@/types/complaint';

interface DashboardStats {
  totalComplaints: number;
  openComplaints: number;
  inProgressComplaints: number;
  closedComplaints: number;
  complaints: Complaint[];
}

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalComplaints: 0,
    openComplaints: 0,
    inProgressComplaints: 0,
    closedComplaints: 0,
    complaints: []
  });
  const [loading, setLoading] = useState(true);
  const [refreshLoading, setRefreshLoading] = useState(false); // Nuevo estado para refresh
  const [error, setError] = useState<string>('');

  const fetchDashboardData = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshLoading(true);
    } else {
      setLoading(true);
    }
    setError('');

    try {
      const response = await fetch('/api/complaints', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) throw new Error('Unauthorized: Please login again');
        throw new Error('Failed to fetch complaints data');
      }

      const complaints: Complaint[] = await response.json();
      
      const totalComplaints = complaints.length;
      const openComplaints = complaints.filter(c => c.status === 'open').length;
      const inProgressComplaints = complaints.filter(c => c.status === 'in_progress').length;
      const closedComplaints = complaints.filter(c => c.status === 'closed').length;

      setStats({
        totalComplaints,
        openComplaints,
        inProgressComplaints,
        closedComplaints,
        complaints
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      if (isRefresh) {
        setRefreshLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  // refresh loading overlay
  const refreshData = () => fetchDashboardData(true);

  // filter by creation date
  const filterComplaintsByDate = (complaints: Complaint[], dateFilter: string): Complaint[] => {
    if (dateFilter === 'all') return complaints;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return complaints.filter(complaint => {
      const complaintDate = new Date(complaint.created_at);
      
      switch (dateFilter) {
        case 'today':
          return complaintDate >= today;
        case 'week':
          const weekAgo = new Date(today);
          weekAgo.setDate(today.getDate() - 7);
          return complaintDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(today);
          monthAgo.setMonth(today.getMonth() - 1);
          return complaintDate >= monthAgo;
        default:
          return true;
      }
    });
  };

  // Filter for due date.
  const filterComplaintsByDueDate = (complaints: Complaint[], filter: string): Complaint[] => {
    if (filter === 'all') return complaints;

    const now = new Date();
    return complaints.filter(c => {
      if (!c.reviewedComplaints || c.reviewedComplaints.length === 0) return false;

      return c.reviewedComplaints.some(rc => {
        const due = new Date(rc.dueDate);
        const diffDays = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

        if (filter === 'today') return due.toDateString() === now.toDateString();
        if (filter === 'week') return diffDays >= 0 && diffDays <= 7;
        if (filter === 'month') return diffDays >= 0 && diffDays <= 30;
        return false;
      });
    });
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    stats,
    loading,
    refreshLoading, 
    error,
    refreshData,
    filterComplaintsByDate,
    filterComplaintsByDueDate
  };
};
