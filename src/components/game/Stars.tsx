import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({ value, max = 3, size = 28 }: { value: number; max?: number; size?: number }) {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${value} of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          aria-hidden
          width={size}
          height={size}
          className={cn(
            "transition-transform",
            i < value ? "fill-sunny text-sunny" : "fill-muted text-muted-foreground/40",
          )}
        />
      ))}
    </div>
  );
}