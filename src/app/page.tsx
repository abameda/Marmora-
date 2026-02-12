import Link from 'next/link';
import CountdownTimer from '@/components/CountdownTimer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 sm:pb-24">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-2">
              Abdelhmeed <span className="text-violet-600 dark:text-violet-400">💜</span> Maryam
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mt-4">
              Our journey together
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 sm:p-12 mb-12 sm:mb-16 border border-gray-200 dark:border-gray-800">
            <CountdownTimer startDate="2026-02-09" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <Link href="/gallery">
              <div className="group cursor-pointer h-full">
                <div className="bg-gradient-to-br from-violet-500 to-violet-600 dark:from-violet-600 dark:to-violet-700 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="text-5xl mb-4">📸</div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Gallery</h2>
                  <p className="text-violet-100 text-sm mt-2">Memories in pictures</p>
                </div>
              </div>
            </Link>

            <Link href="/memories">
              <div className="group cursor-pointer h-full">
                <div className="bg-gradient-to-br from-red-500 to-pink-600 dark:from-red-600 dark:to-pink-700 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="text-5xl mb-4">💕</div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">Memories</h2>
                  <p className="text-red-100 text-sm mt-2">Cherished moments</p>
                </div>
              </div>
            </Link>

            <Link href="/bucket-list">
              <div className="group cursor-pointer h-full">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="text-5xl mb-4">⭐</div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">Bucket List</h2>
                  <p className="text-amber-100 text-sm mt-2">Dreams to achieve</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
