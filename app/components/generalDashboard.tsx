"use client";

import React, { useState } from 'react';
import { Home, List, FileText, AlertTriangle, Clock, CheckCircle, Users, Search, ChevronDown, ChevronUp, Edit, Calendar } from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';
import { ComplaintModal } from './ComplaintModal';
import type { Complaint } from '@/types/complaint';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border-2" style={{ borderColor: 'var(--purple)' }}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold mt-2" style={{ color: 'var(--purple)' }}>{value}</p>
      </div>
      <div style={{ color: 'var(--purple)' }}>
        {icon}
      </div>
    </div>
  </div>
);

interface ComplaintListProps {
  complaints: Complaint[];
  title: string;
  statusFilter?: string;
}

const ComplaintList: React.FC<ComplaintListProps> = ({ complaints, title, statusFilter }) => {
  const filteredComplaints = statusFilter 
    ? complaints.filter(c => c.status === statusFilter)
    : complaints;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-red-600 bg-red-100';
      case 'in_progress': return 'text-yellow-600 bg-yellow-100';
      case 'closed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDueDateInfo = (complaint: Complaint) => {
    if (!complaint.reviewedComplaints || complaint.reviewedComplaints.length === 0) {
      return null;
    }
    
    // Obtener la fecha más próxima
    const dueDates = complaint.reviewedComplaints.map(rc => new Date(rc.dueDate));
    const nearestDueDate = new Date(Math.min(...dueDates.map(date => date.getTime())));
    
    const today = new Date();
    const isOverdue = nearestDueDate < today;
    const isToday = nearestDueDate.toDateString() === today.toDateString();
    
    let colorClass = 'text-blue-600';
    if (isOverdue) colorClass = 'text-red-600';
    else if (isToday) colorClass = 'text-orange-600';
    
    return {
      date: nearestDueDate,
      colorClass
    };
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border-2" style={{ borderColor: 'var(--purple)' }}>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">{title}</h2>
      <div className="h-80 overflow-y-auto">
        {filteredComplaints.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>No complaints found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredComplaints.slice(0, 10).map((complaint) => {
              const dueDateInfo = getDueDateInfo(complaint);
              
              return (
                <div key={complaint.complaint_Id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-800 truncate">{complaint.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                      {complaint.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">{complaint.body}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-400 text-xs">
                      {new Date(complaint.created_at).toLocaleDateString()}
                    </p>
                    {dueDateInfo && (
                      <p className={`text-xs font-medium ${dueDateInfo.colorClass}`}>
                        Due: {dueDateInfo.date.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

interface ComplaintsTableProps {
  complaints: Complaint[];
  filterComplaintsByDate: (complaints: Complaint[], dateFilter: string) => Complaint[];
  filterComplaintsByDueDate: (complaints: Complaint[], dueDateFilter: string) => Complaint[];
  onComplaintUpdate: () => void;
}

const ComplaintsTable: React.FC<ComplaintsTableProps> = ({ 
  complaints, 
  filterComplaintsByDate, 
  filterComplaintsByDueDate,
  onComplaintUpdate 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [dueDateFilter, setDueDateFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localComplaints, setLocalComplaints] = useState<Complaint[]>(complaints);

  // Update local state when props change
  React.useEffect(() => {
    setLocalComplaints(complaints);
  }, [complaints]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-red-600 bg-red-100';
      case 'in_progress': return 'text-yellow-600 bg-yellow-100';
      case 'closed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Open';
      case 'in_progress': return 'In Progress';
      case 'closed': return 'Closed';
      default: return status;
    }
  };

  const getDueDateInfo = (complaint: Complaint) => {
    if (!complaint.reviewedComplaints || complaint.reviewedComplaints.length === 0) {
      return null;
    }
    
    // Obtener la fecha más próxima
    const dueDates = complaint.reviewedComplaints.map(rc => new Date(rc.dueDate));
    const nearestDueDate = new Date(Math.min(...dueDates.map(date => date.getTime())));
    
    const today = new Date();
    const isOverdue = nearestDueDate < today;
    const isToday = nearestDueDate.toDateString() === today.toDateString();
    
    let colorClass = 'text-blue-600';
    if (isOverdue) colorClass = 'text-red-600';
    else if (isToday) colorClass = 'text-orange-600';
    
    return {
      date: nearestDueDate,
      colorClass
    };
  };

  const toggleSort = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleRowClick = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setIsModalOpen(true);
  };

  const handleComplaintUpdate = (updatedComplaint: Complaint) => {
    setLocalComplaints(prev => 
      prev.map(complaint => 
        complaint.complaint_Id === updatedComplaint.complaint_Id 
          ? updatedComplaint 
          : complaint
      )
    );
    onComplaintUpdate();
  };

  // Aplicar filtros y ordenamiento
  let filteredComplaints = localComplaints;

  // Filtrar por fecha de creación
  filteredComplaints = filterComplaintsByDate(filteredComplaints, dateFilter);

  // Filtrar por due date
  filteredComplaints = filterComplaintsByDueDate(filteredComplaints, dueDateFilter);

  // Filtrar por búsqueda y status
  filteredComplaints = filteredComplaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.complaint_Id.toString().toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Ordenar por ID
  filteredComplaints = [...filteredComplaints].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.complaint_Id - b.complaint_Id;
    } else {
      return b.complaint_Id - a.complaint_Id;
    }
  });

  return (
    <>
      <div>
        {/* Filters */}
        <div className="mb-6">
          {/* Una sola fila de filtros */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Grupo izquierdo: Search y Status */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search complaints..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent w-64"
                  style={{ 
                    '--tw-ring-color': 'var(--purple)',
                    '--tw-ring-opacity': '0.5'
                  } as React.CSSProperties}
                />
              </div>

              {/* Status Filter */}
              <div className="relative min-w-[140px]">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:border-transparent w-full"
                  style={{ 
                    '--tw-ring-color': 'var(--purple)',
                    '--tw-ring-opacity': '0.5'
                  } as React.CSSProperties}
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Grupo derecho: Date filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Created Date Filter */}
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm whitespace-nowrap">Created:</span>
                <div className="relative min-w-[130px]">
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:border-transparent w-full text-sm"
                    style={{ 
                      '--tw-ring-color': 'var(--purple)',
                      '--tw-ring-opacity': '0.5'
                    } as React.CSSProperties}
                  >
                    <option value="all">All Dates</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 pointer-events-none" />
                </div>
              </div>

              {/* Due Date Filter */}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600 text-sm whitespace-nowrap">Due:</span>
                <div className="relative min-w-[140px]">
                  <select
                    value={dueDateFilter}
                    onChange={(e) => setDueDateFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:border-transparent w-full text-sm"
                    style={{ 
                      '--tw-ring-color': 'var(--purple)',
                      '--tw-ring-opacity': '0.5'
                    } as React.CSSProperties}
                  >
                    <option value="all">All Due Dates</option>
                    <option value="overdue">Overdue</option>
                    <option value="today">Due Today</option>
                    <option value="week">Due This Week</option>
                    <option value="month">Due This Month</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg border-2 overflow-hidden" style={{ borderColor: 'var(--purple)' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={toggleSort}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Complaint ID</span>
                      {sortOrder === 'asc' ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Created Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Due Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Message</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredComplaints.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No complaints found matching your criteria
                    </td>
                  </tr>
                ) : (
                  filteredComplaints.map((complaint, index) => {
                    const dueDateInfo = getDueDateInfo(complaint);
                    
                    return (
                      <tr 
                        key={complaint.complaint_Id} 
                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors cursor-pointer`}
                        onClick={() => handleRowClick(complaint)}
                      >
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                          {complaint.complaint_Id}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                            {getStatusText(complaint.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(complaint.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {dueDateInfo ? (
                            <span className={`font-medium ${dueDateInfo.colorClass}`}>
                              {dueDateInfo.date.toLocaleDateString()}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs">No due date</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                          {complaint.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate">
                          {complaint.body}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRowClick(complaint);
                            }}
                            className="p-2 hover:bg-purple-100 rounded-full transition-colors"
                            style={{ color: 'var(--purple)' }}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredComplaints.length} of {localComplaints.length} complaints
        </div>
      </div>

      {/* Modal */}
      <ComplaintModal
        complaint={selectedComplaint}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedComplaint(null);
        }}
        onUpdate={handleComplaintUpdate}
      />
    </>
  );
};

export function GeneralDashboard() {
  const [activeView, setActiveView] = useState<'dashboard' | 'complaints' | 'reviewed'>('dashboard');
  const { stats, loading, error, refreshData, filterComplaintsByDate, filterComplaintsByDueDate } = useDashboard();

  if (loading) {
    return (
      <div className="w-full max-w-none mx-auto px-4">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading dashboard data...</div>
          </div>
        </div>
      </div>
    );
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

  return (
    <div className="w-full max-w-none mx-auto px-4 mt-5">
      {/* Navigation */}
      <nav className="flex space-x-4 mb-8">
        <button 
          onClick={() => setActiveView('dashboard')}
          className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            activeView === 'dashboard' 
              ? 'bg-white bg-opacity-20 backdrop-blur-sm' 
              : 'text-white text-opacity-80 hover:bg-white hover:bg-opacity-10'
          }`}
          style={{ 
            color: activeView === 'dashboard' ? 'var(--muted-foreground)' : undefined 
          }}
        >
          <Home className="w-5 h-5" />
          <span>Dashboard</span>
        </button>
        <button 
          onClick={() => setActiveView('complaints')}
          className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            activeView === 'complaints' 
              ? 'bg-white bg-opacity-20 backdrop-blur-sm' 
              : 'text-white text-opacity-80 hover:bg-white hover:bg-opacity-10'
          }`}
          style={{ 
            color: activeView === 'complaints' ? 'var(--muted-foreground)' : undefined 
          }}
        >
          <List className="w-5 h-5" />
          <span>All Complaints</span>
        </button>
        <button 
          onClick={() => setActiveView('reviewed')}
          className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            activeView === 'reviewed' 
              ? 'bg-white bg-opacity-20 backdrop-blur-sm' 
              : 'text-white text-opacity-80 hover:bg-white hover:bg-opacity-10'
          }`}
          style={{ 
            color: activeView === 'reviewed' ? 'var(--muted-foreground)' : undefined 
          }}
        >
          <FileText className="w-5 h-5" />
          <span>In Progress</span>
        </button>
      </nav>

      {/* Main Content */}
      <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
        {activeView === 'dashboard' && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">General Statistics</h1>
              <button 
                onClick={refreshData}
                className="px-6 py-3 rounded-lg font-medium transition-colors text-white"
                style={{ backgroundColor: 'var(--purple)' }}
              >
                Refresh
              </button>
            </div>
            
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <StatCard
                title="Total Complaints"
                value={stats.totalComplaints}
                icon={<Users className="w-8 h-8" />}
              />
              <StatCard
                title="Unseen Complaints"
                value={stats.openComplaints}
                icon={<AlertTriangle className="w-8 h-8" />}
              />
              <StatCard
                title="In Progress"
                value={stats.inProgressComplaints}
                icon={<Clock className="w-8 h-8" />}
              />
              <StatCard
                title="Reviewed Complaints"
                value={stats.closedComplaints}
                icon={<CheckCircle className="w-8 h-8" />}
              />
            </div>

            {/* Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ComplaintList 
                complaints={stats.complaints} 
                title="Recent Complaints" 
              />
              <ComplaintList 
                complaints={stats.complaints} 
                title="Unseen Complaints" 
                statusFilter="open"
              />
            </div>
          </>
        )}

        {activeView === 'complaints' && (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">All Complaints</h1>
            <ComplaintsTable 
              complaints={stats.complaints} 
              filterComplaintsByDate={filterComplaintsByDate}
              filterComplaintsByDueDate={filterComplaintsByDueDate}
              onComplaintUpdate={refreshData}
            />
          </>
        )}

        {activeView === 'reviewed' && (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">In Progress Complaints</h1>
            <ComplaintList 
              complaints={stats.complaints} 
              title={`In Progress (${stats.inProgressComplaints})`} 
              statusFilter="in_progress"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default GeneralDashboard;