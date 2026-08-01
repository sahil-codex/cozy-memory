import AnimatedButton from "../components/ui/AnimationButton";
import Panel from "../components/ui/Panel";

export default function Home(){
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F1E6] p-6">
      <Panel className="w-full max-w-xl text-center">
        <h1 className="text-6xl font-extrabold text-[#5A3E2B]">Cozy Memory</h1>
        <p className="mt-4 text-lg text-[#7A5A42]">Match adorable cozy animals and relax.</p>
        <AnimatedButton className="mt-10 w-full">Play</AnimatedButton>
      </Panel>
    </main>
  )
}