interface NextButtonProps {
  onClick: () => void;
}

const NextButton = ({ onClick }: NextButtonProps) => {
  return (
    <button
      className="absolute bottom-[27px] z-[100] h-[48px] w-[312px] rounded-[10px] bg-[#90212A] text-white"
      onClick={onClick}
    >
      다음
    </button>
  );
};

export default NextButton;
