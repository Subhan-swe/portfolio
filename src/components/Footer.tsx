import { Heart, ArrowUp } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-card border-t border-border/50 transition-colors duration-200">
      <div className="container-narrow py-16">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <span className="text-xl font-bold text-foreground tracking-tight">
              {'Subhan.'}
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Full-Stack Software Engineer building elegant, functional applications
              with modern technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono font-medium tracking-widest uppercase text-muted-foreground">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200 w-fit"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Summary */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono font-medium tracking-widest uppercase text-muted-foreground">
              Get In Touch
            </h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a
                href="mailto:subhanswe@gmail.com"
                className="hover:text-accent transition-colors duration-200"
              >
                subhanswe@gmail.com
              </a>
              <span>+92-3239293362</span>
              <span>Bajaur, KPK, Pakistan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="container-narrow py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>{`© ${currentYear} Subhan Ullah. Crafted with`}</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
