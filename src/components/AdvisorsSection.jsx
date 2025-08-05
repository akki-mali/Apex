import { useState } from "react";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";
import AdvisorCard from "./AdvisorCard";

const AdvisorsSection = ({advisors, myBoard, onAddToBoard}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Number of advisors per page

  const filteredAdvisors = advisors.filter(advisor => 
    advisor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredAdvisors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAdvisors = filteredAdvisors.slice(startIndex, endIndex);

  // Reset to first page when search term changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 mb-6">
        <h2 className="text-3xl font-semibold text-gray-900 flex items-center gap-3 lg:mb-0 mb-4">
          <Users size={28} />
          World-Class Advisors
        </h2>
        <div className="">
          <input
            type="text"
            className="form-input w-full max-w-2xl "
            placeholder="Search advisors by name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div> 
      
      <div className="text-sm text-gray-600 mb-6">
        Showing {startIndex + 1}-{Math.min(endIndex, filteredAdvisors.length)} of {filteredAdvisors.length} advisors
        {searchTerm && ` (filtered from ${advisors.length} total)`}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentAdvisors.map((advisor) => (
          <AdvisorCard 
            key={advisor.id} 
            advisor={advisor}
            isInBoard={myBoard.some(a => a.id === advisor.id)}
            onAddToBoard={onAddToBoard}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <>
          {/* Mobile Pagination - Simple with count */}
          <div className="flex items-center justify-center gap-4 mb-8 sm:hidden">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-10 h-10 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="text-sm font-medium text-gray-700">
              {currentPage} of {totalPages}
            </div>
            
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-10 h-10 text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Desktop Pagination - Full with page numbers */}
          <div className="hidden sm:flex items-center justify-center gap-2 mb-8">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>

            {/* Page Numbers - Responsive with ellipses */}
            <div className="flex items-center gap-1 flex-wrap justify-center">
              {(() => {
                const pages = [];
                const visiblePages = new Set();
                
                // Always add first page
                pages.push(
                  <button
                    key={1}
                    onClick={() => goToPage(1)}
                    className={`px-3 py-2 text-sm font-medium rounded-md min-w-[2.5rem] text-center ${currentPage === 1 ? 'bg-blue-600 text-white' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'}`}
                  >
                    1
                  </button>
                );
                visiblePages.add(1);
                
                // Add ellipsis if there's a gap after first page
                if (currentPage > 3) {
                  pages.push(<span key="start-ellipsis" className="px-2 text-gray-400">...</span>);
                }
                
                // Add pages around current page (excluding first and last)
                for (let page = Math.max(2, currentPage - 1); page <= Math.min(totalPages - 1, currentPage + 1); page++) {
                  if (!visiblePages.has(page)) {
                    pages.push(
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-md min-w-[2.5rem] text-center ${currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'}`}
                      >
                        {page}
                      </button>
                    );
                    visiblePages.add(page);
                  }
                }
                
                // Add ellipsis if there's a gap before last page
                if (currentPage < totalPages - 2) {
                  pages.push(<span key="end-ellipsis" className="px-2 text-gray-400">...</span>);
                }
                
                // Always add last page (if not already added)
                if (!visiblePages.has(totalPages)) {
                  pages.push(
                    <button
                      key={totalPages}
                      onClick={() => goToPage(totalPages)}
                      className={`px-3 py-2 text-sm font-medium rounded-md min-w-[2.5rem] text-center ${currentPage === totalPages ? 'bg-blue-600 text-white' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'}`}
                    >
                      {totalPages}
                    </button>
                  );
                }
                
                return pages;
              })()}
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default AdvisorsSection;