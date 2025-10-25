import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ImageIcon, MapPinIcon, CalendarIcon, TagIcon, StarIcon, SendIcon, PlusIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
export const PostExperienceScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    country: '',
    location: '',
    date: '',
    description: '',
    rating: 5,
    imageUrl: '',
    tags: [] as string[]
  });
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const countries = ['Japan', 'Italy', 'Morocco', 'India', 'Brazil', 'Korea', 'France', 'Peru', 'Thailand', 'Turkey', 'China', 'United States', 'Spain', 'Australia', 'Germany', 'United Kingdom', 'Canada', 'Mexico', 'Egypt', 'South Africa'].sort();
  const suggestedTags = ['Food', 'Culture', 'Nature', 'Adventure', 'Historical', 'Architecture', 'Beach', 'Mountains', 'Festival', 'Local Customs'];
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrl = e.target.value;
    setFormData({
      ...formData,
      imageUrl
    });
    setPreviewImage(imageUrl || null);
  };
  const handleRatingChange = (rating: number) => {
    setFormData({
      ...formData,
      rating
    });
  };
  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 5) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag]
      });
      setTagInput('');
    }
  };
  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Experience submitted:', formData);
      alert('Your experience has been shared successfully!');
      setIsSubmitting(false);
      navigate('/home');
    }, 1500);
  };
  return <div className="min-h-screen bg-[#fefcf0] px-4 py-6">
      {/* Header */}
      <header className="bg-[#b7965f] text-[#fefcf0] p-4 rounded-lg mb-6 shadow-md w-full max-w-2xl">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="p-2.5 rounded-full border border-[#fefcf0] text-[#fefcf0] hover:bg-[#754b34] transition-colors flex items-center justify-center" style={{
          width: '40px',
          height: '40px'
        }} // increased for better tap area
        >
            <ArrowLeftIcon size={20} /> {/* Slightly larger icon */}
          </button>

          <div>
            <h1 className="text-2xl font-bold font-serif leading-tight">
              Share Your Journey
            </h1>
            <p className="text-sm italic font-serif text-[#fcf8dd]/90">
              Document your cultural discoveries
            </p>
          </div>
        </div>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-[#754b34] mb-2 font-semibold font-serif">
            Experience Title
          </label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Name your experience..." className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg p-3 font-serif text-[#2f1b14] shadow-inner focus:ring-2 focus:ring-[#754b34] focus:outline-none" required />
        </div>

        {/* Country & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Country */}
          <div className="relative">
            <label className="block text-[#754b34] mb-2 font-semibold font-serif">
              Country
            </label>
            <select name="country" value={formData.country} onChange={handleInputChange} required className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg p-3 pl-10 font-serif text-[#2f1b14] shadow-inner focus:ring-2 focus:ring-[#754b34] focus:outline-none appearance-none" style={{
            backgroundImage: "url(\"data:image/svg+xml;utf8,<svg fill='%23754b34' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20'><path d='M7 10l5 5 5-5z'/></svg>\")",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 10px center'
          }}>
              <option value="">Select a country</option>
              {countries.map(country => <option key={country} value={country}>
                  {country}
                </option>)}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-[#754b34] mb-2 font-semibold font-serif">
              Specific Location
            </label>
            <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="City, landmark, etc." className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg p-3 font-serif text-[#2f1b14] shadow-inner focus:ring-2 focus:ring-[#754b34] focus:outline-none" />
          </div>
        </div>

        {/* Date Picker */}
        <div className="relative">
          <label className="block text-[#754b34] mb-2 font-semibold font-serif">
            When did you visit?
          </label>
          <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg p-3 pl-10 font-serif text-[#2f1b14] shadow-inner focus:ring-2 focus:ring-[#754b34] focus:outline-none cursor-pointer" />
        </div>

        {/* Description */}
        <div>
          <label className="block text-[#754b34] mb-2 font-semibold font-serif">
            Share Your Experience
          </label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Tell us about your cultural discoveries..." className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg p-3 font-serif text-[#2f1b14] shadow-inner focus:ring-2 focus:ring-[#754b34] focus:outline-none h-32 resize-none" required />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-[#754b34] mb-2 font-semibold font-serif">
            Rate Your Experience
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map(star => <button key={star} type="button" onClick={() => handleRatingChange(star)} className="focus:outline-none mr-1">
                <StarIcon size={24} className={star <= formData.rating ? 'text-[#a0522d] fill-[#a0522d]' : 'text-[#d4c4a8]'} />
              </button>)}
            <span className="ml-2 text-[#754b34] font-serif">
              {formData.rating}/5
            </span>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-[#754b34] mb-2 font-semibold font-serif">
            Add an Image
          </label>
          <div className="relative flex flex-col gap-3">
            {/* File Upload */}
            <div className="flex items-center gap-2">
              <input type="file" accept="image/*" onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                const imagePreview = URL.createObjectURL(file);
                setPreviewImage(imagePreview);
                setFormData({
                  ...formData,
                  imageUrl: imagePreview
                });
              }
            }} className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="cursor-pointer flex items-center justify-center bg-[#b99664] text-[#fefcf0] px-4 py-2 rounded-lg font-serif shadow-md hover:bg-[#5d3a28] transition-all">
                <ImageIcon size={18} className="mr-2" />
                Upload Photo
              </label>
            </div>

            {/* Preview & Remove */}
            {previewImage && <div className="mt-3 relative">
                <img src={previewImage} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-[#d4c4a8] shadow-md" />
                <button type="button" onClick={() => {
              setPreviewImage(null);
              setFormData({
                ...formData,
                imageUrl: ''
              });
            }} className="absolute top-2 right-2 bg-[#754b34]/90 text-[#fefcf0] rounded-full p-1.5 hover:bg-[#5d3a28] transition-all shadow-md" title="Remove Image">
                  ✕
                </button>
              </div>}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-[#754b34] mb-2 font-semibold font-serif">
            Add Tags (up to 5)
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map(tag => <div key={tag} className="bg-[#fefcf0] text-[#4a3e2a] px-2 py-1 rounded-full border border-[#754b34]/30 font-serif flex items-center text-sm">
                <span>{tag}</span>
                <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-[#754b34] hover:text-[#2f1b14]">
                  ✕
                </button>
              </div>)}
          </div>

          <div className="relative">
            <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} placeholder="Type a tag..." className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg p-3 pl-10 pr-12 font-serif text-[#2f1b14] shadow-inner focus:ring-2 focus:ring-[#754b34] focus:outline-none" disabled={formData.tags.length >= 5} />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <TagIcon size={18} className="text-[#754b34]" />
            </div>
            <button type="button" onClick={() => addTag(tagInput)} disabled={!tagInput || formData.tags.length >= 5} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#754b34] text-[#fefcf0] p-1 rounded-full hover:bg-[#5d3a28] disabled:opacity-50">
              <PlusIcon size={16} />
            </button>
          </div>

          <div className="mt-2">
            <p className="text-sm text-[#754b34] font-serif mb-1">
              Suggested tags:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedTags.map(tag => <button key={tag} type="button" onClick={() => addTag(tag)} disabled={formData.tags.includes(tag) || formData.tags.length >= 5} className="bg-[#fcf8dd] text-[#754b34] px-2 py-1 rounded-full border border-[#d4c4a8] text-xs hover:bg-[#fefcf0] disabled:opacity-50">
                  {tag}
                </button>)}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <Button type="submit" className="w-full bg-[#b99664] text-[#fefcf0] py-3 rounded-lg font-semibold font-serif hover:bg-[#5d3a28] transition-all" disabled={isSubmitting}>
            {isSubmitting ? 'Sharing...' : 'Share Experience'}
          </Button>
        </div>
      </form>
    </div>;
};