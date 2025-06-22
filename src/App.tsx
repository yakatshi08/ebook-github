import React, { useState } from 'react';
import Cover from './components/Cover';
import TableOfContents from './components/TableOfContents';
import Chapter from './components/Chapter';
import Navigation from './components/Navigation';
import SignatureDemo from './components/SignatureDemo';
import { ebookData } from './data/ebookData';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [showSignatureDemo, setShowSignatureDemo] = useState(false);
  const totalPages = ebookData.chapters.length + 2; // +2 for cover and TOC

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    if (showSignatureDemo) {
      return <SignatureDemo />;
    }
    
    if (currentPage === 0) {
      return <Cover onStart={() => setCurrentPage(1)} />;
    } else if (currentPage === 1) {
      return <TableOfContents chapters={ebookData.chapters} onSelectChapter={(index) => goToPage(index + 2)} />;
    } else {
      const chapterIndex = currentPage - 2;
      return <Chapter chapter={ebookData.chapters[chapterIndex]} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo toggle button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowSignatureDemo(!showSignatureDemo)}
          className="bg-[#0C1C44] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#1A2A5B] transition-colors"
        >
          {showSignatureDemo ? 'Retour eBook' : 'Voir Signature'}
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {renderCurrentPage()}
        {currentPage > 0 && !showSignatureDemo && (
          <Navigation
            currentPage={currentPage}
            totalPages={totalPages}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
            onGoToPage={goToPage}
          />
        )}
      </div>
    </div>
  );
}

export default App;