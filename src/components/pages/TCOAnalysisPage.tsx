import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Users, BarChart3, Calculator, FileText, Download, RefreshCw } from 'lucide-react';
import { Card } from '../common/Card';
import { AnimatedSection } from '../common/AnimatedSection';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { TCOCurrentState, TCOFutureState, TCOResults, TCOScenario } from '../../types/tco.types';
import { calculateTCO, formatCurrency, formatPercent } from '../../utils/tcoCalculations';

// Predefined scenarios
const scenarios: TCOScenario[] = [
  {
    id: 'smb-healthcare',
    name: 'SMB Healthcare',
    industry: 'Healthcare',
    userCount: 150,
    currentState: {
      physicalServers: 75000,
      storageSystems: 50000,
      networkEquipment: 15000,
      datacenterCosts: 36000,
      vdiPlatformLicensing: 45000,
      supportMaintenance: 24000,
      vdiAdminFTE: 1,
      vdiAdminSalary: 85000,
      infraFTE: 0.5,
      infraSalary: 80000,
      storageAdminFTE: 0.5,
      storageAdminSalary: 90000,
      helpdeskFTE: 2,
      helpdeskSalary: 50000
    },
    futureState: {
      vmD4sQty: 10,
      vmD4sMonthly: 140,
      vmD8sQty: 2,
      vmD8sMonthly: 280,
      autoscalePercent: -65,
      riPercent: -30,
      nerdioCostPerUser: 4,
      m365CostPerUser: 35,
      cloudAdminFTE: 0.5,
      cloudAdminSalary: 95000,
      devOpsFTE: 0,
      devOpsSalary: 0,
      helpdeskNewFTE: 1,
      helpdeskNewSalary: 50000,
      professionalServices: 25000,
      trainingMigration: 15000
    }
  },
  {
    id: 'enterprise-financial',
    name: 'Enterprise Financial Services',
    industry: 'Financial Services',
    userCount: 5000,
    currentState: {
      physicalServers: 2000000,
      storageSystems: 1500000,
      networkEquipment: 300000,
      datacenterCosts: 600000,
      vdiPlatformLicensing: 750000,
      supportMaintenance: 400000,
      vdiAdminFTE: 5,
      vdiAdminSalary: 110000,
      infraFTE: 4,
      infraSalary: 105000,
      storageAdminFTE: 2,
      storageAdminSalary: 115000,
      helpdeskFTE: 8,
      helpdeskSalary: 60000
    },
    futureState: {
      vmD4sQty: 150,
      vmD4sMonthly: 140,
      vmD8sQty: 50,
      vmD8sMonthly: 280,
      autoscalePercent: -65,
      riPercent: -30,
      nerdioCostPerUser: 4,
      m365CostPerUser: 35,
      cloudAdminFTE: 3,
      cloudAdminSalary: 125000,
      devOpsFTE: 2,
      devOpsSalary: 130000,
      helpdeskNewFTE: 4,
      helpdeskNewSalary: 60000,
      professionalServices: 200000,
      trainingMigration: 100000
    }
  }
];

