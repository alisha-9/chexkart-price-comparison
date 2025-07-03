import React, { createContext, useContext, ReactNode } from 'react';
import { useUserStats, UserStats } from '../hooks/useUserStats';

interface UserStatsContextType {
  stats: UserStats;
  loading: boolean;
  error: string | null;
  refreshStats: () => void;
  updateStat: (statName: keyof UserStats, value: number) => void;
  incrementStat: (statName: keyof UserStats, increment?: number) => void;
}

const UserStatsContext = createContext<UserStatsContextType | undefined>(undefined);

interface UserStatsProviderProps {
  children: ReactNode;
}

export const UserStatsProvider: React.FC<UserStatsProviderProps> = ({ children }) => {
  const userStatsHook = useUserStats();

  return (
    <UserStatsContext.Provider value={userStatsHook}>
      {children}
    </UserStatsContext.Provider>
  );
};

export const useUserStatsContext = () => {
  const context = useContext(UserStatsContext);
  if (context === undefined) {
    throw new Error('useUserStatsContext must be used within a UserStatsProvider');
  }
  return context;
};

export default UserStatsContext;
