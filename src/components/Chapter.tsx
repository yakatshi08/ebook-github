import React from 'react';
import { Chapter as ChapterType } from '../types/ebook';
import { Quote, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';

interface ChapterProps {
  chapter: ChapterType;
}

const Chapter: React.FC<ChapterProps> = ({ chapter }) => {
  const renderContent = (content: any) => {
    switch (content.type) {
      case 'text':
        return (
          <p className="text-[#2D2D2D] leading-relaxed mb-6 text-lg">
            {content.value}
          </p>
        );
      
      case 'quote':
        return (
          <div className="bg-[#0C1C44]/5 border-l-4 border-[#FFD43B] p-6 my-8 rounded-r-lg">
            <div className="flex items-start gap-3">
              <Quote size={24} className="text-[#FFD43B] mt-1 flex-shrink-0" />
              <blockquote className="text-[#0C1C44] text-lg font-medium italic leading-relaxed">
                {content.value}
              </blockquote>
            </div>
          </div>
        );
      
      case 'highlight':
        return (
          <div className="bg-[#FFD43B]/10 border border-[#FFD43B] p-6 my-8 rounded-lg">
            <div className="flex items-start gap-3">
              <Lightbulb size={24} className="text-[#FFD43B] mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-[#0C1C44] font-semibold mb-2">💡 Point clé</h4>
                <p className="text-[#2D2D2D] leading-relaxed">{content.value}</p>
              </div>
            </div>
          </div>
        );
      
      case 'warning':
        return (
          <div className="bg-orange-50 border border-orange-200 p-6 my-8 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle size={24} className="text-orange-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-orange-800 font-semibold mb-2">⚠️ Attention</h4>
                <p className="text-orange-700 leading-relaxed">{content.value}</p>
              </div>
            </div>
          </div>
        );
      
      case 'list':
        return (
          <ul className="space-y-3 my-6">
            {content.items.map((item: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle size={20} className="text-[#FFD43B] mt-1 flex-shrink-0" />
                <span className="text-[#2D2D2D] leading-relaxed text-lg">{item}</span>
              </li>
            ))}
          </ul>
        );
      
      case 'subtitle':
        return (
          <h3 className="text-2xl font-semibold text-[#1A2A5B] mt-10 mb-6 border-b border-gray-200 pb-2">
            {content.value}
          </h3>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-8 relative">
      {/* Lignes verticales bleu foncé - Améliorées */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#1B2B55] hidden md:block"></div>
      <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-[#1B2B55] hidden md:block"></div>
      
      <div className="max-w-3xl mx-auto px-6">
        {/* Chapter header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-[#0C1C44] text-white px-4 py-2 rounded-lg font-semibold">
              Chapitre {chapter.number}
            </span>
            {chapter.icon && (
              <div className="text-[#FFD43B]">
                {chapter.icon}
              </div>
            )}
          </div>
          <h1 className="text-4xl font-bold text-[#0C1C44] mb-6 leading-tight">
            {chapter.title}
          </h1>
          <p className="text-xl text-[#1A2A5B] leading-relaxed">
            {chapter.description}
          </p>
        </div>

        {/* Chapter content */}
        <div className="prose prose-lg max-w-none">
          {chapter.content.map((content, index) => (
            <div key={index}>
              {renderContent(content)}
            </div>
          ))}
        </div>

        {/* Chapter footer with key takeaways */}
        {chapter.keyTakeaways && (
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-semibold text-[#0C1C44] mb-6">
              🎯 Points clés à retenir
            </h3>
            <div className="bg-[#FAFAFA] p-8 rounded-lg">
              <ul className="space-y-4">
                {chapter.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="bg-[#FFD43B] rounded-full w-6 h-6 flex items-center justify-center text-[#0C1C44] font-bold text-sm flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <span className="text-[#2D2D2D] leading-relaxed text-lg">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chapter;