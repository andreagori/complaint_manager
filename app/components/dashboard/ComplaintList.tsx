import React from 'react';
import type { Complaint } from '@/types/complaint';

interface ComplaintListProps {
  complaints: Complaint[];
  title: string;
  statusFilter?: string;
}

export const ComplaintList: React.FC<ComplaintListProps> = ({ complaints, title, statusFilter }) => {
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