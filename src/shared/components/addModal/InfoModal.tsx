import { useState } from 'react';
import CompleteModal from './CompleteModal';
import { addCorkageInfo, type AddCorkageRequest } from '@/shared/apis/corkage/corkageApi';

type CorkageInfo = {
  selectedType: string | null;
  corkagePrice: number;
  multiCorkages: { liquorType: string; price: number }[];
  optionTypes: {
    ICE_PROVIDED: boolean;
    GLASS_PROVIDED: boolean;
    ONE_BOTTLE_FREE: boolean;
    TWO_BOTTLE_FREE: boolean;
    ETC: boolean;
  };
  etcContent: string;
};

type InfoModalProps = {
  storeName: string;
  restaurantId: number;
  onClose: () => void;
  corkageInfo: CorkageInfo;
};

// [수정] 키를 AddOption의 'selected' 상태값과 일치시킵니다.
const CORKAGE_TYPE_TEXT: { [key: string]: string } = {
  FREE: '콜키지 프리',
  PER_BOTTLE: '병당 콜키지',
  PER_PERSON: '인당 콜키지',
  PER_TABLE: '테이블 콜키지',
  MULTIPLE: '다중 콜키지',
};

const DETAIL_OPTION_TEXT: { [key: string]: string } = {
  ICE_PROVIDED: '얼음 제공',
  GLASS_PROVIDED: '잔 제공',
  ONE_BOTTLE_FREE: '한병 무료',
  TWO_BOTTLE_FREE: '두병 무료',
};

const InfoModal = ({ storeName, restaurantId, onClose, corkageInfo }: InfoModalProps) => {
  const {
    selectedType,
    corkagePrice,
    multiCorkages,
    optionTypes,
    etcContent: otherOptionText,
  } = corkageInfo;

  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const selectedDetailOptions = Object.entries(optionTypes)
    .filter(([key, value]) => key !== 'ETC' && value)
    .map(([key]) => DETAIL_OPTION_TEXT[key]);

  // "등록하기" 버튼 클릭 시 실행될 함수
  const handleRegister = async () => {
    if (!selectedType) {
      alert('기본 정보를 선택해주세요.');
      return;
    }

    // API가 요구하는 optionTypes 배열 형태로 변환
    const optionTypesArray = Object.entries(optionTypes)
      .filter(([, value]) => value === true)
      .map(([key]) => key);

    // API 요청 Body 생성
    const requestBody: AddCorkageRequest = {
      restaurantId,
      corkageType: selectedType,
      corkagePrice: 0, // 기본값
      multiCorkages: null, // 기본값
      optionTypes: optionTypesArray,
      etcContent: optionTypes.ETC ? otherOptionText : null,
    };

    // 선택된 타입에 따라 Body 내용 조정
    if (selectedType === 'MULTIPLE') {
      requestBody.multiCorkages = multiCorkages.filter((opt) => opt.liquorType && opt.price > 0);
    } else {
      requestBody.corkagePrice = corkagePrice;
    }

    // API 호출
    try {
      console.log('API 요청 Body:', requestBody);
      const response = await addCorkageInfo(requestBody);
      console.log('API 응답:', response);

      if (response.success) {
        setIsCompleteModalOpen(true);
      } else {
        alert(`등록 실패: ${response.message}`);
      }
    } catch (error) {
      console.error('콜키지 정보 등록 실패:', error);
      alert('등록 중 오류가 발생했습니다.');
    }

    console.log('등록할 정보:', corkageInfo);
  };

  // "확인하러 가기" 버튼 클릭 시 실행될 함수
  const handleConfirm = () => {
    console.log('확인하러가기 버튼 클릭!');
    setIsCompleteModalOpen(false); // 확인 후 모달 닫기
    onClose(); // 기존 정보 모달도 닫기
  };

  return (
    <>
      {!isCompleteModalOpen && (
        <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.5)]">
          <div
            className="h-auto max-h-[80vh] w-[293px] rounded-[16px] bg-white/80 pb-[24px] pl-[15px] pr-[15px] pt-[24px] text-[24px] font-[700]"
            style={{
              boxShadow:
                '0px 4px 20px 0px rgba(58, 13, 16, 0.20), 0.318px 0.318px 2px 0px rgba(255, 255, 255, 0.30) inset',
            }}
          >
            <div className="mb-[20px]">{storeName}</div>
            <div className="flex flex-col gap-[8px] overflow-y-auto">
              <div className="text-[16px] font-[700]">콜키지 정보</div>
              <div className="flex flex-row gap-[20px]">
                <div className="shrink-0 text-[16px] font-[700]">기본 정보</div>
                {/* [수정] 기본 정보 표시 로직 변경 */}
                <div className="text-[16px] font-[500]">
                  {selectedType && CORKAGE_TYPE_TEXT[selectedType]}
                  {['PER_BOTTLE', 'PER_PERSON', 'PER_TABLE'].includes(selectedType!) &&
                    corkagePrice && <span> {Number(corkagePrice).toLocaleString()}원</span>}
                </div>
              </div>
              {(selectedDetailOptions.length > 0 || (optionTypes.ETC && otherOptionText)) && (
                <div className="flex flex-row gap-[20px]">
                  <div className="shrink-0 text-[16px] font-[700]">세부 옵션</div>
                  <div className="gap-[8px] text-[16px] font-[500]">
                    {selectedDetailOptions.map((optionText) => (
                      <div key={optionText}>{optionText}</div>
                    ))}
                    {/* [수정] '여러 기타' 선택 시 '기타 사항'과 입력된 텍스트를 함께 표시 */}
                    {optionTypes.ETC && otherOptionText && (
                      <div className="max-w-[162px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {otherOptionText}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="mb-[16px] mt-[24px] h-[1px] w-full bg-black"></div>
            <div className="mb-[24px] text-center text-[16px] font-[700]">위 정보가 맞습니까?</div>
            <div className="flex w-full flex-row justify-center gap-[12px]">
              <button
                className="h-[48px] w-[43%] cursor-pointer items-center rounded-[12px] bg-[#F3F3F6] text-[16px] font-[700] text-black"
                onClick={onClose}
              >
                취소
              </button>
              <button
                onClick={handleRegister}
                className="h-[48px] w-[43%] cursor-pointer items-center rounded-[12px] bg-[#90212A] text-[16px] font-[700] text-white"
              >
                등록하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. isCompleteModalOpen 상태에 따라 완료 모달을 렌더링합니다. */}
      {isCompleteModalOpen && <CompleteModal onClose={onClose} onConfirm={handleConfirm} />}
    </>
  );
};

export default InfoModal;
