// src/templates/saas/(seoghost)/_components/blog/PageHeader.tsx

type Props = {
  badge: string;
  title: string;
  description: string;
};

export default function PageHeader({ badge, title, description }: Props) {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <span className="sg-eyebrow">
        {badge}
      </span>
      <h1 className="sg-h1 mt-6">{title}</h1>
      <p className="sg-lead mt-4">{description}</p>
    </header>
  );
}
