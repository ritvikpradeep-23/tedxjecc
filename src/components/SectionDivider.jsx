import { ArrowBreakPattern } from "./BackgroundPatterns";

export default function SectionDivider() {
  return (
    <div className="relative h-12 sm:h-16 w-full overflow-hidden" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-tedx-red/10 blur-3xl" />
      <ArrowBreakPattern className="text-white/15" />
    </div>
  );
}
