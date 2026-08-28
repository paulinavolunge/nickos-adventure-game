import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Map as MapIcon, ShieldCheck, Sparkles } from "lucide-react";
import nickoAsset from "@/assets/nicko.png.asset.json";
const nicko = nickoAsset.url;
import { BigButton } from "@/components/game/BigButton";
import { HeartMeter } from "@/components/game/HeartMeter";
import { Stars } from "@/components/game/Stars";
import { NERVOUS_BEFORE_NEW } from "@/game/nickoLines";
import { totalStars, useSave } from "@/game/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nicko's Adventures — Life Lessons Game for Kids 4-8" },
      {
        name: "description",
        content:
          "Play as Nicko the tabby cat and learn real-life skills like calling 911, kindness, and street safety through friendly mini-games. No ads.",
      },
      { property: "og:title", content: "Nicko's Adventures — Life Lessons Game for Kids 4-8" },
      {
        property: "og:description",
        content:
          "Play as Nicko the tabby cat and learn real-life skills like calling 911, kindness, and street safety through friendly mini-games. No ads.",
      },
    ],
  }),
  component: TitleScreen,
});

function TitleScreen() {
  const { data } = useSave();
  const stars = totalStars(data);

  return (
    <main
      className={`mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center gap-5 px-5 py-10 text-center ${data.settings.bigText ? "text-lg" : ""}`}
    >
      <img
        src={nicko}
        alt="Nicko the friendly gray tabby cat waving"
        width={1024}
        height={1024}
        fetchPriority="high"
        className="w-56 max-w-full object-contain bob feather-round drop-shadow-xl"
      />
      <div>
        <h1 className="text-5xl font-black leading-tight">Nicko&apos;s Adventures</h1>
        <p className="mt-2 text-lg font-bold text-muted-foreground">
          Big lessons for little heroes
        </p>
      </div>

      {stars === 0 && (
        <p className="toy-card px-4 py-3 text-sm font-bold text-muted-foreground">
          {NERVOUS_BEFORE_NEW}
        </p>
      )}

      <HeartMeter hearts={data.hearts} className="w-full" />

      {stars > 0 && (
        <div className="toy-card flex items-center gap-3 px-5 py-3">
          <Stars value={Math.min(stars, 3)} />
          <span className="font-black">{stars} stars earned</span>
        </div>
      )}

      <div className="flex w-full flex-col gap-3">
        <Link to="/map" className="w-full">
          <BigButton size="lg" variant="coral" className="w-full">
            <Play aria-hidden className="h-7 w-7" />
            {stars > 0 ? "Keep playing" : "Start adventure"}
          </BigButton>
        </Link>
        <Link to="/map" className="w-full">
          <BigButton variant="sunny" className="w-full">
            <MapIcon aria-hidden className="h-6 w-6" />
            World map
          </BigButton>
        </Link>
        <Link to="/rewards" className="w-full">
          <BigButton variant="grape" className="w-full">
            <Sparkles aria-hidden className="h-6 w-6" />
            Nicko&apos;s room
          </BigButton>
        </Link>
        <Link to="/parents" className="w-full">
          <BigButton variant="quiet" className="w-full">
            <ShieldCheck aria-hidden className="h-6 w-6" />
            Parents
          </BigButton>
        </Link>
      </div>
      <p className="text-sm font-bold text-muted-foreground">No ads. No purchases. Ever.</p>
    </main>
  );
}
