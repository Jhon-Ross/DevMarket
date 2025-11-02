import React from "react";
import { cn } from "../../utils/cn";
import "./Grid.css";

export type GridGap = "none" | "sm" | "md" | "lg";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  gap?: GridGap;
}

export function Grid({ columns = 3, gap = "md", className, children, ...rest }: GridProps) {
  return (
    <div className={cn("grid", `grid-cols-${columns}`, `grid-gap-${gap}`, className)} {...rest}>
      {children}
    </div>
  );
}