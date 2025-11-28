export const MOCK_POIS = [
  {
    id: 1,
    name: "Eiffel Tower",
    description: "The Iron Lady, a global cultural icon of France.",
    coords: { lat: 48.8584, lng: 2.2945 },
    image: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=600&q=80",
    tips: ["Best view from Trocadéro", "Book tickets in advance"]
  },
  {
    id: 2,
    name: "Louvre Museum",
    description: "The world's largest art museum and a historic monument.",
    coords: { lat: 48.8606, lng: 2.3376 },
    image: "https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?w=600&q=80",
    tips: ["Use the Carrousel entrance", "Closed on Tuesdays"]
  },
  {
    id: 3,
    name: "Notre-Dame Cathedral",
    description: "Medieval Catholic cathedral on the Île de la Cité.",
    coords: { lat: 48.8529, lng: 2.3500 },
    image: "https://images.unsplash.com/photo-1478391679964-b7d2b3a69932?w=600&q=80",
    tips: ["Currently under reconstruction", "Visit the crypt"]
  }
];

export function getNearbyPlaces(lat, lng) {
  // In a real app, we would query a backend with lat/lng
  // Here we just return a random POI to simulate "finding" something nearby
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomPoi = MOCK_POIS[Math.floor(Math.random() * MOCK_POIS.length)];
      resolve([randomPoi]);
    }, 1000);
  });
}
