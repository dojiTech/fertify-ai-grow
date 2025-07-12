import React, { useState, createContext, useContext } from 'react';
import { Home, MessageSquare, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export type TabType = 'home' | 'chat' | 'profile' | 'settings';

interface LayoutContextProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within Layout');
  }
  return context;
};

const Layout = ({ children }: LayoutProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const tabs = [
    { id: 'home' as TabType, label: 'Home', icon: Home },
    { id: 'chat' as TabType, label: 'Talk to Fertify', icon: MessageSquare },
    { id: 'profile' as TabType, label: 'Profile', icon: User },
    { id: 'settings' as TabType, label: 'Settings', icon: Settings },
  ];

  return (
    <LayoutContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="flex flex-col h-screen bg-background">
        {/* Header */}
        <header className="bg-primary text-primary-foreground p-4 shadow-lg">
          <div className="max-w-md mx-auto">
            <h1 className="text-xl font-bold text-center">Fertify AI</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-md mx-auto h-full">
            {children}
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav className="bg-card border-t border-border">
          <div className="max-w-md mx-auto">
            <div className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex-1 py-3 px-2 text-center transition-colors",
                      "flex flex-col items-center justify-center gap-1",
                      isActive
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon size={20} />
                    <span className="text-xs font-medium leading-none">
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;