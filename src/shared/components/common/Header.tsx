import { cn } from '@/shared/utils/utils';

interface HeaderProps {
  title: string;
  className?: string;
}

function Header({ title, className }: HeaderProps) {
  return (
    <header className={cn('flex h-[48px] items-center justify-center px-4 font-bold', className)}>
      {title}
    </header>
  );
}

export default Header;
