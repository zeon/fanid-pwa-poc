
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Ticket, Calendar, Fingerprint, Zap, User, LogOut } from 'lucide-react';
import EventCard from '@/components/dashboard/EventCard';
import LanguageSwitcher from '@/components/navigation/LanguageSwitcher';
import { upcomingEvents, pastEvents } from '@/data/eventsData';

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // Mock user data - in a real app this would come from auth context
  const user = {
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    initials: 'AC'
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px'
        }}></div>
      </div>
      
      <div className="absolute top-10 left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Header */}
      <div className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 p-4 relative z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Fan Verse
            </h1>
            <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"></div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 relative z-10">
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{t('dashboard.title')}</h2>
          <p className="text-gray-400">{t('dashboard.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{t('dashboard.stats.activeTickets')}</CardTitle>
              <Ticket className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{t('dashboard.stats.activeTicketsValue')}</div>
              <p className="text-xs text-gray-400">{t('dashboard.stats.activeTicketsDesc')}</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{t('dashboard.stats.nextEvent')}</CardTitle>
              <Calendar className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{t('dashboard.stats.nextEventValue')}</div>
              <p className="text-xs text-gray-400">{t('dashboard.stats.nextEventDesc')}</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{t('dashboard.stats.biometricStatus')}</CardTitle>
              <Fingerprint className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{t('dashboard.stats.biometricStatusValue')}</div>
              <p className="text-xs text-gray-400">{t('dashboard.stats.biometricStatusDesc')}</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{t('dashboard.stats.energyLevel')}</CardTitle>
              <Zap className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">{t('dashboard.stats.energyLevelValue')}</div>
              <p className="text-xs text-gray-400">{t('dashboard.stats.energyLevelDesc')}</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">{t('dashboard.events.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-700 border-gray-600">
                  <TabsTrigger 
                    value="upcoming" 
                    className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-600"
                  >
                    {t('dashboard.events.upcoming')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="past" 
                    className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-600"
                  >
                    {t('dashboard.events.past')}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="past" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
