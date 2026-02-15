import { Alert, Case, Prisoner, User } from './types';

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Jalmeda', email: 'officer.jalmeda@example.com', role: 'police', station: 'station-1' },
  { id: 'u2', name: 'Fikadu', email: 'fikadu@example.com', role: 'prosecutor', prosecutorId: 'PROS-01', specialization: 'ከባድ ወንጀል' },
  { id: 'u3', name: 'Minista', email: 'minista@example.com', role: 'prosecutor', prosecutorId: 'PROS-02', specialization: 'ንብረት ወንጀል' },
  { id: 'u4', name: 'Team Lead', email: 'teamleader@example.com', role: 'teamleader' },
  { id: 'u5', name: 'Admin', email: 'admin@example.com', role: 'admin' },
];

export const MOCK_CASES: Case[] = [
  {
    id: 'c1',
    caseNumber: 'C-2024-PS01-101',
    suspectName: 'አበበ ከበደ',
    suspectAge: 29,
    suspectGender: 'ወንድ',
    crimeType: 'ስርቆት',
    crimeLevel: 'መካከለኛ',
    status: 'ወደ ዐቃቤ ህግ ተላከ',
    station: 'station-1',
    policeOfficer: 'Jalmeda',
    arrestDate: new Date().toISOString(),
    custodyType: 'RTD',
    currentStep: 1,
    article38Deadline: new Date(Date.now() + 5 * 86400000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    history: [],
  },
];

export const MOCK_PRISONERS: Prisoner[] = [
  {
    id: 'p1',
    prisonerId: 'PRN-2024-PS01-111',
    fullName: 'ተስፋዬ ዓለሙ',
    gender: 'ወንጀለኛ',
    age: 35,
    arrestDate: new Date(Date.now() - 3 * 86400000).toISOString(),
    arrestingStation: 'station-1',
    detentionFacility: 'አዲስ አበባ የቁጥጥር ቤት',
    status: 'IN_CUSTODY',
    createdBy: 'u1',
    createdAt: new Date().toISOString(),
    visitors: [],
  },
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a1',
    type: 'urgent',
    title: 'አንቀጽ 38 ቀን እየቀረበ ነው',
    message: 'C-2024-PS01-101 ለቅርብ ጊዜ ውሳኔ ይፈልጋል',
    relatedCaseId: 'c1',
    createdAt: new Date().toISOString(),
    isRead: false,
  },
];
