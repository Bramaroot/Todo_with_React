import { forwardRef } from 'react';
import type { BRollSettings, BRollContent } from '../../types';
import { CANVAS_DIMENSIONS } from '../../types/broll.types';

interface BRollCanvasProps {
  settings: BRollSettings;
  content: BRollContent;
}

/**
 * Canvas de preview B-Roll (9:16 - 1080x1920)
 * Ce composant sera converti en image PNG lors de l'export
 */
export const BRollCanvas = forwardRef<HTMLDivElement, BRollCanvasProps>(
  ({ settings, content }, ref) => {
    const hasBackgroundImage = content.backgroundImage && content.backgroundImage !== '';
    const dimensions = CANVAS_DIMENSIONS[content.aspectRatio];

    return (
      <div
        ref={ref}
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#000',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Background Image */}
        {hasBackgroundImage && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${content.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}

        {/* Overlay sombre */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#000',
            opacity: settings.overlayOpacity,
          }}
        />

        {/* Zone centrale - Headline & Subheadline */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '80px',
            zIndex: 10,
          }}
        >
          {/* Headline */}
          <h1
            style={{
              fontSize: content.aspectRatio === '1:1' ? '72px' : '96px',
              fontWeight: '900',
              color: '#FFFFFF',
              textAlign: 'center',
              margin: 0,
              marginBottom: '24px',
              lineHeight: '1.1',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              maxWidth: '100%',
              wordWrap: 'break-word',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {content.headline}
          </h1>

          {/* Subheadline */}
          {content.subheadline && (
            <p
              style={{
                fontSize: content.aspectRatio === '1:1' ? '32px' : '48px',
                fontWeight: '500',
                color: settings.accentColor,
                textAlign: 'center',
                margin: 0,
                lineHeight: '1.4',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                maxWidth: '100%',
                wordWrap: 'break-word',
                display: '-webkit-box',
                WebkitLineClamp: 5,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {content.subheadline}
            </p>
          )}
        </div>

        {/* Bande inférieure - Branding */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: `rgba(0, 0, 0, ${settings.footerOpacity})`,
            backdropFilter: 'blur(10px)',
            padding: '40px 60px',
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            zIndex: 20,
          }}
        >
          {/* Photo de profil */}
          {settings.profileImage ? (
            <img
              src={settings.profileImage}
              alt={settings.name}
              style={{
                width: content.aspectRatio === '1:1' ? '80px' : '120px',
                height: content.aspectRatio === '1:1' ? '80px' : '120px',
                borderRadius: '50%',
                border: `4px solid ${settings.accentColor}`,
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
          ) : (
            <div
              style={{
                width: content.aspectRatio === '1:1' ? '80px' : '120px',
                height: content.aspectRatio === '1:1' ? '80px' : '120px',
                borderRadius: '50%',
                border: `4px solid ${settings.accentColor}`,
                backgroundColor: settings.accentColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#FFF',
                flexShrink: 0,
              }}
            >
              {settings.name.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Nom et Poste */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3
              style={{
                fontSize: content.aspectRatio === '1:1' ? '32px' : '42px',
                fontWeight: '700',
                color: '#FFFFFF',
                margin: 0,
                marginBottom: '8px',
                lineHeight: '1.2',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {settings.name}
            </h3>
            <p
              style={{
                fontSize: content.aspectRatio === '1:1' ? '24px' : '32px',
                fontWeight: '400',
                color: settings.accentColor,
                margin: 0,
                lineHeight: '1.2',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {settings.position}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

BRollCanvas.displayName = 'BRollCanvas';
