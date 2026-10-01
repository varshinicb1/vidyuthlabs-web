import { Text as DreiText } from '@react-three/drei';
import type { ComponentProps } from 'react';

/**
 * Self-hosted font for every 3D label. Without an explicit `font`, drei's
 * <Text> (troika) fetches glyph data from cdn.jsdelivr.net at runtime, and if
 * that request fails the whole React tree unmounts and the site renders blank.
 * Keep 3D copy within this font's Latin subset (ASCII, Latin-1, ↑ ↓ −) so
 * troika never falls back to the CDN.
 */
export const TEXT_FONT = '/fonts/inter-latin-400.woff';

export function Text(props: ComponentProps<typeof DreiText>) {
  return <DreiText font={TEXT_FONT} {...props} />;
}
