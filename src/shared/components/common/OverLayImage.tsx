import type { HTMLAttributes, ReactElement } from 'react';

import { cn } from '@/shared/utils/utils';

interface OverLayProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  children?: ReactElement;
  className?: string;
  paddingX?: string;
  paddingY?: string;
}

export const OverLayImage = ({
  src,
  className,
  paddingX,
  paddingY,
  children,
  ...rest
}: OverLayProps) => {
  const dynamicInset = {
    left: paddingX ? paddingX : 0,
    right: paddingX ? paddingX : 0,
    top: paddingY ? paddingY : 0,
    bottom: paddingY ? paddingY : 0,
  };

  const dynamicPadding = {
    paddingLeft: paddingX ? paddingX : 0,
    paddingRight: paddingX ? paddingX : 0,
    paddingTop: paddingY ? paddingY : 0,
    paddingBottom: paddingY ? paddingY : 0,
  };

  return (
    <div className={cn('relative w-full', className)} style={dynamicPadding} {...rest}>
      <img src={src} className="h-full w-full rounded-2xl" />
      <div className={cn('absolute rounded-2xl bg-[rgba(0,0,0,0.5)]')} style={dynamicInset}></div>

      {children}
    </div>
  );
};
