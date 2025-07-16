interface DotsProps {
  total: number;
  now: number;
  color?: string;
  className?: string;
}

const renderDots = (total: number, now: number, color?: string) =>
  [...new Array(total)].map((_, i) => (
    <span
      key={i}
      className="block size-[6px] rounded-[50%]"
      style={{ backgroundColor: i === now - 1 ? '#e75257' : color }}
    ></span>
  ));

function ProgressDots({ total, now, color = 'white', className }: DotsProps) {
  return (
    <div className={`flex justify-center gap-2 ${className}`}>{renderDots(total, now, color)}</div>
  );
}

export default ProgressDots;