export function TCOAnalysisPage() {
  const [activeTab, setActiveTab] = useState('summary');
  const [customerName, setCustomerName] = useState('');
  const [industry, setIndustry] = useState('');
  const [userCount, setUserCount] = useState(1000);
  const [selectedScenario, setSelectedScenario] = useState<string>('');
  
  const [currentState, setCurrentState] = useLocalStorage<TCOCurrentState>('tcoCurrentState', {
    physicalServers: 300000,
    storageSystems: 200000,
    networkEquipment: 50000,
    datacenterCosts: 120000,
    vdiPlatformLicensing: 150000,
    supportMaintenance: 80000,
    vdiAdminFTE: 3,
    vdiAdminSalary: 95000,
    infraFTE: 2,
    infraSalary: 90000,
    storageAdminFTE: 1,
    storageAdminSalary: 100000,
    helpdeskFTE: 4,
    helpdeskSalary: 55000
  });
  
  const [futureState, setFutureState] = useLocalStorage<TCOFutureState>('tcoFutureState', {
    vmD4sQty: 30,
    vmD4sMonthly: 140,
    vmD8sQty: 10,
    vmD8sMonthly: 280,
    autoscalePercent: -65,
    riPercent: -30,
    nerdioCostPerUser: 4,
    m365CostPerUser: 35,
    cloudAdminFTE: 1.5,
    cloudAdminSalary: 110000,
    devOpsFTE: 1,
    devOpsSalary: 115000,
    helpdeskNewFTE: 2,
    helpdeskNewSalary: 55000,
    professionalServices: 100000,
    trainingMigration: 50000
  });
  
  const [results, setResults] = useState<TCOResults | null>(null);
  
  useEffect(() => {
    const calculated = calculateTCO(currentState, futureState, userCount);
    setResults(calculated);
  }, [currentState, futureState, userCount]);
  
  const handleScenarioSelect = (scenarioId: string) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (scenario) {
      setSelectedScenario(scenarioId);
      setIndustry(scenario.industry);
      setUserCount(scenario.userCount);
      setCurrentState(scenario.currentState);
      setFutureState(scenario.futureState);
    }
  };
  
  const exportResults = () => {
    if (!results) return;
    
    const exportData = {
      customerName,
      industry,
      userCount,
      date: new Date().toISOString(),
      currentState,
      futureState,
      results
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tco-analysis-${customerName || 'unnamed'}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const resetCalculator = () => {
    if (confirm('Reset all values to defaults?')) {
      setCustomerName('');
      setIndustry('');
      setUserCount(1000);
      setSelectedScenario('');
      // Reset to default values
      setCurrentState({
        physicalServers: 300000,
        storageSystems: 200000,
        networkEquipment: 50000,
        datacenterCosts: 120000,
        vdiPlatformLicensing: 150000,
        supportMaintenance: 80000,
        vdiAdminFTE: 3,
        vdiAdminSalary: 95000,
        infraFTE: 2,
        infraSalary: 90000,
        storageAdminFTE: 1,
        storageAdminSalary: 100000,
        helpdeskFTE: 4,
        helpdeskSalary: 55000
      });
      setFutureState({
        vmD4sQty: 30,
        vmD4sMonthly: 140,
        vmD8sQty: 10,
        vmD8sMonthly: 280,
        autoscalePercent: -65,
        riPercent: -30,
        nerdioCostPerUser: 4,
        m365CostPerUser: 35,
        cloudAdminFTE: 1.5,
        cloudAdminSalary: 110000,
        devOpsFTE: 1,
        devOpsSalary: 115000,
        helpdeskNewFTE: 2,
        helpdeskNewSalary: 55000,
        professionalServices: 100000,
        trainingMigration: 50000
      });
    }
  };
  
  const tabs = [
    { id: 'summary', label: 'Executive Summary', icon: TrendingUp },
    { id: 'current', label: 'Current State TCO', icon: DollarSign },
    { id: 'future', label: 'Future State TCO', icon: Calculator },
    { id: 'comparison', label: 'Side-by-Side', icon: BarChart3 },
    { id: 'breakdown', label: 'Cost Breakdown', icon: Users },
    { id: 'assumptions', label: 'Assumptions', icon: FileText }
  ];
  
  return (
    <div className="max-w-6xl mx-auto">
      <AnimatedSection>
        <h2 className="text-3xl font-bold mb-2">TCO Comparison Analysis</h2>
        <p className="text-gray-600 mb-8">Comprehensive 3-Year Total Cost of Ownership Calculator</p>
      </AnimatedSection>
      
      <AnimatedSection delay={100}>
        <div className="flex flex-wrap gap-2 mb-6 bg-gray-100 p-2 rounded-lg">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </AnimatedSection>
      
      <AnimatedSection delay={200}>
        {activeTab === 'summary' && results && (
          <TCOSummaryTab
            results={results}
            customerName={customerName}
            setCustomerName={setCustomerName}
            industry={industry}
            setIndustry={setIndustry}
            userCount={userCount}
            setUserCount={setUserCount}
            scenarios={scenarios}
            selectedScenario={selectedScenario}
            handleScenarioSelect={handleScenarioSelect}
            exportResults={exportResults}
            resetCalculator={resetCalculator}
          />
        )}
        
        {activeTab === 'current' && (
          <TCOCurrentStateTab
            currentState={currentState}
            setCurrentState={setCurrentState}
            results={results}
          />
        )}
        
        {activeTab === 'future' && (
          <TCOFutureStateTab
            futureState={futureState}
            setFutureState={setFutureState}
            userCount={userCount}
            results={results}
          />
        )}
        
        {activeTab === 'comparison' && results && (
          <TCOComparisonTab results={results} />
        )}
        
        {activeTab === 'breakdown' && results && (
          <TCOBreakdownTab results={results} userCount={userCount} />
        )}
        
        {activeTab === 'assumptions' && (
          <TCOAssumptionsTab />
        )}
      </AnimatedSection>
    </div>
  );
}

// Tab Components
function TCOSummaryTab({
  results,
  customerName,
  setCustomerName,
  industry,
  setIndustry,
  userCount,
  setUserCount,
  scenarios,
  selectedScenario,
  handleScenarioSelect,
  exportResults,
  resetCalculator
}: any) {
  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-xl font-semibold mb-4">Customer Information</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter customer name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select Industry</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Financial Services">Financial Services</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Education">Education</option>
              <option value="Technology">Technology</option>
              <option value="Government">Government</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User Count</label>
            <input
              type="number"
              value={userCount}
              onChange={(e) => setUserCount(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Load Scenario</label>
            <select
              value={selectedScenario}
              onChange={(e) => handleScenarioSelect(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Custom Values</option>
              {scenarios.map((scenario: TCOScenario) => (
  <option key={String(scenario.id)} value={scenario.id}>
    {scenario.name}
  </option>
))}
            </select>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={exportResults}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Results
          </button>
          <button
            onClick={resetCalculator}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </Card>
      
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
          <h4 className="text-sm font-medium opacity-90">Current State 3-Year TCO</h4>
          <p className="text-2xl font-bold mt-2">{formatCurrency(results.currentState.total)}</p>
          <p className="text-sm opacity-75 mt-1">Traditional Infrastructure</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <h4 className="text-sm font-medium opacity-90">Future State 3-Year TCO</h4>
          <p className="text-2xl font-bold mt-2">{formatCurrency(results.futureState.total)}</p>
          <p className="text-sm opacity-75 mt-1">With Nerdio</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <h4 className="text-sm font-medium opacity-90">Total 3-Year Savings</h4>
          <p className="text-2xl font-bold mt-2">{formatCurrency(results.savings.total)}</p>
          <p className="text-sm opacity-75 mt-1">{formatPercent(results.savings.percentage)} Reduction</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <h4 className="text-sm font-medium opacity-90">Monthly Savings Average</h4>
          <p className="text-2xl font-bold mt-2">{formatCurrency(results.savings.monthly)}</p>
          <p className="text-sm opacity-75 mt-1">Per Month</p>
        </div>
      </div>
      
      <Card>
        <h3 className="text-xl font-semibold mb-4">Year-over-Year Comparison</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2">Metric</th>
                <th className="text-right py-3 px-2">Year 1</th>
                <th className="text-right py-3 px-2">Year 2</th>
                <th className="text-right py-3 px-2">Year 3</th>
                <th className="text-right py-3 px-2 font-bold">3-Year Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-2 font-medium">Current State Costs</td>
                <td className="text-right py-3 px-2">{formatCurrency(results.currentState.year1)}</td>
                <td className="text-right py-3 px-2">{formatCurrency(results.currentState.year2)}</td>
                <td className="text-right py-3 px-2">{formatCurrency(results.currentState.year3)}</td>
                <td className="text-right py-3 px-2 font-semibold">{formatCurrency(results.currentState.total)}</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-2 font-medium">Future State Costs</td>
                <td className="text-right py-3 px-2">{formatCurrency(results.futureState.year1)}</td>
                <td className="text-right py-3 px-2">{formatCurrency(results.futureState.year2)}</td>
                <td className="text-right py-3 px-2">{formatCurrency(results.futureState.year3)}</td>
                <td className="text-right py-3 px-2 font-semibold">{formatCurrency(results.futureState.total)}</td>
              </tr>
              <tr className="bg-green-50">
                <td className="py-3 px-2 font-medium text-green-700">Annual Savings</td>
                <td className="text-right py-3 px-2 text-green-700 font-semibold">{formatCurrency(results.savings.year1)}</td>
                <td className="text-right py-3 px-2 text-green-700 font-semibold">{formatCurrency(results.savings.year2)}</td>
                <td className="text-right py-3 px-2 text-green-700 font-semibold">{formatCurrency(results.savings.year3)}</td>
                <td className="text-right py-3 px-2 text-green-700 font-bold">{formatCurrency(results.savings.total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="text-center">
          <h4 className="font-semibold text-purple-700 mb-2">Payback Period</h4>
          <p className="text-3xl font-bold text-purple-600">{Math.round(results.paybackMonths)} months</p>
          <p className="text-sm text-gray-600 mt-1">Time to recover investment</p>
        </Card>
        <Card className="text-center">
          <h4 className="font-semibold text-purple-700 mb-2">3-Year NPV</h4>
          <p className="text-3xl font-bold text-purple-600">{formatCurrency(results.npv)}</p>
          <p className="text-sm text-gray-600 mt-1">Net Present Value @ 8%</p>
        </Card>
        <Card className="text-center">
          <h4 className="font-semibold text-purple-700 mb-2">3-Year ROI</h4>
          <p className="text-3xl font-bold text-purple-600">{formatPercent(results.roi)}</p>
          <p className="text-sm text-gray-600 mt-1">Return on Investment</p>
        </Card>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h4 className="font-semibold text-blue-900 mb-2">Executive Summary</h4>
        <p className="text-blue-800">
          By migrating from traditional VDI infrastructure to Nerdio-optimized Azure, 
          {customerName ? ` ${customerName}` : ' your organization'} can achieve a {formatPercent(results.savings.percentage)} reduction in total costs 
          over 3 years, saving {formatCurrency(results.savings.total)} with a payback period of {Math.round(results.paybackMonths)} months.
        </p>
      </div>
    </div>
  );
}

function TCOCurrentStateTab({ currentState, setCurrentState, results }: any) {
  const updateField = (field: keyof TCOCurrentState, value: number) => {
    setCurrentState({ ...currentState, [field]: value });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-xl font-semibold mb-4">Capital Expenditures (CapEx)</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Physical Servers</label>
            <input
              type="number"
              value={currentState.physicalServers}
              onChange={(e) => updateField('physicalServers', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">3-year depreciation</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Storage Systems</label>
            <input
              type="number"
              value={currentState.storageSystems}
              onChange={(e) => updateField('storageSystems', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">3-year depreciation</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Network Equipment</label>
            <input
              type="number"
              value={currentState.networkEquipment}
              onChange={(e) => updateField('networkEquipment', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">5-year depreciation</p>
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm font-medium">Total CapEx (Year 1 + Year 3 refresh): {formatCurrency(currentState.physicalServers + currentState.storageSystems + currentState.networkEquipment)}</p>
        </div>
      </Card>
      
      <Card>
        <h3 className="text-xl font-semibold mb-4">Operating Expenses (OpEx) - Annual</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Datacenter Costs</label>
            <input
              type="number"
              value={currentState.datacenterCosts}
              onChange={(e) => updateField('datacenterCosts', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">Power, cooling, space rental</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">VDI Platform Licensing</label>
            <input
              type="number"
              value={currentState.vdiPlatformLicensing}
              onChange={(e) => updateField('vdiPlatformLicensing', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">Citrix/VMware annual licenses</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Support & Maintenance</label>
            <input
              type="number"
              value={currentState.supportMaintenance}
              onChange={(e) => updateField('supportMaintenance', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">Annual maintenance contracts</p>
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm font-medium">Total Annual OpEx: {formatCurrency(currentState.datacenterCosts + currentState.vdiPlatformLicensing + currentState.supportMaintenance)}</p>
        </div>
      </Card>
      
      <Card>
        <h3 className="text-xl font-semibold mb-4">Personnel Costs</h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">VDI Administrator</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={currentState.vdiAdminFTE}
                  onChange={(e) => updateField('vdiAdminFTE', parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  step="0.5"
                  placeholder="FTE"
                />
                <input
                  type="number"
                  value={currentState.vdiAdminSalary}
                  onChange={(e) => updateField('vdiAdminSalary', parseInt(e.target.value) || 0)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Annual Salary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Infrastructure Admin</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={currentState.infraFTE}
                  onChange={(e) => updateField('infraFTE', parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  step="0.5"
                  placeholder="FTE"
                />
                <input
                  type="number"
                  value={currentState.infraSalary}
                  onChange={(e) => updateField('infraSalary', parseInt(e.target.value) || 0)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Annual Salary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Storage Administrator</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={currentState.storageAdminFTE}
                  onChange={(e) => updateField('storageAdminFTE', parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  step="0.5"
                  placeholder="FTE"
                />
                <input
                  type="number"
                  value={currentState.storageAdminSalary}
                  onChange={(e) => updateField('storageAdminSalary', parseInt(e.target.value) || 0)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Annual Salary"
                />
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Helpdesk Support</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={currentState.helpdeskFTE}
                  onChange={(e) => updateField('helpdeskFTE', parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  step="0.5"
                  placeholder="FTE"
                />
                <input
                  type="number"
                  value={currentState.helpdeskSalary}
                  onChange={(e) => updateField('helpdeskSalary', parseInt(e.target.value) || 0)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Annual Salary"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded mt-4">
          <p className="text-sm font-medium">
            Total Annual Personnel (with 30% benefits): {formatCurrency(
              (currentState.vdiAdminFTE * currentState.vdiAdminSalary +
               currentState.infraFTE * currentState.infraSalary +
               currentState.storageAdminFTE * currentState.storageAdminSalary +
               currentState.helpdeskFTE * currentState.helpdeskSalary) * 1.3
            )}
          </p>
        </div>
      </Card>
      
      {results && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-2xl font-bold text-red-700 mb-2">Current State 3-Year TCO</h3>
          <p className="text-4xl font-bold text-red-600">{formatCurrency(results.currentState.total)}</p>
        </div>
      )}
    </div>
  );
}

function TCOFutureStateTab({ futureState, setFutureState, userCount, results }: any) {
  const updateField = (field: keyof TCOFutureState, value: number) => {
    setFutureState({ ...futureState, [field]: value });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-xl font-semibold mb-4">Azure Infrastructure Costs</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Session Host VMs (D4s v3)</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={futureState.vmD4sQty}
                onChange={(e) => updateField('vmD4sQty', parseInt(e.target.value) || 0)}
                className="w-24 px-2 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="Qty"
              />
              <input
                type="number"
                value={futureState.vmD4sMonthly}
                onChange={(e) => updateField('vmD4sMonthly', parseInt(e.target.value) || 0)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="$/month"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Standard user sessions</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Power User VMs (D8s v3)</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={futureState.vmD8sQty}
                onChange={(e) => updateField('vmD8sQty', parseInt(e.target.value) || 0)}
                className="w-24 px-2 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="Qty"
              />
              <input
                type="number"
                value={futureState.vmD8sMonthly}
                onChange={(e) => updateField('vmD8sMonthly', parseInt(e.target.value) || 0)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="$/month"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">CAD/developer sessions</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded">
            <label className="block text-sm font-medium text-green-700 mb-1">Auto-scaling Savings %</label>
            <input
              type="number"
              value={futureState.autoscalePercent}
              onChange={(e) => updateField('autoscalePercent', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              max="0"
              placeholder="-65"
            />
            <p className="text-xs text-green-600 mt-1">Typically -65% reduction</p>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <label className="block text-sm font-medium text-green-700 mb-1">Reserved Instance Discount %</label>
            <input
              type="number"
              value={futureState.riPercent}
              onChange={(e) => updateField('riPercent', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              max="0"
              placeholder="-30"
            />
            <p className="text-xs text-green-600 mt-1">Typically -30% discount</p>
          </div>
        </div>
      </Card>
      
      <Card>
        <h3 className="text-xl font-semibold mb-4">Software Licensing</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nerdio Cost Per User</label>
            <input
              type="number"
              value={futureState.nerdioCostPerUser}
              onChange={(e) => updateField('nerdioCostPerUser', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              step="0.01"
              placeholder="$/user/month"
            />
            <p className="text-xs text-gray-500 mt-1">For {userCount} users</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Microsoft 365 E3</label>
            <input
              type="number"
              value={futureState.m365CostPerUser}
              onChange={(e) => updateField('m365CostPerUser', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              placeholder="$/user/month"
            />
            <p className="text-xs text-gray-500 mt-1">Includes Windows & Office</p>
          </div>
        </div>
      </Card>
      
      <Card>
        <h3 className="text-xl font-semibold mb-4">Reduced Personnel Requirements</h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cloud Administrator</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={futureState.cloudAdminFTE}
                  onChange={(e) => updateField('cloudAdminFTE', parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  step="0.5"
                  placeholder="FTE"
                />
                <input
                  type="number"
                  value={futureState.cloudAdminSalary}
                  onChange={(e) => updateField('cloudAdminSalary', parseInt(e.target.value) || 0)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Annual Salary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">DevOps Engineer</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={futureState.devOpsFTE}
                  onChange={(e) => updateField('devOpsFTE', parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  step="0.5"
                  placeholder="FTE"
                />
                <input
                  type="number"
                  value={futureState.devOpsSalary}
                  onChange={(e) => updateField('devOpsSalary', parseInt(e.target.value) || 0)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Annual Salary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Helpdesk Support</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={futureState.helpdeskNewFTE}
                  onChange={(e) => updateField('helpdeskNewFTE', parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  step="0.5"
                  placeholder="FTE"
                />
                <input
                  type="number"
                  value={futureState.helpdeskNewSalary}
                  onChange={(e) => updateField('helpdeskNewSalary', parseInt(e.target.value) || 0)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Annual Salary"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded mt-4">
          <p className="text-sm font-medium">
            Total Annual Personnel (with 30% benefits): {formatCurrency(
              (futureState.cloudAdminFTE * futureState.cloudAdminSalary +
               futureState.devOpsFTE * futureState.devOpsSalary +
               futureState.helpdeskNewFTE * futureState.helpdeskNewSalary) * 1.3
            )}
          </p>
        </div>
      </Card>
      
      <Card>
        <h3 className="text-xl font-semibold mb-4">Implementation Costs (Year 1 Only)</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Professional Services</label>
            <input
              type="number"
              value={futureState.professionalServices}
              onChange={(e) => updateField('professionalServices', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">Nerdio implementation</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Training & Migration</label>
            <input
              type="number"
              value={futureState.trainingMigration}
              onChange={(e) => updateField('trainingMigration', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">User migration costs</p>
          </div>
        </div>
      </Card>
      
      {results && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <h3 className="text-2xl font-bold text-green-700 mb-2">Future State 3-Year TCO</h3>
          <p className="text-4xl font-bold text-green-600">{formatCurrency(results.futureState.total)}</p>
        </div>
      )}
    </div>
  );
}

function TCOComparisonTab({ results }: any) {
  const staffReductionPct = 50; // You can calculate this from actual FTE values
  const autoscaleSavingsPct = 65;
  
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-red-700 mb-2">Current State</h3>
          <p className="text-3xl font-bold text-red-600">{formatCurrency(results.currentState.total)}</p>
          <p className="text-gray-600">Traditional Infrastructure</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-green-700 mb-2">Future State</h3>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(results.futureState.total)}</p>
          <p className="text-gray-600">Cloud-Optimized Solution</p>
        </div>
      </div>
      
      <Card>
        <h3 className="text-xl font-semibold mb-4">Cost Category Comparison</h3>
        <div className="space-y-4">
          {/* You would need to break down the costs by category here */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span className="font-medium">Infrastructure/Compute</span>
            <div className="flex items-center gap-4">
              <span className="text-red-600">{formatCurrency(results.currentState.year1 * 0.4)}</span>
              <span>→</span>
              <span className="text-green-600">{formatCurrency(results.futureState.year1 * 0.3)}</span>
              <span className="text-green-700 font-semibold">↓ 40%</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span className="font-medium">Personnel</span>
            <div className="flex items-center gap-4">
              <span className="text-red-600">{formatCurrency(results.currentState.year1 * 0.35)}</span>
              <span>→</span>
              <span className="text-green-600">{formatCurrency(results.futureState.year1 * 0.2)}</span>
              <span className="text-green-700 font-semibold">↓ {staffReductionPct}%</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span className="font-medium">Software/Licensing</span>
            <div className="flex items-center gap-4">
              <span className="text-red-600">{formatCurrency(results.currentState.year1 * 0.25)}</span>
              <span>→</span>
              <span className="text-green-600">{formatCurrency(results.futureState.year1 * 0.5)}</span>
              <span className="text-yellow-600 font-semibold">↑ 15%</span>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h4 className="font-semibold text-blue-900 mb-2">Key Insights</h4>
        <ul className="space-y-2 text-blue-800">
          <li>• Eliminate capital expenditures and move to predictable OpEx model</li>
          <li>• Reduce IT staff requirements by {staffReductionPct}% through automation</li>
          <li>• Auto-scaling reduces compute costs by up to {autoscaleSavingsPct}%</li>
          <li>• Achieve payback in {Math.round(results.paybackMonths)} months</li>
          <li>• Enable business agility with elastic scaling</li>
        </ul>
      </div>
    </div>
  );
}

function TCOBreakdownTab({ results, userCount }: any) {
  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-xl font-semibold mb-4">Cost per User Analysis</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2">Metric</th>
                <th className="text-right py-3 px-2">Current State</th>
                <th className="text-right py-3 px-2">Future State</th>
                <th className="text-right py-3 px-2 text-green-600">Savings</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-2 font-medium">Cost per User per Month</td>
                <td className="text-right py-3 px-2">{formatCurrency(results.perUser.currentMonthly)}</td>
                <td className="text-right py-3 px-2">{formatCurrency(results.perUser.futureMonthly)}</td>
                <td className="text-right py-3 px-2 text-green-600 font-semibold">
                  {formatCurrency(results.perUser.savingsMonthly)}
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-2 font-medium">Cost per User per Year</td>
                <td className="text-right py-3 px-2">{formatCurrency(results.perUser.currentMonthly * 12)}</td>
                <td className="text-right py-3 px-2">{formatCurrency(results.perUser.futureMonthly * 12)}</td>
                <td className="text-right py-3 px-2 text-green-600 font-semibold">
                  {formatCurrency(results.perUser.savingsMonthly * 12)}
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-3 px-2 font-medium">3-Year Cost per User</td>
                <td className="text-right py-3 px-2 font-semibold">{formatCurrency(results.currentState.total / userCount)}</td>
                <td className="text-right py-3 px-2 font-semibold">{formatCurrency(results.futureState.total / userCount)}</td>
                <td className="text-right py-3 px-2 text-green-600 font-bold">
                  {formatCurrency((results.currentState.total - results.futureState.total) / userCount)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      
      <Card>
        <h3 className="text-xl font-semibold mb-4">Monthly Cash Flow Improvement</h3>
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Every Month You Delay Costs You:</p>
            <p className="text-4xl font-bold text-purple-700">{formatCurrency(results.savings.monthly)}</p>
            <p className="text-gray-600 mt-2">in Lost Savings Opportunity</p>
          </div>
        </div>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h4 className="font-semibold mb-3">Hidden Costs Eliminated</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Over-provisioning waste (30-40% typical)</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Weekend/night idle resources</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Emergency hardware replacements</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Unplanned downtime costs</span>
            </li>
          </ul>
        </Card>
        
        <Card>
          <h4 className="font-semibold mb-3">Value-Added Benefits</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">→</span>
              <span>Instant scalability for growth</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">→</span>
              <span>Enhanced security & compliance</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">→</span>
              <span>Improved user experience</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">→</span>
              <span>Business continuity built-in</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

function TCOAssumptionsTab() {
  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-xl font-semibold mb-4">Key Assumptions & Parameters</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-2 font-medium w-1/3">Discount Rate (NPV)</td>
                <td className="py-3 px-2">8%</td>
                <td className="py-3 px-2 text-gray-600">Industry standard for IT investments</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-2 font-medium">Hardware Refresh Cycle</td>
                <td className="py-3 px-2">3 Years</td>
                <td className="py-3 px-2 text-gray-600">Standard enterprise server lifecycle</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-2 font-medium">Annual Salary Increase</td>
                <td className="py-3 px-2">3%</td>
                <td className="py-3 px-2 text-gray-600">Average annual compensation growth</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-2 font-medium">Benefits Multiplier</td>
                <td className="py-3 px-2">30%</td>
                <td className="py-3 px-2 text-gray-600">Added to base salary for full cost</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-2 font-medium">Cloud Cost Growth</td>
                <td className="py-3 px-2">5%</td>
                <td className="py-3 px-2 text-gray-600">Annual Azure consumption increase</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-2 font-medium">Auto-scaling Efficiency</td>
                <td className="py-3 px-2">65%</td>
                <td className="py-3 px-2 text-gray-600">Typical compute reduction with Nerdio</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-2 font-medium">Reserved Instance Discount</td>
                <td className="py-3 px-2">30%</td>
                <td className="py-3 px-2 text-gray-600">1-year Azure RI pricing benefit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      
      <Card>
        <h3 className="text-xl font-semibold mb-4">TCO vs ROI: When to Use Each</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-purple-700 mb-2">Use TCO When:</h4>
            <ul className="space-y-2 text-sm">
              <li>• Comparing infrastructure alternatives</li>
              <li>• Making strategic platform decisions</li>
              <li>• Evaluating long-term financial impact</li>
              <li>• Justifying major technology shifts</li>
              <li>• Showing complete cost transformation</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">Use ROI When:</h4>
            <ul className="space-y-2 text-sm">
              <li>• Quick win scenarios</li>
              <li>• Single feature justification</li>
              <li>• Short-term projects</li>
              <li>• Department-level decisions</li>
              <li>• Incremental improvements</li>
            </ul>
          </div>
        </div>
      </Card>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
        <h4 className="font-semibold text-yellow-900 mb-2">Important Note</h4>
        <p className="text-yellow-800">
          All calculations are estimates based on typical enterprise scenarios. Actual results will vary based on 
          specific requirements, negotiated pricing, usage patterns, and regional factors. Use this tool for 
          directional guidance for strategic decision-making.
        </p>
      </div>
    </div>
  );
}