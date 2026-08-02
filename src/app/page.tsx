
import Glow from "../components/background/Glow";
import FloatingLeaves from "../components/background/FloatingLeaves";
import HeroAnimal from "../components/background/HeroAnimal";
import AnimatedButton from "../components/ui/AnimationButton";
import Panel from "../components/ui/Panel";
import Link from "next/link";


export default function Home(){
  return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F1E6] p-6">
      <Glow />
      <FloatingLeaves />

      <Panel className="relative z-10 w-full max-w-xl text-center">
        <HeroAnimal />

        <h1 className="text-6xl font-extrabold text-[#5A3E2B]">
          Cozy Memory
        </h1>

        <p className="mt-4 text-lg text-[#7A5A42]">
          Match adorable cozy animals and relax.
        </p>
        <Link href="/game" className="block mt-10">
        <AnimatedButton className="mt-10 w-full">
          Play
        </AnimatedButton>
        </Link>
      </Panel>
    </main>
  );
}