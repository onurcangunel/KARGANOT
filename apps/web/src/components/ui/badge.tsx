import { cn } from '@/lib/utils';
import * as React from 'react';

export function Badge({ className, variant, ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: 'default' | 'secondary' | 'outline' }) {
  const base = 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium';
  const styles =
    variant === 'secondary'
      ? 'bg-gray-100 text-gray-700'
      : variant === 'outline'
      ? 'border border-gray-300 text-gray-700'
      : 'bg-black text-white';
  return <span className={cn(base, styles, className)} {...props} />;
}
