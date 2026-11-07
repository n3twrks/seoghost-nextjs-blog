import type { HeroAnswerBlock } from '../../../_types/pages';

/** H1 + the direct answer (first thing search and AI engines quote). */
export default function HeroAnswer({ block }: { block: HeroAnswerBlock }) {
  return (
    <header className="flex flex-col gap-5">
      <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">{block.h1}</h1>
      <p className="max-w-3xl text-lg leading-8 opacity-80">{block.answer}</p>
    </header>
  );
}
