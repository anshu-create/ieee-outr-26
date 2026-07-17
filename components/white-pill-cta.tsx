import Link from "next/link";

interface WhitePillCTAProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  size?: "sm" | "md" | "lg";
}

export function WhitePillCTA({
  href,
  children,
  external = false,
  size = "md",
}: WhitePillCTAProps) {
  const sizeClasses = {
    sm: "px-5 py-2 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-9 py-3.5 text-base",
  };

  const className = `inline-flex items-center justify-center font-semibold rounded-[100px] bg-white text-[#010102] ${sizeClasses[size]} hover:bg-[#e8e8e8] active:bg-[#d4d4d4] transition-colors duration-150 select-none`;

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
