import React from "react";
import { cn } from "../../utils/cn";
import "./Card.css";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
  elevated?: boolean;
}

export function Card({ bordered = true, elevated = false, className, children, ...rest }: CardProps) {
  return (
    <div className={cn("card", bordered && "card-bordered", elevated && "card-elevated", className)} {...rest}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("card-header", className)} {...rest}>
      {children}
    </div>
  );
}

export function CardBody({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("card-body", className)} {...rest}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("card-footer", className)} {...rest}>
      {children}
    </div>
  );
}