import { forwardRef } from 'react';

import { cn } from '@/shared/utils/utils';

import search from '@/shared/assets/images/search.png';

interface InputProps {
  className?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
  onSearch?: () => void;
  imgSrc?: string;
  onImgClick?: () => void;
  imgClassName?: string;
  inputClassName?: string;
  type?: string;
}

export const Input = ({ className, placeholder, onChange, value }: InputProps) => {
  return (
    <div
      className={cn(
        'flex h-[46px] items-center rounded-ee-full rounded-ss-full bg-[var(--gray-1)] px-8',
        className
      )}
    >
      <input
        className="w-full bg-transparent focus:outline-none"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export const Textarea = () => {};

export const SearchInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder, onChange, onKeyDown, value, onSearch }: InputProps, ref) => {
    return (
      <div
        className={cn(
          'relative flex h-[46px] items-center rounded-ee-full rounded-ss-full bg-[var(--gray-1)] pl-8 pr-[65px]',
          className
        )}
      >
        <input
          className="w-full bg-transparent focus:outline-none"
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value}
          ref={ref}
        />

        <img
          src={search}
          className="absolute right-10 top-1/2 size-[18px] -translate-y-1/2 cursor-pointer"
          onClick={onSearch}
        />
      </div>
    );
  }
);

export const ImageInput = ({
  imgSrc,
  className,
  placeholder,
  onChange,
  value,
  onImgClick,
  imgClassName,
  inputClassName,
  ...rest
}: InputProps) => {
  return (
    <div
      className={cn(
        'relative flex h-[46px] items-center rounded-ee-full rounded-ss-full bg-[var(--gray-1)] pl-8 pr-[65px]',
        className
      )}
    >
      <input
        className={cn('w-full bg-transparent focus:outline-none', inputClassName)}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...rest}
      />

      <img
        src={imgSrc}
        className={cn('absolute right-10 top-1/2 size-[18px] -translate-y-1/2', imgClassName)}
        onClick={onImgClick}
      />
    </div>
  );
};
