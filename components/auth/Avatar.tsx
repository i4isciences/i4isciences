import Image from "next/image";

import AvatarSilhouette from "./AvatarSilhouette";

export default function Avatar({
  avatarUrl,
  gender,
  size = 34,
}: {
  avatarUrl?: string | null;
  gender?: string | null;
  size?: number;
}) {
  if (avatarUrl) {
    return (
      <span
        style={{
          display: "inline-flex",
          width: size,
          height: size,
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Image src={avatarUrl} alt="" width={size} height={size} style={{ objectFit: "cover", width: size, height: size }} />
      </span>
    );
  }

  return <AvatarSilhouette gender={gender} size={size} />;
}
