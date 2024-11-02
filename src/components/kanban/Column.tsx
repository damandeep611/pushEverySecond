

import { useState } from "react";
import { Card, ColumnProps } from "../../lib/types/KanbanBoard";
import { AddCard } from "./AddCard";
import {  TaskCard } from "./TaskCard";
import { DropIndicator } from "./DropIndicator";

export const Column: React.FC<ColumnProps> = ({ title, headingColor, cards, column, setCards, }) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: Card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      // cardToTransfer = { ...cardToTransfer, column };

      //check if card is being moved form 'doing' to 'done'
      const isCompletingTask = cardToTransfer.column === 'doing' && column === 'done';

      cardToTransfer = {
        ...cardToTransfer,
        column,
        //add completion time if task is being completed
        compltedAt: isCompletingTask ? cardToTransfer.timerSeconds : undefined,
        //stop timer if task is completed
        timerRunning: isCompletingTask ? false : cardToTransfer.timerRunning
      }

      // Start the timer if the card is moved to the "doing" column
      if (column === "doing" && !cardToTransfer.timerRunning) {
        cardToTransfer.timerRunning = true;
      }

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: React.DragEvent<HTMLDivElement>, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = (): HTMLElement[] => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return (
            <TaskCard
              key={c.id}
              {...c}
              handleDragStart={handleDragStart}
              handleTimerToggle={() => {
                setCards((prevCards) =>
                  prevCards.map((card) =>
                    card.id === c.id ? { ...card, timerRunning: !card.timerRunning } : card
                  )
                );
              }}
              handleTimerReset={() => {
                setCards((prevCards) =>
                  prevCards.map((card) =>
                    card.id === c.id ? { ...card, timerSeconds: 0, timerRunning: false } : card
                  )
                );
              }}
            />
          );
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};