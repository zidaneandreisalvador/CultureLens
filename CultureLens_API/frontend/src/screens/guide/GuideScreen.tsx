import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, ChevronDownIcon, ChevronUpIcon, GlobeIcon, CompassIcon } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
export const GuideScreen = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState('Japan');
  const [expandedSection, setExpandedSection] = useState<string | null>('traditions');
  const [searchQuery, setSearchQuery] = useState('');
  const countries = [{
    id: 'japan',
    name: 'Japan',
    flag: '🇯🇵'
  }, {
    id: 'italy',
    name: 'Italy',
    flag: '🇮🇹'
  }, {
    id: 'morocco',
    name: 'Morocco',
    flag: '🇲🇦'
  }, {
    id: 'india',
    name: 'India',
    flag: '🇮🇳'
  }, {
    id: 'brazil',
    name: 'Brazil',
    flag: '🇧🇷'
  }, {
    id: 'korea',
    name: 'Korea',
    flag: '🇰🇷'
  }, {
    id: 'france',
    name: 'France',
    flag: '🇫🇷'
  }, {
    id: 'peru',
    name: 'Peru',
    flag: '🇵🇪'
  }, {
    id: 'thailand',
    name: 'Thailand',
    flag: '🇹🇭'
  }, {
    id: 'turkey',
    name: 'Turkey',
    flag: '🇹🇷'
  }, {
    id: 'china',
    name: 'China',
    flag: '🇨🇳'
  }];
  const sections = [{
    id: 'traditions',
    title: 'Traditions & Customs',
    icon: '🏮'
  }, {
    id: 'etiquette',
    title: 'Etiquette',
    icon: '🙏'
  }, {
    id: 'greetings',
    title: 'Greetings & Phrases',
    icon: '👋'
  }, {
    id: 'food',
    title: 'Food & Dining',
    icon: '🍱'
  }, {
    id: 'festivals',
    title: 'Festivals & Events',
    icon: '🎎'
  }, {
    id: 'community',
    title: 'Community Insights',
    icon: '👥'
  }];
  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };
  // Content for each country
  const countryContent: {
    [key: string]: {
      [key: string]: React.ReactNode;
    };
  } = {
    Japan: {
      traditions: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Japan has a rich cultural heritage with traditions dating back
            thousands of years. Respect for elders, harmony with nature, and
            attention to detail are core values.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge>Harmony (和 - Wa)</Badge>
            <Badge>Respect (敬意 - Keii)</Badge>
            <Badge>Precision (精度 - Seido)</Badge>
          </div>
          <p className="border-l-4 border-[#744a32] pl-3 italic mt-3">
            "In Japan, there is respect for the old and appreciation for the
            traditional." - Local Proverb
          </p>
        </div>,
      etiquette: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Japanese etiquette is based on consideration for others. Politeness
            and formality are highly valued in social interactions.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Remove shoes before entering homes and certain establishments
            </li>
            <li>Bow when greeting (depth indicates level of respect)</li>
            <li>Exchange business cards with both hands</li>
            <li>Don't tip at restaurants - it can be considered rude</li>
            <li>Be punctual - tardiness is considered disrespectful</li>
          </ul>
        </div>,
      greetings: <div className="space-y-3 text-[#6d5a42] font-serif">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Hello</div>
              <div>こんにちは (Konnichiwa)</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Thank you</div>
              <div>ありがとう (Arigatou)</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Excuse me</div>
              <div>すみません (Sumimasen)</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Please</div>
              <div>お願いします (Onegaishimasu)</div>
            </div>
          </div>
        </div>,
      food: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Japanese cuisine is based on seasonal, fresh ingredients with an
            emphasis on presentation and quality.
          </p>
          <div className="flex overflow-x-auto space-x-3 pb-2">
            {[{
            name: 'Sushi',
            emoji: '🍣'
          }, {
            name: 'Ramen',
            emoji: '🍜'
          }, {
            name: 'Tempura',
            emoji: '🍤'
          }, {
            name: 'Matcha',
            emoji: '🍵'
          }].map((food, index) => <div key={index} className="flex-shrink-0 bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-3 text-center min-w-[80px]">
                <div className="text-2xl mb-1">{food.emoji}</div>
                <div className="font-semibold">{food.name}</div>
              </div>)}
          </div>
          <p>
            <strong>Dining Etiquette:</strong> Say "itadakimasu" before eating
            and "gochisousama" after finishing. Don't stick chopsticks upright
            in rice.
          </p>
        </div>,
      festivals: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Japan celebrates numerous festivals (matsuri) throughout the year,
            many with ancient origins.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Cherry Blossom Festival (Hanami)</strong> - Spring
            </li>
            <li>
              <strong>Gion Matsuri</strong> - July in Kyoto
            </li>
            <li>
              <strong>Obon Festival</strong> - August
            </li>
            <li>
              <strong>Sapporo Snow Festival</strong> - February
            </li>
          </ul>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] mt-2">
            <p className="text-sm italic">
              "Festivals are windows into Japan's soul, where ancient traditions
              come alive through dance, music, and community celebration."
            </p>
          </div>
        </div>,
      community: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>From CultureLens travelers who've experienced Japan:</p>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] shadow-sm">
            <p className="italic">
              "The concept of 'omotenashi' (selfless hospitality) is real - I
              was amazed at how locals went out of their way to help me when I
              was lost in Tokyo."
            </p>
            <p className="text-right text-sm mt-1">- Sarah, United States</p>
          </div>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] shadow-sm">
            <p className="italic">
              "Don't miss experiencing an onsen (hot spring bath), but be aware
              they're usually gender-separated and no swimsuits are allowed."
            </p>
            <p className="text-right text-sm mt-1">- Marco, Italy</p>
          </div>
        </div>
    },
    Italy: {
      traditions: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Italian culture is deeply rooted in family values, art,
            architecture, music, and of course, cuisine. The concept of "la
            dolce vita" (the sweet life) emphasizes enjoying life's pleasures.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge>Family (Famiglia)</Badge>
            <Badge>Artistry (Artisticità)</Badge>
            <Badge>Passion (Passione)</Badge>
          </div>
          <p className="border-l-4 border-[#744a32] pl-3 italic mt-3">
            "Life is too short to drink bad wine." - Italian Proverb
          </p>
        </div>,
      etiquette: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Italians are known for their warmth and expressiveness. Social
            interactions are animated and passionate.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Greet with a kiss on both cheeks between friends (start with the
              left)
            </li>
            <li>Dress well - appearance is important in Italian culture</li>
            <li>
              Never order cappuccino after 11 AM (Italians consider it a
              morning-only drink)
            </li>
            <li>
              Maintain eye contact during conversations as a sign of attention
            </li>
            <li>
              Tipping is appreciated but not expected (service is usually
              included)
            </li>
          </ul>
        </div>,
      greetings: <div className="space-y-3 text-[#6d5a42] font-serif">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Hello</div>
              <div>Ciao</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Thank you</div>
              <div>Grazie</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Excuse me</div>
              <div>Scusi</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Please</div>
              <div>Per favore</div>
            </div>
          </div>
        </div>,
      food: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Italian cuisine is celebrated worldwide and varies significantly by
            region. Fresh, high-quality ingredients and simple preparation are
            the hallmarks of authentic Italian cooking.
          </p>
          <div className="flex overflow-x-auto space-x-3 pb-2">
            {[{
            name: 'Pasta',
            emoji: '🍝'
          }, {
            name: 'Pizza',
            emoji: '🍕'
          }, {
            name: 'Gelato',
            emoji: '🍦'
          }, {
            name: 'Espresso',
            emoji: '☕'
          }].map((food, index) => <div key={index} className="flex-shrink-0 bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-3 text-center min-w-[80px]">
                <div className="text-2xl mb-1">{food.emoji}</div>
                <div className="font-semibold">{food.name}</div>
              </div>)}
          </div>
          <p>
            <strong>Dining Etiquette:</strong> The full Italian meal consists of
            antipasto (appetizer), primo (first course, usually pasta), secondo
            (main course, typically meat or fish), and dolce (dessert).
          </p>
        </div>,
      festivals: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Italy hosts numerous festivals and celebrations, many with religious
            or historical significance.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Carnevale</strong> - February, famous in Venice
            </li>
            <li>
              <strong>Palio di Siena</strong> - July & August, historic horse
              race
            </li>
            <li>
              <strong>Festa della Repubblica</strong> - June 2, National Day
            </li>
            <li>
              <strong>Ferragosto</strong> - August 15, summer holiday
            </li>
          </ul>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] mt-2">
            <p className="text-sm italic">
              "Italian festivals are a vibrant tapestry of history, religion,
              and culture, where ancient traditions are celebrated with music,
              processions, and feasts."
            </p>
          </div>
        </div>,
      community: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>From CultureLens travelers who've experienced Italy:</p>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] shadow-sm">
            <p className="italic">
              "The 'aperitivo' culture in Milan changed how I think about
              pre-dinner drinks. It's not just about the drinks but the social
              experience and delicious small bites that come with it."
            </p>
            <p className="text-right text-sm mt-1">- Jennifer, Canada</p>
          </div>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] shadow-sm">
            <p className="italic">
              "Italians truly live by their schedule - many shops close for a
              few hours in the afternoon for 'riposo' (rest). Plan your day
              accordingly, especially in smaller towns!"
            </p>
            <p className="text-right text-sm mt-1">- Thomas, Germany</p>
          </div>
        </div>
    },
    Morocco: {
      traditions: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Moroccan culture blends Berber, Arab, and French influences,
            creating a rich tapestry of traditions. Hospitality (Diyafa) is
            central to Moroccan culture, and guests are treated with the utmost
            respect.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge>Hospitality (Diyafa)</Badge>
            <Badge>Community (Jama'a)</Badge>
            <Badge>Faith (Iman)</Badge>
          </div>
          <p className="border-l-4 border-[#744a32] pl-3 italic mt-3">
            "He who brings you a gift in the morning will come back for
            something in the evening." - Moroccan Proverb
          </p>
        </div>,
      etiquette: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Moroccan social customs reflect Islamic traditions while embracing
            the country's multicultural heritage.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Remove shoes before entering homes or religious buildings</li>
            <li>Dress modestly, especially when visiting religious sites</li>
            <li>
              Eat with your right hand only (the left is considered unclean)
            </li>
            <li>Accept tea when offered - refusing is considered impolite</li>
            <li>
              Ask permission before photographing people, especially in rural
              areas
            </li>
          </ul>
        </div>,
      greetings: <div className="space-y-3 text-[#6d5a42] font-serif">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Hello</div>
              <div>As-salamu alaykum</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Thank you</div>
              <div>Shukran</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Excuse me</div>
              <div>Smeh li</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Please</div>
              <div>Min fadlak</div>
            </div>
          </div>
        </div>,
      food: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Moroccan cuisine is a sensory delight, known for its aromatic
            spices, diverse flavors, and communal dining experience. Meals are
            often shared from a central dish.
          </p>
          <div className="flex overflow-x-auto space-x-3 pb-2">
            {[{
            name: 'Tagine',
            emoji: '🍲'
          }, {
            name: 'Couscous',
            emoji: '🥘'
          }, {
            name: 'Mint Tea',
            emoji: '🍵'
          }, {
            name: 'Pastilla',
            emoji: '🥟'
          }].map((food, index) => <div key={index} className="flex-shrink-0 bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-3 text-center min-w-[80px]">
                <div className="text-2xl mb-1">{food.emoji}</div>
                <div className="font-semibold">{food.name}</div>
              </div>)}
          </div>
          <p>
            <strong>Dining Etiquette:</strong> Wash hands before eating, as many
            traditional dishes are eaten with the right hand. Wait for the host
            to begin eating before you start.
          </p>
        </div>,
      festivals: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Moroccan festivals blend religious observances with cultural
            celebrations, often featuring music, dance, and feasting.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Eid al-Fitr</strong> - Marks the end of Ramadan
            </li>
            <li>
              <strong>Gnaoua World Music Festival</strong> - June in Essaouira
            </li>
            <li>
              <strong>Festival of Roses</strong> - May in Kelaat M'Gouna
            </li>
            <li>
              <strong>Moussem of Tan-Tan</strong> - UNESCO-recognized nomadic
              gathering
            </li>
          </ul>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] mt-2">
            <p className="text-sm italic">
              "Moroccan festivals are sensory feasts where the rhythms of
              traditional music, the aromas of spices, and the colors of local
              crafts create unforgettable cultural experiences."
            </p>
          </div>
        </div>,
      community: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>From CultureLens travelers who've experienced Morocco:</p>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] shadow-sm">
            <p className="italic">
              "The ritual of Moroccan mint tea service is an experience in
              itself. The tea is poured from a height to create a frothy top,
              and it's usually served three times - each with a different flavor
              profile."
            </p>
            <p className="text-right text-sm mt-1">- Michael, United Kingdom</p>
          </div>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] shadow-sm">
            <p className="italic">
              "Navigating the medinas (old cities) can be overwhelming but
              rewarding. I recommend hiring a local guide for your first day to
              help you get oriented and understand the cultural context."
            </p>
            <p className="text-right text-sm mt-1">- Sophia, Australia</p>
          </div>
        </div>
    },
    India: {
      traditions: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            India's cultural traditions span thousands of years and vary widely
            across regions. The concept of 'unity in diversity' aptly describes
            the country's rich cultural tapestry of religions, languages, and
            customs.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge>Respect (Aadar)</Badge>
            <Badge>Spirituality (Adhyatmikta)</Badge>
            <Badge>Family (Parivar)</Badge>
          </div>
          <p className="border-l-4 border-[#744a32] pl-3 italic mt-3">
            "The guest is equivalent to God." - Indian Saying (Atithi Devo
            Bhava)
          </p>
        </div>,
      etiquette: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Indian etiquette combines traditional values with regional
            variations, with respect for elders being universally important.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Greet with "Namaste" with palms pressed together</li>
            <li>Remove shoes before entering homes and temples</li>
            <li>Dress modestly, especially at religious sites</li>
            <li>Ask before taking photographs at sacred places</li>
            <li>Use your right hand for giving, receiving, and eating</li>
          </ul>
        </div>,
      greetings: <div className="space-y-3 text-[#6d5a42] font-serif">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Hello</div>
              <div>Namaste</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Thank you</div>
              <div>Dhanyavaad</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Excuse me</div>
              <div>Maaf kijiye</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Please</div>
              <div>Kripaya</div>
            </div>
          </div>
        </div>,
      food: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Indian cuisine is as diverse as its culture, with each region
            offering distinct flavors and specialties. Spices are central to
            Indian cooking, not just for flavor but also for their medicinal
            properties.
          </p>
          <div className="flex overflow-x-auto space-x-3 pb-2">
            {[{
            name: 'Curry',
            emoji: '🍛'
          }, {
            name: 'Naan',
            emoji: '🫓'
          }, {
            name: 'Masala Chai',
            emoji: '🍵'
          }, {
            name: 'Samosa',
            emoji: '🥟'
          }].map((food, index) => <div key={index} className="flex-shrink-0 bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-3 text-center min-w-[80px]">
                <div className="text-2xl mb-1">{food.emoji}</div>
                <div className="font-semibold">{food.name}</div>
              </div>)}
          </div>
          <p>
            <strong>Dining Etiquette:</strong> Traditionally, meals are eaten
            with the right hand. In many homes, it's customary to sit on the
            floor while eating. Saying "no" to food offerings can be considered
            impolite.
          </p>
        </div>,
      festivals: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            India celebrates countless festivals throughout the year, reflecting
            its diverse religious and cultural traditions.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Diwali</strong> - Festival of Lights (October/November)
            </li>
            <li>
              <strong>Holi</strong> - Festival of Colors (March)
            </li>
            <li>
              <strong>Durga Puja</strong> - Celebration of goddess Durga
              (September/October)
            </li>
            <li>
              <strong>Ganesh Chaturthi</strong> - Honoring Lord Ganesha
              (August/September)
            </li>
          </ul>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] mt-2">
            <p className="text-sm italic">
              "Indian festivals are vibrant expressions of faith, tradition, and
              community, where ancient rituals merge with joyous celebrations
              through color, music, dance, and feasting."
            </p>
          </div>
        </div>,
      community: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>From CultureLens travelers who've experienced India:</p>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] shadow-sm">
            <p className="italic">
              "The concept of 'jugaad' (creative problem-solving) is
              fascinating. Indians have an incredible ability to find innovative
              solutions with limited resources - it's inspired me to think more
              creatively."
            </p>
            <p className="text-right text-sm mt-1">- Emily, United States</p>
          </div>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] shadow-sm">
            <p className="italic">
              "India moves at its own pace - sometimes frenetic, sometimes
              leisurely. Embracing this rhythm rather than fighting it made my
              journey so much more enjoyable. Be flexible with your plans!"
            </p>
            <p className="text-right text-sm mt-1">- Carlos, Spain</p>
          </div>
        </div>
    },
    Brazil: {
      traditions: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Brazilian culture is a vibrant fusion of indigenous, African,
            European, and Asian influences. The concepts of 'jeitinho' (finding
            a way) and 'alegria' (joy) are central to the Brazilian way of life.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge>Joy (Alegria)</Badge>
            <Badge>Creativity (Criatividade)</Badge>
            <Badge>Warmth (Calor)</Badge>
          </div>
          <p className="border-l-4 border-[#744a32] pl-3 italic mt-3">
            "Brazilians don't live; they celebrate life." - Brazilian saying
          </p>
        </div>,
      etiquette: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Brazilian social customs emphasize warmth, physical proximity, and
            expressiveness in communication.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Greet with a kiss on each cheek (one or two, depending on the
              region)
            </li>
            <li>
              Expect conversations at closer proximity than in some Western
              countries
            </li>
            <li>
              Be punctual for business meetings but expect social gatherings to
              start later
            </li>
            <li>Dress well - appearance is important in Brazilian culture</li>
            <li>
              Use titles (Doctor, Professor) when addressing professionals
            </li>
          </ul>
        </div>,
      greetings: <div className="space-y-3 text-[#6d5a42] font-serif">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Hello</div>
              <div>Olá</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Thank you</div>
              <div>Obrigado/a</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Excuse me</div>
              <div>Com licença</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Please</div>
              <div>Por favor</div>
            </div>
          </div>
        </div>,
      food: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Brazilian cuisine varies greatly by region, influenced by
            indigenous, African, European, and Asian cooking traditions. Meals
            are often social events shared with family and friends.
          </p>
          <div className="flex overflow-x-auto space-x-3 pb-2">
            {[{
            name: 'Feijoada',
            emoji: '🍲'
          }, {
            name: 'Churrasco',
            emoji: '🥩'
          }, {
            name: 'Açaí',
            emoji: '🍨'
          }, {
            name: 'Caipirinha',
            emoji: '🍹'
          }].map((food, index) => <div key={index} className="flex-shrink-0 bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-3 text-center min-w-[80px]">
                <div className="text-2xl mb-1">{food.emoji}</div>
                <div className="font-semibold">{food.name}</div>
              </div>)}
          </div>
          <p>
            <strong>Dining Etiquette:</strong> Meals are typically relaxed
            affairs. Use utensils rather than hands for most foods. The national
            dish, feijoada, is traditionally served on Wednesdays and Saturdays.
          </p>
        </div>,
      festivals: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Brazil is famous for its lively festivals that showcase the
            country's passion for music, dance, and celebration.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Carnaval</strong> - February/March, nationwide (famous in
              Rio)
            </li>
            <li>
              <strong>Festa Junina</strong> - June, celebrating rural life
            </li>
            <li>
              <strong>Reveillon</strong> - New Year's Eve, with offerings to
              Yemanjá
            </li>
            <li>
              <strong>Bumba Meu Boi</strong> - June/July, folkloric festival
            </li>
          </ul>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] mt-2">
            <p className="text-sm italic">
              "Brazilian festivals are explosions of color, rhythm, and joy
              where the boundaries between performer and spectator dissolve in a
              collective celebration of life."
            </p>
          </div>
        </div>,
      community: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>From CultureLens travelers who've experienced Brazil:</p>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] shadow-sm">
            <p className="italic">
              "The concept of 'saudade' - a deep emotional state of melancholic
              longing - is uniquely Brazilian. You'll hear it in their music,
              especially in bossa nova and fado. It's beautiful how they embrace
              and express this complex emotion."
            </p>
            <p className="text-right text-sm mt-1">- Luisa, Portugal</p>
          </div>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] shadow-sm">
            <p className="italic">
              "Brazilians have an incredible ability to find joy in simple
              moments. A spontaneous gathering with music and food can happen
              anywhere, anytime. Say yes to these impromptu invitations!"
            </p>
            <p className="text-right text-sm mt-1">- James, Australia</p>
          </div>
        </div>
    },
    Korea: {
      traditions: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Korean culture is deeply rooted in Confucian principles, emphasizing
            harmony, respect for elders, and strong family bonds. Traditional
            values coexist with modern innovation in this dynamic society.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge>Respect (Jonjung)</Badge>
            <Badge>Harmony (Johwa)</Badge>
            <Badge>Perseverance (Innaem)</Badge>
          </div>
          <p className="border-l-4 border-[#744a32] pl-3 italic mt-3">
            "Even if you have to crawl on your knees, get an education." -
            Korean Proverb
          </p>
        </div>,
      etiquette: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Korean social etiquette is based on respect and hierarchy. Age and
            social status significantly influence interactions and behavior.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Bow when greeting (deeper bows show greater respect)</li>
            <li>Use both hands when giving or receiving items from elders</li>
            <li>Remove shoes before entering homes</li>
            <li>Wait for elders to start eating before beginning your meal</li>
            <li>
              Avoid writing someone's name in red ink (traditionally associated
              with death)
            </li>
          </ul>
        </div>,
      greetings: <div className="space-y-3 text-[#6d5a42] font-serif">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Hello</div>
              <div>안녕하세요 (Annyeonghaseyo)</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Thank you</div>
              <div>감사합니다 (Gamsahamnida)</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Excuse me</div>
              <div>실례합니다 (Sillyehamnida)</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Please</div>
              <div>주세요 (Juseyo)</div>
            </div>
          </div>
        </div>,
      food: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Korean cuisine is known for its bold flavors, healthy ingredients,
            and communal dining style. Fermented foods play a central role in
            the diet, offering both flavor and health benefits.
          </p>
          <div className="flex overflow-x-auto space-x-3 pb-2">
            {[{
            name: 'Kimchi',
            emoji: '🥬'
          }, {
            name: 'Bibimbap',
            emoji: '🍚'
          }, {
            name: 'Bulgogi',
            emoji: '🥩'
          }, {
            name: 'Tteokbokki',
            emoji: '🍲'
          }].map((food, index) => <div key={index} className="flex-shrink-0 bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-3 text-center min-w-[80px]">
                <div className="text-2xl mb-1">{food.emoji}</div>
                <div className="font-semibold">{food.name}</div>
              </div>)}
          </div>
          <p>
            <strong>Dining Etiquette:</strong> Wait for the eldest person to
            start eating before you begin. It's polite to refuse food or drink
            initially before accepting. Never leave chopsticks sticking upright
            in rice.
          </p>
        </div>,
      festivals: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Korean festivals celebrate seasonal changes, historical events, and
            cultural heritage through traditional performances, food, and
            community activities.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Seollal</strong> - Lunar New Year celebration
            </li>
            <li>
              <strong>Chuseok</strong> - Harvest festival, similar to
              Thanksgiving
            </li>
            <li>
              <strong>Dano Festival</strong> - Spring celebration (May/June)
            </li>
            <li>
              <strong>Boryeong Mud Festival</strong> - Summer festival at mud
              flats
            </li>
          </ul>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] mt-2">
            <p className="text-sm italic">
              "Korean festivals honor the past while embracing the future,
              bringing together generations to celebrate traditions that have
              endured for thousands of years."
            </p>
          </div>
        </div>,
      community: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>From CultureLens travelers who've experienced Korea:</p>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] shadow-sm">
            <p className="italic">
              "The concept of 'jeong' - a deep emotional connection and sense of
              community - is something I experienced everywhere in Korea. Even
              as a foreigner, I was often invited to join family meals and local
              celebrations."
            </p>
            <p className="text-right text-sm mt-1">- Alex, United States</p>
          </div>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] shadow-sm">
            <p className="italic">
              "Korean bathhouses (jjimjilbang) are an incredible cultural
              experience. Don't be shy about the nudity in gender-separated
              areas - it's completely normal and no one will pay attention to
              you."
            </p>
            <p className="text-right text-sm mt-1">- Nina, Sweden</p>
          </div>
        </div>
    },
    France: {
      traditions: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            French culture is synonymous with art, literature, philosophy, and
            gastronomy. The French value intellectual pursuits and the "art of
            living well" (l'art de vivre), emphasizing quality over quantity in
            all aspects of life.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge>Elegance (Élégance)</Badge>
            <Badge>Heritage (Patrimoine)</Badge>
            <Badge>Refinement (Raffinement)</Badge>
          </div>
          <p className="border-l-4 border-[#744a32] pl-3 italic mt-3">
            "To know Paris is to know a great deal." - Henry Miller
          </p>
        </div>,
      etiquette: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            French etiquette emphasizes formality, politeness, and appreciation
            for beauty and quality. Social interactions follow certain codes
            that may seem formal to outsiders.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Always greet with "Bonjour" before starting any conversation or
              request
            </li>
            <li>Maintain a moderate speaking volume in public places</li>
            <li>Dress well - casual doesn't mean sloppy</li>
            <li>
              Punctuality is appreciated, though a 10-15 minute grace period
              exists for social events
            </li>
            <li>
              The French appreciate directness but delivered with tact and wit
            </li>
          </ul>
        </div>,
      greetings: <div className="space-y-3 text-[#6d5a42] font-serif">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Hello</div>
              <div>Bonjour</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Thank you</div>
              <div>Merci</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Excuse me</div>
              <div>Excusez-moi</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Please</div>
              <div>S'il vous plaît</div>
            </div>
          </div>
        </div>,
      food: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            French cuisine is renowned worldwide for its sophistication and
            influence on culinary arts. Meals are treated as important social
            events to be savored and enjoyed at length.
          </p>
          <div className="flex overflow-x-auto space-x-3 pb-2">
            {[{
            name: 'Croissant',
            emoji: '🥐'
          }, {
            name: 'Cheese',
            emoji: '🧀'
          }, {
            name: 'Wine',
            emoji: '🍷'
          }, {
            name: 'Ratatouille',
            emoji: '🍲'
          }].map((food, index) => <div key={index} className="flex-shrink-0 bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-3 text-center min-w-[80px]">
                <div className="text-2xl mb-1">{food.emoji}</div>
                <div className="font-semibold">{food.name}</div>
              </div>)}
          </div>
          <p>
            <strong>Dining Etiquette:</strong> Keep hands visible on the table
            (not in your lap). Bread is placed directly on the tablecloth, not
            on your plate. The French typically eat salad after the main course
            and before cheese.
          </p>
        </div>,
      festivals: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            French festivals celebrate art, music, history, and seasonal changes
            with elegance and cultural depth.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Fête de la Musique</strong> - Nationwide music festival
              (June 21)
            </li>
            <li>
              <strong>Bastille Day</strong> - National holiday (July 14)
            </li>
            <li>
              <strong>Cannes Film Festival</strong> - Prestigious film festival
              (May)
            </li>
            <li>
              <strong>Nice Carnival</strong> - One of the world's major
              carnivals (February)
            </li>
          </ul>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] mt-2">
            <p className="text-sm italic">
              "French festivals are celebrations of life's pleasures, where
              culture, art, and tradition blend with contemporary expression in
              a uniquely French way."
            </p>
          </div>
        </div>,
      community: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>From CultureLens travelers who've experienced France:</p>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] shadow-sm">
            <p className="italic">
              "The French aren't rude - they just have a different concept of
              politeness. Always start with 'Bonjour' and make an effort to
              speak some French, even if it's just a few words. This small
              gesture opens many doors."
            </p>
            <p className="text-right text-sm mt-1">- Rebecca, Canada</p>
          </div>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] shadow-sm">
            <p className="italic">
              "Don't rush your meals in France. Dining is a social experience to
              be enjoyed over hours, not minutes. Some of my best memories are
              of three-hour lunches in small village bistros."
            </p>
            <p className="text-right text-sm mt-1">- Markus, Germany</p>
          </div>
        </div>
    },
    Peru: {
      traditions: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Peruvian culture blends indigenous Andean traditions with Spanish
            colonial influences, creating a rich cultural tapestry. The
            connection to Inca heritage remains strong in many communities,
            especially in the highlands.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge>Heritage (Herencia)</Badge>
            <Badge>Reciprocity (Ayni)</Badge>
            <Badge>Community (Comunidad)</Badge>
          </div>
          <p className="border-l-4 border-[#744a32] pl-3 italic mt-3">
            "Who knows how to wait, everything comes to him in time." - Peruvian
            Proverb
          </p>
        </div>,
      etiquette: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Peruvian social customs emphasize respect, hospitality, and personal
            relationships. Formality varies between urban and rural areas.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Greet with a handshake, friends often exchange a kiss on the cheek
            </li>
            <li>
              Address people by professional titles when applicable (Doctor,
              Professor)
            </li>
            <li>
              Accept food and drink when offered, as refusal may be considered
              impolite
            </li>
            <li>
              Be punctual for business meetings, though social gatherings often
              start late
            </li>
            <li>
              Dress conservatively when visiting churches or indigenous
              communities
            </li>
          </ul>
        </div>,
      greetings: <div className="space-y-3 text-[#6d5a42] font-serif">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Hello</div>
              <div>Hola</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Thank you</div>
              <div>Gracias</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Excuse me</div>
              <div>Disculpe</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Please</div>
              <div>Por favor</div>
            </div>
          </div>
        </div>,
      food: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Peruvian cuisine is celebrated worldwide for its diversity and
            flavor. With influences from indigenous, Spanish, African, Chinese,
            and Japanese traditions, it offers an incredible gastronomic
            experience.
          </p>
          <div className="flex overflow-x-auto space-x-3 pb-2">
            {[{
            name: 'Ceviche',
            emoji: '🐟'
          }, {
            name: 'Lomo Saltado',
            emoji: '🥩'
          }, {
            name: 'Pisco Sour',
            emoji: '🍸'
          }, {
            name: 'Anticuchos',
            emoji: '🍢'
          }].map((food, index) => <div key={index} className="flex-shrink-0 bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-3 text-center min-w-[80px]">
                <div className="text-2xl mb-1">{food.emoji}</div>
                <div className="font-semibold">{food.name}</div>
              </div>)}
          </div>
          <p>
            <strong>Dining Etiquette:</strong> Wait for the host to invite you
            to start eating. Keep your hands visible on the table. It's common
            to be offered seconds, and polite to accept if possible.
          </p>
        </div>,
      festivals: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Peruvian festivals blend Catholic traditions with pre-Columbian
            rituals, creating colorful celebrations filled with music, dance,
            and elaborate costumes.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Inti Raymi</strong> - Festival of the Sun (June 24)
            </li>
            <li>
              <strong>Señor de los Milagros</strong> - Lord of Miracles
              procession (October)
            </li>
            <li>
              <strong>Virgen de la Candelaria</strong> - Religious festival in
              Puno (February)
            </li>
            <li>
              <strong>Mistura</strong> - South America's largest food festival
              (September)
            </li>
          </ul>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] mt-2">
            <p className="text-sm italic">
              "Peruvian festivals are living museums where ancient traditions
              dance with modern life, offering glimpses into a cultural heritage
              that spans millennia."
            </p>
          </div>
        </div>,
      community: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>From CultureLens travelers who've experienced Peru:</p>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] shadow-sm">
            <p className="italic">
              "The concept of 'ayni' (reciprocity) is still practiced in many
              Andean communities. I was invited to help with a community
              harvest, and in return, shared in the celebration feast. It was a
              profound experience of genuine community."
            </p>
            <p className="text-right text-sm mt-1">- Maria, Mexico</p>
          </div>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] shadow-sm">
            <p className="italic">
              "Take altitude sickness seriously when visiting Cusco or other
              highland areas. Drink coca tea, avoid alcohol for the first day,
              and take it easy until you acclimate. It affected me more than I
              expected."
            </p>
            <p className="text-right text-sm mt-1">- John, Australia</p>
          </div>
        </div>
    },
    Thailand: {
      traditions: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Thai culture is deeply influenced by Buddhism, which emphasizes
            compassion, tolerance, and respect. The concepts of "sanuk"
            (enjoyment) and "mai pen rai" (never mind/it's okay) reflect the
            Thai approach to life with positivity and flexibility.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge>Respect (Kwam Napthue)</Badge>
            <Badge>Harmony (Kwam Samakkhi)</Badge>
            <Badge>Mindfulness (Sati)</Badge>
          </div>
          <p className="border-l-4 border-[#744a32] pl-3 italic mt-3">
            "Life is short, so make it sweet." - Thai saying
          </p>
        </div>,
      etiquette: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Thai etiquette centers around respect, modesty, and avoiding
            conflict. The concept of "saving face" influences many social
            interactions.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Greet with the "wai" gesture (palms pressed together in prayer
              position)
            </li>
            <li>
              Remove shoes before entering homes, temples, and some businesses
            </li>
            <li>
              Avoid touching anyone's head, as it's considered the most sacred
              part of the body
            </li>
            <li>
              Dress modestly, especially when visiting temples (cover shoulders
              and knees)
            </li>
            <li>Never point your feet at people or sacred objects</li>
          </ul>
        </div>,
      greetings: <div className="space-y-3 text-[#6d5a42] font-serif">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Hello</div>
              <div>สวัสดี (Sawasdee)</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Thank you</div>
              <div>ขอบคุณ (Khob khun)</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Excuse me</div>
              <div>ขอโทษ (Khor thot)</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Please</div>
              <div>กรุณา (Ga-ru-na)</div>
            </div>
          </div>
        </div>,
      food: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Thai cuisine balances five fundamental flavors: sweet, sour, salty,
            spicy, and bitter. Fresh ingredients, aromatic herbs, and vibrant
            spices create dishes that are as nutritious as they are flavorful.
          </p>
          <div className="flex overflow-x-auto space-x-3 pb-2">
            {[{
            name: 'Pad Thai',
            emoji: '🍜'
          }, {
            name: 'Tom Yum',
            emoji: '🍲'
          }, {
            name: 'Green Curry',
            emoji: '🥘'
          }, {
            name: 'Mango Sticky Rice',
            emoji: '🍚'
          }].map((food, index) => <div key={index} className="flex-shrink-0 bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-3 text-center min-w-[80px]">
                <div className="text-2xl mb-1">{food.emoji}</div>
                <div className="font-semibold">{food.name}</div>
              </div>)}
          </div>
          <p>
            <strong>Dining Etiquette:</strong> Use a spoon in your right hand
            and fork in your left (to push food onto the spoon). Chopsticks are
            typically only used for noodle dishes. Share dishes family-style
            rather than ordering individual meals.
          </p>
        </div>,
      festivals: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Thai festivals combine religious significance with joyful
            celebration, often featuring water, lights, and communal gatherings.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Songkran</strong> - Thai New Year water festival (April)
            </li>
            <li>
              <strong>Loy Krathong</strong> - Festival of Lights (November)
            </li>
            <li>
              <strong>Yi Peng</strong> - Lantern Festival in Chiang Mai
              (November)
            </li>
            <li>
              <strong>Vegetarian Festival</strong> - Spiritual cleansing
              festival (September/October)
            </li>
          </ul>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] mt-2">
            <p className="text-sm italic">
              "Thai festivals transform everyday life into magical celebrations
              where ancient spiritual practices blend with pure joy, inviting
              everyone to participate in the country's living traditions."
            </p>
          </div>
        </div>,
      community: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>From CultureLens travelers who've experienced Thailand:</p>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] shadow-sm">
            <p className="italic">
              "The Thai concept of 'sanuk' (finding enjoyment in whatever you
              do) is contagious. Even in mundane situations, Thais find ways to
              incorporate fun and smiles. It changed my perspective on how to
              approach daily life."
            </p>
            <p className="text-right text-sm mt-1">- Lisa, United States</p>
          </div>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] shadow-sm">
            <p className="italic">
              "Don't be afraid to try street food - some of Thailand's best
              cuisine is found at humble street stalls. Look for places with
              lots of locals and fresh ingredients. My favorite pad thai was
              from a cart that cost less than $2."
            </p>
            <p className="text-right text-sm mt-1">- Raj, India</p>
          </div>
        </div>
    },
    Turkey: {
      traditions: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Turkish culture spans two continents, blending Eastern and Western
            influences into a unique identity. Hospitality, respect for elders,
            and strong family bonds form the foundation of Turkish society.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge>Hospitality (Misafirperverlik)</Badge>
            <Badge>Respect (Saygı)</Badge>
            <Badge>Heritage (Miras)</Badge>
          </div>
          <p className="border-l-4 border-[#744a32] pl-3 italic mt-3">
            "A cup of coffee commits one to forty years of friendship." -
            Turkish Proverb
          </p>
        </div>,
      etiquette: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Turkish etiquette emphasizes generosity, respect, and building
            personal connections. Relationships are valued over rigid schedules
            or efficiency.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Remove shoes when entering Turkish homes</li>
            <li>Greet the eldest person in the room first</li>
            <li>Accept offered food and drink as a sign of respect</li>
            <li>
              Dress modestly when visiting mosques (women should cover their
              heads)
            </li>
            <li>
              Avoid public displays of affection, especially in conservative
              areas
            </li>
          </ul>
        </div>,
      greetings: <div className="space-y-3 text-[#6d5a42] font-serif">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Hello</div>
              <div>Merhaba</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Thank you</div>
              <div>Teşekkür ederim</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Excuse me</div>
              <div>Affedersiniz</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Please</div>
              <div>Lütfen</div>
            </div>
          </div>
        </div>,
      food: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Turkish cuisine reflects the country's imperial heritage and
            geographic position between Europe, Asia, and the Middle East. Meals
            are social events meant to be shared and savored.
          </p>
          <div className="flex overflow-x-auto space-x-3 pb-2">
            {[{
            name: 'Kebab',
            emoji: '🍖'
          }, {
            name: 'Baklava',
            emoji: '🍯'
          }, {
            name: 'Turkish Tea',
            emoji: '🍵'
          }, {
            name: 'Meze',
            emoji: '🍽️'
          }].map((food, index) => <div key={index} className="flex-shrink-0 bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-3 text-center min-w-[80px]">
                <div className="text-2xl mb-1">{food.emoji}</div>
                <div className="font-semibold">{food.name}</div>
              </div>)}
          </div>
          <p>
            <strong>Dining Etiquette:</strong> Meals often begin with "Afiyet
            olsun" (may it be good for you). The host will typically insist on
            serving guests and offering multiple helpings. Turkish coffee is
            often served after meals.
          </p>
        </div>,
      festivals: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Turkish festivals celebrate religious occasions, seasonal changes,
            and cultural heritage through music, dance, food, and community
            gatherings.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Ramadan & Eid al-Fitr</strong> - Islamic holy month and
              celebration
            </li>
            <li>
              <strong>Republic Day</strong> - National holiday (October 29)
            </li>
            <li>
              <strong>Istanbul International Film Festival</strong> - Cultural
              celebration (April)
            </li>
            <li>
              <strong>Mesir Macunu Festival</strong> - Historical spice paste
              celebration (April)
            </li>
          </ul>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] mt-2">
            <p className="text-sm italic">
              "Turkish festivals are bridges between past and present, where
              ancient traditions are honored with modern celebrations that
              invite everyone to experience the country's rich cultural
              heritage."
            </p>
          </div>
        </div>,
      community: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>From CultureLens travelers who've experienced Turkey:</p>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] shadow-sm">
            <p className="italic">
              "Turkish hospitality is legendary for good reason. I was invited
              to a family dinner by someone I had just met, and they treated me
              like an honored guest. Come with an open heart and you'll make
              friends for life."
            </p>
            <p className="text-right text-sm mt-1">- David, United Kingdom</p>
          </div>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] shadow-sm">
            <p className="italic">
              "Don't rush through the Turkish bazaars. The art of bargaining is
              part of the cultural experience - it's expected and can be quite
              fun. Accept the offered tea, chat a bit, and then start the
              negotiation dance."
            </p>
            <p className="text-right text-sm mt-1">- Aisha, Morocco</p>
          </div>
        </div>
    },
    China: {
      traditions: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Chinese culture spans over 5,000 years of history, with traditions
            rooted in Confucianism, Taoism, and Buddhism. Concepts of harmony,
            balance, and respect for hierarchy remain central to Chinese
            society.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge>Harmony (和谐 - Hexie)</Badge>
            <Badge>Respect (尊重 - Zunzhong)</Badge>
            <Badge>Balance (平衡 - Pingheng)</Badge>
          </div>
          <p className="border-l-4 border-[#744a32] pl-3 italic mt-3">
            "A journey of a thousand miles begins with a single step." - Lao Tzu
          </p>
        </div>,
      etiquette: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Chinese etiquette emphasizes group harmony, face (mianzi), and
            respect for elders and authority. Understanding these concepts is
            key to navigating social interactions.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Greet the oldest or most senior person first</li>
            <li>
              Present and receive items with both hands as a sign of respect
            </li>
            <li>
              Avoid excessive physical contact or public displays of affection
            </li>
            <li>Remove shoes when entering someone's home</li>
            <li>
              Never write someone's name in red ink (associated with death)
            </li>
          </ul>
        </div>,
      greetings: <div className="space-y-3 text-[#6d5a42] font-serif">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Hello</div>
              <div>你好 (Nǐ hǎo)</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Thank you</div>
              <div>谢谢 (Xièxiè)</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Excuse me</div>
              <div>对不起 (Duìbùqǐ)</div>
            </div>
            <div className="bg-[#fefcf0] p-2 rounded border border-[#d4c4a8]">
              <div className="font-bold">Please</div>
              <div>请 (Qǐng)</div>
            </div>
          </div>
        </div>,
      food: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Chinese cuisine is incredibly diverse, with eight major culinary
            traditions and countless regional specialties. Food is central to
            Chinese culture and an important way to build relationships.
          </p>
          <div className="flex overflow-x-auto space-x-3 pb-2">
            {[{
            name: 'Dumplings',
            emoji: '🥟'
          }, {
            name: 'Peking Duck',
            emoji: '🦆'
          }, {
            name: 'Hot Pot',
            emoji: '🍲'
          }, {
            name: 'Tea',
            emoji: '🍵'
          }].map((food, index) => <div key={index} className="flex-shrink-0 bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-3 text-center min-w-[80px]">
                <div className="text-2xl mb-1">{food.emoji}</div>
                <div className="font-semibold">{food.name}</div>
              </div>)}
          </div>
          <p>
            <strong>Dining Etiquette:</strong> Wait for the host or eldest
            person to begin eating. Never stick chopsticks upright in rice
            (resembles funeral rituals). It's polite to leave a little food on
            your plate to show the host provided enough.
          </p>
        </div>,
      festivals: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>
            Chinese festivals follow the lunar calendar and celebrate important
            historical events, seasonal changes, and family unity with rich
            symbolism and traditions.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Chinese New Year</strong> - Most important traditional
              festival
            </li>
            <li>
              <strong>Mid-Autumn Festival</strong> - Moon viewing and mooncakes
              (September/October)
            </li>
            <li>
              <strong>Dragon Boat Festival</strong> - Commemorating poet Qu Yuan
              (May/June)
            </li>
            <li>
              <strong>Qingming Festival</strong> - Honoring ancestors (April)
            </li>
          </ul>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] mt-2">
            <p className="text-sm italic">
              "Chinese festivals are living cultural treasures where ancient
              symbolism, family bonds, and community celebration come together
              in a vibrant tapestry of tradition that connects present
              generations to their ancestors."
            </p>
          </div>
        </div>,
      community: <div className="space-y-3 text-[#6d5a42] font-serif">
          <p>From CultureLens travelers who've experienced China:</p>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] shadow-sm">
            <p className="italic">
              "The concept of 'guanxi' (relationships/connections) is crucial in
              China. Building personal connections opens doors that might
              otherwise remain closed. Take time to develop relationships rather
              than rushing straight to business."
            </p>
            <p className="text-right text-sm mt-1">- Michael, United States</p>
          </div>
          <div className="bg-[#fefcf0] p-3 rounded border border-[#d4c4a8] shadow-sm">
            <p className="italic">
              "Don't be surprised if locals want to take photos with you,
              especially in less touristy areas. It's usually friendly
              curiosity. Also, download translation apps before your trip -
              they're invaluable for navigating daily interactions."
            </p>
            <p className="text-right text-sm mt-1">- Yuki, Japan</p>
          </div>
        </div>
    }
  };
  // Get country info
  const getCountryInfo = () => {
    const country = selectedCountry;
    const countryObj = countries.find(c => c.name === country);
    return {
      name: country,
      flag: countryObj?.flag || '🌍',
      tagline: getCountryTagline(country),
      content: countryContent[country] || countryContent['Japan']
    };
  };
  // Get country tagline
  const getCountryTagline = (country: string) => {
    const taglines: {
      [key: string]: string;
    } = {
      Japan: 'Land of the Rising Sun',
      Italy: 'The Cradle of Renaissance',
      Morocco: 'Gateway to Africa',
      India: 'Land of Diversity and Spirituality',
      Brazil: 'Land of Passion and Samba',
      Korea: 'Land of Morning Calm',
      France: 'Liberty, Equality, Fraternity',
      Peru: 'Land of the Incas',
      Thailand: 'Land of Smiles',
      Turkey: 'Where East Meets West',
      China: 'Middle Kingdom'
    };
    return taglines[country] || '';
  };
  const countryInfo = getCountryInfo();
  return <div className="min-h-screen bg-[#fef7e0] p-4 pb-20">
      {/* Header */}
      <header className="bg-[#754b34] text-[#fcf8dd] p-5 rounded-t-2xl shadow-md mb-6">
        <div className="flex items-center gap-3 mb-2">
          <GlobeIcon size={24} className="text-[#fcf8dd]" />
          <div>
            <h1 className="text-xl font-bold font-serif">
              Cultural Compendium
            </h1>
            <p className="text-sm italic text-[#fefcf0] opacity-90">
              Traditional customs & etiquette
            </p>
          </div>
        </div>

        {/* Country Selector */}
        <div className="mt-3">
          <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} className="w-full bg-[#fcf8dd] border border-[#d4c4a8] rounded-lg p-3 font-semibold text-[#754b34] shadow-inner focus:ring-2 focus:ring-[#fefcf0] focus:outline-none font-serif appearance-none pr-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 15l-5-5h10l-5 5z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 10px center'
        }}>
            {countries.map(country => <option key={country.id} value={country.name}>
                {country.flag} {country.name}
              </option>)}
          </select>
        </div>
      </header>

      {/* Country Header */}
      <div className="bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-4 shadow-md mb-6">
        <div className="flex items-center space-x-3">
          <div className="text-4xl">{countryInfo.flag}</div>
          <div>
            <h2 className="text-xl font-bold text-[#2f1b14] font-serif">
              {countryInfo.name}
            </h2>
            <p className="text-[#6d5a42] font-serif">{countryInfo.tagline}</p>
          </div>
        </div>
      </div>
      {/* Search */}
      <div className="mb-6 relative">
        <div className="relative">
          {/* Browse Story Button */}
          <button onClick={() => navigate('/experiences')} className="w-full bg-[#fefcf0] text-[#744a32] px-4 py-3 rounded-lg font-bold shadow-md hover:bg-[#f4f0e6] transition-all font-serif flex items-center justify-center">
            <CompassIcon size={20} className="mr-2" />
            Browse Stories
          </button>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          </div>
        </div>
      </div>
      {/* Sections */}
      <div className="space-y-4 mb-20">
        {sections.map(section => <div key={section.id} className="bg-[#fefcf0] border border-[#d4c4a8] rounded-lg shadow-md overflow-hidden">
            <button className="w-full p-4 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-[#8b5a3c] focus:ring-inset" onClick={() => toggleSection(section.id)}>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{section.icon}</span>
                <span className="font-bold text-[#2f1b14] font-serif">
                  {section.title}
                </span>
              </div>
              {expandedSection === section.id ? <ChevronUpIcon size={20} className="text-[#744a32]" /> : <ChevronDownIcon size={20} className="text-[#744a32]" />}
            </button>

            {/* Section Content */}
            {expandedSection === section.id && <div className="px-6 pb-4 space-y-3 bg-[#fefcf0] border-t border-[#e6d8be] rounded-b-lg">
                {/* Render posts */}
                {section.posts?.map((post, index) => <div key={index} className="p-3 bg-[#fffaf0] border border-[#e0d2b5] rounded-lg shadow-sm">
                    <h3 className="font-semibold text-[#2f1b14] font-serif">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[#4b3b2a] font-serif">
                      {post.content}
                    </p>
                  </div>)}

                {/* Add Insight button (bottom of posts) */}
                {section.id === 'community' && <div className="pt-3 flex justify-center">
                    <button onClick={() => navigate('/post-experience', {
              state: {
                presetTag: 'Local Customs',
                presetCountry: selectedCountry,
                isInsight: true
              }
            })} className="bg-[#744a32] text-[#fcf8dd] text-sm py-2 px-4 rounded-full hover:bg-[#5d3a28] transition-colors font-serif flex items-center">
                      <span className="mr-1 text-lg leading-none">+</span> Add
                      Insight
                    </button>
                  </div>}

                {/* Country-specific content appears below the button */}
                <div className="p-4 border-t border-[#d4c4a8] bg-[#fef7e0] rounded-lg">
                  {countryInfo.content[section.id]}
                </div>
              </div>}
          </div>)}
      </div>
    </div>;
};