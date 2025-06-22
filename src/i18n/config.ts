
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
import enTickets from '../locales/en-US/tickets.json';
import enEntry from '../locales/en-US/entry.json';

// Import Traditional Chinese locale modules
import zhCommon from '../locales/zh-TW/common.json';
import zhLanding from '../locales/zh-TW/landing.json';
import zhAuth from '../locales/zh-TW/auth.json';
import zhDashboard from '../locales/zh-TW/dashboard.json';
import zhEvents from '../locales/zh-TW/events.json';
import zhProfile from '../locales/zh-TW/profile.json';
import zhTixcraft from '../locales/zh-TW/tixcraft.json';
import zhTickets from '../locales/zh-TW/tickets.json';
import zhEntry from '../locales/zh-TW/entry.json';

// Helper function to deep merge objects
const deepMerge = (target: any, ...sources: any[]): any => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
};

const isObject = (item: any): boolean => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

// Properly merge all English translations while preserving nested structure
const enUS = deepMerge(
  {},
  enCommon,
  enLanding,
  enAuth,
  enDashboard,
  enEvents,
  enProfile,
  enTixcraft,
  enTickets,
  enEntry
);

// Properly merge all Traditional Chinese translations while preserving nested structure
const zhTW = deepMerge(
  {},
  zhCommon,
  zhLanding,
  zhAuth,
  zhDashboard,
  zhEvents,
  zhProfile,
  zhTixcraft,
  zhTickets,
  zhEntry
);

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
