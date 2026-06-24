import React, { useState, useRef } from 'react';
import { Upload, Link, Trash2, Image as ImageIcon, Sparkles, AlertCircle } from 'lucide-react';
import { useApp } from '../AppContext';

interface ImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'ছবি আপলোড করুন (Upload Image)',
  placeholder = 'https://example.com/image.jpg'
}) => {
  const { lang } = useApp();
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>(value.startsWith('data:') ? 'upload' : 'url');
  const [isCompressing, setIsCompressing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressAndSetImage = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg(lang === 'bn' ? 'দয়া করে একটি ইমেজ ফাইল নির্বাচন করুন।' : 'Please select a valid image file.');
      return;
    }

    setIsCompressing(true);
    setErrorMsg(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          // Compress the image using HTML5 Canvas
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Set maximum dimension
          const MAX_DIM = 1000;
          if (width > height) {
            if (width > MAX_DIM) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            }
          } else {
            if (height > MAX_DIM) {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            throw new Error('Canvas context is null');
          }

          ctx.drawImage(img, 0, 0, width, height);

          // Export as JPEG with 0.7 quality to significantly reduce file size
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          
          // Verify file size in base64 (~1.33 times original byte size)
          const approximateSizeKB = Math.round((compressedBase64.length * 3) / 4 / 1024);
          if (approximateSizeKB > 800) {
            // If still too large, compress further
            const extraCompressed = canvas.toDataURL('image/jpeg', 0.5);
            onChange(extraCompressed);
          } else {
            onChange(compressedBase64);
          }
          setIsCompressing(false);
        } catch (err) {
          console.error(err);
          setErrorMsg(lang === 'bn' ? 'ছবি প্রসেস করতে সমস্যা হয়েছে।' : 'Error processing image.');
          setIsCompressing(false);
        }
      };
      img.onerror = () => {
        setErrorMsg(lang === 'bn' ? 'ছবি লোড করতে সমস্যা হয়েছে।' : 'Error loading image.');
        setIsCompressing(false);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      compressAndSetImage(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      compressAndSetImage(file);
    }
  };

  const handleClear = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setErrorMsg(null);
  };

  const isBase64 = value.startsWith('data:');

  return (
    <div className="space-y-2 block text-left">
      <div className="flex items-center justify-between">
        <label className="text-xs text-gray-300 font-bold block">{label}</label>
        <div className="flex bg-[#041410] border border-[#0d5c46]/40 rounded-lg p-0.5 text-[10px] font-sans">
          <button
            type="button"
            onClick={() => {
              setActiveTab('upload');
              setErrorMsg(null);
            }}
            className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
              activeTab === 'upload' 
                ? 'bg-[#0d5c46] text-[#e6b325] font-bold' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {lang === 'bn' ? 'ডিভাইস থেকে' : 'From Device'}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('url');
              setErrorMsg(null);
            }}
            className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
              activeTab === 'url' 
                ? 'bg-[#0d5c46] text-[#e6b325] font-bold' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {lang === 'bn' ? 'লিংক (URL)' : 'URL Link'}
          </button>
        </div>
      </div>

      {activeTab === 'upload' ? (
        <div className="space-y-2">
          {value ? (
            <div className="relative group border border-[#0d5c46]/40 rounded-xl overflow-hidden bg-[#041410] flex items-center justify-between p-3">
              <div className="flex items-center space-x-3">
                <img 
                  src={value} 
                  alt="Preview" 
                  className="w-12 h-12 rounded-lg object-cover bg-white/5 border border-[#e6b325]/20"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-[10px] bg-[#e6b325]/10 text-[#e6b325] border border-[#e6b325]/20 rounded-full px-2 py-0.5 font-mono">
                    {isBase64 ? 'Direct Uploaded' : 'Linked Image'}
                  </span>
                  <p className="text-[11px] text-gray-400 mt-1">
                    {lang === 'bn' ? 'ছবিটি সফলভাবে লোড হয়েছে' : 'Image loaded successfully'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer border border-red-500/20"
                title={lang === 'bn' ? 'ছবি মুছুন' : 'Remove Image'}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                isCompressing 
                  ? 'border-[#e6b325]/40 bg-[#e6b325]/5 animate-pulse' 
                  : 'border-[#0d5c46]/50 bg-[#041410] hover:border-[#e6b325] hover:bg-[#041d17]/30'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <div className="space-y-2 flex flex-col items-center">
                <div className="p-2.5 rounded-full bg-[#0d5c46]/30 text-[#e6b325] border border-[#e6b325]/20">
                  <Upload className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <p className="text-xs text-white font-bold">
                    {isCompressing 
                      ? (lang === 'bn' ? 'ছবি সাইজ ছোট করা হচ্ছে...' : 'Compressing image...')
                      : (lang === 'bn' ? 'ছবি সিলেক্ট করতে ক্লিক করুন অথবা ড্র্যাগ করুন' : 'Click or drag image to select')}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {lang === 'bn' ? 'যেকোনো ছবি (JPG, PNG) সাপোর্ট করে' : 'Supports any image (JPG, PNG)'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-[#041410] border border-[#0d5c46]/50 rounded-xl pl-8 pr-3 py-2 text-xs text-white font-mono placeholder-gray-600 focus:outline-none focus:border-[#e6b325]"
            />
            <Link className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-500" />
          </div>
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer border border-red-500/20 shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center space-x-1.5 text-red-400 text-[11px] font-sans">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
