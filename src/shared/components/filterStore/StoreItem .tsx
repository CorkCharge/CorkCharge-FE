interface StoreItemProps {
  onClick: () => void;
  storeName: string;
  address: string;
}

const StoreItem = ({ onClick, storeName, address }: StoreItemProps) => {
  return (
    <div
      className={`relative z-10 flex min-h-[88px] w-[361px] flex-row items-center rounded-[16px] bg-[#F3F3F6]`}
      onClick={onClick}
    >
      <div className="flex w-[310px] flex-col">
        <div className={`ml-[16px] text-[20px] font-[700] text-black`}>{storeName}</div>
        <div className={`ml-[16px] text-[14px] font-[500] text-black`}>{address}</div>
      </div>
    </div>
  );
};

export default StoreItem;
