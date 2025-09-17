import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import teamCeoImage from '@/assets/team-ceo.jpg';
import teamCfoImage from '@/assets/team-cfo.jpg';
import teamPmImage from '@/assets/team-pm.jpg';
import teamTechImage from '@/assets/team-tech.jpg';

const TeamSection = () => {
  const { t } = useTranslation();

  const teamImages = [teamCeoImage, teamCfoImage, teamPmImage, teamTechImage];

  const teamMembers = [0, 1, 2, 3].map((index) => ({
    key: index,
    name: t(`landing.team.members.${index}.name`),
    position: t(`landing.team.members.${index}.position`),
    description: t(`landing.team.members.${index}.description`),
    image: teamImages[index]
  }));

  return (
    <section id="our-team" className="relative py-20 bg-gray-900 overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Neon glow effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t('landing.team.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('landing.team.subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card 
              key={member.key}
              className="group relative bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              <CardHeader className="text-center pb-4">
                {/* Team Member Photo */}
                <div className="mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-purple-400/50 group-hover:border-purple-400 transition-colors duration-300">
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.position}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Member Name */}
                <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300 mb-2">
                  {member.name}
                </h3>
                
                {/* Position Badge */}
                <div className="flex justify-center">
                  <Badge 
                    variant="outline" 
                    className="bg-purple-500/10 border-purple-400/50 text-purple-400 group-hover:bg-purple-500/20 group-hover:border-purple-400 transition-all duration-300 px-3 py-1 w-fit"
                  >
                    {member.position}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="text-center">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {member.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;