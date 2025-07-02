
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Crown } from 'lucide-react';

interface Artist {
  id: number;
  name: string;
  image: string;
  isMember: boolean;
  isUserMember: boolean;
}

interface MembershipPaymentMobileSummaryProps {
  artist: Artist;
}

const MembershipPaymentMobileSummary = ({ artist }: MembershipPaymentMobileSummaryProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {/* Artist Info */}
      <Card className="bg-gray-700/50 border-gray-600">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-white">{artist.name}</h3>
              <div className="flex items-center text-yellow-400 text-sm">
                <Crown className="w-4 h-4 mr-1" />
                {t('dashboard.membershipPayment.membershipType')}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Membership Benefits */}
      <Card className="bg-gray-700/30 border-gray-600">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-gray-300">
            {t('dashboard.membershipPayment.benefits.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-1 text-sm text-gray-400">
            <li className="flex items-center">
              <Star className="w-3 h-3 mr-2 text-yellow-400" />
              {t('dashboard.membershipPayment.benefits.exclusiveContent')}
            </li>
            <li className="flex items-center">
              <Star className="w-3 h-3 mr-2 text-yellow-400" />
              {t('dashboard.membershipPayment.benefits.earlyAccess')}
            </li>
            <li className="flex items-center">
              <Star className="w-3 h-3 mr-2 text-yellow-400" />
              {t('dashboard.membershipPayment.benefits.specialDiscounts')}
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Price */}
      <div className="text-center py-2">
        <span className="text-2xl font-bold text-cyan-400">
          ${t('dashboard.membershipPayment.price')}
        </span>
        <span className="text-sm text-gray-400 ml-2">
          {t('dashboard.membershipPayment.perMonth')}
        </span>
      </div>
    </div>
  );
};

export default MembershipPaymentMobileSummary;
