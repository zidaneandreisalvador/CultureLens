import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, HeartIcon, FilterIcon } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { DestinationDetailsModal } from '../../components/ui/DestinationDetailsModal';
export const SearchScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedDestinations, setSavedDestinations] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  // ------------------ DATA ------------------
  const destinations = [{
    id: 1,
    name: 'Kyoto Imperial Palace',
    country: 'Japan',
    rating: 5,
    duration: '3-4 hours',
    travelers: '2,450',
    price: '$45 - $65',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
    emoji: '🏯',
    category: 'Historical',
    highlights: ['Cultural Heritage', 'Architecture'],
    description: "The Kyoto Imperial Palace, once home to Japan's Imperial Family until 1868, showcases exquisite Japanese architecture and stunning gardens.",
    comments: [{
      id: 1,
      name: 'Aiko',
      country: 'Japan',
      comment: 'Truly magical place!'
    }]
  }, {
    id: 2,
    name: 'Machu Picchu',
    country: 'Peru',
    rating: 5,
    duration: 'Full day',
    travelers: '4,120',
    price: '$80 - $120',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1000&q=80',
    emoji: '🏔️',
    category: 'Historical',
    highlights: ['UNESCO Site', 'Hiking', 'Incan Citadel'],
    description: "Nestled high in the Andes, Machu Picchu is a 15th-century Incan citadel hidden among clouds. Its terraces, temples, and stone structures demonstrate the Incas' genius for blending architecture with nature. A UNESCO site, it remains one of the most awe-inspiring archaeological wonders.",
    comments: [{
      id: 2,
      name: 'Carlos',
      country: 'Peru',
      comment: 'Breathtaking views!'
    }]
  }, {
    id: 3,
    name: 'Santorini',
    country: 'Greece',
    rating: 4,
    duration: '1-2 days',
    travelers: '5,670',
    price: '$30 - $200',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80',
    emoji: '🏝️',
    category: 'Beach',
    highlights: ['Island Life', 'Sunset Views'],
    description: 'Santorini, with its white-washed buildings and blue domes, offers stunning sunsets and romantic views.',
    comments: []
  }, {
    id: 4,
    name: 'Paris',
    country: 'France',
    rating: 5,
    duration: '3-5 days',
    travelers: '8,950',
    price: '$100 - $300',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80',
    emoji: '🗼',
    category: 'Cultural',
    highlights: ['Art & Museums', 'Romance', 'Historic Architecture'],
    description: 'Known as the City of Lights, Paris offers more than its iconic Eiffel Tower. Wander through cobblestone streets lined with cafés, marvel at masterpieces in the Louvre, or enjoy a sunset cruise on the Seine. Paris effortlessly blends romance, art, and history into one unforgettable destination.',
    comments: []
  }, {
    id: 5,
    name: 'Kyoto',
    country: 'Japan',
    rating: 5,
    duration: '2-4 days',
    travelers: '6,230',
    price: '$60 - $150',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1000&q=80',
    emoji: '⛩️',
    category: 'Cultural',
    highlights: ['Temples & Shrines', 'Traditional Culture', 'Gardens'],
    description: 'Kyoto is the heart of traditional Japan, where thousands of shrines and temples are surrounded by serene gardens and centuries-old tea houses. Travelers can witness the beauty of seasonal festivals, the elegance of geisha districts, and the calm of bamboo groves. It is a city that preserves the soul of Japanese culture.',
    comments: []
  }, {
    id: 6,
    name: 'Marrakech',
    country: 'Morocco',
    rating: 5,
    duration: '2-3 days',
    travelers: '4,890',
    price: '$40 - $100',
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1000&q=80',
    emoji: '🕌',
    category: 'Cultural',
    highlights: ['Souks & Markets', 'Islamic Architecture', 'Local Cuisine'],
    description: "Marrakech is a sensory journey, filled with vibrant souks, aromatic spices, and the hum of storytellers in Jemaa el-Fnaa square. Ornate palaces and mosques showcase Morocco's Islamic artistry, while riads and courtyards offer peaceful escapes. Every corner tells a story of trade, culture, and resilience.",
    comments: []
  }, {
    id: 7,
    name: 'Cusco',
    country: 'Peru',
    rating: 5,
    duration: '2-3 days',
    travelers: '3,670',
    price: '$50 - $120',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1000&q=80',
    emoji: '🏛️',
    category: 'Cultural',
    highlights: ['Incan Heritage', 'Colonial Architecture', 'Mountain Views'],
    description: 'The gateway to Machu Picchu, Cusco is a city where Incan and Spanish colonial influences meet. Its narrow streets reveal stunning stonework, historic plazas, and colorful markets. Cusco is a living museum of Andean culture, perched high in the Andes with breathtaking mountain views.',
    comments: []
  }, {
    id: 8,
    name: 'Rome',
    country: 'Italy',
    rating: 5,
    duration: '3-5 days',
    travelers: '9,340',
    price: '$90 - $250',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1000&q=80',
    emoji: '🏛️',
    category: 'Historical',
    highlights: ['Ancient Ruins', 'Vatican City', 'Renaissance Art'],
    description: "Rome, the Eternal City, is a place where history lives on every corner. From the Colosseum and Roman Forum to the Vatican's grandeur, it offers a deep dive into ancient empires and Christian heritage. With its bustling piazzas, espresso bars, and timeless ruins, Rome is a feast for the senses.",
    comments: []
  }, {
    id: 9,
    name: 'The Great Wall of China',
    country: 'China',
    rating: 5,
    duration: 'Half day - Full day',
    travelers: '7,820',
    price: '$30 - $80',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1000&q=80',
    emoji: '🏯',
    category: 'Historical',
    highlights: ['UNESCO Site', 'Ancient Engineering', 'Mountain Views'],
    description: "Stretching over 13,000 miles, the Great Wall of China is one of humanity's most ambitious engineering feats. Built to protect Chinese dynasties from invasions, it winds across mountains and valleys with breathtaking scenery. Today, it symbolizes endurance, strength, and cultural pride.",
    comments: []
  }, {
    id: 10,
    name: 'Taj Mahal',
    country: 'India',
    rating: 5,
    duration: '3-4 hours',
    travelers: '6,540',
    price: '$20 - $50',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80',
    emoji: '🕌',
    category: 'Historical',
    highlights: ['Mughal Architecture', 'UNESCO Site', 'Love Monument'],
    description: 'The Taj Mahal, a white marble mausoleum in Agra, was built by Emperor Shah Jahan in memory of his wife Mumtaz Mahal. Known for its symmetrical beauty and reflection pools, it is both a love story in stone and a masterpiece of Mughal architecture. Visitors from around the world come to witness its timeless elegance.',
    comments: []
  }, {
    id: 11,
    name: 'Colosseum',
    country: 'Italy',
    rating: 5,
    duration: '2-3 hours',
    travelers: '8,120',
    price: '$25 - $60',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1000&q=80',
    emoji: '🏛️',
    category: 'Historical',
    highlights: ['Ancient Rome', 'Gladiator Arena', 'UNESCO Site'],
    description: "Rome's Colosseum, once the largest amphitheater in the world, could hold up to 50,000 spectators. It was the stage for gladiator battles, animal hunts, and grand spectacles that defined Roman entertainment. Though partly in ruins, it remains a powerful reminder of ancient Rome's might.",
    comments: []
  }, {
    id: 12,
    name: 'Chichen Itza',
    country: 'Mexico',
    rating: 5,
    duration: '3-5 hours',
    travelers: '5,890',
    price: '$35 - $70',
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1000&q=80',
    emoji: '🗿',
    category: 'Historical',
    highlights: ['Mayan Ruins', 'UNESCO Site', 'Astronomy'],
    description: "Chichen Itza was one of the most important Mayan cities, blending mythology, astronomy, and architecture. The Pyramid of Kukulcán is designed so that during the equinox, shadows form the shape of a serpent slithering down the steps. This UNESCO site reflects the Mayans' extraordinary knowledge and creativity.",
    comments: []
  }];
  const categories = [{
    id: 'Historical',
    name: 'Historical',
    emoji: '🏯'
  }, {
    id: 'Cultural',
    name: 'Cultural',
    emoji: '🎭'
  }, {
    id: 'Adventure',
    name: 'Adventure',
    emoji: '🧗‍♂️'
  }, {
    id: 'Beach',
    name: 'Beach',
    emoji: '🏝️'
  }, {
    id: 'Food',
    name: 'Food',
    emoji: '🍜'
  }];
  // ------------------ LOGIC ------------------
  const filteredDestinations = activeFilter ? destinations.filter(dest => dest.category.toLowerCase() === activeFilter.toLowerCase() && dest.name.toLowerCase().includes(searchQuery.toLowerCase())) : destinations.filter(dest => dest.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const toggleSaveDestination = (id: number) => {
    setSavedDestinations(prev => prev.includes(id) ? prev.filter(destId => destId !== id) : [...prev, id]);
  };
  const handleViewDetails = (destination: any) => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
  };
  const clearFilter = () => {
    setActiveFilter(null);
  };
  // ------------------ RENDER ------------------
  return <div className="min-h-screen bg-[#fef7e0] p-4 relative">
      {/* Header */}
      <header className="bg-[#754b34] text-[#fcf8dd] p-5 rounded-t shadow-md relative mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold font-serif">
            Discover Expeditions
          </h1>

          {/* Heart + Filter Buttons */}
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/saved-trips')} className="p-2 rounded-full border border-[#fefcf0]/40 bg-[#fefcf0]/10 hover:bg-[#fefcf0]/20 transition-colors" title="Saved Trips">
              <HeartIcon size={20} />
            </button>

            <button onClick={() => setShowFilters(!showFilters)} className="p-2 rounded-full border border-[#fefcf0]/40 bg-[#fefcf0]/10 hover:bg-[#fefcf0]/20 transition-colors" title="Show Filters">
              <FilterIcon size={20} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <input type="search" className="w-full bg-[#fefcf0] border border-[#d4c4a8] rounded-full pl-10 pr-4 py-3 font-semibold text-[#2f1b14] shadow-inner focus:ring-2 focus:ring-[#8b5a3c] focus:outline-none font-serif" placeholder="Search destinations, experiences..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon size={20} className="text-[#8b7355]" />
          </div>
        </div>

        {/* Filters Section (Toggleable) */}
        {showFilters && <div className="transition-all duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-2 px-1">
              <h3 className="text-[#fcf8dd] font-semibold font-serif">
                Filters
              </h3>
              {activeFilter && <button onClick={clearFilter} className="text-sm text-[#fefcf0] underline hover:text-[#fcf8dd]/80 font-serif">
                  Clear Filter
                </button>}
            </div>

            <div className="flex overflow-x-auto space-x-3 pb-2 scrollbar-hide">
              {categories.map(cat => <button key={cat.id} onClick={() => setActiveFilter(cat.name)} className={`flex-shrink-0 px-4 py-2 rounded-full font-serif border transition-all ${activeFilter === cat.name ? 'bg-[#fefcf0] text-[#744a32] border-[#fefcf0] shadow-md' : 'bg-[#754b34] text-[#fefcf0] border-[#fefcf0]/40 hover:bg-[#8b5a3c]'}`}>
                  {cat.emoji} {cat.name}
                </button>)}
            </div>
          </div>}
      </header>

      {/* Destination Results */}
      <div className="space-y-4">
        {filteredDestinations.map(destination => <div key={destination.id} className="bg-[#fefcf0] border-2 border-[#d4c4a8] rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden">
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

                <div className="flex flex-wrap gap-2 mt-2">
                  {destination.highlights.map((h, i) => <Badge key={i} variant="secondary" className="text-[#2f1b14] font-serif">
                      {h}
                    </Badge>)}
                </div>
              </div>
            </div>
          </div>)}
      </div>

      {/* Destination Details Modal */}
      {selectedDestination && <DestinationDetailsModal destination={selectedDestination} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} comments={selectedDestination.comments || []} savedDestinations={savedDestinations} toggleSaveDestination={toggleSaveDestination} />}
    </div>;
};