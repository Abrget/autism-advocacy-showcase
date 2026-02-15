import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const AssignPage: React.FC = () => {
  const { cases, updateCase, MOCK_USERS } = useApp();
  const [selectedCaseId, setSelectedCaseId] = useState('');
  const [selectedProsecutor, setSelectedProsecutor] = useState('');

  const unassignedCases = cases.filter((c) => c.status.includes('ወደ ዐቃቤ') || c.status.includes('ተቀባይ'));
  const prosecutors = MOCK_USERS.filter((u) => u.role === 'prosecutor');

  const handleAssign = () => {
    const prosecutor = prosecutors.find((p) => p.prosecutorId === selectedProsecutor);
    if (!selectedCaseId || !prosecutor) return;
    updateCase(selectedCaseId, { status: 'መስጠት', assignedProsecutorId: selectedProsecutor, assignedProsecutorName: prosecutor.name, currentStep: 2 });
    setSelectedCaseId('');
    setSelectedProsecutor('');
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">መስጠት</h2>
      <select value={selectedCaseId} onChange={(e) => setSelectedCaseId(e.target.value)} className="w-full p-2 border rounded">
        <option value="">ጉዳይ ይምረጡ</option>
        {unassignedCases.map((c) => <option key={c.id} value={c.id}>{c.caseNumber} - {c.suspectName}</option>)}
      </select>
      <select value={selectedProsecutor} onChange={(e) => setSelectedProsecutor(e.target.value)} className="w-full p-2 border rounded">
        <option value="">ዐቃቤ ህግ ይምረጡ</option>
        {prosecutors.map((p) => <option key={p.id} value={p.prosecutorId}>{p.name}</option>)}
      </select>
      <button onClick={handleAssign} className="w-full bg-emerald-600 text-white py-2 rounded">መስጠት</button>
    </div>
  );
};

export default AssignPage;
