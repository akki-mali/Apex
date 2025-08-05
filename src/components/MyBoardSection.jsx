import { Star } from 'lucide-react';
import BoardAdvisorCard from './BoardAdvisorCard';
import Pagination from './Pagination';
import usePagination from '../hooks/usePagination';

const MyBoardSection = ({myBoard, onRemoveFromBoard}) => {
  const itemsPerPage = 12; 

  const {
    currentItems: currentAdvisors,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    totalItems,
    setCurrentPage,
  } = usePagination(myBoard, itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  if (myBoard.length === 0) {
    return (
      <div>
        <h2 className="text-3xl font-semibold text-gray-900 flex items-center gap-3 mb-8">
          <Star size={28} />
          My Advisory Board
        </h2>
        
        <div className="text-center py-12 text-gray-500 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium mt-4 mb-2">No advisors in your board yet</h3>
          <p>Browse the advisors section to add world-class mentors to your personal board</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 flex items-center gap-3">
          <Star size={28} />
          My Advisory Board
        </h2>
        <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
          {myBoard.length} advisor{myBoard.length !== 1 ? 's' : ''} selected
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-6">
        Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} advisors
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {currentAdvisors.map(advisor => (
          <BoardAdvisorCard 
            key={advisor.id} 
            advisor={advisor}
            onRemove={() => onRemoveFromBoard(advisor.id)}
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

export default MyBoardSection