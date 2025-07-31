// import React from 'react';
import './tip.css';

const RecommandList = () => {
  const onclick = () => {
    console.log('해당 검색어 검색');
  };

  return (
    <div>
      <div className="flex gap-1">
        <button type="button" onClick={onclick} className="button">
          삼겹살 맛집
        </button>
        <button type="button" onClick={onclick} className="button">
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
