import React, { useState } from 'react';
import { ArrowLeft, Calendar, Users, MapPin, DollarSign, Plane, Hotel, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { useLanguage } from '../context/LanguageContext';

import { getDestinationRecommendations } from '../services/aiService';

export default function PlannerPage() {
  const navigate = useNavigate();
  const { addTrip } = useTrip();
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [hasDestination, setHasDestination] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    companions: [],
    destination: '',
    startDate: '',
    endDate: '',
    budget: 1000000,
    isBudgetUndecided: false,
    numberOfPeople: 2,
    travelStyle: '',
    companion: '',
    customRequest: '',
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleFinish = () => {
    addTrip(formData);
    navigate('/dashboard');
  };

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    try {
      const result = await getDestinationRecommendations(formData);
      setRecommendations(result.destinations || []);
      handleNext();
    } catch (error) {
      console.error("Failed to get recommendations:", error);
      alert("추천을 불러오는데 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalSteps = () => {
    return hasDestination ? 4 : 5; // Yes path: 4 steps, No path: 5 steps
  };

  const getProgress = () => {
    if (step === 0) return 0;
    return (step / getTotalSteps()) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white p-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
        <button onClick={() => step === 0 ? navigate(-1) : handleBack()} className="text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold">{t('planner.planNewTrip')}</h1>
          <div className="h-1 w-full bg-gray-200 rounded-full mt-1">
            <div 
              className="h-1 bg-primary rounded-full transition-all duration-300"
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
        </div>
      </header>
      
      <main className="p-4">
        {step === 0 && <Step0 onSelect={(choice) => { setHasDestination(choice); handleNext(); }} t={t} />}
        {step === 1 && hasDestination && <Step1Yes formData={formData} setFormData={setFormData} onNext={handleNext} t={t} />}
        {step === 1 && !hasDestination && <Step1No formData={formData} setFormData={setFormData} onNext={handleGetRecommendations} isLoading={isLoading} t={t} />}
        {step === 2 && hasDestination && <Step2Yes formData={formData} setFormData={setFormData} onNext={handleNext} t={t} />}
        {step === 2 && !hasDestination && <Step2No formData={formData} setFormData={setFormData} onNext={handleNext} recommendations={recommendations} t={t} />}
        {step === 3 && !hasDestination && <Step3No formData={formData} setFormData={setFormData} onNext={handleNext} t={t} />}
        {((step === 3 && hasDestination) || (step === 4 && !hasDestination)) && <Step4 formData={formData} onFinish={handleFinish} t={t} />}
      </main>
    </div>
  );
}

// Step 0: Ask if user has chosen destination
function Step0({ onSelect, t }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{t('planner.hasDestination')}</h2>
        <p className="text-gray-500">{t('planner.hasDestinationDesc')}</p>
      </div>

      <div className="space-y-3 mt-8">
        <button 
          onClick={() => onSelect(true)}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg"
        >
          {t('planner.yes')}
        </button>
        <button 
          onClick={() => onSelect(false)}
          className="w-full bg-gray-100 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-200 transition"
        >
          {t('planner.no')}
        </button>
      </div>
    </div>
  );
}

// Step 1 - Yes path: Name + Destination
function Step1Yes({ formData, setFormData, onNext, t }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('planner.letsStart')}</h2>
        <p className="text-gray-500">{t('planner.nameAndDestination')}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('planner.tripName')}</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder={t('planner.tripNamePlaceholder')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('planner.destination')}</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input 
              type="text" 
              value={formData.destination}
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder={t('planner.destinationPlaceholder')}
            />
          </div>
        </div>
      </div>

      <button 
        onClick={onNext}
        disabled={!formData.name || !formData.destination}
        className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t('planner.next')}
      </button>
    </div>
  );
}

