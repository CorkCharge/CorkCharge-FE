import { useRef, useState } from 'react';

import upload from '@/shared/components/myPage/images/upload-image.png';

function AuthMaster({ onNext }: { onNext: () => void }) {
  const fileSelector = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File>();

  const handleUpload = () => {
    fileSelector.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="px-4">
      <div className="pt-[60px]"></div>

      <div
        className="h-[6px] rounded-[4.5px]"
        style={{ boxShadow: '0 1px 2px 1px rgba(0,0,0,0.1) inset' }}
      >
        <div className="h-full w-[50%] rounded-[4.5px] bg-[var(--primary)]"></div>
      </div>

      <p className="mb-2 mt-5 text-2xl font-bold text-[var(--gray-8)]">사장님 인증</p>
      <p className="text-sm font-medium">사업자 등록증을 업로드 해주세요</p>
      <p className="text-sm font-medium">모든 글씨가 선명하게 잘 보이는 사진으로 해주세요</p>

      <div
        className="mt-10 flex aspect-square w-full items-center justify-center rounded-2xl bg-[var(--gray-1)]"
        onClick={handleUpload}
      >
        <img src={upload} className="h-[155px] w-[194px]" />
      </div>
      <input
        type="file"
        className="hidden"
        ref={fileSelector}
        accept="image/*"
        onChange={handleChange}
      />

      <div className="pb-[100px]"></div>

      {selectedFile && (
        <button
          className="fixed bottom-4 left-[10%] right-[10%] mx-auto h-[48px] w-[80%] max-w-[480px] rounded-[10px] bg-[var(--primary)] font-bold text-white"
          onClick={onNext}
        >
          다음
        </button>
      )}
    </div>
  );
}

export default AuthMaster;
