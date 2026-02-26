import { Download, GraduationCap, Briefcase, Target } from 'lucide-react';

export default function About() {
  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-gray-900 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-16">

          {/* Top Text Section */}
          <div className="space-y-6 max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              I'm a passionate Full-Stack Software Engineer with a strong focus on
              building scalable, user-centric web applications. With expertise in
              modern technologies and frameworks, I transform complex problems into
              elegant solutions.
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              My journey in software development has equipped me with a diverse skill
              set spanning frontend development, backend architecture, and database
              design. I'm committed to writing clean, maintainable code and staying
              current with industry best practices.
            </p>

            <div className="flex justify-center">
              <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg">
                <Download className="w-5 h-5" />
                <span>Download CV</span>
              </button>
            </div>
          </div>

          {/* Bottom Cards Section */}
          <div className="grid md:grid-cols-3 gap-6">

            {/* Education */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Education
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Bachelor of Science in Software Engineering
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    University of Malakand • 2021-2025
                  </p>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-cyan-600 rounded-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Experience
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    1+ years of professional software development
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    Full-Stack Development • Web Applications
                  </p>
                </div>
              </div>
            </div>

            {/* Career Goals */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Career Goals
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Building innovative solutions that make a difference
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    Leadership • Innovation • Impact
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
