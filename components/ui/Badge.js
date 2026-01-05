import { CATEGORIES } from '../../lib/constants';
import { cn } from '../../lib/utils';

export default function Badge({ category, className }) {
  // Constants dosyasından rengi çek, yoksa varsayılan gri yap
  const colorClass = CATEGORIES[category] || "bg-slate-100 text-slate-700";

  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase",
      colorClass,
      className
    )}>
      {category}
    </span>
  );
}