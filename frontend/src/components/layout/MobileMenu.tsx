import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-muted hover:text-accent transition-colors"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {isOpen && (
                <>
                    <div 
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />
                    <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-accent/10 z-50">
                        <nav className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-4">
                            <button 
                                className="text-body text-muted hover:text-accent transition-all duration-300 w-full text-left py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Coaching
                            </button>
                            <button 
                                className="text-body text-muted hover:text-accent transition-all duration-300 w-full text-left py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Projects
                            </button>
                            <button 
                                className="text-body text-muted hover:text-accent transition-all duration-300 w-full text-left py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Contact
                            </button>
                        </nav>
                    </div>
                </>
            )}
        </div>
    );
}
