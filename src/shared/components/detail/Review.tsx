import black_x from '../../assets/detailPageImgs/black_x.svg';
import camera from '../../assets/detailPageImgs/camera.svg';
import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { StarRate } from '../common/StarRate';
import Header from '../common/Header';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/shared/apis/apiClient';

const Review = () => {
  const location = useLocation();
  const { rating, restId } = location.state || 1;

  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedfile, setSelectedFile] = useState<File>();

  const fileSelector = useRef<HTMLInputElement>(null);

  const handleReview = () => {
    if (!content) return;
    const formData = new FormData();
    const payload = { content, rating };
    // formData.append('content', content);
    // formData.append('rating', rating);
    formData.append('request', JSON.stringify(payload));
    if (selectedfile) {
      formData.append('images', selectedfile);
    }

    apiClient
      .post(`/review/${restId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(() => {
        navigate(`/detailInfo/${restId}`, { state: { openReviewModal: true } });
      })
      .catch((e) => console.error(e));
  };

  const handleCancel = () => {
    setContent('');
  };

  const handelImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4">
      {/* <div className="mt-6 text-[16px] font-bold">리뷰</div> */}
      <Header title="리뷰" type="back" backFn={() => navigate(-1)} className="w-full" />
      <div className="mb-12 mt-12 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center text-[30px] font-bold">
          <div>앤비햄버거에서의</div>
          <div>콜키지는 어떠셨나요?</div>
        </div>
        <div className="flex gap-2">
          <StarRate rate={rating} />
        </div>
      </div>
      <div className="relative flex h-[288px] w-full items-center justify-center rounded-br-[40px] rounded-tl-[40px] bg-[#FFFFFF] pl-6 pr-6 shadow-[0_2px_15px_rgba(0,0,0,0.05)]">
        <textarea
          placeholder="리뷰를 입력해주세요"
          className="mb-12 ml-2 mr-4 mt-16 h-[270px] w-[340px] resize-none bg-transparent text-[17px] text-[#9FA2AA] outline-none"
          rows={1}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <img
          src={black_x}
          onClick={handleCancel}
          className="absolute right-3 top-6 cursor-pointer"
        />
      </div>

      <div className="mt-5 flex justify-center">
        <img src={previewUrl} className="w-[80%] max-w-[500px]" />
      </div>

      {!previewUrl && (
        <div
          className="mb-4 mt-4 flex h-[48px] w-[361px] cursor-pointer items-center justify-center rounded-[10px] border border-[#90212A] bg-white"
          onClick={() => fileSelector.current?.click()}
        >
          <div className="flex gap-2">
            <img src={camera} />
            <div className="text-[16px] font-bold text-[#90212A]">사진 첨부하기</div>
          </div>
        </div>
      )}

      <input
        type="file"
        className="hidden"
        ref={fileSelector}
        accept="image/*"
        onChange={handelImage}
      />

      <div
        onClick={handleReview}
        className={`mb-4 mt-12 flex h-[48px] w-[361px] items-center justify-center rounded-[10px] ${content ? 'cursor-pointer bg-[#90212A]' : 'cursor-not-allowed bg-[#FFFFFF]'} shadow-[0_2px_18px_rgba(0,0,0,0.1)]`}
      >
        <div className="flex gap-2">
          <div className={`text-[16px] font-bold ${content ? 'text-white' : 'text-[#35353F]'}`}>
            리뷰 등록하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
