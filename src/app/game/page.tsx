import { Suspense } from "react";
import GamePage from "@/components/game/GamePage";

function GameLoading() {
  return (
    <main className="min-h-screen bg-[#F7F1E6] flex items-center justify-center p-8">
      <p className="text-lg text-[#7A5A42]">Loading game...</p>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<GameLoading />}>
      <GamePage />
    </Suspense>
  );
}
