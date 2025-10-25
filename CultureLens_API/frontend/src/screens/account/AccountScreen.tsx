import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOutIcon, SettingsIcon, BellIcon, GlobeIcon, ShieldIcon, MapPinIcon, CalendarIcon, CameraIcon, UserIcon, EditIcon, SaveIcon, XIcon } from 'lucide-react';
interface AccountScreenProps {
  onLogout: () => void;
}
export const AccountScreen = ({
  onLogout
}: AccountScreenProps) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    preferences: {
      journeyUpdates: true,
      privateMode: false,
      language: 'English'
    }
  });
  const [formData, setFormData] = useState({
    ...userData
  });
  const handleEditToggle = () => {
    if (isEditing) setFormData({
      ...userData
    });
    setIsEditing(!isEditing);
  };
  const handleSaveChanges = () => {
    setUserData({
      ...formData
    });
    setIsEditing(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleToggleChange = (pref: string) => {
    if (!isEditing) return;
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        [pref]: !formData.preferences[pref as keyof typeof formData.preferences]
      }
    });
  };
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        language: e.target.value
      }
    });
  };
  return <div className="min-h-screen p-6 flex flex-col font-serif" style={{
    backgroundColor: '#fcf8dd',
    backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(117, 75, 52, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(254, 252, 240, 0.3) 0%, transparent 50%)
        `
  }}>
      {/* Header (now includes profile) */}
      <header className="bg-[#754b34] text-[#fefcf0] p-6 rounded-2xl shadow-md mb-6 flex flex-col items-center relative">
        {/* Header top */}
        <div className="w-full flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Travel Profile</h1>
          <button onClick={handleEditToggle} className={`p-2 rounded-full border border-[#fefcf0] transition-all duration-300 ${isEditing ? 'bg-[#fefcf0] text-[#754b34] hover:bg-[#f4f0e6]' : 'text-[#fefcf0] hover:bg-[#754b34]'}`}>
            {isEditing ? <SaveIcon size={18} /> : <EditIcon size={18} />}
          </button>
        </div>

        {/* Profile Section (inside header) */}
        <div className="flex flex-col items-center mt-2">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-[#fefcf0] border-2 border-[#b7965f] flex items-center justify-center shadow-md">
              <UserIcon size={40} className="text-[#754b34]" />
            </div>
            {isEditing && <button className="absolute bottom-0 right-0 bg-[#754b34] text-[#fefcf0] p-2 rounded-full shadow-md hover:bg-[#5f3b29] transition-colors">
                <CameraIcon size={16} />
              </button>}
          </div>

          {isEditing ? <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="text-xl font-bold text-[#754b34] mb-1 bg-transparent border-b-2 border-[#754b34] text-center focus:outline-none" /> : <h2 className="text-xl font-bold text-[#fefcf0] mb-1 bg-[#754b34] px-3 py-1 rounded-md">
              {userData.name}
            </h2>}
          <p className="text-[#fefcf0]/90 italic">{userData.email}</p>
        </div>
      </header>

      {/* Stat Buttons */}
      <section className="mb-8">
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {[{
          icon: MapPinIcon,
          label: 'Saved Trips',
          route: '/saved-trips'
        }, {
          icon: CalendarIcon,
          label: 'Itinerary',
          route: '/itinerary'
        }].map((item, i) => <button key={i} onClick={() => navigate(item.route)} className="bg-[#fefcf0] border-2 border-[#754b34] rounded-lg py-5 px-4 shadow-md flex flex-col items-center hover:bg-[#fcf8dd] hover:shadow-lg transition-all font-serif">
              <item.icon size={26} className="text-[#754b34] mb-2" />
              <span className="text-base font-semibold text-[#754b34]">
                {item.label}
              </span>
            </button>)}
        </div>
      </section>

      {/* Preferences Section */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-bold text-[#754b34]">
            Travel Preferences
          </h2>
          <SettingsIcon size={18} className="ml-2 text-[#754b34]" />
        </div>

        <div className="bg-[#fefcf0] rounded-lg p-4 shadow-md border border-[#754b34]/20">
          <div className="space-y-4">
            {[{
            key: 'journeyUpdates',
            label: 'Journey Updates',
            icon: BellIcon
          }, {
            key: 'privateMode',
            label: 'Private Mode',
            icon: ShieldIcon
          }].map(pref => <div key={pref.key} className="flex items-center justify-between py-2 border-b border-[#754b34]/10 hover:bg-[#fcf8dd] transition-colors rounded-md px-2">
                <div className="flex items-center">
                  <pref.icon size={18} className="mr-3 text-[#754b34]" />
                  <span className="text-[#754b34]">{pref.label}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={formData.preferences[pref.key as keyof typeof formData.preferences]} onChange={() => handleToggleChange(pref.key)} className="sr-only peer" disabled={!isEditing} />
                  <div className={`w-11 h-6 rounded-full transition-all relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:shadow-sm after:transition-all ${formData.preferences[pref.key as keyof typeof formData.preferences] ? 'bg-[#754b34] after:translate-x-5' : 'bg-[#fcf8dd]'} ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}></div>
                </label>
              </div>)}

            {/* Language Selector */}
            <div className="flex items-center justify-between py-2 px-2 hover:bg-[#fcf8dd] transition-colors rounded-md">
              <div className="flex items-center">
                <GlobeIcon size={18} className="mr-3 text-[#754b34]" />
                <span className="text-[#754b34]">Language</span>
              </div>
              <div className="relative">
                <select value={formData.preferences.language} onChange={handleLanguageChange} disabled={!isEditing} className={`appearance-none bg-[#fefcf0] border-2 border-[#754b34] text-[#754b34] py-1 px-3 pr-8 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-[#754b34]
                    transition-all duration-200 ${isEditing ? 'hover:border-[#5f3b29] cursor-pointer' : 'opacity-75 cursor-not-allowed'}`}>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#754b34]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Buttons */}
      <div className="mt-auto">
        {isEditing && <div className="grid grid-cols-2 gap-4 mb-4">
            <button onClick={handleSaveChanges} className="py-3 px-4 bg-[#754b34] text-[#fefcf0] rounded-md font-bold shadow-md hover:bg-[#5f3b29] transition-colors flex items-center justify-center">
              <SaveIcon size={18} className="mr-2" />
              Save
            </button>
            <button onClick={handleEditToggle} className="py-3 px-4 border border-[#754b34] text-[#754b34] rounded-md font-bold hover:bg-[#fcf8dd] transition-colors flex items-center justify-center">
              <XIcon size={18} className="mr-2" />
              Cancel
            </button>
          </div>}

        <button onClick={onLogout} className="w-full py-3 px-4 border border-[#754b34] text-[#754b34] rounded-md font-bold hover:bg-[#754b34] hover:text-[#fefcf0] transition-colors flex items-center justify-center">
          <LogOutIcon size={18} className="mr-2" />
          End Journey
        </button>
      </div>
    </div>;
};