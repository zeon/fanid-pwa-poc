
import { useArtistMembership } from '@/contexts/ArtistMembershipContext';

export const useMembershipOperations = () => {
  const { updateMembershipStatus, isMember } = useArtistMembership();

  const purchaseMembership = async (artistId: number): Promise<boolean> => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update membership status
      updateMembershipStatus(artistId, true);
      
      return true;
    } catch (error) {
      console.error('Failed to purchase membership:', error);
      return false;
    }
  };

  const checkMembershipStatus = (artistId: number): boolean => {
    return isMember(artistId);
  };

  return {
    purchaseMembership,
    checkMembershipStatus
  };
};
