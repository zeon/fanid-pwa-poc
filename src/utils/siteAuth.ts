
const SITE_ACCESS_KEY = 'siteAccessGranted';
const SITE_PASSWORD = '88fanid88fv';

export const checkSiteAccess = (): boolean => {
  const stored = localStorage.getItem(SITE_ACCESS_KEY);
  if (!stored) return false;
  
  try {
    const { granted, timestamp } = JSON.parse(stored);
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    // Check if access was granted and is still valid (within 24 hours)
    return granted && (now - timestamp < twentyFourHours);
  } catch {
    return false;
  }
};

export const grantSiteAccess = (): void => {
  const accessData = {
    granted: true,
    timestamp: Date.now()
  };
  localStorage.setItem(SITE_ACCESS_KEY, JSON.stringify(accessData));
};

export const validateSitePassword = (password: string): boolean => {
  return password === SITE_PASSWORD;
};

export const revokeSiteAccess = (): void => {
  localStorage.removeItem(SITE_ACCESS_KEY);
};
