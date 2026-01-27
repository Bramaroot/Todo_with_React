import { useState } from 'react';
import { CheckSquare, Layers, Menu, X } from 'lucide-react';
import AppEnhanced from './AppEnhanced';
import CarouselBuilder from './CarouselBuilder';

type Page = 'todo' | 'broll';

function AppRouter() {
  const [currentPage, setCurrentPage] = useState<Page>('todo');
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [
    {
      id: 'todo' as Page,
      name: 'Todo App',
      icon: CheckSquare,
      description: 'Gérez vos tâches',
    },
    {
      id: 'broll' as Page,
      name: 'Carousel Builder',
      icon: Layers,
      description: 'Créez des carrousels',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[hsl(var(--card))]/95 backdrop-blur-sm border-b border-[hsl(var(--border))] shadow-hype">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(var(--hype-blue))] to-[hsl(var(--hype-yellow))] flex items-center justify-center font-bold text-white">
                H
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold gradient-hype-text">
                  Hype Tools
                </h1>
                <p className="text-xs text-muted-foreground">
                  Productivité & Création
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                    currentPage === item.id
                      ? 'bg-[hsl(var(--hype-blue))] text-white shadow-hype-glow'
                      : 'text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--muted)/0.3)]'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-foreground hover:bg-[hsl(var(--muted)/0.3)] transition-colors"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--card))]">
            <div className="px-4 py-3 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-3 ${
                    currentPage === item.id
                      ? 'bg-[hsl(var(--hype-blue))] text-white shadow-hype-glow'
                      : 'text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--muted)/0.3)]'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs opacity-80">{item.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <div className="relative">
        {currentPage === 'todo' && <AppEnhanced />}
        {currentPage === 'broll' && <CarouselBuilder />}
      </div>
    </div>
  );
}

export default AppRouter;
