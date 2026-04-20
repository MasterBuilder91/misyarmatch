import { trpc } from "@/lib/trpc";
import { Camera, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface PhotoUploaderProps {
  currentPhotoUrl?: string | null;
  onUpload: (url: string, key: string) => void;
  onRemove?: () => void;
}

export function PhotoUploader({ currentPhotoUrl, onUpload, onRemove }: PhotoUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentPhotoUrl ?? null);
  const fileRef = useRef<HTMLInputElement>(null);
  const uploadPhoto = trpc.profile.uploadPhoto.useMutation();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Photo must be under 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setUploading(true);
    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(file);

      // Convert to base64 for upload
      const base64 = await new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => {
          const result = r.result as string;
          resolve(result.split(",")[1] ?? "");
        };
        r.onerror = reject;
        r.readAsDataURL(file);
      });

      const result = await uploadPhoto.mutateAsync({
        base64,
        mimeType: file.type,
        fileName: file.name,
      });

      onUpload(result.url, result.key);
      toast.success("Photo uploaded successfully");
    } catch (err: any) {
      toast.error(err.message ?? "Upload failed");
      setPreview(currentPhotoUrl ?? null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onRemove?.();
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative w-32 h-32 rounded-full border-2 border-dashed border-rose-300 bg-rose-50 flex items-center justify-center cursor-pointer hover:border-rose-500 hover:bg-rose-100 transition-all overflow-hidden group"
        onClick={() => !uploading && fileRef.current?.click()}
      >
        {preview ? (
          <>
            <img src={preview} alt="Profile photo" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </>
        ) : uploading ? (
          <Loader2 className="w-8 h-8 text-rose-400 animate-spin" />
        ) : (
          <div className="text-center">
            <Camera className="w-8 h-8 text-rose-400 mx-auto mb-1" />
            <span className="text-xs text-rose-500 font-medium">Add Photo</span>
          </div>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="text-xs text-rose-600 hover:text-rose-800 font-medium disabled:opacity-50"
        >
          {preview ? "Change photo" : "Upload photo"}
        </button>
        {preview && onRemove && (
          <>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              onClick={handleRemove}
              className="text-xs text-gray-400 hover:text-red-500 font-medium"
            >
              Remove
            </button>
          </>
        )}
      </div>
      <p className="text-xs text-gray-400 text-center">
        JPG or PNG · Max 5MB · Blurred until mutual interest
      </p>
    </div>
  );
}
