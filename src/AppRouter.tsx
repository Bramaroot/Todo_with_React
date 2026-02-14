import { useState } from 'react';
import { Layers, Home, Menu, X } from 'lucide-react';
import LandingPage from './components/LandingPage';
import CarouselBuilder from './CarouselBuilder';

type Page = 'home' | 'carousel';

function AppRouter() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [
    {
      id: 'home' as Page,
      name: 'Accueil',
      icon: Home,
    },
    {
      id: 'carousel' as Page,
      name: 'Carrousels',
      icon: Layers,
    },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'carousel':
        return <CarouselBuilder />;
      case 'home':
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 glass-card border-b border-[hsl(var(--border))/0.5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setCurrentPage('home')}
            >
              <div className="w-9 h-9 rounded-xl bg-[hsl(var(--primary))] flex items-center justify-center font-black text-black group-hover:scale-110 transition-transform shadow-lg">
                H
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-black tracking-tight leading-none text-white">
                  HYPE TOOLS
                </h1>
                <span className="text-[10px] uppercase tracking-widest text-[hsl(var(--primary))] font-black">
                  Creative Suite
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all flex items-center gap-2 ${
                    currentPage === item.id
                      ? 'bg-[hsl(var(--primary))/0.1] text-[hsl(var(--primary))]'
                      : 'text-muted-foreground hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-xl text-foreground hover:bg-[hsl(var(--muted)/0.5)] transition-colors"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--card))] animate-fadeIn">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-3 ${
                    currentPage === item.id
                      ? 'bg-[hsl(var(--primary))] text-black'
                      : 'text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--muted)/0.5)]'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="relative">
        {renderPage()}
      </main>
    </div>
  );
}

export default AppRouter;
