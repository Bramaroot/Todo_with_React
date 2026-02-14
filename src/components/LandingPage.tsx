import { Sparkles, Layers, ArrowRight, Zap, Palette, Share2 } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: 'carousel') => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-[calc(100-4rem)] flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 pt-20 pb-16 flex flex-col items-center text-center overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 -z-10 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[hsl(var(--primary))] opacity-10 blur-[100px] rounded-full animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[hsl(var(--secondary))] opacity-20 blur-[120px] rounded-full animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="animate-fadeIn inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 backdrop-blur border border-white/5 text-xs font-medium text-[hsl(var(--primary))] mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Le créateur de carrousels le plus rapide</span>
        </div>

        <h1 className="animate-fadeIn text-5xl md:text-7xl font-black mb-6 tracking-tight [animation-delay:200ms] text-white">
          Dominez LinkedIn avec des <br />
          <span className="gradient-text">Carrousels Premium</span>
        </h1>
        
        <p className="animate-fadeIn text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 [animation-delay:400ms]">
          Transformez vos idées en carrousels élégants et engageants en quelques secondes. 
          Conçu pour les créateurs qui veulent un impact maximal.
        </p>

        <div className="animate-fadeIn flex flex-wrap justify-center gap-4 [animation-delay:600ms]">
          <button 
            onClick={() => onNavigate('carousel')}
            className="group px-8 py-4 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.9)] text-black rounded-xl font-bold transition-all hover:scale-105 flex items-center gap-2 shadow-lg"
          >
            Créer mon premier carrousel
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Main Tool Preview Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-12">
        <div 
          onClick={() => onNavigate('carousel')}
          className="group cursor-pointer glass-card p-10 rounded-[2rem] transition-all hover:border-[hsl(var(--primary))/0.3] relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 text-[hsl(var(--primary))]">
            <Layers className="w-64 h-64" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--primary)/0.2)] flex items-center justify-center mb-6">
                <Layers className="w-10 h-10 text-[hsl(var(--primary))]" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white">Carousel Builder Pro</h3>
              <p className="text-muted-foreground text-lg mb-8">
                Un outil complet pour concevoir, personnaliser et exporter vos carrousels. 
                Utilisez le Markdown pour rédiger rapidement et laissez notre moteur s'occuper du design.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[hsl(var(--primary))]" />
                  <span className="font-medium">Édition Markdown</span>
                </div>
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[hsl(var(--primary))]" />
                  <span className="font-medium">Multi-thèmes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-[hsl(var(--primary))]" />
                  <span className="font-medium">Export PDF HD</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[hsl(var(--primary))]" />
                  <span className="font-medium">Styles Cyber-Tech</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 text-xl font-bold text-[hsl(var(--primary))] group-hover:gap-4 transition-all">
                Lancer le Builder <ArrowRight className="w-6 h-6" />
              </div>
            </div>

            <div className="w-full md:w-72 aspect-[4/5] bg-secondary/80 rounded-2xl border border-white/10 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500 overflow-hidden backdrop-blur">
               {/* Decorative card representation */}
               <div className="h-1/3 bg-gradient-primary p-6 flex items-end">
                  <div className="w-full h-4 bg-black/40 rounded-full" />
               </div>
               <div className="p-6 space-y-4">
                  <div className="w-full h-2 bg-white/10 rounded-full" />
                  <div className="w-5/6 h-2 bg-white/10 rounded-full" />
                  <div className="w-4/6 h-2 bg-white/10 rounded-full" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-12 px-4 mt-auto bg-secondary/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center font-black text-black text-xs">
              H
            </div>
            <span className="font-bold text-white tracking-tight">Hype Tools</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Hype Technologies. Spécialiste du contenu carrousel.
          </p>
        </div>
      </footer>
    </div>
  );
}
