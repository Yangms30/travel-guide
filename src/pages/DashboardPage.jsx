import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Map, Compass } from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { useLanguage } from '../context/LanguageContext';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { trips } = useTrip();
  const { t } = useLanguage();

  const activeTrip = trips.find(t => t.status === 'active') || trips[0];
  const upcomingTrips = trips.filter(t => t.id !== activeTrip?.id);

  return (
    <div className="pb-20">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">{t('dashboard.myTrips')}</h1>
          <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Active Trip Card */}
        {activeTrip && (
          <section>
            <h2 className="text-lg font-semibold mb-3">{t('dashboard.currentTrip')}</h2>
            <div 
              onClick={() => navigate('/guide')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-5 text-white shadow-lg shadow-blue-500/30 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold">{activeTrip.destination}</h3>
                  <p className="text-blue-100">{activeTrip.startDate} - {activeTrip.endDate}</p>
                </div>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                  {t('dashboard.live')}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-50">
                <Map size={16} />
                <span>{t('dashboard.clickToGuide')}</span>
              </div>
            </div>
          </section>
        )}

        {/* Upcoming Trips */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">{t('dashboard.upcoming')}</h2>
            <button 
              onClick={() => navigate('/planner')}
              className="text-primary text-sm font-medium flex items-center gap-1"
            >
              <Plus size={16} /> {t('dashboard.newTrip')}
            </button>
          </div>
          
          <div className="space-y-3">
            {upcomingTrips.map(trip => (
              <div key={trip.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg bg-cover bg-center" style={{backgroundImage: `url(https://source.unsplash.com/random/150x150/?${trip.destination.split(',')[0]})`}}></div>
                <div>
                  <h3 className="font-bold text-gray-900">{trip.destination}</h3>
                  <p className="text-sm text-gray-500">{trip.startDate} - {trip.endDate}</p>
                  <div className="flex -space-x-2 mt-2">
                    <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-300"></div>
                    <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-400"></div>
                  </div>
                </div>
              </div>
            ))}
            {upcomingTrips.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                {t('dashboard.noUpcoming')}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-20">
        <button className="flex flex-col items-center text-primary">
          <Compass size={24} />
          <span className="text-[10px] font-medium mt-1">{t('dashboard.trips')}</span>
        </button>
        <button 
          onClick={() => navigate('/planner')}
          className="flex flex-col items-center text-gray-400 hover:text-gray-600"
        >
          <div className="w-12 h-12 bg-primary rounded-full -mt-8 flex items-center justify-center shadow-lg shadow-blue-500/40 text-white">
            <Plus size={24} />
          </div>
        </button>
        <button className="flex flex-col items-center text-gray-400 hover:text-gray-600">
          <div className="w-6 h-6 rounded-full bg-gray-200"></div>
          <span className="text-[10px] font-medium mt-1">{t('dashboard.profile')}</span>
        </button>
      </nav>
    </div>
  );
}
