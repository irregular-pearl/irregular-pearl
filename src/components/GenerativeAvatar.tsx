// Generates a deterministic pixelated musical note avatar from a user ID.
// Each user gets a unique combination of note shape, color, and background.

const NOTE_SHAPES = [
  // Quarter note
  (ctx: string) => `<rect x="10" y="2" width="3" height="14" fill="${ctx}"/><circle cx="8" cy="17" r="5" fill="${ctx}"/>`,
  // Eighth note
  (ctx: string) => `<rect x="10" y="2" width="3" height="14" fill="${ctx}"/><circle cx="8" cy="17" r="5" fill="${ctx}"/><path d="M13 2 Q20 4 18 10" stroke="${ctx}" stroke-width="3" fill="none"/>`,
  // Beamed eighth notes
  (ctx: string) => `<rect x="5" y="4" width="3" height="14" fill="${ctx}"/><rect x="16" y="2" width="3" height="14" fill="${ctx}"/><rect x="5" y="2" width="14" height="3" fill="${ctx}"/><circle cx="4" cy="19" r="4" fill="${ctx}"/><circle cx="18" cy="17" r="4" fill="${ctx}"/>`,
  // Treble clef (simplified pixel art)
  (ctx: string) => `<rect x="11" y="1" width="3" height="22" fill="${ctx}"/><rect x="7" y="5" width="4" height="3" fill="${ctx}"/><rect x="14" y="5" width="4" height="3" fill="${ctx}"/><rect x="5" y="10" width="3" height="5" fill="${ctx}"/><rect x="14" y="12" width="4" height="3" fill="${ctx}"/><circle cx="9" cy="19" r="4" fill="${ctx}"/>`,
  // Whole note
  (ctx: string) => `<ellipse cx="12" cy="12" rx="8" ry="6" fill="none" stroke="${ctx}" stroke-width="3"/><line x1="12" y1="6" x2="12" y2="18" stroke="${ctx}" stroke-width="2" opacity="0.3"/>`,
  // Sharp symbol
  (ctx: string) => `<rect x="7" y="3" width="2" height="18" fill="${ctx}"/><rect x="15" y="3" width="2" height="18" fill="${ctx}"/><rect x="4" y="8" width="16" height="2" fill="${ctx}" transform="rotate(-10 12 9)"/><rect x="4" y="14" width="16" height="2" fill="${ctx}" transform="rotate(-10 12 15)"/>`,
  // Double note
  (ctx: string) => `<circle cx="7" cy="16" r="5" fill="${ctx}"/><circle cx="17" cy="14" r="5" fill="${ctx}"/><rect x="12" y="3" width="2" height="12" fill="${ctx}"/><rect x="2" y="5" width="2" height="12" fill="${ctx}"/>`,
  // Rest symbol (simplified)
  (ctx: string) => `<rect x="9" y="3" width="6" height="3" fill="${ctx}"/><rect x="12" y="6" width="3" height="4" fill="${ctx}"/><rect x="9" y="10" width="6" height="3" fill="${ctx}"/><rect x="9" y="13" width="3" height="4" fill="${ctx}"/><circle cx="12" cy="19" r="3" fill="${ctx}"/>`,
];

const BG_COLORS = [
  '#F5E6D3', '#E8DDD3', '#DDE5E8', '#E3DDE8', '#D3E8DD',
  '#E8E3D3', '#D8E0E8', '#E8D8D8', '#D3D8E8', '#E0E8D3',
];

const NOTE_COLORS = [
  '#8B7355', '#6B5B4A', '#5B6B7A', '#6B5B7A', '#4A6B5B',
  '#7A6B4A', '#4A5B6B', '#7A4A4A', '#4A4A6B', '#5B6B4A',
];

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function getAvatarSvg(userId: string): string {
  const hash = hashCode(userId);
  const shapeIdx = hash % NOTE_SHAPES.length;
  const bgIdx = (hash >> 4) % BG_COLORS.length;
  const noteIdx = (hash >> 8) % NOTE_COLORS.length;

  const bg = BG_COLORS[bgIdx];
  const note = NOTE_COLORS[noteIdx];
  const shape = NOTE_SHAPES[shapeIdx](note);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><rect width="24" height="24" rx="12" fill="${bg}"/>${shape}</svg>`;
}

export function avatarDataUrl(userId: string): string {
  return `data:image/svg+xml,${encodeURIComponent(getAvatarSvg(userId))}`;
}

interface GenerativeAvatarProps {
  userId: string;
  size?: number;
  className?: string;
}

export default function GenerativeAvatar({ userId, size = 28, className = '' }: GenerativeAvatarProps) {
  return (
    <img
      src={avatarDataUrl(userId)}
      alt=""
      width={size}
      height={size}
      className={`rounded-full ${className}`}
    />
  );
}
