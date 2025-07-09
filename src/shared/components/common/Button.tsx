interface ButtonProps {
  value?: string;
  className?: string;
}

function Button({ value, className }: ButtonProps) {
  return (
    <button className={`button-shadow h-12 w-full rounded-lg bg-white/80 text-black ${className}`}>
      {value || ''}
    </button>
  );
}

export default Button;
