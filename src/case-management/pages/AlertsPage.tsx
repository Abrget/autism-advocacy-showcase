import React from 'react';
import { useApp } from '../context/AppContext';
import { formatDate } from '../utils/helpers';

const AlertsPage: React.FC = () => {
  const { alerts, markAlertRead } = useApp();

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-2xl font-bold">ማስጠንቀቂያዎች</h2>
      {alerts.map((a) => (
        <div key={a.id} onClick={() => markAlertRead(a.id)} className={`bg-white rounded p-4 border-r-4 ${a.type === 'urgent' ? 'border-red-500' : a.type === 'warning' ? 'border-amber-500' : 'border-blue-500'}`}>
          <p className="font-bold">{a.title}</p>
          <p className="text-sm">{a.message}</p>
          <p className="text-xs text-gray-500">{formatDate(a.createdAt)}</p>
        </div>
      ))}
    </div>
  );
};

export default AlertsPage;
