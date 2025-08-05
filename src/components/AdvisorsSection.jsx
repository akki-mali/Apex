import { useState } from "react";
import { Users } from "lucide-react";
import AdvisorCard from "./AdvisorCard";
import Pagination from "./Pagination";
import usePagination from "../hooks/usePagination";

const AdvisorsSection = ({advisors, myBoard, onAddToBoard}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 12; // Number of advisors per page

  const filteredAdvisors = advisors.filter(advisor => 
    advisor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const {
    currentItems: currentAdvisors,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    totalItems,
    resetToFirstPage,
    setCurrentPage,
  } = usePagination(filteredAdvisors, itemsPerPage);

  // Reset to first page when search term changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    resetToFirstPage();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
        Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} advisors
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalItems={totalItems}
        startIndex={startIndex}
        endIndex={endIndex}
        itemsPerPage={itemsPerPage}
      />
    </>
  )
}

export default AdvisorsSection;