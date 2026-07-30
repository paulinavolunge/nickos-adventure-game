import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Map as MapIcon, ShieldCheck } from "lucide-react";
import nicko from "@/assets/nicko.png";
import { BigButton } from "@/components/game/BigButton";
import { Stars } from "@/components/game/Stars";
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
      { property: "og:title", content: "Nicko's Adventures — Life Lessons Game for Kids" },
      {
        property: "og:description",
        content: "A gentle, ad-free learning adventure for ages 4-8, starring Nicko the gray tabby cat.",
      },
    ],
  }),
  component: TitleScreen,
});

function TitleScreen() {
  const { data } = useSave();
  const stars = totalStars(data);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center gap-6 px-5 py-10 text-center">
      <img
        src={nicko}
        alt="Nicko the friendly gray tabby cat waving"
        width={1024}
        height={1024}
        className="w-56 max-w-full object-contain bob drop-shadow-xl"
      />
      <div>
        <h1 className="text-5xl font-black leading-tight">Nicko&apos;s Adventures</h1>
        <p className="mt-2 text-lg font-bold text-muted-foreground">
          Big lessons for little heroes
        </p>
      </div>

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
