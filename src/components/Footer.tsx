/**
 * Footer Component
 * Minimal footer with copyright and social links
 */

import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons/SocialIcons';
import { getEmail } from '@/lib/seo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border py-4 sm:py-6 px-4 sm:px-8">
      <div className="w-full flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-6">
        <div className="text-center sm:text-left">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {year} Fabio Sdringola Maranga. All rights reserved.
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground/60 mt-0.5 sm:mt-1">
            Perugia, Umbria, Italy
          </p>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="https://github.com/FabioSM46"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/fabio-sdringola-maranga/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          <a
            href={`mailto:${getEmail()}`}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
