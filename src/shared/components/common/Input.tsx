import { cn } from '@/shared/utils/utils';

interface InputProps {
  className?: string;
  placeholder?: string;
}

export const Input = ({ className, placeholder }: InputProps) => {
  return (
    <div
      className={cn(
        'flex h-[46px] items-center rounded-ee-full rounded-ss-full bg-[var(--gray-1)] px-8',
        className
      )}
    >
      <input className="w-full bg-transparent" placeholder={placeholder} />
    </div>
  );
};

export const Textarea = () => {};
