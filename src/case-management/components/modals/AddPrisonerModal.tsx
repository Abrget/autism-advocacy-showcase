import React, { useState } from 'react';
import { Prisoner } from '../../types';
import { useApp } from '../../context/AppContext';
import { generatePrisonerId } from '../../utils/helpers';

interface Props {
  onClose: () => void;
  onAdd: (prisoner: Omit<Prisoner, 'id' | 'createdAt' | 'visitors'>) => void;
}

const AddPrisonerModal: React.FC<Props> = ({ onClose, onAdd }) => {
  const { currentUser } = useApp();
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    onAdd({
      prisonerId: generatePrisonerId(currentUser.station || 'station-1'),
      fullName,
      gender: 'ወንጀለኛ',
      age: Number(age),
      arrestDate: new Date().toISOString(),
      arrestingStation: currentUser.station || 'station-1',
      detentionFacility: 'አዲስ አበባ የቁጥጥር ቤት',
      status: 'IN_CUSTODY',
      createdBy: currentUser.id,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 w-full max-w-md space-y-3">
        <h3 className="font-bold">አዲስ እስረኛ</h3>
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full border p-2 rounded" placeholder="ሙሉ ስም" required />
        <input value={age} onChange={(e) => setAge(e.target.value)} type="number" className="w-full border p-2 rounded" placeholder="እድሜ" required />
        <div className="flex gap-2">
          <button type="button" onClick={onClose} className="flex-1 border rounded py-2">ይቁም</button>
          <button className="flex-1 bg-emerald-600 text-white rounded py-2">መዝግያ</button>
        </div>
      </form>
    </div>
  );
};

export default AddPrisonerModal;
