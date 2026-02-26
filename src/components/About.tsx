import { Download, GraduationCap, Briefcase, Target } from 'lucide-react';

const infoCards = [
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Bachelor of Science in Software Engineering',
    detail: 'University of Malakand | 2021 - 2025',
  },
  {
    icon: Briefcase,
    title: 'Experience',
    description: '1+ years of professional software development',
    detail: 'Full-Stack Development | Web Applications',
  },
  {
    icon: Target,
    title: 'Career Goals',
    description: 'Building innovative solutions that make a difference',
    detail: 'Leadership | Innovation | Impact',
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="section-padding bg-background transition-colors duration-200"
    >
      <div className="container-narrow">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16">
          <p className="text-sm font-mono font-medium tracking-widest uppercase text-accent">
            About
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
            A little about me
          </h2>
          <div className="w-12 h-1 rounded-full bg-accent" />
        </div>

        <div className="flex flex-col gap-16">
          {/* Bio */}
          <div className="grid md:grid-cols-5 gap-10">
            <div className="md:col-span-3 flex flex-col gap-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {`I'm a passionate Full-Stack Software Engineer with a strong focus on
                building scalable, user-centric web applications. With expertise in
                modern technologies and frameworks, I transform complex problems into
                elegant solutions.`}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My journey in software development has equipped me with a diverse skill
                set spanning frontend development, backend architecture, and database
                design. {`I'm committed to writing clean, maintainable code and staying
                current with industry best practices.`}
              </p>
              <div className="pt-2">
                <button className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20">
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="md:col-span-2 flex flex-col gap-4">
              {[
                { label: 'Projects Completed', value: '15+' },
                { label: 'Technologies', value: '20+' },
                { label: 'Happy Clients', value: '10+' },
                { label: 'Years Learning', value: '4+' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between p-4 rounded-xl bg-section-alt border border-border/50"
                >
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {infoCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="group p-6 rounded-2xl bg-section-alt border border-border/50 hover-lift cursor-default"
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-semibold text-foreground">
                        {card.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {card.description}
                      </p>
                      <p className="text-xs text-muted-foreground/60 font-mono mt-1">
                        {card.detail}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
