import { useState, useMemo } from 'react';

const usePagination = (items, itemsPerPage = 12) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);

    return {
      currentItems,
      currentPage,
      totalPages,
      startIndex,
      endIndex,
      totalItems: items.length,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    };
  }, [items, currentPage, itemsPerPage]);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, paginationData.totalPages)));
  };

  const goToNextPage = () => {
    if (paginationData.hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (paginationData.hasPreviousPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const resetToFirstPage = () => {
    setCurrentPage(1);
  };

  return {
    ...paginationData,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    resetToFirstPage,
    setCurrentPage,
  };
};

export default usePagination; 