import React from 'react';
import { ChevronLeft, ChevronRight, Home, List } from 'lucide-react';

interface NavigationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  onGoToPage: (page: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  totalPages,
  onNext,
  onPrev,
  onGoToPage
}) => {
  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-4xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Previous button */}
          <button
            onClick={onPrev}
            disabled={currentPage <= 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#0C1C44] 
                     hover:bg-[#0C1C44] hover:text-white transition-all duration-300 
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent 
                     disabled:hover:text-[#0C1C44]"
          >
            <ChevronLeft size={20} />
            Précédent
          </button>

          {/* Navigation controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onGoToPage(0)}
              className="p-2 rounded-lg text-[#0C1C44] hover:bg-[#0C1C44] hover:text-white 
                       transition-all duration-300"
              title="Couverture"
            >
              <Home size={20} />
            </button>
            
            <button
              onClick={() => onGoToPage(1)}
              className="p-2 rounded-lg text-[#0C1C44] hover:bg-[#0C1C44] hover:text-white 
                       transition-all duration-300"
              title="Table des matières"
            >
              <List size={20} />
            </button>

            {/* Page indicator */}
            <div className="bg-[#FAFAFA] px-4 py-2 rounded-lg">
              <span className="text-[#2D2D2D] font-medium">
                {currentPage === 0 ? 'Couverture' : 
                 currentPage === 1 ? 'Sommaire' : 
                 `Chapitre ${currentPage - 1}`}
              </span>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={onNext}
            disabled={currentPage >= totalPages - 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#0C1C44] 
                     hover:bg-[#0C1C44] hover:text-white transition-all duration-300 
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent 
                     disabled:hover:text-[#0C1C44]"
          >
            Suivant
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#FFD43B] h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentPage / (totalPages - 1)) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Début</span>
            <span>{Math.round((currentPage / (totalPages - 1)) * 100)}%</span>
            <span>Fin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;