import { useState } from 'react';

const QUALITIES = ['maxresdefault', 'hqdefault'] as const;

export function YoutubeThumb({ videoId, alt }: { videoId: string; alt: string }) {
  const [attempt, setAttempt] = useState(0);
  const quality = QUALITIES[Math.min(attempt, QUALITIES.length - 1)];
  return (
    <img
      src={`https://img.youtube.com/vi/${videoId}/${quality}.jpg`}
      alt={alt}
      loading="lazy"
      onError={() => setAttempt((a) => Math.min(a + 1, QUALITIES.length - 1))}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
    />
  );
}
