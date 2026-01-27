import { Download, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toPng } from 'html-to-image';

interface ExportButtonProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  filename?: string;
}

export const ExportButton = ({ canvasRef, filename = 'broll' }: ExportButtonProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    if (!canvasRef.current) {
      setError('Canvas non disponible');
      return;
    }

    setIsExporting(true);
    setError(null);

    try {
      // Attendre un peu pour que le DOM soit prêt
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Générer l'image PNG
      const dataUrl = await toPng(canvasRef.current, {
        quality: 1,
        pixelRatio: 1, // Utiliser la résolution native (1080x1920)
        cacheBust: true,
      });

      // Télécharger l'image
      const link = document.createElement('a');
      link.download = `${filename}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      // Notification de succès
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('✅ Export réussi!', {
          body: 'Votre image B-Roll a été téléchargée avec succès',
        });
      }
    } catch (err) {
      console.error('Erreur lors de l\'export:', err);
      setError('Erreur lors de l\'export. Veuillez réessayer.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleExport}
        disabled={isExporting}
        className="px-6 py-3 bg-[hsl(var(--hype-blue))] hover:bg-[hsl(var(--hype-neonBlue))] text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-hype-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 text-lg"
      >
        {isExporting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Export en cours...
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            Exporter en PNG (1080x1920)
          </>
        )}
      </button>

      {error && (
        <p className="text-sm text-[hsl(var(--destructive))] text-center">
          {error}
        </p>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Format optimisé pour TikTok, Instagram Stories et Facebook
      </p>
    </div>
  );
};
