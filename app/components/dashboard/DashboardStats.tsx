/**
 * DashboardStats Component
 * 
 * Displays a grid of statistic cards showing complaint counts by category.
 * 
 * Props:
 * - totalComplaints: total number of complaints.
 * - openComplaints: number of unseen/open complaints.
 * - inProgressComplaints: number of complaints currently in progress.
 * - closedComplaints: number of reviewed/closed complaints.
 * 
 * Client-side only:
 * - Purely presentational component, renders static data passed via props.
 */

import { AlertTriangle, Clock, CheckCircle, Users } from 'lucide-react';
import { StatCard } from './StatCard';

interface DashboardStatsProps {
  totalComplaints: number;
  openComplaints: number;
  inProgressComplaints: number;
  closedComplaints: number;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  totalComplaints,
  openComplaints,
  inProgressComplaints,
  closedComplaints
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
      <StatCard
        title="Total Complaints"
        value={totalComplaints}
        icon={<Users className="w-8 h-8" />}
        color="#6366f1"
      />
      <StatCard
        title="Unseen Complaints"
        value={openComplaints}
        icon={<AlertTriangle className="w-8 h-8" />}
        color="#ef4444"
      />
      <StatCard
        title="In Progress"
        value={inProgressComplaints}
        icon={<Clock className="w-8 h-8" />}
        color="#f59e0b"
      />
      <StatCard
        title="Reviewed Complaints"
        value={closedComplaints}
        icon={<CheckCircle className="w-8 h-8" />}
        color="#10b981"
      />
    </div>
  );
};