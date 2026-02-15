import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Case, STATIONS } from '../types';
import { formatDate } from '../utils/helpers';
import CaseDetailModal from '../components/modals/CaseDetailModal';

const CasesPage: React.FC = () => {
  const { currentUser, cases } = useApp();
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  if (!currentUser) return null;

  const list = currentUser.role === 'police' ? cases.filter((c) => c.station === currentUser.station) : currentUser.prosecutorId ? cases.filter((c) => c.assignedProsecutorId === currentUser.prosecutorId) : cases;

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-2xl font-bold">ጉዳዮች</h2>
      {list.map((c) => (
        <div key={c.id} onClick={() => setSelectedCase(c)} className="bg-white rounded p-4 cursor-pointer">
          <p className="font-bold">{c.suspectName}</p>
          <p className="text-sm text-gray-600">{c.caseNumber} · {c.status}</p>
          <p className="text-xs text-gray-500">{STATIONS[c.station]} · {formatDate(c.arrestDate)}</p>
        </div>
      ))}
      {selectedCase && <CaseDetailModal caseData={selectedCase} onClose={() => setSelectedCase(null)} />}
    </div>
  );
};

export default CasesPage;
