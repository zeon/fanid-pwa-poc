import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Ticket, Calendar, Fingerprint, Zap, User, LogOut } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  
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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Fan Verse
            </h1>
            <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"></div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300 text-sm">Welcome back, {user.name}</span>
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
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-gray-700 focus:bg-gray-700 focus:text-red-300"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome to the Future for Concert Ticketing</h2>
          <p className="text-gray-400">Your cyberpunk concert experience awaits</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Active Tickets</CardTitle>
              <Ticket className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">3</div>
              <p className="text-xs text-gray-400">Upcoming events</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Next Event</CardTitle>
              <Calendar className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">7</div>
              <p className="text-xs text-gray-400">Days away</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Biometric Status</CardTitle>
              <Fingerprint className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">Active</div>
              <p className="text-xs text-gray-400">Secure access enabled</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Energy Level</CardTitle>
              <Zap className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">100%</div>
              <p className="text-xs text-gray-400">Ready to rock</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-white">Neon Nights Festival</h3>
                    <p className="text-sm text-gray-400">December 15, 2024 • 8:00 PM</p>
                  </div>
                  <div className="text-cyan-400 font-bold">VIP</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-white">Cyberpunk Arena</h3>
                    <p className="text-sm text-gray-400">December 22, 2024 • 9:00 PM</p>
                  </div>
                  <div className="text-purple-400 font-bold">GA</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
