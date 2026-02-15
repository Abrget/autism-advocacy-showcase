import React from 'react';
import { useApp } from '../context/AppContext';
import AddressBanner from './AddressBanner';

interface Props { onLogout: () => void }

const Header: React.FC<Props> = ({ onLogout }) => {
  const { currentUser, alerts, activeTab, setActiveTab } = useApp();
  const unreadAlerts = alerts.filter((a) => !a.isRead).length;

  const tabs = [
    { id: 'dashboard', label: 'ቤት', roles: ['police', 'prosecutor', 'teamleader', 'admin'] },
    { id: 'prisoners', label: 'እስረኞች', roles: ['police', 'prosecutor', 'teamleader', 'admin'] },
    { id: 'cases', label: 'ጉዳዮች', roles: ['police', 'prosecutor', 'teamleader', 'admin'] },
    { id: 'assign', label: 'መስጠት', roles: ['teamleader', 'admin'] },
    { id: 'alerts', label: `ማስጠንቀቂያ ${unreadAlerts ? `(${unreadAlerts})` : ''}`, roles: ['prosecutor', 'teamleader', 'admin'] },
    { id: 'reports', label: 'ሪፖርት', roles: ['teamleader', 'admin'] },
  ];

  const filteredTabs = tabs.filter((t) => currentUser && t.roles.includes(currentUser.role));

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <AddressBanner />
      <div className="px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="font-bold">የጉዳይ አስተዳደር</h1>
          <button onClick={onLogout} className="p-2 bg-red-100 text-red-600 rounded-lg">🚪</button>
        </div>
        <nav className="mt-3 flex gap-2 overflow-x-auto">
          {filteredTabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-3 py-2 rounded-lg text-sm ${activeTab === tab.id ? 'bg-emerald-600 text-white' : 'bg-gray-100'}`}>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
