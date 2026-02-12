'use client';

interface BucketListItemProps {
  item: { id: string; title: string; completed: boolean; createdAt: string };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function BucketListItem({ item, onToggle, onDelete }: BucketListItemProps) {
  const handleDelete = () => {
    if (confirm('Delete this item?')) {
      onDelete(item.id);
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 transition-all hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggle(item.id)}
          className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 appearance-none cursor-pointer transition-all checked:bg-gradient-to-br checked:from-violet-600 checked:to-purple-600 checked:border-transparent focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
        />
        {item.completed && (
          <svg
            className="absolute w-3 h-3 text-white pointer-events-none left-1 top-1"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="2 6 5 9 10 3" />
          </svg>
        )}
      </div>

      <span
        className={`flex-1 text-gray-900 dark:text-gray-100 transition-all ${
          item.completed
            ? 'line-through text-gray-400 dark:text-gray-600'
            : ''
        }`}
      >
        {item.title}
      </span>

      <button
        onClick={handleDelete}
        className="flex items-center justify-center w-8 h-8 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
        aria-label="Delete item"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}

