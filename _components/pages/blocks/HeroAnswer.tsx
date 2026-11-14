import type { HeroAnswerBlock } from '../../../_types/pages';

/** H1 + the direct answer (first thing search and AI engines quote). */
export default function HeroAnswer({ block }: { block: HeroAnswerBlock }) {
  return (
    <header className="flex flex-col gap-5">
      <h1 className="sg-h1">{block.h1}</h1>
      <p className="sg-lead max-w-3xl">{block.answer}</p>
    </header>
  );
}
