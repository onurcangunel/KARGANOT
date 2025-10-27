'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingBar10Props {
  rating?: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export default function RatingBar10({
  rating = 0,
  onRate,
  readonly = false,
  size = 'md',
  showNumber = true,
}: RatingBar10Props) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const handleClick = (index: number) => {
    if (!readonly && onRate) {
      onRate(index);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!readonly) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const displayRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => {
          const isFilled = index <= displayRating;
          const isHalf = index === Math.ceil(displayRating) && displayRating % 1 !== 0;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              disabled={readonly}
              className={`${
                readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
              } transition-all duration-150 ${sizeClasses[size]}`}
              aria-label={`${index} puan`}
            >
              {isHalf ? (
                <div className="relative">
                  <Star className={`${sizeClasses[size]} text-gray-300`} fill="currentColor" />
                  <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                    <Star className={`${sizeClasses[size]} text-yellow-400`} fill="currentColor" />
                  </div>
                </div>
              ) : (
                <Star
                  className={`${sizeClasses[size]} ${
                    isFilled ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                />
              )}
            </button>
          );
        })}
      </div>
      {showNumber && (
        <span className={`${textSizeClasses[size]} font-semibold text-gray-700`}>
          {displayRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