// Step 1 - No path: Collect preferences
function Step1No({ formData, setFormData, onNext, isLoading, t }) {
  const travelStyles = [
    { key: 'beach', label: t('planner.styleBeach') },
    { key: 'culture', label: t('planner.styleCulture') },
    { key: 'adventure', label: t('planner.styleAdventure') },
    { key: 'city', label: t('planner.styleCity') },
    { key: 'nature', label: t('planner.styleNature') },
  ];

  const companions = [
    { key: 'Alone', label: '혼자' },
    { key: 'Friend', label: '친구' },
    { key: 'Partner', label: '연인' },
    { key: 'Family', label: '가족' },
    { key: 'Colleague', label: '동료' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('planner.tellUsPreferences')}</h2>
        <p className="text-gray-500">{t('planner.preferencesDesc')}</p>
      </div>

      <div className="space-y-4">
        {/* Trip Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('planner.tripName')}</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder={t('planner.tripNamePlaceholder')}
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('planner.startDate')}</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input 
                type="date" 
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full pl-10 pr-2 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('planner.endDate')}</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input 
                type="date" 
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                className="w-full pl-10 pr-2 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>
        </div>

        {/* Budget */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              {formData.isBudgetUndecided 
                ? "예산 미정" 
                : t('planner.budgetAmount').replace('{amount}', formData.budget.toLocaleString()) + " (1인당)"}
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input 
                type="checkbox"
                checked={formData.isBudgetUndecided}
                onChange={(e) => setFormData({...formData, isBudgetUndecided: e.target.checked})}
                className="rounded text-primary focus:ring-primary"
              />
              미정
            </label>
          </div>
          <div className={`p-4 bg-white rounded-xl border border-gray-200 transition-opacity ${formData.isBudgetUndecided ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="flex items-center gap-3">
              <DollarSign className="text-gray-400" size={20} />
              <input 
                type="range" 
                min="500000" 
                max="10000000" 
                step="100000"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value)})}
                className="w-full accent-primary"
                disabled={formData.isBudgetUndecided}
              />
            </div>
          </div>
        </div>

        {/* Number of People */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('planner.numberOfPeople')}</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFormData({...formData, numberOfPeople: Math.max(1, formData.numberOfPeople - 1)})}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
            >
              -
            </button>
            <div className="flex-1 text-center">
              <span className="text-2xl font-bold">{formData.numberOfPeople}</span>
              <span className="text-gray-500 ml-1">{t('planner.people')}</span>
            </div>
            <button
              onClick={() => setFormData({...formData, numberOfPeople: formData.numberOfPeople + 1})}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Companion */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">누구와 함께 가시나요?</label>
          <div className="flex flex-wrap gap-2">
            {companions.map((comp) => (
              <button
                key={comp.key}
                onClick={() => setFormData({...formData, companion: comp.key})}
                className={`px-4 py-2 rounded-full border transition text-sm ${
                  formData.companion === comp.key
                    ? 'border-primary bg-blue-50 text-primary font-bold'
                    : 'border-gray-200 bg-white hover:border-blue-300 text-gray-600'
                }`}
              >
                {comp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Travel Style */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('planner.travelStyle')}</label>
          <div className="grid grid-cols-2 gap-3">
            {travelStyles.map((style) => (
              <button
                key={style.key}
                onClick={() => setFormData({...formData, travelStyle: style.key})}
                className={`p-3 rounded-xl border transition ${
                  formData.travelStyle === style.key
                    ? 'border-primary bg-blue-50 text-primary'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Request */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">여행 테마나 특별한 요청사항이 있나요?</label>
          <textarea 
            value={formData.customRequest}
            onChange={(e) => setFormData({...formData, customRequest: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none h-24 resize-none"
            placeholder="예: 맛집 투어를 위주로 하고 싶어요. 조용한 휴양지를 원해요."
          />
        </div>
      </div>

      <button 
        onClick={onNext}
        disabled={isLoading || !formData.name || !formData.startDate || !formData.endDate || !formData.travelStyle || !formData.companion}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>AI가 여행지를 찾고 있어요...</span>
          </>
        ) : (
          <span>✨ AI 추천 받기</span>
        )}
      </button>
    </div>
  );
}

// Step 2 - Yes path: Dates + Budget
function Step2Yes({ formData, setFormData, onNext, t }) {
  return (
    <div className="space-y-6 animate-in fade-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('planner.whenAndBudget')}</h2>
        <p className="text-gray-500">{t('planner.scheduleAndBudget')}</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('planner.startDate')}</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input 
                type="date" 
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full pl-10 pr-2 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('planner.endDate')}</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input 
                type="date" 
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                className="w-full pl-10 pr-2 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('planner.budgetAmount').replace('{amount}', formData.budget.toLocaleString())}
          </label>
          <div className="p-4 bg-white rounded-xl border border-gray-200">
            <div className="flex items-center gap-3">
              <DollarSign className="text-gray-400" size={20} />
              <input 
                type="range" 
                min="500000" 
                max="10000000" 
                step="100000"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: parseInt(e.target.value)})}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={onNext}
        disabled={!formData.startDate || !formData.endDate}
        className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t('planner.next')}
      </button>
    </div>
  );
}

