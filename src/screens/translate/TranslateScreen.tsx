import React, { useState } from 'react';
import { ArrowDownIcon, MicIcon, SpeakerIcon, CopyIcon, ArrowLeftIcon, GlobeIcon, ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';
export const TranslateScreen = () => {
  const [sourceText, setSourceText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('English');
  const [targetLanguage, setTargetLanguage] = useState('Japanese');
  const [translatedText, setTranslatedText] = useState('');
  const [romanization, setRomanization] = useState('');
  const languages = [{
    code: 'en',
    name: 'English',
    flag: '🇺🇸'
  }, {
    code: 'ja',
    name: 'Japanese',
    flag: '🇯🇵'
  }, {
    code: 'es',
    name: 'Spanish',
    flag: '🇪🇸'
  }, {
    code: 'fr',
    name: 'French',
    flag: '🇫🇷'
  }, {
    code: 'de',
    name: 'German',
    flag: '🇩🇪'
  }, {
    code: 'it',
    name: 'Italian',
    flag: '🇮🇹'
  }, {
    code: 'zh',
    name: 'Chinese',
    flag: '🇨🇳'
  }, {
    code: 'ko',
    name: 'Korean',
    flag: '🇰🇷'
  }];
  // Translations with romanization for non-Latin scripts
  const phrasesDatabase = {
    Hello: {
      Japanese: {
        text: 'こんにちは',
        romanization: 'Konnichiwa'
      },
      Spanish: {
        text: 'Hola',
        romanization: ''
      },
      French: {
        text: 'Bonjour',
        romanization: ''
      },
      German: {
        text: 'Hallo',
        romanization: ''
      },
      Italian: {
        text: 'Ciao',
        romanization: ''
      },
      Chinese: {
        text: '你好',
        romanization: 'Nǐ hǎo'
      },
      Korean: {
        text: '안녕하세요',
        romanization: 'Annyeonghaseyo'
      },
      English: {
        text: 'Hello',
        romanization: ''
      }
    },
    Goodbye: {
      Japanese: {
        text: 'さようなら',
        romanization: 'Sayōnara'
      },
      Spanish: {
        text: 'Adiós',
        romanization: ''
      },
      French: {
        text: 'Au revoir',
        romanization: ''
      },
      German: {
        text: 'Auf Wiedersehen',
        romanization: ''
      },
      Italian: {
        text: 'Arrivederci',
        romanization: ''
      },
      Chinese: {
        text: '再见',
        romanization: 'Zàijiàn'
      },
      Korean: {
        text: '안녕히 가세요',
        romanization: 'Annyeonghi gaseyo'
      },
      English: {
        text: 'Goodbye',
        romanization: ''
      }
    },
    Please: {
      Japanese: {
        text: 'お願いします',
        romanization: 'Onegaishimasu'
      },
      Spanish: {
        text: 'Por favor',
        romanization: ''
      },
      French: {
        text: 'S’il vous plaît',
        romanization: ''
      },
      German: {
        text: 'Bitte',
        romanization: ''
      },
      Italian: {
        text: 'Per favore',
        romanization: ''
      },
      Chinese: {
        text: '请',
        romanization: 'Qǐng'
      },
      Korean: {
        text: '제발',
        romanization: 'Jebal'
      },
      English: {
        text: 'Please',
        romanization: ''
      }
    },
    Sorry: {
      Japanese: {
        text: 'ごめんなさい',
        romanization: 'Gomen nasai'
      },
      Spanish: {
        text: 'Lo siento',
        romanization: ''
      },
      French: {
        text: 'Désolé',
        romanization: ''
      },
      German: {
        text: 'Es tut mir leid',
        romanization: ''
      },
      Italian: {
        text: 'Mi dispiace',
        romanization: ''
      },
      Chinese: {
        text: '对不起',
        romanization: 'Duìbùqǐ'
      },
      Korean: {
        text: '미안합니다',
        romanization: 'Mianhamnida'
      },
      English: {
        text: 'Sorry',
        romanization: ''
      }
    },
    Yes: {
      Japanese: {
        text: 'はい',
        romanization: 'Hai'
      },
      Spanish: {
        text: 'Sí',
        romanization: ''
      },
      French: {
        text: 'Oui',
        romanization: ''
      },
      German: {
        text: 'Ja',
        romanization: ''
      },
      Italian: {
        text: 'Sì',
        romanization: ''
      },
      Chinese: {
        text: '是',
        romanization: 'Shì'
      },
      Korean: {
        text: '네',
        romanization: 'Ne'
      },
      English: {
        text: 'Yes',
        romanization: ''
      }
    },
    No: {
      Japanese: {
        text: 'いいえ',
        romanization: 'Iie'
      },
      Spanish: {
        text: 'No',
        romanization: ''
      },
      French: {
        text: 'Non',
        romanization: ''
      },
      German: {
        text: 'Nein',
        romanization: ''
      },
      Italian: {
        text: 'No',
        romanization: ''
      },
      Chinese: {
        text: '不',
        romanization: 'Bù'
      },
      Korean: {
        text: '아니요',
        romanization: 'Aniyo'
      },
      English: {
        text: 'No',
        romanization: ''
      }
    },
    'Where is [blank]?': {
      Japanese: {
        text: '〜はどこですか？',
        romanization: '~ wa doko desu ka?'
      },
      Spanish: {
        text: '¿Dónde está [blank]?',
        romanization: ''
      },
      French: {
        text: 'Où est [blank]?',
        romanization: ''
      },
      German: {
        text: 'Wo ist [blank]?',
        romanization: ''
      },
      Italian: {
        text: "Dov'è [blank]?",
        romanization: ''
      },
      Chinese: {
        text: '[blank] 在哪里？',
        romanization: '[blank] zài nǎlǐ?'
      },
      Korean: {
        text: '[blank] 어디에 있나요?',
        romanization: '[blank] eodie issnayo?'
      },
      English: {
        text: 'Where is [blank]?',
        romanization: ''
      }
    },
    'I would like [blank]': {
      Japanese: {
        text: '[blank] をください',
        romanization: '[blank] o kudasai'
      },
      Spanish: {
        text: 'Quisiera [blank]',
        romanization: ''
      },
      French: {
        text: 'Je voudrais [blank]',
        romanization: ''
      },
      German: {
        text: 'Ich möchte [blank]',
        romanization: ''
      },
      Italian: {
        text: 'Vorrei [blank]',
        romanization: ''
      },
      Chinese: {
        text: '我想要 [blank]',
        romanization: 'Wǒ xiǎng yào [blank]'
      },
      Korean: {
        text: '[blank] 주세요',
        romanization: '[blank] juseyo'
      },
      English: {
        text: 'I would like [blank]',
        romanization: ''
      }
    },
    'I don’t understand': {
      Japanese: {
        text: 'わかりません',
        romanization: 'Wakarimasen'
      },
      Spanish: {
        text: 'No entiendo',
        romanization: ''
      },
      French: {
        text: 'Je ne comprends pas',
        romanization: ''
      },
      German: {
        text: 'Ich verstehe nicht',
        romanization: ''
      },
      Italian: {
        text: 'Non capisco',
        romanization: ''
      },
      Chinese: {
        text: '我不明白',
        romanization: 'Wǒ bù míngbái'
      },
      Korean: {
        text: '이해하지 못해요',
        romanization: 'Ihaehaji mothaeyo'
      },
      English: {
        text: "I don't understand",
        romanization: ''
      }
    },
    'I do not speak native': {
      Japanese: {
        text: '日本語を話せません',
        romanization: 'Nihongo o hanasemasen'
      },
      Spanish: {
        text: 'No hablo el idioma local',
        romanization: ''
      },
      French: {
        text: 'Je ne parle pas la langue locale',
        romanization: ''
      },
      German: {
        text: 'Ich spreche die Landessprache nicht',
        romanization: ''
      },
      Italian: {
        text: 'Non parlo la lingua locale',
        romanization: ''
      },
      Chinese: {
        text: '我不会说当地语言',
        romanization: 'Wǒ bù huì shuō dāngdì yǔyán'
      },
      Korean: {
        text: '현지어를 못해요',
        romanization: 'Hyeonjieoreul mothaeyo'
      },
      English: {
        text: 'I do not speak native',
        romanization: ''
      }
    },
    'Do you speak English?': {
      Japanese: {
        text: '英語を話せますか？',
        romanization: 'Eigo o hanasemasu ka?'
      },
      Spanish: {
        text: '¿Habla inglés?',
        romanization: ''
      },
      French: {
        text: 'Parlez-vous anglais?',
        romanization: ''
      },
      German: {
        text: 'Sprechen Sie Englisch?',
        romanization: ''
      },
      Italian: {
        text: 'Parla inglese?',
        romanization: ''
      },
      Chinese: {
        text: '你会说英语吗？',
        romanization: 'Nǐ huì shuō Yīngyǔ ma?'
      },
      Korean: {
        text: '영어 할 줄 아세요?',
        romanization: 'Yeongeo hal jul aseyo?'
      },
      English: {
        text: 'Do you speak English?',
        romanization: ''
      }
    }
  };
  // Simulate translation
  const handleTranslate = () => {
    if (!sourceText.trim()) return;
    // Check if the phrase exists in our database
    if (phrasesDatabase[sourceText] && phrasesDatabase[sourceText][targetLanguage]) {
      const translation = phrasesDatabase[sourceText][targetLanguage];
      setTranslatedText(translation.text);
      setRomanization(translation.romanization);
    } else {
      // For phrases not in our database
      setTranslatedText('Translation would appear here');
      setRomanization('');
    }
  };
  // 🔁 Swap source and target languages (and texts)
  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    // Optional: swap texts too
    if (translatedText) {
      const temp = sourceText;
      setSourceText(translatedText);
      setTranslatedText(temp);
      setRomanization(''); // Reset romanization as it may not apply after swap
    }
  };
  // Check if the current target language needs romanization display
  const needsRomanization = () => {
    return ['Japanese', 'Chinese', 'Korean'].includes(targetLanguage) && romanization;
  };
  return <div className="min-h-screen bg-[#fef7e0] p-4">
      {/* Header */}
      <header className="bg-[#b99664] rounded-t-3xl p-4 flex items-center mb-6">
        <Link to="/" className="bg-[#fefcf0] text-[#2f1b14] p-2 rounded-md shadow-sm hover:shadow-md transition-all mr-3">
          <ArrowLeftIcon size={18} />
        </Link>
        <div className="flex items-center">
          <div className="bg-[#b99664] border-2 border-[#fefcf0] rounded-full w-10 h-10 flex items-center justify-center mr-3">
            <GlobeIcon size={20} className="text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-lg font-bold text-[#fefcf0] font-serif leading-tight">
              Quick Translate
            </h1>
            <p className="text-sm text-[#fefcf0] font-serif opacity-90">
              Your Travel Interpreter
            </p>
          </div>
        </div>
      </header>

      {/* Language Selector */}
      <div className="flex items-center justify-between mb-8">
        {/* Source */}
        <div className="flex-1">
          <select value={sourceLanguage} onChange={e => setSourceLanguage(e.target.value)} className="w-full bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-3 font-semibold text-[#2f1b14] shadow-inner focus:ring-2 focus:ring-[#8b5a3c] focus:outline-none font-serif appearance-none">
            {languages.map(lang => <option key={lang.code} value={lang.name}>
                {lang.flag} {lang.name}
              </option>)}
          </select>
        </div>
        {/* Swap Button */}
        <button onClick={handleSwapLanguages} className="bg-[#d4c4a8] hover:bg-[#c3af8d] p-2 rounded-full shadow-md mx-4 transition-all">
          <ArrowUpDown size={18} className="text-[#3b2f2f]" />
        </button>
        {/* Target */}
        <div className="flex-1">
          <select value={targetLanguage} onChange={e => setTargetLanguage(e.target.value)} className="w-full bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-3 font-semibold text-[#2f1b14] shadow-inner focus:ring-2 focus:ring-[#8b5a3c] focus:outline-none font-serif appearance-none">
            {languages.map(lang => <option key={lang.code} value={lang.name}>
                {lang.flag} {lang.name}
              </option>)}
          </select>
        </div>
      </div>

      {/* Source Text Input */}
      <div className="mb-4">
        <div className="bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-4 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-[#6d5a42] font-serif">
              {sourceLanguage}
            </h2>
          </div>
          <textarea className="w-full bg-[#fefcf0] border-none px-3 py-2 h-32 focus:ring-0 resize-none font-serif text-[#2f1b14] text-[15px]" placeholder="Enter text to translate..." value={sourceText} onChange={e => setSourceText(e.target.value)} style={{
          backgroundImage: 'linear-gradient(0deg, transparent, transparent 23px, #d4c4a8 23px, #d4c4a8 24px)',
          backgroundSize: '24px 24px',
          lineHeight: '24px'
        }} />
          <div className="flex justify-end mt-2">
            <button className="bg-[#b99664] text-white px-4 py-2 rounded font-bold shadow-md hover:bg-[#5d3a28] transition-all font-serif" onClick={handleTranslate}>
              Translate
            </button>
          </div>
        </div>
      </div>

      {/* Translation Output */}
      <div className="mb-6">
        <div className="bg-[#fefcf0] border border-[#d4c4a8] rounded-lg p-4 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-[#6d5a42] font-serif">
              {targetLanguage}
            </h2>
            <div className="flex space-x-2">
              <button className="text-[#744a32] p-2 rounded-full hover:bg-[#f4f0e6]"></button>
              <button className="text-[#744a32] p-2 rounded-full hover:bg-[#f4f0e6]" onClick={() => navigator.clipboard.writeText(translatedText || '')}>
                <CopyIcon size={18} />
              </button>
            </div>
          </div>

          <div className="w-full bg-[#fefcf0] border border-[#d4c4a8] rounded px-3 py-2 h-32 font-serif text-[#2f1b14] text-[15px] overflow-y-auto whitespace-pre-wrap" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 22px, #d4c4a8 23px, transparent 24px)',
          backgroundSize: '24px 24px',
          lineHeight: '24px',
          paddingTop: '6px'
        }}>
            <div style={{
            transform: 'translateY(2px)'
          }}>
              {translatedText || 'Translation will appear here...'}
            </div>

            {needsRomanization() && <p className="mt-2 text-sm italic text-[#6d5a42]">
                Pronunciation: {romanization}
              </p>}
          </div>
        </div>
      </div>
      {/* Quick Phrases */}
      <div className="mb-20">
        <h2 className="text-sm font-semibold text-[#2f1b14] mb-3 font-serif italic">
          Quick Phrases:
        </h2>

        <div className="flex flex-wrap gap-2">
          {['Hello', 'Goodbye', 'Please', 'Sorry', 'Yes', 'No', 'Where is [blank]?', 'I would like [blank]', "I don't understand", 'I do not speak native', 'Do you speak English?'].map((phrase, index) => <button key={index} className="bg-[#fefcf0] border border-[#d4c4a8] rounded-full px-4 py-1 text-sm shadow-sm hover:shadow-md hover:bg-[#f4f0e6] transition-all font-serif text-[#2f1b14]" onClick={() => {
          setSourceText(phrase);
          handleTranslate();
        }}>
              {phrase}
            </button>)}
        </div>
      </div>
    </div>;
};