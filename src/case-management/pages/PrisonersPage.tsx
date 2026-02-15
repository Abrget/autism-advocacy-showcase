import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import AddPrisonerModal from '../components/modals/AddPrisonerModal';
import { formatDate, getDaysDiff } from '../utils/helpers';

const PrisonersPage: React.FC = () => {
  const { currentUser, prisoners, addPrisoner } = useApp();
  const [showModal, setShowModal] = useState(false);
  if (!currentUser) return null;

  const list = currentUser.role === 'police' ? prisoners.filter((p) => p.arrestingStation === currentUser.station) : prisoners;

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between"><h2 className="text-2xl font-bold">እስረኞች</h2>{currentUser.role === 'police' && <button onClick={() => setShowModal(true)} className="bg-emerald-600 text-white px-3 rounded">➕</button>}</div>
      {list.map((p) => (
        <div key={p.id} className="bg-white rounded p-4">
          <p className="font-bold">{p.fullName}</p>
          <p className="text-sm">{p.prisonerId} · {formatDate(p.arrestDate)} · {getDaysDiff(p.arrestDate, new Date().toISOString())} ቀን</p>
        </div>
      ))}
      {showModal && <AddPrisonerModal onClose={() => setShowModal(false)} onAdd={addPrisoner} />}
    </div>
  );
};

export default PrisonersPage;
