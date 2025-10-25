import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, MessageCircleIcon, PlusCircleIcon, HeartIcon, FilterIcon, ArrowLeftIcon } from 'lucide-react';
import { ExperienceDetailsModal } from '../../components/ui/ExperienceDetailsModal';
interface Comment {
  id: string;
  name: string;
  country: string;
  comment: string;
  date: string;
}
interface Experience {
  id: string;
  title: string;
  author: string;
  authorCountry: string;
  date: string;
  country: string;
  location: string;
  description: string;
  rating: number;
  image?: string;
  likes: number;
  comments: number;
  tags: string[];
  isLiked?: boolean;
  fullComments?: Comment[];
}
export const CommunityExperiencesScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [commentInputs, setCommentInputs] = useState<{
    [key: string]: string;
  }>({});
  useEffect(() => {
    const sampleExperiences: Experience[] = [{
      id: '1',
      title: 'Tea Ceremony in Kyoto',
      author: 'Emma Wilson',
      authorCountry: 'United States',
      date: 'May 2023',
      country: 'Japan',
      location: 'Kyoto',
      description: "I participated in a traditional tea ceremony in Kyoto. The host explained every movement and its significance. The matcha was bitter but the wagashi (sweet) balanced it perfectly. The attention to detail and mindfulness was unlike anything I've experienced before.",
      rating: 5,
      image: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=1000&q=80',
      likes: 42,
      comments: 1,
      tags: ['Culture', 'Food', 'Tradition'],
      isLiked: false,
      fullComments: [{
        id: 'c1',
        name: 'Sarah Johnson',
        country: 'Canada',
        comment: 'This sounds amazing! Did you need to book in advance?',
        date: 'May 2023'
      }]
    }];
    setExperiences(sampleExperiences);
  }, []);
  const toggleLike = (id: string) => {
    setExperiences(prev => prev.map(exp => exp.id === id ? {
      ...exp,
      isLiked: !exp.isLiked,
      likes: exp.isLiked ? exp.likes - 1 : exp.likes + 1
    } : exp));
  };
  const handleAddComment = (id: string) => {
    const newComment = commentInputs[id]?.trim();
    if (!newComment) return;
    setExperiences(prev => prev.map(exp => exp.id === id ? {
      ...exp,
      fullComments: [...(exp.fullComments || []), {
        id: Date.now().toString(),
        name: 'You',
        country: 'Philippines',
        comment: newComment,
        date: 'Now'
      }],
      comments: exp.comments + 1
    } : exp));
    setCommentInputs(prev => ({
      ...prev,
      [id]: ''
    }));
  };
  const filteredExperiences = experiences.filter(exp => {
    const matchesSearch = searchQuery === '' || exp.title.toLowerCase().includes(searchQuery.toLowerCase()) || exp.country.toLowerCase().includes(searchQuery.toLowerCase()) || exp.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === null || exp.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });
  const allTags = Array.from(new Set(experiences.flatMap(exp => exp.tags))).sort();
  return <div className="min-h-screen bg-[#fef7e0] flex flex-col font-serif relative">
      {/* Header */}
      <header className="bg-[#b7965f] text-white p-4 shadow-md rounded-b-lg">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full border border-[#fefcf0] text-[#fefcf0] hover:bg-[#754b34] transition-colors">
            <ArrowLeftIcon size={18} />
          </button>
          <h1 className="text-xl md:text-2xl font-bold font-serif text-center flex-1">
            Community Experiences
          </h1>
          <div className="w-8" />
        </div>
        <p className="text-sm italic text-[#fcf8dd]/90 mb-3">
          Connect, share, and celebrate your adventures with others
        </p>

        {/* Search & Filter */}
        <div className="relative">
          <input type="search" className="w-full bg-[#fefcf0] border border-[#d4c4a8] rounded-full pl-10 pr-12 py-2 text-[#2f1b14] shadow-inner focus:ring-2 focus:ring-[#8b5a3c] focus:outline-none" placeholder="Search experiences..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon size={18} className="text-[#8b7355]" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="absolute top-1/2 right-2 transform -translate-y-1/2 flex items-center justify-center bg-[#744a32] text-[#fefcf0] w-8 h-8 rounded-md shadow-md hover:bg-[#5d3a28] transition-all">
            <FilterIcon size={14} />
          </button>
        </div>

        {showFilters && <div className="mt-3 flex overflow-x-auto space-x-2 pb-2 no-scrollbar">
            <button onClick={() => setSelectedTag(null)} className={`flex-shrink-0 px-3 py-1 rounded-full text-sm ${selectedTag === null ? 'bg-[#744a32] text-white' : 'bg-[#fefcf0] text-[#6d5a42] border border-[#d4c4a8]'}`}>
              All
            </button>
            {allTags.map(tag => <button key={tag} onClick={() => setSelectedTag(tag === selectedTag ? null : tag)} className={`flex-shrink-0 px-3 py-1 rounded-full text-sm ${tag === selectedTag ? 'bg-[#744a32] text-white' : 'bg-[#fefcf0] text-[#6d5a42] border border-[#d4c4a8]'}`}>
                {tag}
              </button>)}
          </div>}
      </header>

      {/* Experiences */}
      <main className="flex-grow p-4 space-y-6 pb-24">
        {filteredExperiences.map(exp => {
        const isExpanded = selectedExperience?.id === exp.id;
        return <div key={exp.id} className="bg-[#fefcf0] border border-[#d4c4a8] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
              {exp.image && <img src={exp.image} alt={exp.title} className="w-full h-48 object-cover" />}
              <div className="p-4">
                <h2 className="text-lg font-bold text-[#2f1b14]">
                  {exp.title}
                </h2>
                <p className="text-sm text-[#6d5a42] mb-2">
                  By {exp.author} • {exp.authorCountry}
                </p>
                <p className={`text-[#6d5a42] ${isExpanded ? '' : 'line-clamp-3'}`}>
                  {exp.description}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex space-x-4">
                    <button onClick={() => toggleLike(exp.id)} className="flex items-center text-[#6d5a42] hover:text-[#744a32]">
                      <HeartIcon size={18} className={exp.isLiked ? 'text-[#744a32] fill-[#744a32]' : ''} />
                      <span className="ml-1 text-sm">{exp.likes}</span>
                    </button>
                    <div className="flex items-center text-[#6d5a42]">
                      <MessageCircleIcon size={18} />
                      <span className="ml-1 text-sm">{exp.comments}</span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedExperience(isExpanded ? null : exp)} className="text-[#744a32] text-sm font-semibold hover:underline">
                    {isExpanded ? 'Show Less' : 'Read More'}
                  </button>
                </div>

                {isExpanded && <div className="mt-4 border-t border-[#d4c4a8] pt-3">
                    <input type="text" placeholder="Write a comment..." value={commentInputs[exp.id] || ''} onChange={e => setCommentInputs({
                ...commentInputs,
                [exp.id]: e.target.value
              })} className="w-full bg-[#fffaf0] border border-[#d4c4a8] rounded-full px-4 py-2 text-sm text-[#2f1b14] focus:ring-2 focus:ring-[#8b5a3c] focus:outline-none" />
                    <button onClick={() => handleAddComment(exp.id)} className="mt-2 bg-[#744a32] text-[#fefcf0] px-4 py-1 rounded-full text-sm font-medium hover:bg-[#5d3a28] transition-all">
                      Post
                    </button>

                    {exp.fullComments?.length > 0 && <div className="mt-3 space-y-2">
                        {exp.fullComments.map(c => <div key={c.id} className="bg-[#fdfaf3] border border-[#e2d5b9] rounded-lg p-2 text-sm text-[#4a3e2a]">
                            <span className="font-semibold">{c.name}</span> •{' '}
                            <span className="text-[#8b7355]">{c.country}</span>
                            <p>{c.comment}</p>
                          </div>)}
                      </div>}
                  </div>}
              </div>
            </div>;
      })}
      </main>

      {/* Floating + Button */}
      <button onClick={() => navigate('/post-experience')} className="fixed bottom-6 right-6 bg-[#744a32] text-[#fefcf0] rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-[#5d3a28] transition-transform hover:scale-105 z-50" style={{
      bottom: '90px'
    }}>
        <PlusCircleIcon size={26} />
      </button>

      <ExperienceDetailsModal experience={selectedExperience} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onToggleLike={toggleLike} />
    </div>;
};