import { type FC } from 'react';
import { MobileMenu } from './MobileMenu';

export const Navigation: FC = () => {
    return (
        <header className="fixed top-0 left-0 right-0 h-20 bg-black/95 backdrop-blur-md border-b border-accent/10 z-50">
            <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
                <span className="text-heading-4 font-bold bg-gradient-to-r from-accent to-accent-light text-transparent bg-clip-text">
                    Zom AI
                </span>

                <nav className="hidden md:flex items-center gap-8">
                    <button className="text-body text-muted hover:text-accent transition-all duration-300 relative group">
                        Coaching
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
                    </button>
                    <button className="text-body text-muted hover:text-accent transition-all duration-300 relative group">
                        Projects
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
                    </button>
                    <button className="text-body text-muted hover:text-accent transition-all duration-300 relative group">
                        Contact
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
                    </button>
                </nav>

                <MobileMenu />
            </div>
        </header>
    );
}
