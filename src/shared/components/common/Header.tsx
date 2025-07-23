import { cn } from '@/shared/utils/utils';
import arrow from '@/shared/assets/left_arrow.svg';

interface HeaderProps {
  title: string;
  type?: string;
  backFn?: () => void;
  fnTitle?: string;
  addiFn?: () => void;
  className?: string;
}

const NormalHeader = ({ title, className }: HeaderProps) => (
  <header className={cn('flex h-[48px] items-center justify-center font-bold', className)}>
    {title}
  </header>
);

const BackHeader = ({ title, backFn = () => {}, className }: HeaderProps) => (
  <header className={cn('relative flex h-[48px] items-center justify-center font-bold', className)}>
    <img src={arrow} className="absolute left-0" onClick={backFn} />
    <span>{title}</span>
  </header>
);

const AdditionalHeader = ({
  title,
  backFn = () => {},
  fnTitle = '',
  addiFn = () => {},
  className,
}: HeaderProps) => (
  <header className={cn('relative flex h-[48px] items-center justify-center font-bold', className)}>
    <img src={arrow} onClick={backFn} className="absolute left-0 top-1/2 -translate-y-1/2" />
    <span>{title}</span>
    <span
      className="absolute right-0 top-1/2 -translate-y-1/2 text-sm font-medium text-[var(--gray-6)] underline"
      onClick={addiFn}
    >
      {fnTitle}
    </span>
  </header>
);

function Header({ title, type, backFn, fnTitle, addiFn, className }: HeaderProps) {
  if (type === 'back') {
    return <BackHeader title={title} backFn={backFn} className={className} />;
  } else if (type === 'additional') {
    return <AdditionalHeader title={title} fnTitle={fnTitle} addiFn={addiFn} />;
  } else return <NormalHeader title={title} className={className} />;
}

export default Header;
