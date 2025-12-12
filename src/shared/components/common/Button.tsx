import { cn } from '@/shared/utils/utils';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
  onClick?: () => void;
  className?: string;
}

function Button({ value, onClick, className, ...rest }: ButtonProps) {
  return (
    <button
      className={cn(
        'button-shadow h-12 w-full rounded-lg bg-white/80 font-bold text-black',
        className
      )}
      onClick={onClick}
      {...rest}
    >
      {value || ''}
    </button>
  );
}

export default Button;
