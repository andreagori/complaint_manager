/**
 * StatCard Component
 * 
 * Displays a small card showing a numeric statistic with a title and icon.
 * 
 * Props:
 * - title: string — the card's title.
 * - value: number — the numeric value to display.
 * - icon: ReactNode — icon to display on the card.
 * - color: string — primary color for the card border, value, and icon.
 * 
 * Client-side only:
 * - Purely presentational; no state or hooks used.
 */

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border-2" style={{ borderColor: color }}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-lg font-semibold">{title}</p>
        <p className="text-3xl font-bold" style={{ color: color }}>{value}</p>
      </div>
      <div style={{ color: color }}>
        {icon}
      </div>
    </div>
  </div>
);