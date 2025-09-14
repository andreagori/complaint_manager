"use client";

import React, { useState } from 'react';
import { useDashboard } from '../../hooks/useDashboard';
import { TableComplaints } from '../tableComplaints';
import { ShimmerButton } from '../magicui/shimmer-button';
import Loading from '../loading';
import { DashboardNavigation } from './DashboardNavigation';
import { DashboardStats } from './DashboardStats';
import { ComplaintList } from './ComplaintList';
import { ComplaintsChart } from './ComplaintsChart';

export function GeneralDashboard() {
  const [activeView, setActiveView] = useState<'dashboard' | 'complaints' | 'in_progress' | 'reviewed'>('dashboard');
  const { stats, loading, refreshLoading, error, refreshData, filterComplaintsByDate, filterComplaintsByDueDate } = useDashboard();

  if (loading) {
    return <Loading isVisible={true} message="Loading dashboard data..." />;
  }

  if (error) {
    return (
      <div className="w-full max-w-none mx-auto px-4">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-600 text-lg mb-4">{error}</div>
              <button 
                onClick={refreshData}
                className="px-4 py-2 rounded-lg transition-colors text-white"
                style={{ backgroundColor: 'var(--purple)' }}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderDashboardContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold" style={{ color: 'var(--dark-gray)' }}>General Statistics</h1>
              <ShimmerButton className="shadow-2xl" onClick={refreshData}>
                <span className="whitespace-pre-wrap text-center text-lg font-medium leading-none tracking-wide text-white">
                  Refresh
                </span>
              </ShimmerButton>
            </div>
            
            <DashboardStats 
              totalComplaints={stats.totalComplaints}
              openComplaints={stats.openComplaints}
              inProgressComplaints={stats.inProgressComplaints}
              closedComplaints={stats.closedComplaints}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ComplaintsChart 
                complaints={stats.complaints} 
                title="Complaints Over Time" 
              />
              <ComplaintList 
                complaints={stats.complaints} 
                title="Unseen Complaints" 
                statusFilter="open"
              />
            </div>
          </>
        );

      case 'complaints':
        return (
          <>
            <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--dark-gray)' }}>All Complaints</h1>
            <TableComplaints 
              complaints={stats.complaints} 
              filterComplaintsByDate={filterComplaintsByDate}
              filterComplaintsByDueDate={filterComplaintsByDueDate}
              onComplaintUpdate={refreshData}
              showStatusFilter={true}
            />
          </>
        );

      case 'in_progress':
        return (
          <>
            <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--dark-gray)' }}>In Progress Complaints</h1>
            <TableComplaints 
              complaints={stats.complaints.filter(c => c.status === 'in_progress')} 
              filterComplaintsByDate={filterComplaintsByDate}
              filterComplaintsByDueDate={filterComplaintsByDueDate}
              onComplaintUpdate={refreshData}
              showStatusFilter={false}
            />
          </>
        );

      case 'reviewed':
        return (
          <>
            <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--dark-gray)' }}>Reviewed Complaints</h1>
            <TableComplaints 
              complaints={stats.complaints.filter(c => c.status === 'closed')} 
              filterComplaintsByDate={filterComplaintsByDate}
              filterComplaintsByDueDate={filterComplaintsByDueDate}
              onComplaintUpdate={refreshData}
              showStatusFilter={false}
            />
          </>
        );
    }
  };

  return (
    <div className="w-full max-w-none mx-auto px-4">
      <DashboardNavigation activeView={activeView} onViewChange={setActiveView} />
      
      <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
        {renderDashboardContent()}
      </div>

      <Loading isVisible={refreshLoading} />
    </div>
  );
}

export default GeneralDashboard;