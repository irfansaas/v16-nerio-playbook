import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { HomePage } from './components/pages/HomePage';
import { RoleAnalysisPage } from './components/pages/RoleAnalysisPage';
import { StakeholdersPage } from './components/pages/StakeholdersPage';
import { InterviewStagesPage } from './components/pages/InterviewStagesPage';
import { FinancialModelingPage } from './components/pages/FinancialModelingPage';
import { SegmentPlaybooksPage } from './components/pages/SegmentPlaybooksPage';
import { Sidebar } from './components/layout/Sidebar';
import { ObjectionHandlingPage } from './components/pages/ObjectionHandlingPage';
import { CaseStudiesPage } from './components/pages/CaseStudiesPage';
import { QuickReferencePage } from './components/pages/QuickReferencePage';
import { AppendixPage } from './components/pages/AppendixPage';
import { ValueValidationPage } from './components/pages/ValueValidationPage';
import { TCOAnalysisPage } from './components/pages/TCOAnalysisPage';
import { ROIAnalysisPage } from './components/pages/ROIAnalysisPage';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomePage />;
      case 'role':
        return <RoleAnalysisPage />;
      case 'stakeholders':
        return <StakeholdersPage />;
      case 'stages':
        return <InterviewStagesPage />;
      case 'financial':
        return <FinancialModelingPage />;
      case 'segments':
        return <SegmentPlaybooksPage />;
      case 'objections':
         return <ObjectionHandlingPage />;  
      case 'cases':
        return <CaseStudiesPage />;
      case 'validation':
        return <ValueValidationPage />;
      case 'quickref':
        return <QuickReferencePage />;
      case 'appendix':
        return <AppendixPage />;
      case 'tco':
        return <TCOAnalysisPage />;
      case 'roi':
        return <ROIAnalysisPage />;
      default:
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-purple-700">
              Nerdio Playbook V10
            </h1>
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <div className="flex">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          mobileMenuOpen={mobileMenuOpen}
        />
        <main className="flex-1 p-4 md:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
export default App;
