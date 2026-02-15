import React, { createContext, useContext, useState } from 'react';
import { MOCK_ALERTS, MOCK_CASES, MOCK_PRISONERS, MOCK_USERS } from '../data';
import { Alert, Case, Prisoner, User } from '../types';
import { generateCaseNumber, generateId } from '../utils/helpers';

interface AppContextType {
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  cases: Case[];
  addCase: (newCase: Omit<Case, 'id' | 'caseNumber' | 'createdAt' | 'updatedAt' | 'history'>) => void;
  updateCase: (id: string, updates: Partial<Case>) => void;
  prisoners: Prisoner[];
  addPrisoner: (newPrisoner: Omit<Prisoner, 'id' | 'createdAt' | 'visitors'>) => void;
  updatePrisoner: (id: string, updates: Partial<Prisoner>) => void;
  alerts: Alert[];
  markAlertRead: (id: string) => void;
  getProsecutorLoad: (prosecutorId: string) => number;
  getProsecutorCases: (prosecutorId: string) => Case[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  MOCK_USERS: User[];
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cases, setCases] = useState<Case[]>(MOCK_CASES);
  const [prisoners, setPrisoners] = useState<Prisoner[]>(MOCK_PRISONERS);
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);

  const login = (email: string, password: string): boolean => {
    const user = MOCK_USERS.find((u) => u.email === email);
    if (user && password === 'password123') {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setActiveTab(user.role === 'teamleader' || user.role === 'admin' ? 'assign' : user.role === 'prosecutor' ? 'cases' : 'dashboard');
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setActiveTab('dashboard');
  };

  const addCase: AppContextType['addCase'] = (newCase) => {
    const caseObj: Case = {
      ...newCase,
      id: generateId(),
      caseNumber: generateCaseNumber(newCase.station),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [{ date: new Date().toISOString().split('T')[0], action: 'ጉዳይ ተፈጠረ', user: currentUser?.name || 'Unknown', details: 'አዲስ ጉዳይ' }],
    };
    setCases((prev) => [...prev, caseObj]);
  };

  const updateCase = (id: string, updates: Partial<Case>) => {
    setCases((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c)));
  };

  const addPrisoner: AppContextType['addPrisoner'] = (newPrisoner) => {
    const prisonerObj: Prisoner = { ...newPrisoner, id: generateId(), createdAt: new Date().toISOString(), visitors: [] };
    setPrisoners((prev) => [...prev, prisonerObj]);
    setAlerts((prev) => [{ id: generateId(), type: 'info', title: 'አዲስ እስረኛ', message: `${newPrisoner.fullName} ተመዝግቧል`, relatedPrisonerId: newPrisoner.prisonerId, createdAt: new Date().toISOString(), isRead: false }, ...prev]);
  };

  const updatePrisoner = (id: string, updates: Partial<Prisoner>) => {
    setPrisoners((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const markAlertRead = (id: string) => setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, isRead: true } : a)));

  const getProsecutorLoad = (prosecutorId: string) => cases.filter((c) => c.assignedProsecutorId === prosecutorId && c.status !== 'ተጠናቀቀ').length;
  const getProsecutorCases = (prosecutorId: string) => cases.filter((c) => c.assignedProsecutorId === prosecutorId);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        logout,
        cases,
        addCase,
        updateCase,
        prisoners,
        addPrisoner,
        updatePrisoner,
        alerts,
        markAlertRead,
        getProsecutorLoad,
        getProsecutorCases,
        activeTab,
        setActiveTab,
        isLoggedIn,
        setIsLoggedIn,
        MOCK_USERS,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
