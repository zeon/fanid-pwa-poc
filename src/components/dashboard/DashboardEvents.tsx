
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EventCard from '@/components/dashboard/EventCard';
import { useEvents } from '@/hooks/useEvents';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardEvents = () => {
  const { t } = useTranslation();
  const { data: upcomingEvents = [], isLoading: upcomingLoading } = useEvents('active');
  const { data: pastEvents = [], isLoading: pastLoading } = useEvents('inactive');

  return (
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
            {upcomingLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-64 w-full bg-gray-700/50" />
                ))}
              </div>
            ) : upcomingEvents.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No upcoming events</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="past" className="mt-6">
            {pastLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-64 w-full bg-gray-700/50" />
                ))}
              </div>
            ) : pastEvents.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No past events</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DashboardEvents;
