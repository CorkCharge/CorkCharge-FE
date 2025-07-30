import { useState } from 'react';

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="flex w-full flex-col gap-[4px] self-start">
      <div className="ml-[32px] mt-[14px] self-start text-[20px] font-[500]">업종</div>
      <div className="ml-[32px] flex w-full flex-row gap-[8px]">
        {['한식', '중식', '양식', '일식'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`h-[32px] w-[14%] rounded-[20px] text-[14px] font-[500] ${
              selectedCategory === category
                ? `bg-[#90212A] text-white`
                : `bg-[#F3F3F6] text-[#90212A]`
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
