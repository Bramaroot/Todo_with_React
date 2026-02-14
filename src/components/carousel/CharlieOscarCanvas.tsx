/**
 * Charlie Oscar Style Canvas
 *
 * Minimalist white carousel design with:
 * - Black header with profile/username/categories
 * - Clean white background
 * - Orange accent color for keywords
 * - Footer with copyright and category
 */

import { forwardRef } from 'react';
import type {
  CharlieOscarBranding,
  CharlieOscarSlide,
  CharlieOscarIntroContent,
  CharlieOscarContentSlide,
  CharlieOscarConclusionContent,
} from '../../types/carousel.types';
import { CHARLIE_OSCAR_DIMENSIONS } from '../../types/carousel.types';

interface CharlieOscarCanvasProps {
  branding: CharlieOscarBranding;
  slide: CharlieOscarSlide;
}

export const CharlieOscarCanvas = forwardRef<HTMLDivElement, CharlieOscarCanvasProps>(
  ({ branding, slide }, ref) => {
    const { width, height } = CHARLIE_OSCAR_DIMENSIONS;
    const content = slide.content;

    return (
      <div
        ref={ref}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header - Black bar with branding */}
        <div
          style={{
            backgroundColor: '#000000',
            padding: '32px 48px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flexShrink: 0,
          }}
        >
          {/* Profile Image / Logo */}
          {branding.profileImage ? (
            <img
              src={branding.profileImage}
              alt="Profile"
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #333',
              }}
            />
          ) : (
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#222',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: '700',
                color: '#FFFFFF',
                border: '2px solid #333',
              }}
            >
              {branding.username.replace('@', '').charAt(0).toUpperCase()}
            </div>
          )}

          {/* Username and Categories */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontSize: '26px',
              color: '#FFFFFF',
            }}
          >
            <span style={{ fontWeight: '600' }}>{branding.username}</span>
            <span style={{ color: '#666' }}>|</span>
            <span style={{ fontWeight: '400', color: '#999' }}>
              {branding.primaryCategory}
            </span>
            <span style={{ color: '#666' }}>-</span>
            <span style={{ fontWeight: '400', color: '#999' }}>
              {branding.secondaryCategory}
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px 72px',
            minHeight: 0,
          }}
        >
          {/* Intro Slide */}
          {content.type === 'intro' && (
            <IntroSlideContent content={content} accentColor={branding.accentColor} />
          )}

          {/* Content Slide */}
          {content.type === 'content' && (
            <ContentSlideContent content={content} />
          )}

          {/* Conclusion Slide */}
          {content.type === 'conclusion' && (
            <ConclusionSlideContent content={content} />
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '32px 72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #E5E5E5',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <span
              style={{
                fontSize: '22px',
                color: '#000000',
                fontWeight: '500',
              }}
            >
              ©2026 {branding.copyrightName}
            </span>
            <span
              style={{
                fontSize: '22px',
                color: '#000000',
                fontWeight: '400',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              }}
            >
              {branding.footerLabel}
            </span>
          </div>

          {/* Pointing Hand Icon */}
          <div
            style={{
              fontSize: '40px',
              lineHeight: 1,
            }}
          >
            👆
          </div>
        </div>
      </div>
    );
  }
);

CharlieOscarCanvas.displayName = 'CharlieOscarCanvas';

// Intro Slide Content Component
function IntroSlideContent({
  content,
  accentColor,
}: {
  content: CharlieOscarIntroContent;
  accentColor: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '20px',
      }}
    >
      {/* Subtitle */}
      <p
        style={{
          fontSize: '38px',
          fontWeight: '400',
          color: '#000000',
          margin: 0,
          letterSpacing: '-0.5px',
        }}
      >
        {content.subtitle}
      </p>

      {/* Title Lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {content.titleLines.map((line, index) => (
          <h1
            key={index}
            style={{
              fontSize: '108px',
              fontWeight: '900',
              color: '#000000',
              margin: 0,
              lineHeight: '1.05',
              letterSpacing: '-3px',
              fontStyle: 'italic',
            }}
          >
            {line}
          </h1>
        ))}

        {/* Highlighted Word */}
        <h1
          style={{
            fontSize: '108px',
            fontWeight: '900',
            color: accentColor,
            margin: 0,
            lineHeight: '1.05',
            letterSpacing: '-3px',
            fontStyle: 'italic',
          }}
        >
          {content.highlightedWord}
        </h1>
      </div>
    </div>
  );
}

// Content Slide Component
function ContentSlideContent({ content }: { content: CharlieOscarContentSlide }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
        height: '100%',
      }}
    >
      {/* Website URL Badge */}
      {content.websiteUrl && (
        <div
          style={{
            alignSelf: 'center',
            backgroundColor: '#F5F5F5',
            borderRadius: '100px',
            padding: '16px 40px',
            fontSize: '26px',
            color: '#666',
            fontWeight: '400',
          }}
        >
          {content.websiteUrl}
        </div>
      )}

      {/* Screenshot Container */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 0,
        }}
      >
        {content.screenshot ? (
          <div
            style={{
              width: '100%',
              maxHeight: '700px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <img
              src={content.screenshot}
              alt={content.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        ) : (
          <div
            style={{
              width: '100%',
              height: '500px',
              borderRadius: '24px',
              backgroundColor: '#F5F5F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed #DDD',
            }}
          >
            <span style={{ fontSize: '32px', color: '#999' }}>
              Ajouter un screenshot
            </span>
          </div>
        )}
      </div>

      {/* Title and Description */}
      <div style={{ marginTop: 'auto' }}>
        <h2
          style={{
            fontSize: '72px',
            fontWeight: '900',
            color: '#000000',
            margin: 0,
            marginBottom: '20px',
            letterSpacing: '-2px',
          }}
        >
          {content.number}. {content.title}
        </h2>
        <p
          style={{
            fontSize: '34px',
            fontWeight: '400',
            color: '#444',
            margin: 0,
            lineHeight: '1.5',
          }}
        >
          {content.description}
        </p>
      </div>
    </div>
  );
}

// Conclusion Slide Component
function ConclusionSlideContent({ content }: { content: CharlieOscarConclusionContent }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '40px',
        paddingTop: '120px',
      }}
    >
      {/* Main Text with Bold Phrase */}
      <div>
        <p
          style={{
            fontSize: '52px',
            fontWeight: '400',
            color: '#000000',
            margin: 0,
            lineHeight: '1.4',
            letterSpacing: '-1px',
          }}
        >
          {content.mainText}{' '}
          <span style={{ fontWeight: '900' }}>{content.boldPhrase}</span>
        </p>
      </div>

      {/* Supporting Text */}
      <p
        style={{
          fontSize: '36px',
          fontWeight: '400',
          color: '#666',
          margin: 0,
          lineHeight: '1.5',
        }}
      >
        {content.supportingText}
      </p>
    </div>
  );
}
