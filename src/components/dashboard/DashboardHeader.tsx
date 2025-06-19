
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogOut } from 'lucide-react';
import TextLanguageSwitcher from '@/components/navigation/TextLanguageSwitcher';

interface DashboardHeaderProps {
  user: {
    name: string;
    email: string;
    initials: string;
  };
}

const DashboardHeader = ({ user }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/signin');
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 p-4 relative z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Fan Verse
          </h1>
          <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"></div>
        </div>
        <div className="flex items-center space-x-4">
          <TextLanguageSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-full">
                <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-cyan-400 transition-all">
                  <AvatarImage src="" alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-purple-400 text-white font-bold text-sm">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 bg-gray-800 border-gray-700 text-white"
            >
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem 
                onClick={handleProfileClick}
                className="cursor-pointer text-gray-300 hover:text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white"
              >
                <User className="mr-2 h-4 w-4" />
                {t('navigation.profile')}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-gray-700 focus:bg-gray-700 focus:text-red-300"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {t('navigation.logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
