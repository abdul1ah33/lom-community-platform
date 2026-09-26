import styles from "./Avatar.module.css";

interface AvatarProps {
  name: string;
  src?: string | null;
  size?: number;
  /** Adds a rotating brass ring, for the signed-in user. */
  ring?: boolean;
}

/** Deterministic hue from a string so every user keeps the same colour. */
export function hueFromString(value: string) {
  let hash = 0;
  for (const char of value) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return hash % 360;
}

export function Avatar({ name, src, size = 40, ring = false }: AvatarProps) {
  const hue = hueFromString(name);
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <span className={`${styles.avatar} ${ring ? styles.ring : ""}`} style={{ width: size, height: size }}>
      {src ? (
        <img src={src} alt="" className={styles.image} />
      ) : (
        <span
          className={styles.fallback}
          style={{
            background: `linear-gradient(135deg, hsl(${hue} 65% 45%), hsl(${(hue + 50) % 360} 70% 22%))`,
            fontSize: size * 0.38,
          }}
          aria-hidden="true"
        >
          {initials}
        </span>
      )}
    </span>
  );
}
