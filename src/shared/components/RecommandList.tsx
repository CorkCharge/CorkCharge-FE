// import React from 'react';
import { useState } from 'react';
import './tip.css';

interface RecommandProps {
  setSearchValue?: (value: string) => void;
  // directSearch?: (value: string) => void;
}

const RecommandList = ({ setSearchValue }: RecommandProps) => {
  const [value, setValue] = useState<string | null>();

  const onclick = () => {
    console.log('해당 검색어 검색');
    // setValue('제즈레스토랑');
    setSearchValue?.(value || '');
    // directSearch?.(text || '');
  };

  //handleStroke 필요함
  return (
    <div>
      <div className="flex w-[348px] gap-1 overflow-x-auto">
        <button
          type="button"
          onClick={() => {
            setValue('제즈레스토랑');
            onclick();
          }}
          className="button"
        >
          제즈레스토랑
        </button>
        <button
          type="button"
          onClick={() => {
            setValue('라면 페어링');
            onclick();
          }}
          className="button"
        >
          라면 페어링
        </button>
        <button type="button" onClick={onclick} className="button">
          회기역
        </button>
        <button type="button" onClick={onclick} className="button">
          건대입구역
        </button>
      </div>
    </div>
  );
};

export default RecommandList;
