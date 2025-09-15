/**
 * TableComplaints Component
 *
 * Displays a fully interactive table of complaints with:
 * - Search and filters by created date and due date.
 * - Sorting by Complaint ID (ascending/descending).
 * - Row highlighting and hover effects.
 * - Status and due date coloring for easy visualization.
 * - Truncated text with tooltips for long titles/messages (optional).
 * - Clicking a row opens a modal to edit the complaint.
 * - Updates local state and triggers parent callbacks on edit.
 *
 * Props:
 * - complaints: Complaint[] – the list of complaints to display.
 * - filterComplaintsByDate: function to filter by created date.
 * - filterComplaintsByDueDate: function to filter by due date.
 * - onComplaintUpdate: callback fired when a complaint is updated.
 */

"use client";

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Edit, Calendar } from 'lucide-react';
import { ComplaintModal } from './ComplaintModal';
import type { Complaint } from '@/types/complaint';

interface TableComplaintsProps {
  complaints: Complaint[];
  filterComplaintsByDate: (complaints: Complaint[], dateFilter: string) => Complaint[];
  filterComplaintsByDueDate: (complaints: Complaint[], dueDateFilter: string) => Complaint[];
  onComplaintUpdate: () => void;
}

export const TableComplaints: React.FC<TableComplaintsProps> = ({ 
  complaints, 
  filterComplaintsByDate, 
  filterComplaintsByDueDate,
  onComplaintUpdate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
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

  // Apply filters and sorting
  let filteredComplaints = localComplaints;

  // Filter by created date
  filteredComplaints = filterComplaintsByDate(filteredComplaints, dateFilter);

  // Filter by due date
  filteredComplaints = filterComplaintsByDueDate(filteredComplaints, dueDateFilter);

  // Filter by search and status
  filteredComplaints = filteredComplaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.complaint_Id.toString().toLowerCase().includes(searchTerm.toLowerCase());
    

    return matchesSearch;
  });

  // Order by ID
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