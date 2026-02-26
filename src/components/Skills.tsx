import { useState, useEffect, useRef } from 'react';
import { Code, Database, Layers, Wrench } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: typeof Code;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: Code,
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
    skills: [
      { name: 'Git / GitHub', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'AWS / Cloud', level: 70 },
      { name: 'CI/CD', level: 75 },
    ],
  },
];

function SkillBar({ name, level, isVisible }: { name: string; level: number; isVisible: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-xs font-mono text-muted-foreground">{level}%</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-accent skill-bar"
          style={{ width: isVisible ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding bg-section-alt transition-colors duration-200"
    >
      <div className="container-narrow">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16">
          <p className="text-sm font-mono font-medium tracking-widest uppercase text-accent">
            Expertise
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
            {'Skills & Technologies'}
          </h2>
          <div className="w-12 h-1 rounded-full bg-accent" />
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            A comprehensive skill set built through hands-on experience and
            continuous learning.
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="p-8 rounded-2xl bg-card border border-border/50 hover-lift"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
                </div>

                <div className="flex flex-col gap-5">
                  {category.skills.map((skill) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      isVisible={isVisible}
                    />
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
