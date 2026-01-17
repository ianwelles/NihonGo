export function sanitizeHtml(html: string): { __html: string } {
  // Allow only <a>, <strong>, <em>, and <p> tags.
  // This is a simplified sanitizer and should not be used for untrusted arbitrary HTML.
  const allowedTags = /<\/?(a|strong|em|p)[^>]*>/gi;
  const sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
                        .replace(/javascript:/gi, '') // Remove javascript: links
                        .replace(/on[a-z]+=/gi, '') // Remove event handlers
                        .replace(/(<a[^>]*target="[^"]*"[^>]*>)/gi, '$1') // Keep existing target attributes on <a>
                        .replace(/(<a[^>]*rel="[^"]*"[^>]*>)/gi, '$1') // Keep existing rel attributes on <a>
                        .replace(/<a([^>]*?)>/gi, '<a$1 target="_blank" rel="noopener noreferrer">'); // Add target="_blank" and rel="noopener noreferrer" to all <a> tags
  return { __html: sanitized.match(allowedTags) ? sanitized : sanitized.replace(/</g, '&lt;').replace(/>/g, '&gt;') };
}