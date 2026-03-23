import { ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen">
        <AppHeader />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
