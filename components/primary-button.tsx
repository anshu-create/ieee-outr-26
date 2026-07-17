import Link from "next/link";

interface PrimaryButtonProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

export function PrimaryButton({
  href,
  children,
  external = false,
}: PrimaryButtonProps) {
  const className =
    "inline-flex items-center justify-center font-medium rounded-lg bg-text-primary text-bg-primary px-6 py-3 text-body-md hover:bg-text-secondary active:scale-[0.98] transition-all duration-200 select-none shadow-sm";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
