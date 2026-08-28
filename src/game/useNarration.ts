import { useCallback, useEffect, useRef } from "react";
import { useSave } from "./progress";

export function useNarration(text?: string) {
  const { data } = useSave();
  const enabled = data.settings.narration;
  const lastRef = useRef<string | undefined>(undefined);

  const speak = useCallback(
    (line: string) => {
      if (!enabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(line);
      utterance.rate = 0.9;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    },
    [enabled],
  );

  useEffect(() => {
    if (!text || lastRef.current === text) return;
    lastRef.current = text;
    speak(text);
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [text, speak]);

  return { speak, enabled };
}
