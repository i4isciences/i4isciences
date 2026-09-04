type Gender = "male" | "female" | "unspecified" | string | null | undefined;

/**
 * Minimal, abstract head-and-shoulders silhouettes — not caricatures, just a
 * subtly different outline per gender so a placeholder avatar reads as a
 * person rather than a generic icon, matching Apple's reductive style.
 */
export default function AvatarSilhouette({ gender, size = 40 }: { gender?: Gender; size?: number }) {
  const bg = "#e4e9f5";
  const fg = "#8a97bd";

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill={bg} />
      {gender === "female" ? (
        <path
          d="M20 8c-5 0-8.5 3.8-8.5 8.6 0 2.6 1 4.9 2.6 6.5-1 .5-1.9 1-2.8 1.7C8.4 26.8 7 29.7 7 33.5v1h26v-1c0-3.8-1.4-6.7-4.3-8.7-.9-.7-1.8-1.2-2.8-1.7 1.6-1.6 2.6-3.9 2.6-6.5C28.5 11.8 25 8 20 8Z"
          fill={fg}
        />
      ) : gender === "male" ? (
        <path
          d="M20 9c-4.7 0-8 3.6-8 8.2 0 2.9 1.3 5.4 3.3 6.9-1.6.5-3.1 1.1-4.5 2.1C7.6 28.3 6 31.4 6 35v0h28v0c0-3.6-1.6-6.7-4.8-8.8-1.4-1-2.9-1.6-4.5-2.1 2-1.5 3.3-4 3.3-6.9C28 12.6 24.7 9 20 9Z"
          fill={fg}
        />
      ) : (
        <path
          d="M20 9.5c-4.4 0-7.5 3.4-7.5 7.7 0 2.8 1.3 5.2 3.2 6.6-1.4.5-2.8 1.1-4 1.9-3 2-4.7 4.9-4.7 8.3h26c0-3.4-1.7-6.3-4.7-8.3-1.2-.8-2.6-1.4-4-1.9 1.9-1.4 3.2-3.8 3.2-6.6 0-4.3-3.1-7.7-7.5-7.7Z"
          fill={fg}
        />
      )}
    </svg>
  );
}
