import { Code, Database, Layers, Wrench } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: typeof Code;
  color: string;
  skills: Skill[];
}

export default function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend',
      icon: Code,
      color: 'blue',
      skills: [
        { name: 'React / Next.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'HTML5 / CSS3', level: 95 },
      ],
    },
    {
      title: 'Backend',
      icon: Layers,
      color: 'cyan',
      skills: [
        { name: 'Node.js / Express', level: 85 },
        { name: 'Python / Django', level: 80 },
        { name: 'REST APIs', level: 90 },
        { name: 'GraphQL', level: 75 },
      ],
    },
    {
      title: 'Database',
      icon: Database,
      color: 'blue',
      skills: [
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 80 },
        { name: 'Supabase', level: 90 },
        { name: 'Redis', level: 70 },
      ],
    },
    {
      title: 'Tools & Others',
      icon: Wrench,
      color: 'cyan',
      skills: [
        { name: 'Git / GitHub', level: 90 },
        { name: 'Docker', level: 75 },
        { name: 'AWS / Cloud', level: 70 },
        { name: 'CI/CD', level: 75 },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive skill set built through years of hands-on experience and
            continuous learning
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div
                    className={`p-3 bg-${category.color}-600 rounded-lg`}
                    style={{
                      backgroundColor:
                        category.color === 'blue' ? '#2563eb' : '#0891b2',
                    }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIdx) => (
                    <div key={skillIdx}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {skill.name}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
