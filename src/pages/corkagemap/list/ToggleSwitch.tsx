import { useState } from 'react';
import { motion } from 'framer-motion';

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <button
      className={`relative flex h-[31px] w-[54px] items-center rounded-[16px] p-1 transition-colors ${
        isOn ? 'bg-[#90212A]' : 'bg-gray-300'
      }`}
      onClick={() => setIsOn(!isOn)}
      aria-pressed={isOn}
    >
      <motion.div
        className="h-6 w-6 rounded-full bg-white shadow"
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        style={{
          // isOn이 true일 때 오른쪽(22px), false일 때 왼쪽(0px)
          x: isOn ? 22 : 0,
        }}
      />
    </button>
  );
};

export default ToggleSwitch;
