import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Globe, Moon, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SettingsPage() {
  const { language, changeLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center mb-8">
          <Link to="/dashboard" className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{t('settings.title')}</h1>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <Globe className="h-5 w-5 mr-2 text-blue-600" />
              {t('settings.language')}
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { code: 'ko', label: '한국어' },
                { code: 'en', label: 'English' },
                { code: 'zh', label: '中文' },
                { code: 'ja', label: '日本語' },
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex items-center justify-center px-4 py-3 border rounded-md text-sm font-medium transition-colors ${
                    language === lang.code
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 border-b border-gray-200 opacity-50 pointer-events-none">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <Moon className="h-5 w-5 mr-2 text-gray-600" />
              {t('settings.theme')}
            </h2>
            <p className="mt-1 text-sm text-gray-500">Coming soon...</p>
          </div>

          <div className="p-6 opacity-50 pointer-events-none">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-gray-600" />
              {t('settings.notifications')}
            </h2>
            <p className="mt-1 text-sm text-gray-500">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
