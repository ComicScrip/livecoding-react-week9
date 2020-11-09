import React from 'react';

export default ({ fieldToSortBy, sortOrder, activeSort, onClick }) => {
  const fieldToSortByWithOrder = `${fieldToSortBy} ${sortOrder}`;
  const handleClick = () => {
    onClick(fieldToSortByWithOrder);
  };
  return (
    <span
      className={`sort-button${
        activeSort === fieldToSortByWithOrder ? ' active' : ''
      }`}
      onClick={handleClick}
      aria-hidden="true"
    >
      <i className={`fas fa-arrow-${sortOrder === 'DESC' ? 'up' : 'down'}`} />
    </span>
  );
};
