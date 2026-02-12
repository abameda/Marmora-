'use client';

import { useState, useEffect, useRef } from 'react';
import BucketListItem from '@/components/BucketListItem';

interface BucketListItemType {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export default function BucketListPage() {
  const [items, setItems] = useState<BucketListItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [adding, setAdding] = useState(false);
  const itemsRef = useRef<BucketListItemType[]>([]);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/bucket-list');
      const data = await response.json();
      const fetchedItems = data.items || [];
      
      if (JSON.stringify(fetchedItems) !== JSON.stringify(itemsRef.current)) {
        setItems(fetchedItems);
        itemsRef.current = fetchedItems;
      }
    } catch (error) {
      console.error('Failed to fetch bucket list items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();

    const interval = setInterval(fetchItems, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTitle.trim() || adding) return;

    const tempId = `temp-${Date.now()}`;
    const optimisticItem: BucketListItemType = {
      id: tempId,
      title: newTitle.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setItems(prev => [optimisticItem, ...prev]);
    setAdding(true);

    try {
      const response = await fetch('/api/bucket-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle.trim() }),
      });

      if (!response.ok) throw new Error('Failed to create item');

      const data = await response.json();
      setItems(prev =>
        prev.map(item => (item.id === tempId ? data.item : item))
      );
      itemsRef.current = items.map(item => (item.id === tempId ? data.item : item));
      setNewTitle('');
    } catch (error) {
      console.error('Failed to add item:', error);
      setItems(prev => prev.filter(item => item.id !== tempId));
      alert('Failed to add item. Please try again.');
    } finally {
      setAdding(false);
    }
  };

  const handleToggle = async (id: string) => {
    const previousItems = [...items];
    
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );

    try {
      const response = await fetch(`/api/bucket-list/${id}`, {
        method: 'PATCH',
      });

      if (!response.ok) throw new Error('Failed to toggle item');
    } catch (error) {
      console.error('Failed to toggle item:', error);
      setItems(previousItems);
      alert('Failed to update item. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    const previousItems = [...items];
    
    setItems(prev => prev.filter(item => item.id !== id));

    try {
      const response = await fetch(`/api/bucket-list/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete item');
    } catch (error) {
      console.error('Failed to delete item:', error);
      setItems(previousItems);
      alert('Failed to delete item. Please try again.');
    }
  };

  const todoItems = items.filter(item => !item.completed);
  const doneItems = items.filter(item => item.completed);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          Our Bucket List
        </h1>

        <form onSubmit={handleAdd} className="mb-12">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's your next dream adventure?"
              className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
              disabled={adding}
            />
            <button
              type="submit"
              disabled={!newTitle.trim() || adding}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              {adding ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>

        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-pulse space-y-4 text-center">
              <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-gray-600 dark:text-gray-400">
                Loading your dreams...
              </p>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            <p className="text-lg">
              Start your adventure list! Add your first dream together 🌟
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {todoItems.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
                  To Do <span className="text-violet-600">({todoItems.length})</span>
                </h2>
                <div className="space-y-3">
                  {todoItems.map(item => (
                    <BucketListItem
                      key={item.id}
                      item={item}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )}

            {doneItems.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
                  Done <span className="text-green-600">({doneItems.length})</span>
                </h2>
                <div className="space-y-3">
                  {doneItems.map(item => (
                    <BucketListItem
                      key={item.id}
                      item={item}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

