import React from 'react';
import { useTranslation } from 'react-i18next';
import { translations, LanguageKey } from 'locales/i18n';

export function LanguageSwitch() {
  //@typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  //@typescript-eslint/no-unused-vars
  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const language = event.target.value as LanguageKey;
    i18n.changeLanguage(language);
  };
}
