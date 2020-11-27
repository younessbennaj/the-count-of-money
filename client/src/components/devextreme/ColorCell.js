import React from 'react';

export default function DiscountCell(cell) {
  return (
    <div className={cell.column.caption === 'High 24h' ? 'inc' : 'dec' }>
      <span className="arrow"></span>
      <span>{(0.84 * cell.value).toFixed(3)}€</span>
    </div>
  );
}