"use client";

import { useRef, useState } from "react";

import { createClient } from "@/utils/supabase/client";
import Avatar from "./Avatar";

const MAX_BYTES = 4 * 1024 * 1024;

export default function AvatarUpload({
  userId,
  avatarUrl,
  gender,
  onUploaded,
}: {
  userId: string;
  avatarUrl: string | null;
  gender: string | null;
  onUploaded: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Image must be under 4MB.");
      return;
    }

    setError("");
    setUploading(true);

    const supabase = createClient();
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${userId}/profile.${ext}`;

    const { error: uploadError } = await supabase.storage.from("avatars").upload(path, file, {
      upsert: true,
      cacheControl: "3600",
    });

    if (uploadError) {
      setUploading(false);
      setError("Upload failed — make sure the avatars storage bucket has been set up. See the setup notes.");
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    const publicUrl = `${data.publicUrl}?t=${Date.now()}`;

    const { error: updateError } = await supabase.auth.updateUser({ data: { avatar_url: publicUrl } });
    setUploading(false);

    if (updateError) {
      setError("Uploaded, but we couldn't save it to your profile. Please try again.");
      return;
    }

    onUploaded(publicUrl);
  };

  return (
    <div className="avu">
      <span className="avu-circle">
        <Avatar avatarUrl={avatarUrl} gender={gender} size={84} />
      </span>

      <div className="avu-controls">
        <button type="button" className="avu-btn" onClick={() => fileRef.current?.click()} disabled={uploading}>
          {uploading ? "Uploading…" : "Change photo"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
        {error && (
          <p className="avu-error" role="alert">
            {error}
          </p>
        )}
      </div>

      <style jsx global>{`
        .avu { display: flex; align-items: center; gap: 18px; margin-bottom: 28px; }
        .avu-circle { display: inline-flex; width: 84px; height: 84px; border-radius: 50%; overflow: hidden; flex-shrink: 0; border: 1px solid #e8e8ed; }
        .avu-controls { display: flex; flex-direction: column; gap: 6px; align-items: flex-start; }
        .avu-btn { padding: 8px 16px; border-radius: 999px; border: 1px solid #e8e8ed; background: #f5f5f7; font-family: var(--font-geist-sans), "Geist", sans-serif; font-size: 0.82rem; font-weight: 600; color: #10204e; cursor: pointer; }
        .avu-btn:hover:not(:disabled) { background: #ececef; }
        .avu-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .avu-error { margin: 0; font-size: 0.78rem; color: #d93025; max-width: 260px; }
      `}</style>
    </div>
  );
}
