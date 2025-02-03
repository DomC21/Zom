import { type FC } from 'react';
import { Github, Twitter } from 'lucide-react';

export const Footer: FC = () => {
    return (
        <footer className="mt-auto py-8 bg-black/95 backdrop-blur-md border-t border-accent/10">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <span className="text-heading-4 font-bold bg-gradient-to-r from-accent to-accent-light text-transparent bg-clip-text">
                            Zom AI
                        </span>
                        <p className="text-small text-muted text-center md:text-left">
                            AI-powered stock analysis and insights platform
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/DomC21/neural-network-trading-system"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-muted hover:text-accent transition-colors"
                            aria-label="GitHub Repository"
                        >
                            <Github className="w-6 h-6" />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-muted hover:text-accent transition-colors"
                            aria-label="Twitter Profile"
                        >
                            <Twitter className="w-6 h-6" />
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-accent/10">
                    <p className="text-tiny text-muted text-center">
                        © {new Date().getFullYear()} Zom AI. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
