/**
 * Slide Canvas Component
 *
 * Renders a single slide with inline styles for export via html-to-image
 * All styles must be inline to ensure proper capture
 */

import { forwardRef } from 'react';
import { Globe, Heart, UserPlus, Quote } from 'lucide-react';
import { parseMarkdown } from '../../utils/markdownParser';
import { TECHNOLOGIES } from './TechStackSelector';
import type {
  CarouselProfile,
  CarouselSlide,
  CarouselGlobalSettings,
  ExportFormat,
} from '../../types/carousel.types';

interface SlideCanvasProps {
  profile: CarouselProfile;
  slide: CarouselSlide;
  settings: CarouselGlobalSettings;
  format: ExportFormat;
  includeProfile?: boolean;
  slideNumber?: number;
  totalSlides?: number;
}

export const SlideCanvas = forwardRef<HTMLDivElement, SlideCanvasProps>(
  ({ profile, slide, settings, format, includeProfile = false, slideNumber, totalSlides }, ref) => {
    const { width, height } = format;

    // Cyber grid SVG pattern
    const cyberGridSVG = `data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='%2318636B' stroke-width='1' opacity='0.2'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E`;

    // Generate background style based on settings
    const getBackgroundStyle = (): React.CSSProperties => {
      const base: React.CSSProperties = {
        position: 'absolute',
        inset: '0',
        zIndex: 0,
      };

      if (settings.backgroundType === 'solid') {
        // Solid background with cyber grid pattern overlay
        return {
          ...base,
          backgroundColor: settings.backgroundColor || '#0A0A0A',
          backgroundImage: `url("${cyberGridSVG}")`,
          backgroundSize: '60px 60px',
        };
      }

      if (settings.backgroundType === 'image' && settings.backgroundImage) {
        return {
          ...base,
          backgroundImage: `url(${settings.backgroundImage})`,
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
        };
      }

      if (settings.backgroundType === 'gradient') {
        const direction = {
          'to-r': 'to right',
          'to-br': 'to bottom right',
          'to-b': 'to bottom',
          'to-bl': 'to bottom left',
        }[settings.gradientDirection || 'to-br'];

        return {
          ...base,
          background: `linear-gradient(${direction}, ${settings.gradientStart || '#18636B'}, ${settings.gradientEnd || '#F9C74C'})`,
        };
      }

      // Default cyber grid background
      return {
        ...base,
        backgroundColor: '#0A0A0A',
        backgroundImage: `url("${cyberGridSVG}")`,
        backgroundSize: '60px 60px',
      };
    };

    // Font Size Mappings
    const TITLE_SIZES = {
      small: '48px',
      medium: '58px',
      large: '68px',
      xl: '88px',
    };

    const CONTENT_SIZES = {
      small: '32px',
      medium: '42px',
      large: '52px',
    };

    return (
      <div
        ref={ref}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          backgroundColor: '#000',
        }}
      >
        {/* Background Layer with Cyber Grid Default */}
        <div style={getBackgroundStyle()} />

        {/* Slide Image (if exists) */}
        {slide.image && (
          <div
            style={{
              position: 'absolute',
              inset: '0',
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.3,
              zIndex: 1,
            }}
          />
        )}

        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 2,
          }}
        />

        {/* Slide Number Badge (top left, rotated) */}
        {slideNumber !== undefined && totalSlides !== undefined && (
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '40px',
              zIndex: 15,
              background: settings.accentColor,
              padding: '20px 28px',
              borderRadius: '20px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              border: `4px solid ${settings.accentColor}`,
              transform: 'rotate(-8deg)',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                fontWeight: '900',
                color: '#000000',
                textAlign: 'center',
                lineHeight: '1',
              }}
            >
              {slideNumber}
            </div>
          </div>
        )}

        {/* Logos Section (top right) */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '40px',
            zIndex: 15,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'flex-end',
          }}
        >
          {/* Custom Logo */}
          {slide.logo && (
            <div
              style={{
                width: '240px',
                height: '240px',
                overflow: 'hidden',
                transform: 'rotate(-5deg)',
              }}
            >
              <img
                src={slide.logo}
                alt="Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          )}

          {/* Tech Stack Logos */}
          {slide.techStack && slide.techStack.length > 0 && (
            <div
              style={{
                display: 'flex',
                gap: '32px',
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
                maxWidth: '800px',
              }}
            >
              {slide.techStack.map((techId) => {
                const tech = TECHNOLOGIES.find((t) => t.id === techId);
                if (!tech) return null;
                return (
                  <div
                    key={techId}
                    style={{
                      width: '144px',
                      height: '144px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px',
                      transform: 'rotate(5deg)',
                    }}
                  >
                    <div
                      style={{ width: '100%', height: '100%', color: tech.color }}
                      dangerouslySetInnerHTML={{ __html: tech.svg }}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Content Layer */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: includeProfile ? '80px 60px 220px 60px' : '100px 60px 80px 60px',
          }}
        >
          {/* Layout: Classic (Default) */}
          {(!slide.layout || slide.layout === 'classic') && (
            <>
              <h1
                style={{
                  fontSize: TITLE_SIZES[slide.titleSize || 'large'],
                  fontWeight: '700',
                  color: '#FFFFFF',
                  textAlign: (slide.titleAlignment || 'left') as any,
                  lineHeight: '1.15',
                  marginBottom: '40px',
                  marginTop: '-10px',
                  paddingLeft: slide.titleAlignment === 'left' ? '158px' : '0',
                  textShadow: '0 4px 12px rgba(0,0,0,0.7)',
                  wordWrap: 'break-word',
                }}
              >
                {slide.title}
              </h1>
              <div
                style={{
                  flex: 1,
                  fontSize: CONTENT_SIZES[slide.contentSize || 'medium'],
                  color: '#FFFFFF',
                  lineHeight: '1.6',
                  overflow: 'hidden',
                  textShadow: '0 2px 6px rgba(0,0,0,0.6)',
                  textAlign: (slide.contentAlignment || 'left') as any,
                  whiteSpace: 'pre-wrap',
                }}
                dangerouslySetInnerHTML={{ __html: parseMarkdown(slide.content) }}
              />
            </>
          )}

          {/* Layout: Quote */}
          {slide.layout === 'quote' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '40px' }}>
              <Quote
                style={{
                  width: '120px',
                  height: '120px',
                  color: settings.accentColor,
                  opacity: 0.8,
                }}
              />
              <div
                style={{
                  fontSize: '52px',
                  fontStyle: 'italic',
                  fontWeight: '500',
                  color: '#FFFFFF',
                  lineHeight: '1.4',
                }}
              >
                "{slide.content}"
              </div>
              {slide.quoteAuthor && (
                <div
                  style={{
                    fontSize: '36px',
                    fontWeight: '700',
                    color: settings.accentColor,
                    marginTop: '20px',
                  }}
                >
                  — {slide.quoteAuthor}
                </div>
              )}
            </div>
          )}

          {/* Layout: Code */}
          {slide.layout === 'code' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '30px' }}>
               <h1
                style={{
                  fontSize: TITLE_SIZES[slide.titleSize || 'large'],
                  fontWeight: '700',
                  color: '#FFFFFF',
                  textAlign: (slide.titleAlignment || 'left') as any,
                  lineHeight: '1.15',
                  textShadow: '0 4px 12px rgba(0,0,0,0.7)',
                }}
              >
                {slide.title}
              </h1>
              <div
                style={{
                  background: '#1E1E1E',
                  borderRadius: '20px',
                  padding: '40px',
                  border: `2px solid ${settings.accentColor}`,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  fontFamily: 'monospace',
                  fontSize: '28px',
                  color: '#D4D4D4',
                  whiteSpace: 'pre-wrap',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'absolute', top: '15px', left: '20px', display: 'flex', gap: '10px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F56' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27C93F' }}></div>
                </div>
                <div style={{ marginTop: '20px' }}>
                  {slide.codeSnippet || '// No code provided'}
                </div>
              </div>
              <div
                style={{
                  fontSize: CONTENT_SIZES[slide.contentSize || 'medium'],
                  color: '#FFFFFF',
                  opacity: 0.9,
                  textAlign: (slide.contentAlignment || 'left') as any,
                }}
                dangerouslySetInnerHTML={{ __html: parseMarkdown(slide.content) }}
              />
            </div>
          )}

          {/* Layout: Big Number */}
          {slide.layout === 'bigNumber' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '20px' }}>
              <h1
                style={{
                  fontSize: TITLE_SIZES[slide.titleSize || 'large'],
                  fontWeight: '700',
                  color: '#FFFFFF',
                  marginBottom: '20px',
                }}
              >
                {slide.title}
              </h1>
              <div
                style={{
                  fontSize: '240px',
                  fontWeight: '900',
                  color: settings.accentColor,
                  lineHeight: '1',
                  textShadow: `0 10px 30px ${settings.accentColor}40`,
                }}
              >
                {slide.bigNumber || '0'}
              </div>
              <div
                style={{
                  fontSize: '48px',
                  color: '#FFFFFF',
                  marginTop: '20px',
                  maxWidth: '80%',
                }}
                dangerouslySetInnerHTML={{ __html: parseMarkdown(slide.content) }}
              />
            </div>
          )}
        </div>

        {/* Like & Subscribe CTA - Positioned Absolutely */}
        {slide.showCTA && (
          <div
            style={{
              position: 'absolute',
              bottom: '240px', // Just above the footer (which is ~220px high)
              left: '0',
              right: '0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              animation: 'fadeIn 0.5s ease-out',
              zIndex: 25, // Above footer and content
            }}
          >
            <div
              style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              }}
            >
              Like & Abonne-toi
            </div>
            <div style={{ display: 'flex', gap: '40px' }}>
              {/* Like Icon */}
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: `3px solid ${settings.accentColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                }}
              >
                <Heart
                  style={{
                    width: '48px',
                    height: '48px',
                    color: settings.accentColor,
                    fill: settings.accentColor,
                  }}
                />
              </div>
              {/* Subscribe Icon */}
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: `3px solid ${settings.accentColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                }}
              >
                <UserPlus
                  style={{
                    width: '48px',
                    height: '48px',
                    color: settings.accentColor,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Profile Footer (if first slide) - Inspired by SahEco design */}
        {includeProfile && (
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              padding: '40px 60px',
              background: `linear-gradient(180deg, ${settings.primaryColor}E6 0%, ${settings.primaryColor} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '40px',
              zIndex: 20,
              borderTop: `6px solid ${settings.accentColor}`,
              boxShadow: '0 -8px 32px rgba(0,0,0,0.4)',
            }}
          >
            {/* Left: Profile Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '28px', flex: 1, minWidth: 0 }}>
              {profile.profileImage && (
                <div style={{ flexShrink: 0 }}>
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    style={{
                      width: '110px',
                      height: '110px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: `5px solid ${settings.accentColor}`,
                      boxShadow: '0 6px 20px rgba(0,0,0,0.6)',
                      display: 'block',
                    }}
                  />
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    fontSize: '42px',
                    fontWeight: '700',
                    color: '#FFFFFF',
                    lineHeight: '1.1',
                    textShadow: '0 2px 12px rgba(0,0,0,0.6)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {profile.name}
                </div>
                <div
                  style={{
                    fontSize: '28px',
                    color: '#FFFFFF',
                    fontWeight: '400',
                    lineHeight: '1.2',
                    opacity: 0.9,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {profile.position}
                </div>
              </div>
            </div>

            {/* Right: Portfolio Section */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                alignItems: 'flex-end',
              }}
            >
              {/* Portfolio Label */}
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  opacity: 0.8,
                }}
              >
                Mon Portfolio
              </div>

              {/* Portfolio Pill Button */}
              <div
                style={{
                  background: settings.accentColor,
                  borderRadius: '50px',
                  padding: '16px 36px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '14px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
                  whiteSpace: 'nowrap',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Globe
                    style={{
                      width: '22px',
                      height: '22px',
                      color: settings.primaryColor,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: '26px',
                    fontWeight: '700',
                    color: '#000000',
                    letterSpacing: '0.5px',
                    display: 'inline-block',
                  }}
                >
                  {profile.portfolio}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

SlideCanvas.displayName = 'SlideCanvas';
