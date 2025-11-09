import { cn } from '@/lib/utils';

export function Avatar({ src, alt, size = 32, children, className }: { src?: string | null; alt?: string; size?: number; children?: React.ReactNode; className?: string }) {
  if (children) return <div className={cn('inline-block rounded-full overflow-hidden', className)} style={{ width: size, height: size }}>{children}</div>;
  return <img src={src || '/image/logo.png'} alt={alt ?? ''} width={size} height={size} className={cn('inline-block rounded-full object-cover', className)} />;
}

export function AvatarImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img {...props} />;
}

export function AvatarFallback({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <div className={cn('grid place-items-center bg-gray-200 text-gray-600', className)}>{children}</div>;
}
