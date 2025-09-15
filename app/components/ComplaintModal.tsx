/**
 * ComplaintModal Component
 * 
 * Renders a modal for viewing and editing a single complaint.
 * Features:
 * - Displays complaint details, status, due date, and admin notes.
 * - Allows updating status, due date, and notes with validation.
 * - Uses `useComplaintActions` hook for API updates.
 * - Calls `onUpdate` callback when a complaint is successfully updated.
 * - Handles errors and loading state, provides visual feedback.
 * 
 * Props:
 * - complaint: the complaint object to edit, or null if none.
 * - isOpen: boolean to control modal visibility.
 * - onClose: callback to close the modal.
 * - onUpdate: callback invoked with the updated complaint.
 * 
 * Client-side only:
 * - Uses React hooks (`useState`, `useEffect`) for state and lifecycle.
 * - Includes interactive form elements and dynamic UI updates.
 */
"use client";

import { useState, useEffect } from 'react';
import { X, Save, Calendar, FileText, AlertCircle } from 'lucide-react';
import type { Complaint } from '@/types/complaint';
import { useComplaintActions } from '../hooks/useComplaintActions';

interface ComplaintModalProps {
  complaint: Complaint | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedComplaint: Complaint) => void;
}

// Format timezone-safe date for input[type="date"]
const formatDateForInput = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const ComplaintModal: React.FC<ComplaintModalProps> = ({ 
  complaint, 
  isOpen, 
  onClose, 
  onUpdate 
}) => {
  const [status, setStatus] = useState<'open' | 'in_progress' | 'closed'>('open');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  
  const { updateComplaint, loading, error, setError } = useComplaintActions();

  // Reset form when complaint changes
  useEffect(() => {
    if (complaint) {
      setStatus(complaint.status);
      setError('');
      
      // if there are reviewed complaints, load the latest one's dueDate and notes
      if (complaint.reviewedComplaints && complaint.reviewedComplaints.length > 0) {
        const latestReview = complaint.reviewedComplaints[complaint.reviewedComplaints.length - 1];

        // Format timezone-safe date for input[type="date"]
        if (latestReview.dueDate) {
          setDueDate(formatDateForInput(latestReview.dueDate));
        } else {
          setDueDate('');
        }
        
        // load notes or empty string if none
        setNotes(latestReview.notes || '');
      } else {
        setDueDate('');
        setNotes('');
      }
    }
  }, [complaint, setError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaint) return;

    type UpdateData = {
      status: 'open' | 'in_progress' | 'closed';
      dueDate?: string;
      notes?: string;
    };

    const updateData: UpdateData = {
      status,
    };

    // only include dueDate if provided
    if (dueDate) {
      updateData.dueDate = dueDate;
    }

    // only include notes if provided (allow empty string to clear notes)
    if (notes !== undefined) {
      updateData.notes = notes.trim();
    }

    const result = await updateComplaint(complaint.complaint_Id, updateData);
    
    if (result) {
      onUpdate(result);
      onClose();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-red-600 bg-red-100';
      case 'in_progress': return 'text-yellow-600 bg-yellow-100';
      case 'closed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!isOpen || !complaint) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-auto max-h-[95vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-800">Edit Complaint</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Left Column - Complaint Info */}
            <div className="space-y-6">
              {/* Complaint Details */}
              <div className="p-4 bg-gray-50 rounded-lg h-fit">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-800">Complaint #{complaint.complaint_Id}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                    {complaint.status.replace('_', ' ')}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{complaint.title}</h4>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">{complaint.body}</p>
                <p className="text-gray-400 text-xs">
                  Created: {new Date(complaint.created_at).toLocaleDateString()}
                </p>
                
                {/* Current Review Info */}
                {complaint.reviewedComplaints && complaint.reviewedComplaints.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <p className="text-gray-500 text-xs font-medium mb-2">Current Review Info:</p>
                    <div className="space-y-1">
                      {complaint.reviewedComplaints.map((review, index) => (
                        <div key={review.reviewedComplaint_Id} className="text-xs text-gray-600 bg-white p-2 rounded border">
                          <div className="font-medium">Due: {new Date(review.dueDate).toLocaleDateString()}</div>
                          {review.notes && (
                            <div className="mt-1 text-gray-500">Notes: {review.notes}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Error Display */}
              {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </div>

            {/* Right Column - Edit Form */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'open' | 'in_progress' | 'closed')}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-sm"
                    style={{ 
                      '--tw-ring-color': 'var(--purple)',
                      '--tw-ring-opacity': '0.5'
                    } as React.CSSProperties}
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Due Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-sm"
                    style={{ 
                      '--tw-ring-color': 'var(--purple)',
                      '--tw-ring-opacity': '0.5'
                    } as React.CSSProperties}
                  />
                  {dueDate && (
                    <p className="text-xs text-gray-500 mt-1">
                      Selected: {new Date(dueDate + 'T00:00:00').toLocaleDateString()}
                    </p>
                  )}
                </div>

                {/* Notes */}
                <div className="flex-1 flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="w-4 h-4 inline mr-1" />
                    Admin Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes about this complaint..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent resize-none flex-1 text-sm min-h-[120px]"
                    style={{ 
                      '--tw-ring-color': 'var(--purple)',
                      '--tw-ring-opacity': '0.5'
                    } as React.CSSProperties}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {notes.length > 0 ? `${notes.length} characters` : 'No notes added yet'}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 mt-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-3 text-white rounded-lg font-medium transition-colors flex items-center justify-center disabled:opacity-50 text-sm"
                    style={{ backgroundColor: 'var(--purple)' }}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Update Complaint
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};