import { cn } from '@/shared/utils/utils';

interface ButtonProps {
  value?: string;
  onClick?: () => void;
  className?: string;
}

function Button({ value, onClick, className }: ButtonProps) {
  return (
    <button
      className={cn('button-shadow h-12 w-full rounded-lg bg-white/80 text-black', className)}
      onClick={onClick}
    >
      {value || ''}
    </button>
  );
}

export default Button;
