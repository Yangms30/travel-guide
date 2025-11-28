import React, { createContext, useContext, useState } from 'react';

const TripContext = createContext(null);

export function TripProvider({ children }) {
  const [trips, setTrips] = useState([
    {
      id: '1',
      destination: 'Paris, France',
      startDate: '2023-10-15',
      endDate: '2023-10-22',
      budget: 2000,
      companions: [],
      status: 'active'
    },
    {
      id: '2',
      destination: 'Kyoto, Japan',
      startDate: '2023-11-10',
      endDate: '2023-11-18',
      budget: 3000,
      companions: [],
      status: 'upcoming'
    }
  ]);

  const addTrip = (trip) => {
    const newTrip = {
      ...trip,
      id: Math.random().toString(36).substr(2, 9),
      status: 'upcoming'
    };
    setTrips([newTrip, ...trips]);
  };

  return (
    <TripContext.Provider value={{ trips, addTrip }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  return useContext(TripContext);
}
