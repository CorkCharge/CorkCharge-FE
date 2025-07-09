interface DotsProps {
  total: number;
  now: number;
  className?: string;
}

const renderDots = (total: number, now: number) =>
  [...new Array(total)].map((_, i) => (
    <span
      className={`block size-[6px] rounded-[50%] ${i < now ? 'bg-[#e75257]' : 'bg-white'}`}
    ></span>
  ));

function ProgressDots({ total, now, className }: DotsProps) {
  return <div className={`flex justify-center gap-2 ${className}`}>{renderDots(total, now)}</div>;
}

export default ProgressDots;
