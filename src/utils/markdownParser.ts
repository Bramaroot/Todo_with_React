/**
 * Simple Markdown Parser
 *
 * Supports: **bold**, *italic*, lists (- or •), line breaks
 * Returns sanitized HTML for use with dangerouslySetInnerHTML
 */

/**
 * Escapes HTML special characters to prevent XSS
 */
function escapeHTML(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Parses markdown text to HTML
 * Supports: **bold**, *italic*, lists, paragraphs, line breaks
 */
export function parseMarkdown(text: string): string {
  if (!text) return '';

  // Escape HTML first for safety
  let html = escapeHTML(text);

  // **bold** - must come before *italic* to avoid conflicts
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // *italic*
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Lists (- or • at start of line)
  html = html.replace(/^[\-\•]\s+(.+)$/gm, '<li>$1</li>');

  // Wrap consecutive <li> elements in <ul>
  html = html.replace(/(<li>.*?<\/li>\n?)+/gs, (match) => `<ul>${match}</ul>`);

  // Paragraphs (double line breaks)
  html = html.replace(/\n\n/g, '</p><p>');

  // Single line breaks
  html = html.replace(/\n/g, '<br>');

  // Wrap in div
  return `<div>${html}</div>`;
}

/**
 * Strips all markdown formatting and returns plain text
 * Useful for character counting or search
 */
export function stripMarkdown(text: string): string {
  if (!text) return '';

  return text
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/^[\-\•]\s+/gm, '') // Remove list markers
    .replace(/\n\n/g, ' ') // Replace double breaks with space
    .replace(/\n/g, ' ') // Replace single breaks with space
    .trim();
}

/**
 * Counts words in markdown text (ignoring formatting)
 */
export function countWords(text: string): number {
  const plain = stripMarkdown(text);
  return plain
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

/**
 * Truncates markdown text to a specific character limit
 * Preserves word boundaries and adds ellipsis if truncated
 */
export function truncateMarkdown(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;

  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + '...';
  }

  return truncated + '...';
}
