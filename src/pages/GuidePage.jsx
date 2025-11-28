import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Navigation, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getNearbyPlaces } from '../services/locationService';
import { useLanguage } from '../context/LanguageContext';

export default function GuidePage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [location, setLocation] = useState(null);
  const [nearbyPlace, setNearbyPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(t('guide.geolocationNotSupported'));
      setLoading(false);
      return;
    }

    // Simulate finding location and places
    const timer = setTimeout(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          
          // Fetch mock nearby places
          getNearbyPlaces(position.coords.latitude, position.coords.longitude)
            .then(places => {
              setNearbyPlace(places[0]);
              setLoading(false);
            });
        },
        () => {
          setError(t('guide.unableToRetrieve'));
          setLoading(false);
        }
      );
    }, 1500); // Fake delay for effect

    return () => clearTimeout(timer);
  }, []);

  const handleSimulateMove = () => {
    setLoading(true);
    setNearbyPlace(null);
    setTimeout(() => {
      getNearbyPlaces(0, 0).then(places => {
        setNearbyPlace(places[0]);
        setLoading(false);
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <header className="p-4 flex items-center gap-4 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-10">
        <button onClick={() => navigate(-1)} className="text-white bg-black/20 p-2 rounded-full backdrop-blur-md">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold shadow-black drop-shadow-md">{t('guide.liveGuide')}</h1>
      </header>
      
      <main className="h-screen flex items-center justify-center relative overflow-hidden bg-gray-800">
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/2.3522,48.8566,12,0/600x800@2x?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGZ4b3hlaDgwMDBxM3RwNXQ4aDZ3bHBiIn0.1')] bg-cover bg-center">
          {/* Fallback if image fails */}
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            <MapPin size={48} className="animate-bounce text-primary" />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-medium animate-pulse">{t('guide.locatingYou')}</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 p-6 text-center">
            <Info size={48} className="text-red-500 mb-4" />
            <p className="text-lg font-bold mb-2">{t('guide.locationError')}</p>
            <p className="text-gray-400">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 bg-white text-black px-6 py-2 rounded-full font-bold"
            >
              {t('guide.retry')}
            </button>
          </div>
        )}

        {/* Bottom Sheet */}
        {!loading && !error && nearbyPlace && (
          <div className="absolute bottom-0 left-0 right-0 bg-white text-gray-900 rounded-t-3xl p-6 pb-10 transition-transform transform translate-y-0 animate-in slide-in-from-bottom duration-500 z-30">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
            
            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-20 rounded-xl bg-gray-200 bg-cover bg-center shadow-md flex-shrink-0" style={{backgroundImage: `url(${nearbyPlace.image})`}}></div>
              <div>
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <Navigation size={12} />
                  <span>{t('guide.nearby')} • 50m</span>
                </div>
                <h2 className="text-2xl font-bold leading-tight">{nearbyPlace.name}</h2>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{nearbyPlace.description}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-sm text-gray-900">{t('guide.localTips')}</h3>
              {nearbyPlace.tips.map((tip, i) => (
                <div key={i} className="flex gap-3 items-start bg-gray-50 p-3 rounded-xl">
                  <Info size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{tip}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 bg-primary text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30">
                {t('guide.startAudioGuide')}
              </button>
              <button 
                onClick={handleSimulateMove}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200"
              >
                {t('guide.walkToNext')}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
