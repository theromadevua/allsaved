import React from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const delta = 2; 
    const range = [];
    const rangeWithDots: string[] & number[] = [];

    range.push(1);

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (totalPages > 1) {
      range.push(totalPages);
    }

    const uniqueRange = Array.from(new Set(range)).sort((a, b) => a - b);

    uniqueRange.forEach((page, index) => {
      if (index > 0 && page - uniqueRange[index - 1] > 1) {
        rangeWithDots.push('...');
      }
      rangeWithDots.push(page);
    });

    return rangeWithDots;
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number' && !isLoading && page !== currentPage) {
      onPageChange(page);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.pageButton} ${styles.navButton} ${currentPage === 1 || isLoading ? styles.disabled : ''}`}
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
      >
        ← Previous
      </button>

      <div className={styles.pageNumbers}>
        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className={styles.dots}>...</span>
            ) : (
              <button
                className={`${styles.pageButton} ${Number(page) === Number(currentPage) ? styles.active : ''}`}
                onClick={() => handlePageClick(page)}
                disabled={isLoading}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      <button
        className={`${styles.pageButton} ${styles.navButton} ${currentPage === totalPages || isLoading ? styles.disabled : ''}`}
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
      >
        Next →
      </button>
    </div>
  );
};