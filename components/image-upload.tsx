"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const onRemove = (url: string) => {
    onChange(value.filter((val) => val !== url));
  };

  return (
    <div className="mb-4">
      <div className="mb-4 flex flex-wrap gap-4">
        {value.map((url) => (
          <div key={url} className="relative h-[200px] w-[200px]">
            <Image
              fill
              src={url}
              alt="Item image"
              className="rounded-lg object-cover"
            />
            <button
              onClick={() => onRemove(url)}
              className="absolute -right-2 -top-2 rounded-full bg-rose-500 p-1 text-white shadow-sm"
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          onChange([...value, ...(res?.map((r) => r.url) || [])]);
        }}
      />
    </div>
  );
}