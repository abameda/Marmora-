import memories from '@/data/memories.json';

interface Memory {
  id: string;
  title: string;
  date: string;
  caption: string;
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString));
}

export default function MemoriesPage() {
  const typedMemories: Memory[] = memories;

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <section className="py-12 md:py-20 px-4 md:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white">
          Our Memories
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4 text-lg">
          Abdelhmeed & Maryam
        </p>
      </section>

      {typedMemories.length === 0 ? (
        <div className="flex items-center justify-center py-20 px-4">
          <div className="text-center">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Add your first memory to data/memories.json 💜
            </p>
          </div>
        </div>
      ) : (
        <section className="py-8 md:py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="hidden md:block relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-violet-600 to-violet-400 dark:from-violet-500 dark:to-violet-600"></div>

              <div className="space-y-12">
                {typedMemories.map((memory, index) => (
                  <div
                    key={memory.id}
                    className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className="w-1/2 flex justify-center">
                      <div className="w-full max-w-xs">
                        <div
                          className={`bg-white dark:bg-gray-800 rounded-lg border-2 border-violet-600 dark:border-violet-500 shadow-lg hover:shadow-xl transition-shadow p-6 relative ${
                            index % 2 === 0 ? 'mr-8' : 'ml-8'
                          }`}
                        >
                          <div className="absolute -right-12 top-6 w-6 h-6 bg-violet-600 dark:bg-violet-500 rounded-full border-4 border-white dark:border-gray-900"></div>

                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                              {memory.title}
                            </h3>
                            <p className="text-sm font-semibold text-violet-600 dark:text-violet-400 mb-3">
                              {formatDate(memory.date)}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {memory.caption}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:hidden space-y-6">
              {typedMemories.map((memory) => (
                <div
                  key={memory.id}
                  className="bg-white dark:bg-gray-800 rounded-lg border-2 border-violet-600 dark:border-violet-500 shadow-lg p-6"
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {memory.title}
                  </h3>
                  <p className="text-sm font-semibold text-violet-600 dark:text-violet-400 mb-3">
                    {formatDate(memory.date)}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {memory.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
