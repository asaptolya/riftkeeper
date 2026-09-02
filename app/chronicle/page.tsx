import EventLog from "@/components/EventLog";
import Navbar from "@/components/Navbar";

export default function ChroniclePage() {
  return (
    <main className="min-h-screen bg-[#030303] text-white">
      <Navbar />
      <section className="mx-auto max-w-4xl px-8 pb-24 pt-32">
        <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-700">
          Laboratory Record
        </p>

        <h1 className="mt-5 font-serif text-5xl text-neutral-100">
          Chronicle
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-600">
          A complete record of portal interventions, warnings and blocked
          actions.
        </p>

        <div className="my-10 h-px bg-white/[0.06]" />

        <EventLog />
      </section>
    </main>
  );
}