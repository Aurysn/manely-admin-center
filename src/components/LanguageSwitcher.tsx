"use client"

import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded-lg ${i18n.language === 'en' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('lt')}
        className={`px-3 py-1 rounded-lg ${i18n.language === 'lt' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
      >
        LT
      </button>
    </div>
  );
}
