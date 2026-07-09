import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Lock, Plus, Trash2, Calendar, Search } from 'lucide-react';
import {
  saveJournalEntry,
  getAllJournalEntries,
  deleteJournalEntry,
} from '@/lib/storage-utils';

export const Route = createFileRoute('/journal')({
  component: Journal,
  head: () => ({ meta: [{ title: 'Private Journal · MindSphere' }] }),
});

type ViewMode = 'list' | 'create';

function Journal() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [entries, setEntries] = useState<any[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<any>(null);

  // Load entries on mount
  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    const allEntries = getAllJournalEntries();
    setEntries(allEntries);
  };

  const handleSaveEntry = () => {
    if (!newEntry.trim()) return;

    const entryId = `journal_${Date.now()}`;
    saveJournalEntry(entryId, newEntry);

    setNewEntry('');
    setViewMode('list');
    loadEntries();
  };

  const handleDeleteEntry = (entryId: string) => {
    if (confirm('Are you sure you want to delete this entry? This action cannot be undone.')) {
      deleteJournalEntry(entryId);
      loadEntries();
      setSelectedEntry(null);
    }
  };

  const filteredEntries = entries.filter(
    (entry) =>
      entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.date.includes(searchQuery)
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lock className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-800">Private Journal</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A sacred space for your thoughts. Your entries are encrypted and stored locally on your device.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {viewMode === 'create' ? (
            // Create Entry View
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">New Journal Entry</h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What's on your mind?
                  </label>
                  <Textarea
                    value={newEntry}
                    onChange={(e) => setNewEntry(e.target.value)}
                    placeholder="Write your thoughts, feelings, and reflections here. Everything stays private..."
                    className="h-64 p-4 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {newEntry.length} characters • Encrypted automatically
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>Privacy Note:</strong> Your entry will be encrypted using a secure client-side cipher
                    before being stored. Only you can decrypt and read it.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                      setNewEntry('');
                      setViewMode('list');
                    }}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveEntry}
                    disabled={!newEntry.trim()}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white disabled:opacity-50"
                  >
                    Save Entry
                  </Button>
                </div>
              </Card>
            </motion.div>
          ) : (
            // List View
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Controls */}
              <div className="flex gap-4 items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search entries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
                  />
                </div>
                <Button
                  onClick={() => setViewMode('create')}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white gap-2 whitespace-nowrap"
                >
                  <Plus className="w-5 h-5" />
                  New Entry
                </Button>
              </div>

              {/* Entries List */}
              {filteredEntries.length === 0 ? (
                <Card className="p-12 text-center border-2 border-dashed border-gray-300">
                  <p className="text-gray-500 text-lg mb-4">
                    {entries.length === 0 ? 'No entries yet. Start writing!' : 'No entries match your search.'}
                  </p>
                  {entries.length === 0 && (
                    <Button
                      onClick={() => setViewMode('create')}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Create Your First Entry
                    </Button>
                  )}
                </Card>
              ) : (
                <div className="grid gap-4">
                  {filteredEntries.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card
                        onClick={() => setSelectedEntry(selectedEntry?.id === entry.id ? null : entry)}
                        className="p-6 border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <p className="text-sm text-gray-500">{formatDate(entry.date)}</p>
                            </div>
                            <p className="text-gray-700 line-clamp-2 leading-relaxed">
                              {entry.content}
                            </p>
                          </div>
                          <Lock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                        </div>

                        {selectedEntry?.id === entry.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-gray-200"
                          >
                            <p className="text-gray-700 whitespace-pre-wrap mb-4">{entry.content}</p>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteEntry(entry.id);
                              }}
                              variant="outline"
                              className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete Entry
                            </Button>
                          </motion.div>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Information Footer */}
              <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200">
                <h3 className="font-semibold text-gray-800 mb-3">About Your Privacy</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2">
                    <span>🔒</span>
                    <span>
                      All entries are encrypted locally using a client-side XOR cipher before storage
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span>📱</span>
                    <span>Data is stored only in your browser's local storage—never uploaded anywhere</span>
                  </li>
                  <li className="flex gap-2">
                    <span>🗑️</span>
                    <span>Clearing browser data will permanently delete your journal entries</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✨</span>
                    <span>This is your private space—write freely and authentically</span>
                  </li>
                </ul>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
