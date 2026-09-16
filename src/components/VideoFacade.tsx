import { useState } from 'react';
import { YoutubeThumb } from './YoutubeThumb';
import styles from './VideoFacade.module.css';

export function VideoFacade({ videoId, slotLabel, title }: { videoId?: string; slotLabel: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing && videoId) {
    return (
      <div className={styles.player}>
        <iframe
          className={styles.iframe}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className={styles.player}
      onClick={() => videoId && setPlaying(true)}
      disabled={!videoId}
      aria-label={videoId ? `Play ${title}` : `${title} — video not available yet`}
    >
      {videoId && <YoutubeThumb videoId={videoId} alt="" />}
      <span className={styles.slot}>{slotLabel}</span>
      <span className={styles.playButton}>▶ {videoId ? 'Play on YouTube' : 'Video coming soon'}</span>
    </button>
  );
}
