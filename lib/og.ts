/**
 * Fetch the Noto Serif Bengali font binary from Google Fonts so ImageResponse
 * can render Bangla glyphs in OG images. Returns null on failure so callers
 * can fall back to the default Satori font (Latin will still render).
 */
export async function loadBengaliFont(weight: 400 | 700 = 700): Promise<ArrayBuffer | null> {
  try {
    const cssRes = await fetch(
      `https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@${weight}&display=swap`,
      {
        headers: {
          // Google Fonts serves woff2 for modern UAs and ttf for older ones.
          // Satori needs ttf/otf, so request as IE11 to get a TTF link.
          'User-Agent':
            'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko',
        },
      }
    );
    if (!cssRes.ok) return null;
    const css = await cssRes.text();
    const match = css.match(/src:\s*url\(([^)]+)\)/);
    if (!match) return null;
    const fontUrl = match[1];
    const fontRes = await fetch(fontUrl);
    if (!fontRes.ok) return null;
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}
