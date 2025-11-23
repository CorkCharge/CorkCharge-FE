import { cn } from '@/shared/utils/utils';

import default_background from '@/shared/assets/images/gradation-back.png';
import logo from '@/shared/assets/images/logo.svg';

interface backgroundProps {
  width?: string;
  className?: string;
  hasLogo?: boolean;
  containerClassName?: string;
  logoWidth?: string;
  logoHeight?: string;
}

const DefaultImage = ({
  width,
  className,
  hasLogo = false,
  containerClassName,
  logoHeight,
  logoWidth = '1/2',
}: backgroundProps) => {
  return (
    <div className={cn(width && `w-[${width}`, 'relative h-full', containerClassName)}>
      <img
        src={default_background}
        className={cn('w-full', className)}
        style={{ aspectRatio: '2/1' }}
      />
      {hasLogo && (
        <img
          src={logo}
          className={cn(
            'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            logoWidth && `w-[${logoWidth}]`,
            logoHeight && `h-[${logoHeight}]`
          )}
        />
      )}
    </div>
  );
};

export default DefaultImage;
