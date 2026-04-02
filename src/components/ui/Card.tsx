import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "glass";
}

export default function Card({
  children,
  className = "",
  variant = "default",
}: CardProps) {
  const baseStyles = "rounded-2xl p-6 transition-all duration-300";

  const variants = {
    default: "bg-sage-200/50 border border-sage-300/30 shadow-md",
    glass: "glass",
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
