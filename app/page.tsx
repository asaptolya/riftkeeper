import PortalMap from "@/components/PortalMap";
import Link from "next/link";
import LaboratorySummary from "@/components/LaboratorySummary";
import ResetLaboratoryButton from "@/components/ResetLaboratoryButton";
import Navbar from "@/components/Navbar";
import VeilStatus from "@/components/VeilStatus";
import LaboratoryStatusLine from "@/components/LaboratoryStatusLine";
import HeroRuneArc from "@/components/HeroRuneArc";


export default function Home() {
  return (
    <main className="min-h-screen bg-[#030303] text-white">
      <Navbar />

      <section className="relative mx-auto max-w-[1500px] overflow-hidden px-8 pb-28 pt-40">
        <HeroRuneArc />
        <div className="relative z-10 grid min-h-[520px] items-center gap-16 lg:grid-cols-[1fr_500px]">
          <div className="relative max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-700">
              The Riftkeeper&apos;s Archive
            </p>

            <h1 className="mt-7 font-serif text-7xl leading-[0.93] tracking-[-0.04em] text-neutral-100">
              Watch the gates
              <br />
              between worlds.
            </h1>

            <p className="mt-8 max-w-lg text-base leading-7 text-neutral-600">
              Ancient passages bind distant realms together.
              Some remain calm. Others fracture, twist and draw
              dangerously close to collapse.
            </p>

            <LaboratoryStatusLine />

            <div className="mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-neutral-700">
              <span>↓</span>
              <span>Descend into the realm map</span>
            </div>
          </div>

          <div className="hidden justify-end pr-8 lg:flex">
            <VeilStatus />
          </div>
        </div>
      </section>

      <LaboratorySummary />
      <div className="mx-auto flex max-w-[1500px] justify-end px-8 pb-10">
        <ResetLaboratoryButton />
      </div>
      <PortalMap />
    </main>
  );
}
