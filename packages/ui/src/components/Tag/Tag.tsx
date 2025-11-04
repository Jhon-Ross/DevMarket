import React from "react";
import { cn } from "../../utils/cn";
import "./Tag.css";

export type TagVariant = "default" | "primary" | "success" | "warning" | "danger";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
}

export function Tag({ variant = "default", className, children, ...rest }: TagProps) {
  const isClickable = typeof rest.onClick === "function";
  return (
    <span className={cn("tag", `tag-${variant}`, isClickable && "tag-clickable", className)} {...rest}>
      {children}
    </span>
  );
}