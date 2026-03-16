import Image from "next/image";
import type * as React from "react";

import { cn } from "@/lib/utils";

export function Avatar({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

type AvatarImageProps = {
  alt: string;
  className?: string;
  onError?: React.ComponentProps<typeof Image>["onError"];
  src: string;
};

export function AvatarImage({
  className,
  alt,
  src,
  ...props
}: AvatarImageProps) {
  const normalizedSrc = src.trim();

  if (!normalizedSrc) {
    return null;
  }

  return (
    <Image
      className={cn("aspect-square size-full", className)}
      alt={alt}
      src={normalizedSrc}
      width={32}
      height={32}
      {...props}
    />
  );
}

export function AvatarFallback({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
