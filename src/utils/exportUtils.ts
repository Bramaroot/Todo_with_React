/**
 * Export Utilities
 *
 * Handles PNG and PDF export using html-to-image and jsPDF
 * Renders slides to canvas and exports with proper formatting
 */

import React from 'react';
import { toPng, toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import { createRoot } from 'react-dom/client';
import { SlideCanvas } from '../components/carousel/SlideCanvas';
import type {
  CarouselProfile,
  CarouselSlide,
  CarouselGlobalSettings,
  ExportFormat,
} from '../types/carousel.types';

/**
 * Creates a temporary DOM element for rendering a slide
 */
function createTempContainer(): HTMLDivElement {
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  document.body.appendChild(container);
  return container;
}

/**
 * Removes temporary container from DOM
 */
function cleanupContainer(container: HTMLDivElement) {
  if (container && container.parentNode) {
    document.body.removeChild(container);
  }
}

/**
 * Renders a slide to a DOM element and captures it as PNG dataURL
 */
async function captureSlide(
  profile: CarouselProfile,
  slide: CarouselSlide,
  settings: CarouselGlobalSettings,
  format: ExportFormat,
  includeProfile: boolean,
  slideNumber?: number,
  totalSlides?: number
): Promise<string> {
  const container = createTempContainer();

  try {
    // Create slide canvas element
    const canvasDiv = document.createElement('div');
    container.appendChild(canvasDiv);

    // Render React component into canvas
    const root = createRoot(canvasDiv);
    root.render(
      React.createElement(SlideCanvas, {
        profile,
        slide,
        settings,
        format,
        includeProfile,
        slideNumber,
        totalSlides,
      })
    );

    // Wait for rendering and images to load
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Capture as PNG or JPG
    const captureMethod = format.format === 'jpg' ? toJpeg : toPng;
    const dataUrl = await captureMethod(canvasDiv.firstChild as HTMLElement, {
      quality: format.format === 'jpg' ? 0.95 : 1,
      pixelRatio: format.resolution === 'high' ? 2 : 1,
      width: format.width,
      height: format.height,
      cacheBust: true,
    });

    // Cleanup
    root.unmount();
    return dataUrl;
  } finally {
    cleanupContainer(container);
  }
}

/**
 * Exports slides as individual PNG files
 */
export async function exportToPNG(
  profile: CarouselProfile,
  slides: CarouselSlide[],
  settings: CarouselGlobalSettings,
  format: ExportFormat
): Promise<void> {
  console.log(`📸 Starting PNG export for ${slides.length} slides...`);

  const timestamp = Date.now();

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const includeProfile = true;

    try {
      console.log(`Capturing slide ${i + 1}/${slides.length}...`);

      const dataUrl = await captureSlide(
        profile,
        slide,
        settings,
        format,
        includeProfile,
        i + 1,
        slides.length
      );

      // Create download link
      const link = document.createElement('a');
      const extension = format.format === 'jpg' ? 'jpg' : 'png';
      link.download = `carousel-${format.platform}-slide-${i + 1}-${timestamp}.${extension}`;
      link.href = dataUrl;
      link.click();

      // Delay between downloads to prevent browser blocking
      if (i < slides.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    } catch (error) {
      console.error(`Error exporting slide ${i + 1}:`, error);
      throw new Error(`Échec de l'export de la slide ${i + 1}`);
    }
  }

  console.log('✅ PNG export completed');
}

/**
 * Exports slides as a multi-page PDF
 */
export async function exportToPDF(
  profile: CarouselProfile,
  slides: CarouselSlide[],
  settings: CarouselGlobalSettings,
  format: ExportFormat
): Promise<void> {
  console.log(`📄 Starting PDF export for ${slides.length} slides...`);

  const { width, height } = format;
  const orientation = format.aspectRatio === '16:9' ? 'landscape' : 'portrait';

  // Create PDF document
  const pdf = new jsPDF({
    orientation,
    unit: 'px',
    format: [width, height],
  });

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const includeProfile = true;

    try {
      console.log(`Capturing slide ${i + 1}/${slides.length} for PDF...`);

      const dataUrl = await captureSlide(
        profile,
        slide,
        settings,
        format,
        includeProfile,
        i + 1,
        slides.length
      );

      // Add page to PDF (not for first page)
      if (i > 0) {
        pdf.addPage([width, height], orientation);
      }

      // Add image to current page
      pdf.addImage(dataUrl, 'PNG', 0, 0, width, height, undefined, 'FAST');
    } catch (error) {
      console.error(`Error adding slide ${i + 1} to PDF:`, error);
      throw new Error(`Échec de l'ajout de la slide ${i + 1} au PDF`);
    }
  }

  // Download PDF
  const timestamp = Date.now();
  pdf.save(`carousel-${format.platform}-${timestamp}.pdf`);

  console.log('✅ PDF export completed');
}

/**
 * Validates export readiness
 * Returns error message if validation fails, null if OK
 */
export function validateExport(
  profile: CarouselProfile,
  slides: CarouselSlide[]
): string | null {
  // Check slides
  if (slides.length === 0) {
    return 'Ajoutez au moins une slide avant d\'exporter';
  }

  // Check profile
  if (!profile.name || profile.name.trim() === '' || profile.name === 'Votre Nom') {
    return 'Complétez votre nom dans le profil avant d\'exporter';
  }

  if (!profile.position || profile.position.trim() === '' || profile.position === 'Votre Poste') {
    return 'Complétez votre poste dans le profil avant d\'exporter';
  }

  // Check for empty slides
  const emptySlides = slides.filter(
    (s) => !s.title || s.title.trim() === '' || s.title === 'Titre de la slide'
  );

  if (emptySlides.length > 0) {
    return `Attention: ${emptySlides.length} slide(s) ont un titre vide. Voulez-vous continuer quand même ?`;
  }

  return null; // All good
}
