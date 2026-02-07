'use client'

import cn from 'classnames';

interface ClosedTile {
  tileNumber: number;
  closedDate: Date;
}

interface TileGridProps {
  allTiles: number[];
  closedTilesData: ClosedTile[];
  onTileClick: (tileNumber: number) => void;
}

export const TileGrid = ({ allTiles, closedTilesData, onTileClick }: TileGridProps) => {
  const isSelected = (num: number): boolean => {
    return closedTilesData.some(tile => tile.tileNumber === num);
  };

  const getClosedDate = (num: number): string => {
    const tile = closedTilesData.find(tile => tile.tileNumber === num);
    if (!tile) return '';

    const date = new Date(tile.closedDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Select a Tile</h2>
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
        {allTiles.map((num) => {
          const isClosed = isSelected(num);
          return (
            <div key={num} className="relative group">
              <button
                onClick={() => onTileClick(num)}
                className={cn(
                  'w-full aspect-square rounded-xl font-bold text-lg transition-all duration-200 relative overflow-hidden',
                  {
                    'bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 dark:from-gray-800 dark:via-gray-900 dark:to-black text-white shadow-xl scale-85 ring-4 ring-gray-500 dark:ring-gray-700 hover:scale-90': isClosed,
                    'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 hover:scale-105 hover:shadow-lg border-2 border-gray-300 dark:border-gray-500': !isClosed
                  }
                )}
              >
                <span className={cn({ 'opacity-60': isClosed })}>{num}</span>

                {/* Red Crosshair for Closed Tiles */}
                {isClosed && (
                  <>
                    {/* Diagonal line from top-left to bottom-right */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute w-full h-0.5 bg-red-500/50 dark:bg-red-400/50 rotate-45 origin-center"></div>
                    </div>
                    {/* Diagonal line from top-right to bottom-left */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute w-full h-0.5 bg-red-500/50 dark:bg-red-400/50 -rotate-45 origin-center"></div>
                    </div>
                  </>
                )}
              </button>
              {/* Tooltip for closed tiles */}
              {isClosed && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  <div className="font-semibold">Closed on</div>
                  <div>{getClosedDate(num)}</div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
