// src/templates/saas/(seoghost)/_components/blog/PageHeader.tsx

type Props = {
  badge: string;
  title: string;
  description: string;
};

export default function PageHeader({ badge, title, description }: Props) {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <span className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-[color:var(--sg-accent)] shadow-sm">
        {badge}
      </span>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">{title}</h1>
      <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">{description}</p>
    </header>
  );
}
