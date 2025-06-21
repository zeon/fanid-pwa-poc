
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import English locale modules
import enCommon from '../locales/en-US/common.json';
import enLanding from '../locales/en-US/landing.json';
import enAuth from '../locales/en-US/auth.json';
import enDashboard from '../locales/en-US/dashboard.json';
import enEvents from '../locales/en-US/events.json';
import enProfile from '../locales/en-US/profile.json';
import enTixcraft from '../locales/en-US/tixcraft.json';

// Import Traditional Chinese locale modules
import zhCommon from '../locales/zh-TW/common.json';
import zhLanding from '../locales/zh-TW/landing.json';
import zhAuth from '../locales/zh-TW/auth.json';
import zhDashboard from '../locales/zh-TW/dashboard.json';
import zhEvents from '../locales/zh-TW/events.json';
import zhProfile from '../locales/zh-TW/profile.json';
import zhTixcraft from '../locales/zh-TW/tixcraft.json';

// Merge all English translations
const enUS = {
  ...enCommon,
  ...enLanding,
  ...enAuth,
  ...enDashboard,
  ...enEvents,
  ...enProfile,
  ...enTixcraft,
};

// Merge all Traditional Chinese translations
const zhTW = {
  ...zhCommon,
  ...zhLanding,
  ...zhAuth,
  ...zhDashboard,
  ...zhEvents,
  ...zhProfile,
  ...zhTixcraft,
};

const resources = {
  'en-US': {
    translation: enUS,
  },
  'zh-TW': {
    translation: zhTW,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en-US', // default language
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
