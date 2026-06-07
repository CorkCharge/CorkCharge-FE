/**
 * Header type => back, additional, (undefined)
 *
 * back : Header의 제목과 back-arrow만 존재
 * additional : Header 제목과 텍스트버튼으로 추가 기능 보유
 * (undefined) : type 미기입 시 제목만 표기
 */

import { cn } from '@/shared/utils/utils';
import arrow from '@/shared/assets/left_arrow.svg';

interface HeaderProps {
  title: string;
  type?: 'back' | 'additional' | undefined;
  backFn?: () => void;
  fnTitle?: string;
  addiFn?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const NormalHeader = ({ title, className }: HeaderProps) => (
  <header
    className={cn(
      'flex h-[48px] items-center justify-center font-bold text-[var(--gray-8)]',
      className
    )}
  >
    {title}
  </header>
);

const BackHeader = ({ title, backFn = () => {}, className, style }: HeaderProps) => (
  <header
    className={cn(
      'relative flex h-[48px] items-center justify-center font-bold text-[var(--gray-8)]',
      className
    )}
    style={style}
  >
    <img src={arrow} className="absolute left-0 cursor-pointer" onClick={backFn} />
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
  <header
    className={cn(
      'relative flex h-[48px] items-center justify-center font-bold text-[var(--gray-8)]',
      className
    )}
  >
    <img
      src={arrow}
      onClick={backFn}
      className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer"
    />
    <span>{title}</span>
    <span
      className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-sm font-medium text-[var(--gray-6)] underline"
      onClick={addiFn}
    >
      {fnTitle}
    </span>
  </header>
);

function Header({ title, type, backFn, fnTitle, addiFn, className, style }: HeaderProps) {
  if (type === 'back') {
    return <BackHeader title={title} backFn={backFn} className={className} style={style} />;
  } else if (type === 'additional') {
    return (
      <AdditionalHeader
        title={title}
        fnTitle={fnTitle}
        addiFn={addiFn}
        backFn={backFn}
        className={className}
      />
    );
  } else return <NormalHeader title={title} className={className} />;
}

export default Header;
