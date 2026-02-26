import { useState, useEffect } from 'react';
import { ExternalLink, Github, Loader } from 'lucide-react';
import { supabase, Project, isSupabaseConfigured } from '../lib/supabase';

const fallbackProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory management, secure payments, and an intuitive admin dashboard.',
    image_url: null,
    demo_url: '#',
    github_url: '#',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    featured: true,
    order_index: 1,
    created_at: '2024-01-01',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative project management tool featuring real-time updates, Kanban boards, and team analytics.',
    image_url: null,
    demo_url: '#',
    github_url: '#',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind'],
    featured: true,
    order_index: 2,
    created_at: '2024-02-01',
  },
  {
    id: '3',
    title: 'AI Chat Application',
    description: 'An intelligent chatbot application powered by modern LLMs with streaming responses and conversation history.',
    image_url: null,
    demo_url: '#',
    github_url: '#',
    technologies: ['React', 'Python', 'OpenAI', 'Redis'],
    featured: true,
    order_index: 3,
    created_at: '2024-03-01',
  },
  {
    id: '4',
    title: 'Portfolio & Blog CMS',
    description: 'A modern content management system for personal portfolios with a built-in blog engine and SEO optimization.',
    image_url: null,
    demo_url: '#',
    github_url: '#',
    technologies: ['Next.js', 'MDX', 'Vercel', 'TypeScript'],
    featured: true,
    order_index: 4,
    created_at: '2024-04-01',
  },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    if (!isSupabaseConfigured) {
      setProjects(fallbackProjects);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setProjects(data && data.length > 0 ? data : fallbackProjects);
    } catch {
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="projects" className="section-padding bg-background">
        <div className="container-narrow flex justify-center items-center py-20">
          <Loader className="w-6 h-6 animate-spin text-accent" />
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="section-padding bg-background transition-colors duration-200"
    >
      <div className="container-narrow">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16">
          <p className="text-sm font-mono font-medium tracking-widest uppercase text-accent">
            Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
            Featured Projects
          </h2>
          <div className="w-12 h-1 rounded-full bg-accent" />
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            A showcase of my recent work and personal projects.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl border border-border/50 bg-card overflow-hidden hover-lift"
            >
              {/* Project Image / Placeholder */}
              <div className="relative h-52 overflow-hidden bg-section-alt">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/5 to-accent/10">
                    <div className="text-accent/30 font-mono text-6xl font-bold">
                      {project.title.charAt(0)}
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Project Content */}
              <div className="p-6 flex flex-col gap-4">
                <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-mono font-medium bg-accent/10 text-accent rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted/80"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
