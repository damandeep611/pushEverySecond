
import { DropIndicator } from './DropIndicator';
import { CardProps } from '../../lib/types/KanbanBoard';
import { Clock, Pause, Play, StopCircle } from 'lucide-react';
import React from 'react';

export const TaskCard: React.FC<CardProps> = ({
  title,
  id,
  column,
  handleDragStart,
  timerSeconds,
  timerRunning,
  handleTimerToggle,
  handleTimerReset,
  compltedAt,
  createdAt,
}) => {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
;
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  }

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <div
        
        draggable="true"
        onDragStart={(e: React.DragEvent<HTMLDivElement>) => handleDragStart(e, { title, id, column, timerSeconds, timerRunning, compltedAt, createdAt })}
        className="cursor-grab rounded-lg border border-neutral-700 bg-neutral-800  p-4 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
        {/* task created at */}
        <div className='mt-2 text-xs text-neutral-500'>
          <Clock size={12} className='inline mr-1'/>
          Created: {formatDate(createdAt)}
        </div>
        {/* timer for donig column */}
        {column === "doing" && (
          <div className="mt-2">
            <p className="text-xs text-neutral-400">{formatTime(timerSeconds)}</p>
            <div className="mt-1 flex space-x-2">
              <button onClick={() => handleTimerToggle(id)} className="text-xs text-blue-400 hover:text-blue-300">
                {timerRunning ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button onClick={() => handleTimerReset(id)} className="text-xs text-red-400 hover:text-red-300">
                <StopCircle size={14} />
              </button>
            </div>
          </div>
        )}
        {/* completion time for 'done' column */}
        {column === 'done' && compltedAt && (
          <div className='mt-2 text-xs text-emerald-300'>
            Task Completed in: {formatTime(compltedAt)}
          </div>
        )}
      </div>
    </>
  );
};
