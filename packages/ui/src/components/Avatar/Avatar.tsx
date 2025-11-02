import React from "react";
import { cn } from "../../utils/cn";
import "./Avatar.css";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string; // used to derive initials for fallback
  size?: AvatarSize;
}

function getInitials(input?: string) {
  if (!input) return "";
  const parts = input.trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const second = parts.length > 1 ? parts[parts.length - 1]?.[0] || "" : "";
  return (first + second).toUpperCase();
}

export function Avatar({ src, alt, name, size = "md", className, ...rest }: AvatarProps) {
  const initials = getInitials(name || alt);
  return (
    <div className={cn("avatar", `avatar-${size}`, className)} {...rest}>
      {src ? (
        <img className="avatar-image" src={src} alt={alt || name || "Avatar"} />
      ) : (
        <span className="avatar-fallback" aria-hidden>{initials || "?"}</span>
      )}
    </div>
  );
}