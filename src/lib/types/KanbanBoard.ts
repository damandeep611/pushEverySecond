
export interface Card {
  id: string;
  title: string;
  column: string;
  timerSeconds: number;
  timerRunning: boolean;
  compltedAt?: number; //time when task was complted
  createdAt: number; // time when task was crated 
}

export interface ColumnProps {
  title: string;
  column: string;
  headingColor: string;
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  onTimerReset: (id: string)=> void; // the props type is a function
}

export interface CardProps extends Card {
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: Card) => void;
  handleTimerToggle: (id: string) => void;
  handleTimerReset: (id: string) => void;
}

export interface DropIndicatorProps {
  beforeId: string | null;
  column: string;
}

export interface BurnBarrelProps {
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

export interface AddCardProps {
  column: string;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}