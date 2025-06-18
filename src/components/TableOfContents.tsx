import React from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import { Chapter } from '../types/ebook';

interface TableOfContentsProps {
  chapters: Chapter[];
  onSelectChapter: (index: number) => void;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ chapters, onSelectChapter }) => {
  return (
    <div className="min-h-screen bg-white py-12 px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <BookOpen size={48} className="text-[#0C1C44]" />
          </div>
          <h1 className="text-4xl font-bold text-[#0C1C44] mb-4">Table des Matières</h1>
          <p className="text-lg text-[#2D2D2D] max-w-2xl mx-auto leading-relaxed">
            Découvrez le contenu complet de ce guide pratique pour maîtriser l'intelligence artificielle
          </p>
        </div>

        {/* Chapters list */}
        <div className="space-y-4">
          {chapters.map((chapter, index) => (
            <div
              key={index}
              onClick={() => onSelectChapter(index)}
              className="bg-[#FAFAFA] border border-gray-200 rounded-lg p-6 cursor-pointer 
                       hover:bg-white hover:border-[#FFD43B] hover:shadow-lg transition-all duration-300 
                       group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-[#0C1C44] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-xl font-semibold text-[#0C1C44] group-hover:text-[#1A2A5B]">
                      {chapter.title}
                    </h3>
                  </div>
                  <p className="text-[#2D2D2D] leading-relaxed ml-12">
                    {chapter.description}
                  </p>
                  {chapter.highlights && (
                    <div className="mt-3 ml-12">
                      <div className="flex flex-wrap gap-2">
                        {chapter.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="bg-[#FFD43B]/20 text-[#0C1C44] px-2 py-1 rounded text-sm font-medium"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <ChevronRight size={20} className="text-[#0C1C44] group-hover:text-[#FFD43B] 
                                                 transform group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom info */}
        <div className="mt-12 text-center">
          <div className="bg-[#0C1C44] text-white p-6 rounded-lg">
            <p className="text-lg font-medium mb-2">
              🎯 Objectif de ce guide
            </p>
            <p className="text-white/90 leading-relaxed">
              Vous donner les clés pour intégrer l'IA dans votre quotidien professionnel et personnel, 
              avec des exemples concrets et des applications pratiques immédiatement utilisables.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;