// Step 2 - No path: Show recommendations
function Step2No({ formData, setFormData, onNext, recommendations, t }) {
  // const recommendations = [ ... ]; // Removed hardcoded data

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('planner.recommendedForYou')}</h2>
        <p className="text-gray-500">{t('planner.basedOnPreferences')}</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input 
            type="text" 
            value={formData.destination}
            onChange={(e) => setFormData({...formData, destination: e.target.value})}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            placeholder={t('planner.searchDestination')}
          />
        </div>

        <div>
          <div className="grid grid-cols-1 gap-3">
            {recommendations.map((rec) => (
              <div 
                key={rec.name}
                onClick={() => setFormData({...formData, destination: rec.name})}
                className={`p-4 rounded-xl border cursor-pointer transition flex justify-between items-center ${formData.destination === rec.name ? 'border-primary bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300'}`}
              >
                <div>
                  <div className="font-bold">{rec.name}, {rec.country}</div>
                  <div className="text-xs text-gray-500">{rec.reason}</div>
                  <div className="text-xs font-bold text-primary mt-1">₩{rec.estimatedCost.toLocaleString()}</div>
                </div>
                {formData.destination === rec.name && <Check size={20} className="text-primary" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={onNext}
        disabled={!formData.destination}
        className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t('planner.next')}
      </button>
    </div>
  );
}

// Step 3 - No path: Confirm dates/budget (already collected in Step 1, but allow editing)
function Step3No({ formData, setFormData, onNext, t }) {
  return <Step2Yes formData={formData} setFormData={setFormData} onNext={onNext} t={t} />;
}

// Step 4: Review
function Step4({ formData, onFinish, t }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('planner.reviewTrip')}</h2>
        <p className="text-gray-500">{t('planner.foundOptions')}</p>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-lg mb-1">{formData.name}</h3>
        <p className="text-gray-600 flex items-center gap-1">
          <MapPin size={16} /> {formData.destination}
        </p>
        <p className="text-gray-500 text-sm mt-2">
          {formData.startDate} - {formData.endDate} • ₩{formData.budget.toLocaleString()} {t('planner.budget')}
        </p>
      </div>

      <div>
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <Plane size={20} className="text-primary" /> {t('planner.recommendedFlights')}
        </h3>
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-xl border border-gray-200 flex justify-between items-center">
            <div>
              <div className="font-bold">09:00 AM - 12:30 PM</div>
              <div className="text-xs text-gray-500">{t('planner.direct')} • 3h 30m</div>
            </div>
            <div className="font-bold text-primary">₩450,000</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <Hotel size={20} className="text-primary" /> {t('planner.recommendedHotels')}
        </h3>
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-xl border border-gray-200 flex gap-3">
            <div className="w-16 h-16 bg-gray-200 rounded-lg bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=150&q=80)'}}></div>
            <div>
              <div className="font-bold">Grand Resort</div>
              <div className="text-xs text-gray-500">4.8 ★★★★★</div>
              <div className="text-sm font-bold text-primary mt-1">₩120,000{t('planner.perNight')}</div>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={onFinish}
        className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
      >
        {t('planner.createTrip')}
      </button>
    </div>
  );
}
