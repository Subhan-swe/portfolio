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
      className="min-h-screen flex items-center justify-center relative bg-background pt-20"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container-narrow relative z-10">
        <div className="flex flex-col items-center text-center gap-8 animate-fadeIn">
          {/* Profile Image */}
          <div className="relative animate-float">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full p-[3px] bg-gradient-to-br from-accent to-accent/50 animate-pulse-glow">
              <img
                src={profilePic}
                alt="Subhan Ullah"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-[3px] border-background" />
          </div>

          {/* Name and Title */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-mono font-medium tracking-widest uppercase text-accent">
                Software Engineer
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground text-balance">
                Subhan Ullah
              </h1>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed text-pretty">
              I turn complex problems into seamless, enjoyable experiences — combining
              creativity and technology to build elegant, functional applications.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {[
              { href: 'https://github.com', icon: Github, label: 'GitHub' },
              { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
              { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-muted hover:bg-accent/10 text-muted-foreground hover:text-accent transition-all duration-300 hover:-translate-y-0.5"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={scrollToAbout}
            className="px-8 py-3.5 bg-accent text-accent-foreground rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20"
          >
            Get to Know Me
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors duration-200"
          aria-label="Scroll down"
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
