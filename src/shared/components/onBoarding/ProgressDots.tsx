interface DotsProps {
  total: number;
  now: number;
  color?: string;
  className?: string;
}

const renderDots = (total: number, now: number, color?: string) =>
  [...new Array(total)].map((_, i) => (
    <span
      className="block size-[6px] rounded-[50%]"
      style={{ backgroundColor: i < now ? '#e75257' : color }}
    ></span>
  ));

function ProgressDots({ total, now, color = 'white', className }: DotsProps) {
  return (
    <div className={`flex justify-center gap-2 ${className}`}>{renderDots(total, now, color)}</div>
  );
}

export default ProgressDots;
