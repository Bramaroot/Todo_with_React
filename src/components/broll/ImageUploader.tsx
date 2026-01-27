import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useRef } from 'react';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (imageUrl: string) => void;
  aspectRatio?: string;
  isRound?: boolean;
}

export const ImageUploader = ({
  label,
  value,
  onChange,
  aspectRatio = '9/16',
  isRound = false,
}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = (file: File, maxWidth: number, maxHeight: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Calculate new dimensions
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            const aspectRatio = width / height;
            if (width > height) {
              width = maxWidth;
              height = width / aspectRatio;
            } else {
              height = maxHeight;
              width = height * aspectRatio;
            }
          }

          // Create canvas
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Canvas context not available'));
            return;
          }

          // Draw compressed image
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to base64 with quality compression
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
          resolve(compressedBase64);
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier que c'est une image
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image valide');
        return;
      }

      try {
        // Compress image before storing (max 800x800 for profile, 1200x1200 for slides)
        const maxDimension = isRound ? 400 : 1200;
        const compressedImage = await compressImage(file, maxDimension, maxDimension);
        onChange(compressedImage);
      } catch (error) {
        console.error('Image compression error:', error);
        alert('Erreur lors de la compression de l\'image');
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        <ImageIcon className="w-4 h-4" />
        {label}
      </label>

      <div
        onClick={handleClick}
        className={`relative border-2 border-dashed border-[hsl(var(--border))] rounded-lg overflow-hidden cursor-pointer hover:border-[hsl(var(--hype-blue))] transition-all duration-300 bg-[hsl(var(--muted)/0.3)] ${
          isRound ? 'rounded-full aspect-square' : ''
        }`}
        style={{
          aspectRatio: isRound ? '1/1' : aspectRatio,
          minHeight: isRound ? '80px' : '120px',
          maxHeight: isRound ? '100px' : '150px',
        }}
      >
        {value ? (
          <>
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              onClick={handleClear}
              className="absolute top-2 right-2 p-2 bg-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive))]/80 text-white rounded-full transition-all duration-300 z-10"
              title="Supprimer l'image"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
            <Upload className="w-6 h-6 text-muted-foreground mb-1" />
            <p className="text-xs text-muted-foreground">
              Cliquez pour uploader
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 opacity-70">
              PNG, JPG, WEBP
            </p>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
