import { useEffect, useState } from "react";
import { Column } from "./Column";
import { BurnBarrel } from "./BurnBarrel";
import { Card } from "../../lib/types/KanbanBoard";

// ----------board component
export const Board: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(() => {
    const savedCards = localStorage.getItem('kanban-cards');
    return savedCards ? JSON.parse(savedCards) : (DEFAULT_CARDS);
  })

  //use Effect to save to local storage when card state changes 
  useEffect(()=> {
    localStorage.setItem('kanban-cards', JSON.stringify(cards))
  },[cards])

  useEffect(() => {
    const timer = setInterval(() => {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.timerRunning
            ? { ...card, timerSeconds: card.timerSeconds + 1 }
            : card
        )
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const handleTimerReset = (id: string) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, timerSeconds: 0, timerRunning: false } : card
      )
    );
  };

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
        onTimerReset={handleTimerReset}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
        onTimerReset={handleTimerReset}
      />
      <Column
        title="In progress"
        column="doing"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
        onTimerReset={handleTimerReset}
      />
      <Column
        title="Completed"
        column="done"
        headingColor="text-emerald-400"
        cards={cards}
        setCards={setCards}
        onTimerReset={handleTimerReset}
      />
      <BurnBarrel setCards={setCards} />
    </div>
  );
};



const DEFAULT_CARDS: Card[] = [
  // BACKLOG
  {
    title: "make full stack project of todo with MERN", id: "1", column: "backlog",
    timerSeconds: 0,
    timerRunning: false,
    createdAt: Date.now()
  },
  {
    title: "Watch remaining cohort video of web Dev", id: "2", column: "backlog",
    timerSeconds: 0,
    timerRunning: false,
    createdAt: Date.now()
  },
  {
    title: "Andrej karpathy LLM's lecture ", id: "3", column: "backlog",
    timerSeconds: 0,
    timerRunning: false,
    createdAt: Date.now()
  },
  {
    title: "Design Landing page of Hiking camp booking website ", id: "4", column: "backlog",
    timerSeconds: 0,
    timerRunning: false,
    createdAt: Date.now()
  },
  // TODO
  {
    title: "Python trading Bot debugging",
    id: "5",
    column: "todo",
    timerSeconds: 0,
    timerRunning: false,
    createdAt: Date.now()
  },
  {
    title: "Complete Javascript Promises blog article ", id: "6", column: "todo",
    timerSeconds: 0,
    timerRunning: false,
    createdAt: Date.now()
  },
  {
    title: "Understand Async/await and promises ", id: "7", column: "todo",
    timerSeconds: 0,
    timerRunning: false,
    createdAt: Date.now()
  },

  // DOING
  {
    title: "Backend Integration of the Task board app ",
    id: "8",
    column: "doing",
    timerSeconds: 0,
    timerRunning: false,
    createdAt: Date.now()
  },
  {
    title: "Making Kanban features", id: "9", column: "doing",
    timerSeconds: 0,
    timerRunning: false,
    createdAt: Date.now()
  },
  // DONE
  {
    title: "Complete Pending Lecture videos of Express js",
    id: "10",
    column: "done",
    timerSeconds: 0,
    timerRunning: false,
    createdAt: Date.now()
  },
];