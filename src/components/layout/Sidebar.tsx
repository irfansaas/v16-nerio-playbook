import { navigationData } from '../../data/nerdio-data-files';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  mobileMenuOpen: boolean;
}

export function Sidebar({ activeSection, setActiveSection, mobileMenuOpen }: SidebarProps) {
  // Add these debug lines
  console.log('=== SIDEBAR DEBUG ===');
  console.log('Total items:', navigationData.length);
  console.log('Has TCO?', navigationData.some(item => item.id === 'tco'));
  console.log('All items:', navigationData.map(item => ({ id: item.id, title: item.title })));
  
  return (
    <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block w-64 bg-white shadow-lg h-screen sticky top-16 overflow-y-auto`}>
      <div className="p-4">
        {navigationData.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all ${
              activeSection === item.id
                ? 'bg-purple-100 text-purple-700'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.title}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}