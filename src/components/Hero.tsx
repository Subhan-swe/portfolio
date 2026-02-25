import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';
import profilePic from '../subhanp.jpeg';

export default function Hero() {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8 animate-fadeIn">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 p-1 animate-float flex items-center justify-center">
                <img src={profilePic} alt="Subhan" className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-900"></div>
            </div>
          </div>

          <div className="space-y-4">

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white">
              SUBHAN  ULLAH
            </h1>
            <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-semibold">
              Full-Stack Software Engineer
            </p>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              As a Software Engineer, I turn complex problems into seamless, enjoyable experiences, 
              combining creativity and technology to build elegant, functional applications
            </p>
          </div>

          <div className="flex items-center justify-center space-x-4 pt-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </a>
          </div>

          <div className="pt-8">
            <button
              onClick={scrollToAbout}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get to Know Me
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-gray-400 dark:text-gray-600" />
      </div>
    </section>
  );
}
