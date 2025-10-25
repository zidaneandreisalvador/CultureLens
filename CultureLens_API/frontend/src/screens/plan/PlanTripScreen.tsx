import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, CalendarIcon, PlusIcon, XIcon, ArrowLeftIcon, SaveIcon } from 'lucide-react';
interface Destination {
  id: string;
  name: string;
  country: string;
  startDate: string;
  endDate: string;
  activities: string[];
}
export const PlanTripScreen = () => {
  const navigate = useNavigate();
  const [tripName, setTripName] = useState('');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [showAddDestination, setShowAddDestination] = useState(false);
  const [currentDestination, setCurrentDestination] = useState({
    name: '',
    country: '',
    startDate: '',
    endDate: '',
    activities: [] as string[]
  });
  const [activityInput, setActivityInput] = useState('');
  const countries = ['Japan', 'France', 'Italy', 'Spain', 'Greece', 'Peru', 'Thailand', 'Indonesia', 'Morocco', 'India', 'Brazil', 'Korea', 'China', 'Turkey'].sort();
  const handleAddActivity = () => {
    if (activityInput.trim()) {
      setCurrentDestination({
        ...currentDestination,
        activities: [...currentDestination.activities, activityInput.trim()]
      });
      setActivityInput('');
    }
  };
  const handleRemoveActivity = (index: number) => {
    setCurrentDestination({
      ...currentDestination,
      activities: currentDestination.activities.filter((_, i) => i !== index)
    });
  };
  const handleSaveDestination = () => {
    if (currentDestination.name && currentDestination.country) {
      setDestinations([...destinations, {
        ...currentDestination,
        id: Date.now().toString()
      }]);
      setCurrentDestination({
        name: '',
        country: '',
        startDate: '',
        endDate: '',
        activities: []
      });
      setShowAddDestination(false);
    }
  };
  const handleRemoveDestination = (id: string) => {
    setDestinations(destinations.filter(dest => dest.id !== id));
  };
  const handleSaveTrip = () => {
    if (tripName && destinations.length > 0) {
      // Here you would save the trip to your backend/state management
      console.log('Saving trip:', {
        tripName,
        destinations
      });
      alert('Trip saved successfully!');
      navigate('/itinerary');
    } else {
      alert('Please add a trip name and at least one destination');
    }
  };
  return <div className="min-h-screen p-6 flex flex-col font-serif" style={{
    backgroundColor: '#fcf8dd',
    backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(117, 75, 52, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(254, 252, 240, 0.3) 0%, transparent 50%)
        `
  }}>
      {/* Header */}
      <header className="bg-[#b7965f] text-white p-4 rounded-t flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 rounded-full border border-[#fefcf0] text-[#fefcf0] hover:bg-[#754b34] transition-colors">
          <ArrowLeftIcon size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Plan Your Journey</h1>
          <p className="text-[#fefcf0]/70 italic">
            Create your perfect itinerary
          </p>
        </div>
      </header>
      {/* Trip Name */}
      <div className="mb-6">
        <label className="block text-[#754b34] mb-2 font-semibold">
          Trip Name
        </label>
        <input type="text" value={tripName} onChange={e => setTripName(e.target.value)} placeholder="e.g., Summer in Europe" className="w-full bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-3 font-semibold text-[#754b34] shadow-inner focus:ring-2 focus:ring-[#754b34] focus:outline-none" />
      </div>
      {/* Destinations List */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#754b34]">Destinations</h2>
          <button onClick={() => setShowAddDestination(true)} className="bg-[#754b34] text-[#fefcf0] p-2 rounded-full shadow-md hover:bg-[#5f3b29] transition-colors">
            <PlusIcon size={20} />
          </button>
        </div>
        {destinations.length > 0 ? <div className="space-y-4">
            {destinations.map((dest, index) => <div key={dest.id} className="bg-[#fefcf0] border border-[#754b34]/20 rounded-lg p-4 shadow-md">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-[#754b34]">
                      {index + 1}. {dest.name}
                    </h3>
                    <div className="flex items-center text-sm text-[#754b34]/70 mt-1">
                      <MapPinIcon size={14} className="mr-1" />
                      <span>{dest.country}</span>
                    </div>
                  </div>
                  <button onClick={() => handleRemoveDestination(dest.id)} className="text-[#754b34]/60 hover:text-[#754b34]">
                    <XIcon size={18} />
                  </button>
                </div>
                {(dest.startDate || dest.endDate) && <div className="flex items-center text-sm text-[#754b34]/70 mb-2">
                    <CalendarIcon size={14} className="mr-1" />
                    <span>
                      {dest.startDate} {dest.endDate && `- ${dest.endDate}`}
                    </span>
                  </div>}
                {dest.activities.length > 0 && <div className="mt-2">
                    <p className="text-xs text-[#754b34]/70 mb-1">
                      Activities:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {dest.activities.map((activity, idx) => <span key={idx} className="bg-[#e8dcc6] text-[#4a3e2a] text-xs px-2 py-1 rounded-full border border-[#bfa888]">
                          {activity}
                        </span>)}
                    </div>
                  </div>}
              </div>)}
          </div> : <div className="text-center py-10 bg-[#fefcf0] rounded-lg border border-[#d4c4a8]">
            <div className="text-4xl mb-2">🗺️</div>
            <p className="text-[#754b34]/70">
              No destinations added yet. Click + to add one!
            </p>
          </div>}
      </div>
      {/* Add Destination Modal */}
      {showAddDestination && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#fefcf0] rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#754b34]">
                Add Destination
              </h2>
              <button onClick={() => setShowAddDestination(false)} className="text-[#754b34]/60 hover:text-[#754b34]">
                <XIcon size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {/* Destination Name */}
              <div>
                <label className="block text-[#754b34] mb-2 font-semibold text-sm">
                  Destination Name
                </label>
                <input type="text" value={currentDestination.name} onChange={e => setCurrentDestination({
              ...currentDestination,
              name: e.target.value
            })} placeholder="e.g., Tokyo, Paris" className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg p-3 text-[#754b34] focus:ring-2 focus:ring-[#754b34] focus:outline-none" />
              </div>
              {/* Country */}
              <div>
                <label className="block text-[#754b34] mb-2 font-semibold text-sm">
                  Country
                </label>
                <select value={currentDestination.country} onChange={e => setCurrentDestination({
              ...currentDestination,
              country: e.target.value
            })} className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg p-3 text-[#754b34] focus:ring-2 focus:ring-[#754b34] focus:outline-none appearance-none">
                  <option value="">Select a country</option>
                  {countries.map(country => <option key={country} value={country}>
                      {country}
                    </option>)}
                </select>
              </div>
              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#754b34] mb-2 font-semibold text-sm">
                    Start Date
                  </label>
                  <input type="date" value={currentDestination.startDate} onChange={e => setCurrentDestination({
                ...currentDestination,
                startDate: e.target.value
              })} className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg p-3 text-[#754b34] focus:ring-2 focus:ring-[#754b34] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[#754b34] mb-2 font-semibold text-sm">
                    End Date
                  </label>
                  <input type="date" value={currentDestination.endDate} onChange={e => setCurrentDestination({
                ...currentDestination,
                endDate: e.target.value
              })} className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg p-3 text-[#754b34] focus:ring-2 focus:ring-[#754b34] focus:outline-none" />
                </div>
              </div>
              {/* Activities */}
              <div>
                <label className="block text-[#754b34] mb-2 font-semibold text-sm">
                  Activities
                </label>
                <div className="flex gap-2 mb-2">
                  <input type="text" value={activityInput} onChange={e => setActivityInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleAddActivity()} placeholder="Add an activity" className="flex-1 bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg p-3 text-[#754b34] focus:ring-2 focus:ring-[#754b34] focus:outline-none" />
                  <button onClick={handleAddActivity} className="bg-[#754b34] text-[#fefcf0] px-4 rounded-lg hover:bg-[#5f3b29] transition-colors">
                    Add
                  </button>
                </div>
                {currentDestination.activities.length > 0 && <div className="flex flex-wrap gap-2">
                    {currentDestination.activities.map((activity, idx) => <div key={idx} className="bg-[#e8dcc6] text-[#4a3e2a] text-sm px-3 py-1 rounded-full border border-[#bfa888] flex items-center">
                        <span>{activity}</span>
                        <button onClick={() => handleRemoveActivity(idx)} className="ml-2 text-[#754b34]/60 hover:text-[#754b34]">
                          <XIcon size={14} />
                        </button>
                      </div>)}
                  </div>}
              </div>
              {/* Save Button */}
              <button onClick={handleSaveDestination} className="w-full bg-[#754b34] text-[#fefcf0] py-3 rounded-lg font-bold shadow-md hover:bg-[#5f3b29] transition-colors">
                Add Destination
              </button>
            </div>
          </div>
        </div>}
      {/* Save Trip Button */}
      <div className="mt-auto pt-6">
        <button onClick={handleSaveTrip} className="w-full bg-[#754b34] text-[#fefcf0] py-4 rounded-lg font-bold shadow-md hover:bg-[#5f3b29] transition-colors flex items-center justify-center">
          <SaveIcon size={20} className="mr-2" />
          Save Trip
        </button>
      </div>
    </div>;
};