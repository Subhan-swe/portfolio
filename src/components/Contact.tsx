import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase, ContactSubmission, isSupabaseConfigured } from '../lib/supabase';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'subhanswe@gmail.com',
    href: 'mailto:subhanswe@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+92-3239293362',
    href: 'tel:+923239293362',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Bajaur, KPK, Pakistan',
    href: null,
  },
];

const socialLinks = [
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
];

export default function Contact() {
  const [formData, setFormData] = useState<ContactSubmission>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    if (!isSupabaseConfigured) {
      // Simulate submission when Supabase is not configured
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      className="section-padding bg-background transition-colors duration-200"
    >
      <div className="container-narrow">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16">
          <p className="text-sm font-mono font-medium tracking-widest uppercase text-accent">
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
            Get In Touch
          </h2>
          <div className="w-12 h-1 rounded-full bg-accent" />
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {`Have a project in mind? Let's work together to create something amazing.`}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Info Cards */}
            <div className="flex flex-col gap-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const Wrapper = item.href ? 'a' : 'div';
                const wrapperProps = item.href
                  ? { href: item.href, className: 'group flex items-start gap-4 p-4 rounded-xl bg-section-alt border border-border/50 hover-lift cursor-pointer' }
                  : { className: 'group flex items-start gap-4 p-4 rounded-xl bg-section-alt border border-border/50' };

                return (
                  <Wrapper key={item.label} {...wrapperProps}>
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                        {item.label}
                      </span>
                      <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-200">
                        {item.value}
                      </span>
                    </div>
                  </Wrapper>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-mono font-medium tracking-widest uppercase text-muted-foreground">
                Follow Me
              </h3>
              <div className="flex gap-3">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-section-alt border border-border/50 text-muted-foreground hover:text-accent hover:border-accent/30 transition-all duration-200 hover:-translate-y-0.5"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 bg-section-alt border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/30 text-foreground placeholder:text-muted-foreground/40 text-sm transition-all duration-200"
                    placeholder="Your name"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 bg-section-alt border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/30 text-foreground placeholder:text-muted-foreground/40 text-sm transition-all duration-200"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="px-4 py-3 bg-section-alt border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/30 text-foreground placeholder:text-muted-foreground/40 text-sm resize-none transition-all duration-200"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 rounded-xl text-sm">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Message sent successfully. I will get back to you soon!</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Something went wrong. Please try again.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
