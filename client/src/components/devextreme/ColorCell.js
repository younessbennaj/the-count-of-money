import React from 'react';

export default function DiscountCell(cell) {
  return (
    <div className={cell.value > 0 ? 'inc' : 'dec' }>
      <span className="arrow"></span>
      <span>{cell.value}%</span>
    </div>
  );
}