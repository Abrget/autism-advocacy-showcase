import React from 'react';
import { Case, Prisoner, PROSECUTION_STEPS, STATIONS } from '../../types';
import { formatDate } from '../../utils/helpers';
import { useApp } from '../../context/AppContext';

const CaseDetailModal: React.FC<{ caseData: Case; onClose: () => void }> = ({ caseData, onClose }) => {
  const { prisoners } = useApp();
  const prisoner = caseData.prisonerId ? prisoners.find((p: Prisoner) => p.prisonerId === caseData.prisonerId) : null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between mb-4"><h2 className="font-bold">{caseData.caseNumber}</h2><button onClick={onClose}>✕</button></div>
        <div className="flex gap-1 mb-4">{PROSECUTION_STEPS.map((s) => <span key={s.step} className={`text-xs px-2 py-1 rounded ${caseData.currentStep >= s.step ? 'bg-emerald-500 text-white' : 'bg-gray-200'}`}>{s.name}</span>)}</div>
        <p>ተጠርጣሪ: {caseData.suspectName}</p>
        <p>ጣቢያ: {STATIONS[caseData.station]}</p>
        <p>ቀን: {formatDate(caseData.arrestDate)}</p>
        {prisoner && <p>እስረኛ: {prisoner.fullName}</p>}
      </div>
    </div>
  );
};

export default CaseDetailModal;
