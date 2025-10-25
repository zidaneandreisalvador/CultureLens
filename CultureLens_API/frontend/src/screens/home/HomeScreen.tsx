import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, PlaneTakeoffIcon, BookOpenIcon, UsersIcon, ChevronRight, HeartIcon, X } from 'lucide-react';
export const HomeScreen = () => {
  const navigate = useNavigate();
  const [savedDestinations, setSavedDestinations] = useState<number[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<any | null>(null);
  const user = {
    name: 'Traveler'
  };
  const featuredDestinations = [{
    id: 1,
    name: 'Kyoto Imperial Palace',
    country: 'Japan',
    description: 'A symbol of Japanese culture and history, surrounded by beautiful gardens and ancient architecture. This magnificent palace complex served as the residence of the Imperial family until 1869, and today it stands as a serene reminder of Kyoto’s elegant traditions.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80'
  }, {
    id: 2,
    name: 'Machu Picchu',
    country: 'Peru',
    description: 'An ancient Incan city set high in the Andes Mountains, famous for its dry-stone walls and panoramic views. Its exact former use remains a mystery, but its incredible preservation makes it one of the most iconic archaeological sites in the world.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1000&q=80'
  }, {
    id: 3,
    name: 'Santorini',
    country: 'Greece',
    description: 'Known for its whitewashed buildings, blue domes, and breathtaking sunsets overlooking the Aegean Sea. Santorini is a romantic island destination famous for its volcanic beaches, luxury resorts, and historic villages built into the cliffs.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80'
  }];
  const quickActions = [{
    id: 1,
    icon: SearchIcon,
    label: 'Discover',
    description: 'Find destinations',
    path: '/search',
    color: 'bg-[#754b34]'
  }, {
    id: 2,
    icon: PlaneTakeoffIcon,
    label: 'Plan Trip',
    description: 'Create itinerary',
    path: '/plan-trip',
    color: 'bg-[#8b5a3c]'
  }, {
    id: 3,
    icon: UsersIcon,
    label: 'Find Buddy',
    description: 'Travel together',
    path: '/buddy',
    color: 'bg-[#754b34]'
  }, {
    id: 4,
    icon: BookOpenIcon,
    label: 'Guide',
    description: 'Local customs',
    path: '/guide',
    color: 'bg-[#8b5a3c]'
  }];
  const toggleSaveDestination = (id: number) => {
    setSavedDestinations(prev => prev.includes(id) ? prev.filter(destId => destId !== id) : [...prev, id]);
  };
  const handleViewDetails = (destination: any) => {
    setSelectedDestination(destination);
  };
  const closeModal = () => setSelectedDestination(null);
  return <div className="min-h-screen bg-[#fef7e0]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#754b34] to-[#8b5a3c] text-[#fefcf0] p-8 rounded-b-3xl shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold font-serif mb-2">
            Welcome back, {user.name}
          </h1>
          <p className="text-lg opacity-90 font-serif">
            Ready for your next adventure?
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl text-[#2f1b14] font-serif font-bold mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map(action => {
            const Icon = action.icon;
            return <button key={action.id} onClick={() => navigate(action.path)} className={`${action.color} text-[#fefcf0] p-6 rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-105 text-left`}>
                  <Icon className="w-8 h-8 mb-3" />
                  <h3 className="text-lg font-bold font-serif mb-1">
                    {action.label}
                  </h3>
                  <p className="text-sm opacity-90 font-serif">
                    {action.description}
                  </p>
                </button>;
          })}
          </div>
        </section>

        {/* Featured Destinations */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl text-[#2f1b14] font-serif font-bold">
              Featured Destinations
            </h2>
            <button onClick={() => navigate('/search')} className="text-[#754b34] font-serif font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {featuredDestinations.map(destination => <div key={destination.id} className="bg-[#fefcf0] rounded-2xl border border-[#d4c4a8] overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="flex">
                  <div className="w-36 h-36 flex-shrink-0">
                    <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-[#2f1b14] font-serif">
                        {destination.name}
                      </h4>
                      <button onClick={() => toggleSaveDestination(destination.id)} className="text-[#744a32] hover:scale-110 transition-transform">
                        <HeartIcon size={18} fill={savedDestinations.includes(destination.id) ? '#744a32' : 'none'} stroke="#744a32" />
                      </button>
                    </div>

                    <p className="text-[#2f1b14] font-serif text-sm leading-relaxed">
                      {destination.description.slice(0, 80)}...
                    </p>

                    <button onClick={() => handleViewDetails(destination)} className="mt-2 text-sm text-[#744a32] font-serif underline hover:text-[#2f1b14] transition-colors">
                      Read More →
                    </button>

                    <p className="text-xs text-[#8b7355] font-serif mt-2">
                      {destination.country}
                    </p>
                  </div>
                </div>
              </div>)}
          </div>
        </section>
      </div>

      {/* ✅ Destination Detail Modal */}
      {selectedDestination && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#fefcf0] w-[90%] max-w-md rounded-2xl shadow-lg p-6 relative">
            <button onClick={closeModal} className="absolute top-3 right-3 text-[#744a32] hover:text-[#2f1b14]">
              <X size={20} />
            </button>
            <img src={selectedDestination.image} alt={selectedDestination.name} className="w-full h-48 object-cover rounded-xl mb-4" />
            <h3 className="text-2xl font-serif font-bold text-[#2f1b14] mb-2">
              {selectedDestination.name}
            </h3>
            <p className="text-sm text-[#2f1b14] font-serif leading-relaxed mb-4">
              {selectedDestination.description}
            </p>
            <p className="text-sm text-[#8b7355] font-serif mb-6">
              Country: {selectedDestination.country}
            </p>

            {/* ✅ Save Button */}
            <button onClick={() => toggleSaveDestination(selectedDestination.id)} className={`w-full py-2 rounded-xl font-serif font-semibold transition-all shadow-md ${savedDestinations.includes(selectedDestination.id) ? 'bg-[#744a32] text-[#fefcf0] hover:bg-[#8b5a3c]' : 'bg-[#fefcf0] border border-[#744a32] text-[#744a32] hover:bg-[#f9f2e7]'}`}>
              {savedDestinations.includes(selectedDestination.id) ? 'Saved' : 'Save Destination'}
            </button>
          </div>
        </div>}
    </div>;
};