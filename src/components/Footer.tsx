import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            SUBHAN ULLAH
          </p>
          <p className="text-gray-400">Full-Stack Software Engineer</p>
          <div className="flex items-center justify-center space-x-1 text-gray-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>by Subhan Ullah</span>
          </div>
          <p className="text-sm text-gray-500">
            © {currentYear} Subhan Ullah. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
