import clsx from "clsx";

export function cn(...inputs: Array<string | number | false | null | undefined>) {
  return clsx(inputs);
}