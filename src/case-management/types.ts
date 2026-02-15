export type UserRole = 'police' | 'prosecutor' | 'teamleader' | 'admin';
export type CrimeType = 'ግድያ' | 'ሞገስ' | 'ስርቆት' | 'ስንቅ' | 'ቅማሸት' | 'አደንዛዥ';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  station?: string;
  prosecutorId?: string;
  specialization?: string;
}

export interface CaseHistoryEntry {
  date: string;
  action: string;
  user: string;
  details: string;
}

export interface Case {
  id: string;
  caseNumber: string;
  suspectName: string;
  suspectAge: number;
  suspectGender: string;
  crimeType: CrimeType;
  crimeLevel: string;
  status: string;
  station: string;
  policeOfficer: string;
  arrestDate: string;
  custodyType?: 'RTD' | 'NORMAL';
  currentStep: number;
  assignedProsecutorId?: string;
  assignedProsecutorName?: string;
  prisonerId?: string;
  article38Date?: string;
  article38Reason?: string;
  article38Deadline?: string;
  article42Reason?: string;
  chargeType?: string;
  courtDate?: string;
  createdAt: string;
  updatedAt: string;
  history: CaseHistoryEntry[];
}

export interface PrisonerVisitor {
  visitorName: string;
  relation: string;
}

export interface Prisoner {
  id: string;
  prisonerId: string;
  fullName: string;
  alias?: string;
  gender: 'ወንጀለኛ' | 'ወንጀለኛምላክ';
  age: number;
  arrestDate: string;
  arrestingStation: string;
  detentionFacility: string;
  cellNumber?: string;
  healthNotes?: string;
  status: 'IN_CUSTODY' | 'RELEASED' | 'TRANSFERRED';
  relatedCaseId?: string;
  createdBy: string;
  createdAt: string;
  visitors: PrisonerVisitor[];
}

export interface Alert {
  id: string;
  type: 'urgent' | 'warning' | 'info';
  title: string;
  message: string;
  relatedCaseId?: string;
  relatedPrisonerId?: string;
  createdAt: string;
  isRead: boolean;
}

export const STATIONS: Record<string, string> = {
  'station-1': 'አራዳ ፖሊስ ጣቢያ',
  'station-2': 'ፒያሳ ፖሊስ ጣቢያ',
  'station-3': 'ሜክሲኮ ፖሊስ ጣቢያ',
};

export const PROSECUTION_STEPS = [
  { step: 1, name: 'ምዝገባ' },
  { step: 2, name: 'መስጠት' },
  { step: 3, name: 'መርማራ' },
  { step: 4, name: 'ክስ/አንቀጽ' },
  { step: 5, name: 'ፍርድ ቤት' },
  { step: 6, name: 'ውሳኔ' },
  { step: 7, name: 'መዝጊያ' },
];
