import React from "react";
import { cn } from "../../utils/cn";
import "./MediaGallery.css";

export type MediaItem = {
  id?: string;
  src: string;
  alt: string;
  type?: "image" | "video";
  caption?: string;
};

export interface MediaGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MediaItem[];
  onItemClick?: (item: MediaItem, index: number) => void;
}

export function MediaGallery({ items, onItemClick, className, ...rest }: MediaGalleryProps) {
  return (
    <div className={cn("media-gallery", className)} role="list" {...rest}>
      {items.map((item, index) => (
        <figure key={item.id ?? index} className="media-gallery-item media-gallery-figure" role="listitem">
          {item.type === "video" ? (
            <video className="media-gallery-thumb" src={item.src} aria-label={item.alt} controls />
          ) : (
            <img className="media-gallery-thumb" src={item.src} alt={item.alt} />
          )}
          {item.caption && <figcaption className="media-gallery-caption">{item.caption}</figcaption>}
          {onItemClick && (
            <button
              type="button"
              aria-label="View media"
              style={{ position: "absolute", inset: 0, background: "transparent", border: 0, cursor: "pointer" }}
              onClick={() => onItemClick(item, index)}
            />
          )}
        </figure>
      ))}
    </div>
  );
}