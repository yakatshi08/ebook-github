import React, { useState } from 'react';
import Cover from './components/Cover';
import TableOfContents from './components/TableOfContents';
import Chapter from './components/Chapter';
import Navigation from './components/Navigation';
import { ebookData } from './data/ebookData';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
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
      <div className="max-w-4xl mx-auto">
        {renderCurrentPage()}
        {currentPage > 0 && (
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