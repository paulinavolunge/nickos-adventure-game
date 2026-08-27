import { Volume2 } from "lucide-react";
import nickoAsset from "@/assets/nicko.png.asset.json";
const nicko = nickoAsset.url;
import { useNarration } from "@/game/useNarration";
import { BigButton } from "./BigButton";

export function NickoSays({ line, small }: { line: string; small?: boolean }) {
  const { speak } = useNarration(line);

  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
      <img
        src={nicko}
        alt="Nicko the gray tabby cat"
        width={1024}
        height={1024}
        className={small ? "h-16 w-16 shrink-0 object-contain bob feather-round" : "h-24 w-24 shrink-0 object-contain bob feather-round"}
      />
      <div className="toy-card relative min-w-0 p-4">
        <p aria-live="polite" className={small ? "text-base font-bold" : "text-lg font-bold"}>
          {line}
        </p>
        <BigButton
          variant="quiet"
          size="icon"
          aria-label="Hear it again"
          onClick={() => speak(line)}
          className="absolute -right-2 -top-4 h-12 min-h-12 w-12 min-w-12 rounded-full"
        >
          <Volume2 aria-hidden className="h-6 w-6" />
        </BigButton>
      </div>
    </div>
  );
}