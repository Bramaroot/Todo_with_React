import React, { useCallback, useState } from 'react';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  aspectRatio?: string;
  className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  aspectRatio = '1/1',
  className = '',
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploading(true);

      // Simulation d'upload (Conversion en base64 pour stockage local)
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onChange(base64String);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    },
    [onChange]
  );

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-semibold text-foreground/80">{label}</label>
      
      <div 
        className={`relative group border-2 border-dashed border-[hsl(var(--border))] rounded-xl overflow-hidden hover:border-[hsl(var(--primary))] transition-all cursor-pointer bg-[hsl(var(--muted)/0.2)]`}
        style={{ aspectRatio }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
        />

        {value ? (
          <>
            <img 
              src={value} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full z-20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-[hsl(var(--primary))] animate-spin" />
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--primary)/0.1)] flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-[hsl(var(--primary))]" />
                </div>
                <div className="text-xs font-medium text-muted-foreground">
                  <span className="text-[hsl(var(--primary))]">Cliquez pour uploader</span> ou glissez-déposez
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
