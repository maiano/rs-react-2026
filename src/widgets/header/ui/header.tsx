import { Link, NavLink } from 'react-router';
import { cn } from '@/shared/lib/cn';

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-xl px-3 py-2 text-sm font-medium transition-colors',
    isActive ? 'text-primary' : 'text-foreground hover:bg-muted'
  );

const externalLinkClassName =
  'rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted';

export function Header() {
  return (
    <header className="border-b border-border/80 bg-card/80 backdrop-blur-sm">
      <div className="app-container flex min-h-16 items-center justify-between gap-4 py-3">
        <Link
          to="/characters?page=1"
          className="font-heading text-xl tracking-tight text-foreground"
        >
          Galactic Archive
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/characters?page=1" className={navLinkClassName}>
            Search
          </NavLink>

          <NavLink to="/about" className={navLinkClassName}>
            About
          </NavLink>

          <a
            href="https://sw-next-api.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className={externalLinkClassName}
          >
            Star Wars API
          </a>
        </nav>
      </div>
    </header>
  );
}
