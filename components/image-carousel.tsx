"use client";

import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface ImageCarouselProps {
  images: string[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((current) => (current + 1) % images.length);
  };

  const previous = () => {
    setCurrentIndex((current) => (current - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      <Card className="overflow-hidden">
        <div className="relative aspect-square">
          <Image
            src={images[currentIndex]}
            alt="Product image"
            fill
            className="object-cover"
          />
        </div>
      </Card>
      
      {images.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2"
            onClick={previous}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={next}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-1.5 w-1.5 rounded-full bg-foreground/50 transition-colors",
                index === currentIndex && "bg-foreground"
              )}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}