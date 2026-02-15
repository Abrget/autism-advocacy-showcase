import React from 'react';
import { useApp } from '../context/AppContext';
import { getDaysDiff } from '../utils/helpers';

const Dashboard: React.FC = () => {
  const { currentUser, cases, prisoners, alerts } = useApp();
  if (!currentUser) return null;

  const myCases = currentUser.prosecutorId ? cases.filter((c) => c.assignedProsecutorId === currentUser.prosecutorId) : cases;
  const urgentCases = myCases.filter((c) => c.article38Deadline && getDaysDiff(new Date().toISOString(), c.article38Deadline) <= 7);
  const noCasePrisoners = prisoners.filter((p) => p.status === 'IN_CUSTODY' && !p.relatedCaseId);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">እንኳን ደህና መጡ {currentUser.name}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded p-4">ጉዳዮች: {myCases.length}</div>
        <div className="bg-white rounded p-4">አስቸኳይ: {urgentCases.length}</div>
        <div className="bg-white rounded p-4">ማስጠንቀቂያ: {alerts.filter((a) => !a.isRead).length}</div>
        <div className="bg-white rounded p-4">ጉዳይ የሌለው እስረኛ: {noCasePrisoners.length}</div>
      </div>
    </div>
  );
};

export default Dashboard;
