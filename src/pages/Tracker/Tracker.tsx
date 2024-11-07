import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import {
  Plus,
  MoreHorizontal,
  MessageSquare,
  Paperclip,
  Calendar,
} from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Types
interface Task {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  category: string;
  createdAt: string;
  completedAt?: string;
  assignees: string[];
  comments: number;
  attachments: number;
  dueDate: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface DragItem {
  type: string;
  id: string;
  index: number;
  columnId: string;
}

// Add new TaskCard component
const TaskCard = ({
  task,
  index,
  columnId,
}: {
  task: Task;
  index: number;
  columnId: string;
}) => {
  const calculateTimeToComplete = (task: Task) => {
    if (!task.completedAt) return null;
    return formatDistanceToNow(parseISO(task.createdAt), { addSuffix: true });
  };

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { type: "TASK", id: task.id, index, columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <motion.div
      ref={drag}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isDragging ? 0.5 : 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white border rounded-lg p-4 shadow-sm"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`px-2 py-1 rounded text-xs ${
            task.priority === "High"
              ? "bg-red-100 text-red-700"
              : task.priority === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {task.priority}
        </span>
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
          {task.category}
        </span>
      </div>
      <h3 className="font-medium mb-1">{task.title}</h3>
      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            {task.comments}
          </div>
          <div className="flex items-center gap-1">
            <Paperclip className="w-4 h-4" />
            {task.attachments}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {task.dueDate ? format(parseISO(task.dueDate), "MMM d") : "No date"}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {task.assignees.map((assignee, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium"
            >
              {assignee[0]}
            </div>
          ))}
        </div>
        {task.completedAt && (
          <span className="text-xs text-gray-500">
            Completed {calculateTimeToComplete(task)}
          </span>
        )}
      </div>
    </motion.div>
  );
};

// Add new Column component
const Column = ({
  column,
  moveTask,
  setIsAddingTask,
}: {
  column: Column;
  moveTask: (
    dragIndex: number,
    hoverIndex: number,
    sourceColumn: string,
    targetColumn: string
  ) => void;
  setIsAddingTask: (value: boolean) => void;
}) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item: DragItem) => {
      if (item.columnId !== column.id) {
        moveTask(item.index, column.tasks.length, item.columnId, column.id);
      }
    },
    hover: (item: DragItem) => {
      if (item.columnId !== column.id) {
        moveTask(item.index, column.tasks.length, item.columnId, column.id);
        item.index = column.tasks.length;
        item.columnId = column.id;
      }
    },
  });

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold">{column.title}</h2>
          <span className="bg-gray-100 px-2 py-1 rounded text-sm">
            {column.tasks.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => column.id === "todo" && setIsAddingTask(true)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div ref={drop} className="p-4 space-y-4 min-h-[200px]">
        <AnimatePresence>
          {column.tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              index={index}
              columnId={column.id}
            />
          ))}
        </AnimatePresence>
      </div>

      {column.id === "todo" && (
        <button
          onClick={() => setIsAddingTask(true)}
          className="w-full p-2 text-gray-500 hover:bg-gray-50 text-sm flex items-center justify-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Card
        </button>
      )}
    </div>
  );
};

export default function Tracker() {
  const [columns, setColumns] = useState<Column[]>(() => {
    const saved = localStorage.getItem("kanban-tasks");
    return saved
      ? JSON.parse(saved)
      : [
          { id: "todo", title: "TO DO", tasks: [] },
          { id: "doing", title: "DOING", tasks: [] },
          { id: "review", title: "IN REVIEW", tasks: [] },
        ];
  });

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium" as Task["priority"],
    category: "",
    dueDate: "",
  });

  useEffect(() => {
    localStorage.setItem("kanban-tasks", JSON.stringify(columns));
  }, [columns]);

  const moveTask = (
    dragIndex: number,
    hoverIndex: number,
    sourceColumnId: string,
    targetColumnId: string
  ) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      const sourceColumn = newColumns.find((col) => col.id === sourceColumnId);
      const targetColumn = newColumns.find((col) => col.id === targetColumnId);

      if (!sourceColumn || !targetColumn) return prevColumns;

      const [movedTask] = sourceColumn.tasks.splice(dragIndex, 1);

      // Add completedAt when moved to review
      if (targetColumnId === "review" && !movedTask.completedAt) {
        movedTask.completedAt = new Date().toISOString();
      }

      targetColumn.tasks.splice(hoverIndex, 0, movedTask);

      return newColumns;
    });
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      createdAt: new Date().toISOString(),
      assignees: [],
      comments: 0,
      attachments: 0,
      dueDate: newTask.dueDate
        ? new Date(newTask.dueDate).toISOString()
        : new Date().toISOString(),
    };

    setColumns(
      columns.map((col) =>
        col.id === "todo" ? { ...col, tasks: [...col.tasks, task] } : col
      )
    );

    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      category: "",
      dueDate: "",
    });
    setIsAddingTask(false);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <DndProvider backend={HTML5Backend}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              moveTask={moveTask}
              setIsAddingTask={setIsAddingTask}
            />
          ))}
        </div>
      </DndProvider>

      {/* Add Task Modal */}
      <AnimatePresence>
        {isAddingTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
            >
              <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Task title"
                  className="w-full p-2 border rounded"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                />
                <textarea
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                />
                <select
                  className="w-full p-2 border rounded"
                  value={newTask.priority}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      priority: e.target.value as Task["priority"],
                    })
                  }
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
                <input
                  type="text"
                  placeholder="Category"
                  className="w-full p-2 border rounded"
                  value={newTask.category}
                  onChange={(e) =>
                    setNewTask({ ...newTask, category: e.target.value })
                  }
                />
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, dueDate: e.target.value })
                  }
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsAddingTask(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addTask}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
