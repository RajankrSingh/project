import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, Clock, FileText } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const links = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/attendance', icon: Clock, label: 'Attendance' },
    { path: '/leave', icon: FileText, label: 'Leave' },
  ];

  return (
    <nav className="w-64 bg-white shadow-lg min-h-screen">
      <div className="p-4 space-y-4">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                isActive(link.path)
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}