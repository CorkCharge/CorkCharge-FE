import { cn } from '@/shared/utils/utils';
import arrow from '@/shared/assets/images/arrow.png';

interface ItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

interface ListProps {
  children: React.ReactNode;
  className?: string;
}

export const ControlLists = ({ children, className }: ListProps) => {
  //   const renderItems = () => children.map((ch) => ch);
  return <div className={className}>{children}</div>;
};

export const ControlItem = ({ children, onClick, className }: ItemProps) => {
  return (
    <div className={cn('relative border-b px-4 py-5 font-bold', className)} onClick={onClick}>
      {children}
      <img src={arrow} className="absolute right-5 top-1/2 h-4 w-[9px] -translate-y-1/2" />
    </div>
  );
};
