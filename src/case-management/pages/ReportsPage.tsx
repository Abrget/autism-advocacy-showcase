import React from 'react';
import { useApp } from '../context/AppContext';

const ReportsPage: React.FC = () => {
  const { cases, prisoners } = useApp();
  const completed = cases.filter((c) => c.status === 'ተጠናቀቀ').length;
  const inCustody = prisoners.filter((p) => p.status === 'IN_CUSTODY').length;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">ሪፖርት</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded">ጠቅላላ ጉዳይ: {cases.length}</div>
        <div className="bg-white p-4 rounded">ተጠናቀቀ: {completed}</div>
        <div className="bg-white p-4 rounded">እስረኞች: {inCustody}</div>
        <div className="bg-white p-4 rounded">RTD: {cases.filter((c) => c.custodyType === 'RTD').length}</div>
      </div>
    </div>
  );
};

export default ReportsPage;
