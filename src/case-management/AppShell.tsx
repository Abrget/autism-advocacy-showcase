import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import PrisonersPage from './pages/PrisonersPage';
import CasesPage from './pages/CasesPage';
import AssignPage from './pages/AssignPage';
import AlertsPage from './pages/AlertsPage';
import ReportsPage from './pages/ReportsPage';

const Content: React.FC = () => {
  const { isLoggedIn, logout, activeTab } = useApp();

  if (!isLoggedIn) return <LoginPage />;

  return (
    <>
      <Header onLogout={logout} />
      <main className="container mx-auto max-w-6xl py-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'prisoners' && <PrisonersPage />}
        {activeTab === 'cases' && <CasesPage />}
        {activeTab === 'assign' && <AssignPage />}
        {activeTab === 'alerts' && <AlertsPage />}
        {activeTab === 'reports' && <ReportsPage />}
      </main>
    </>
  );
};

const AppShell: React.FC = () => (
  <AppProvider>
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      <Content />
    </div>
  </AppProvider>
);

export default AppShell;
