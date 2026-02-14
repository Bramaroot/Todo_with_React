import { Sparkles, Layers, ArrowRight, Zap, Palette, Share2, MousePointer2 } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: 'broll' | 'carousel') => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-[calc(100-4rem)] flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 pt-20 pb-16 flex flex-col items-center text-center overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 -z-10 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[hsl(var(--primary))] opacity-10 blur-[100px] rounded-full animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[hsl(var(--secondary))] opacity-10 blur-[120px] rounded-full animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="animate-fadeIn inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--muted))] border border-[hsl(var(--border))] text-xs font-medium text-[hsl(var(--primary))] mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Nouveauté : Générateur de B-Roll 2.0</span>
        </div>

        <h1 className="animate-fadeIn text-5xl md:text-7xl font-black mb-6 tracking-tight [animation-delay:200ms]">
          Transformez vos idées en <br />
          <span className="gradient-text">Contenu Viral</span>
        </h1>
        
        <p className="animate-fadeIn text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 [animation-delay:400ms]">
          La suite d'outils créatifs conçue pour les créateurs modernes. 
          Créez des carrousels élégants et des visuels B-Roll impactants en quelques secondes.
        </p>

        <div className="animate-fadeIn flex flex-wrap justify-center gap-4 [animation-delay:600ms]">
          <button 
            onClick={() => onNavigate('carousel')}
            className="group px-8 py-4 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.9)] text-[hsl(var(--primary-foreground))] rounded-xl font-bold transition-all hover:scale-105 shadow-glow flex items-center gap-2"
          >
            Commencer à créer
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a 
            href="#features"
            className="px-8 py-4 bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted)/0.8)] border border-[hsl(var(--border))] text-foreground rounded-xl font-bold transition-all hover:scale-105"
          >
            Voir les outils
          </a>
        </div>
      </section>

      {/* Tools Section */}
      <section id="features" className="w-full max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Carousel Tool Card */}
          <div 
            onClick={() => onNavigate('carousel')}
            className="group cursor-pointer glass-card p-8 rounded-3xl transition-all hover:border-[hsl(var(--primary))] hover:translate-y-[-4px]"
          >
            <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--primary)/0.1)] border border-[hsl(var(--primary)/0.2)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Layers className="w-8 h-8 text-[hsl(var(--primary))]" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Carousel Builder</h3>
            <p className="text-muted-foreground mb-6">
              Créez des carrousels LinkedIn et Instagram à partir de Markdown. 
              Personnalisation complète, thèmes élégants et export PDF/Images.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-[hsl(var(--accent))]" />
                <span>Conversion Markdown rapide</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Palette className="w-4 h-4 text-[hsl(var(--accent))]" />
                <span>Templates professionnels</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Share2 className="w-4 h-4 text-[hsl(var(--accent))]" />
                <span>Export multi-format</span>
              </li>
            </ul>
            <div className="inline-flex items-center gap-2 font-bold text-[hsl(var(--primary))] group-hover:gap-4 transition-all">
              Ouvrir le builder <ArrowRight className="w-5 h-5" />
            </div>
          </div>

          {/* B-Roll Tool Card */}
          <div 
            onClick={() => onNavigate('broll')}
            className="group cursor-pointer glass-card p-8 rounded-3xl transition-all hover:border-[hsl(var(--secondary))] hover:translate-y-[-4px]"
          >
            <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--secondary)/0.1)] border border-[hsl(var(--secondary)/0.2)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MousePointer2 className="w-8 h-8 text-[hsl(var(--secondary))]" />
            </div>
            <h3 className="text-2xl font-bold mb-3">B-Roll Generator</h3>
            <p className="text-muted-foreground mb-6">
              Générez des visuels 9:16 pour vos Reels et TikTok. 
              Parfait pour les citations, les titres et les accroches visuelles.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-[hsl(var(--accent))]" />
                <span>Format 9:16 optimisé</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Palette className="w-4 h-4 text-[hsl(var(--accent))]" />
                <span>Styles typographiques modernes</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Share2 className="w-4 h-4 text-[hsl(var(--accent))]" />
                <span>Téléchargement instantané</span>
              </li>
            </ul>
            <div className="inline-flex items-center gap-2 font-bold text-[hsl(var(--secondary))] group-hover:gap-4 transition-all">
              Générer un visuel <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-[hsl(var(--border))] py-12 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] flex items-center justify-center font-bold text-black text-xs">
              H
            </div>
            <span className="font-bold">Hype Tools</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Hype Technologies. Fait avec passion par Brama.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
