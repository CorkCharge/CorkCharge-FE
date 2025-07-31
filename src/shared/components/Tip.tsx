// import React from 'react'
import './tip.css';
import { useState } from 'react';

const Tip = () => {
  const [selectAll, setSelectAll] = useState<boolean>(true);
  const [selectTip, setSelectTip] = useState<boolean>(false);
  const [selectEvt, setSelectEvt] = useState<boolean>(false);
  const [selectPairing, setSelectPairing] = useState<boolean>(false);

  const handleAllBtn = () => {
    setSelectAll(true);
    setSelectTip(false);
    setSelectEvt(false);
    setSelectPairing(false);
  };
  const handleTipBtn = () => {
    setSelectAll(false);
    setSelectTip(true);
    setSelectEvt(false);
    setSelectPairing(false);
  };
  const handlePrBtn = () => {
    setSelectAll(false);
    setSelectTip(false);
    setSelectEvt(false);
    setSelectPairing(true);
  };
  const handleEvtBtn = () => {
    setSelectAll(false);
    setSelectTip(false);
    setSelectEvt(true);
    setSelectPairing(false);
  };
  return (
    <div className="flex gap-1">
      <button
        type="button"
        onClick={handleAllBtn}
        className={`button ${selectAll ? 'bg-[#90212A]' : 'bg-[#f3f3f6]'}`}
      >
        전체
      </button>
      <button
        type="button"
        onClick={handleTipBtn}
        className={`button ${selectTip ? 'bg-[#90212A]' : 'bg-[#f3f3f6]'}`}
      >
        콜키지 팁
      </button>
      <button
        type="button"
        onClick={handlePrBtn}
        className={`button ${selectPairing ? 'bg-[#90212A]' : 'bg-[#f3f3f6]'}`}
      >
        페어링 큐레이션
      </button>
      <button
        type="button"
        onClick={handleEvtBtn}
        className={`button ${selectEvt ? 'bg-[#90212A]' : 'bg-[#f3f3f6]'}`}
      >
        EVENT
      </button>
    </div>
  );
};

export default Tip;
