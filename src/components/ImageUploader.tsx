import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Link as LinkIcon, AlertCircle } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  placeholder = "https://example.com/image.jpg",
  helperText,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(!value || !value.startsWith("data:image"));
  const [urlValue, setUrlValue] = useState(value && !value.startsWith("data:image") ? value : "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compress and convert to Base64
  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("দয়া করে শুধুমাত্র ছবি ফাইল আপলোড করুন।");
      return;
    }

    // Limit size check: warn if too large, but auto-compress
    setError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas to downscale/compress
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800; // Limit to 800px width for client-side compression
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width > height) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          } else {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Convert to JPEG with 0.75 quality for beautiful look + lightweight storage
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.75);
          onChange(compressedBase64);
          setShowUrlInput(false);
        } else {
          onChange(event.target?.result as string);
          setShowUrlInput(false);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUrlValue(val);
    onChange(val);
  };

  const handleRemove = () => {
    onChange("");
    setUrlValue("");
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const isBase64 = value && value.startsWith("data:image");

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex justify-between items-center">
        <label className="text-xs text-gray-300 font-bold uppercase font-sans flex items-center gap-1">
          {label}
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className={`text-[10px] px-2 py-0.5 rounded border transition cursor-pointer font-sans ${
              showUrlInput 
                ? "bg-[#E6B325]/20 border-[#E6B325] text-[#E6B325]" 
                : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            {showUrlInput ? "ফাইল আপলোডার চালু করুন" : "ইন্টারনেট লিংক (URL) বসান"}
          </button>
        </div>
      </div>

      {showUrlInput ? (
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
            <LinkIcon className="w-4 h-4" />
          </div>
          <input
            type="url"
            value={urlValue}
            onChange={handleUrlChange}
            placeholder={placeholder}
            className="w-full bg-[#03140f] border border-white/10 rounded-lg pl-10 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-[#E6B325] font-sans"
          />
          {value && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-red-400 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={value ? undefined : triggerFileSelect}
          className={`relative border-2 border-dashed rounded-xl p-4 transition text-center flex flex-col items-center justify-center min-h-[110px] cursor-pointer ${
            isDragging
              ? "border-[#E6B325] bg-[#E6B325]/10"
              : value
              ? "border-white/10 bg-[#03140f]/40 cursor-default"
              : "border-white/10 bg-[#03140f] hover:border-[#E6B325]/40 hover:bg-[#03140f]/60"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {value ? (
            <div className="flex items-center gap-4 w-full">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/15 bg-black/40 flex items-center justify-center shrink-0">
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to placeholder icon on broken preview
                    (e.target as any).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60";
                  }}
                />
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate font-sans">
                  {isBase64 ? "কাস্টম ফাইল আপলোড করা হয়েছে" : "ইন্টারনেট ইমেজ সোর্স সচল"}
                </p>
                <p className="text-[10px] text-gray-400 font-sans mt-0.5">
                  {isBase64 ? "Base64 Compressed JPG" : value}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={triggerFileSelect}
                    className="text-[10px] font-bold text-[#E6B325] hover:underline cursor-pointer font-sans"
                  >
                    অন্য ছবি দিন
                  </button>
                  <span className="text-gray-600 text-[10px]">•</span>
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="text-[10px] font-bold text-red-400 hover:underline cursor-pointer font-sans"
                  >
                    ডিলিট করুন
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2 text-[#E6B325]">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs text-gray-300 font-sans">
                ক্লিক করে কম্পিউটার থেকে ফাইল বেছে নিন অথবা এখানে ড্র্যাগ এন্ড ড্রপ করুন
              </p>
              <p className="text-[10px] text-gray-400 font-sans mt-1">
                PNG, JPG, JPEG, WEBP (Auto-compression enabled)
              </p>
            </>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-400 font-sans mt-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </div>
      )}

      {helperText && !error && (
        <p className="text-[10px] text-gray-400 font-sans mt-0.5">{helperText}</p>
      )}
    </div>
  );
};
