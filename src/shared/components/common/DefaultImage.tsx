import { cn } from '@/shared/utils/utils';

import default_background from '@/shared/assets/images/gradation-back.png';

interface backgroundProps {
  width?: string;
  className?: string;
}

const DefaultImage = ({ width, className }: backgroundProps) => {
  return (
    <div className={cn(`w-[${width}]`)}>
      <img
        src={default_background}
        className={cn('w-full', className)}
        style={{ aspectRatio: '2/1' }}
      ></img>
    </div>
  );
};

export default DefaultImage;
