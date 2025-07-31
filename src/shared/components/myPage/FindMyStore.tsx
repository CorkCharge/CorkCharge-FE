import search from '@/shared/assets/images/search.png';

function FindMyStore({ onNext }: { onNext: () => void }) {
  const renderStore = () =>
    [...new Array(5)].map((_, idx) => (
      <div key={idx} className="rounded-2xl bg-[var(--gray-1)] p-4 text-sm font-medium">
        <span className="text-xl font-bold">로니로티</span>
        <p className="mt-1 leading-6">서울 광진구 아차산로 225 단산화빌딩</p>
        <p className="flex gap-3 leading-6">
          <span>영업중</span>
          <span>21:30 라스트오더</span>
        </p>
        <p className="leading-6">병당 콜키지 1병 10,000원</p>
      </div>
    ));

  return (
    <div className="px-4">
      <div className="pt-[60px]"></div>

      <div
        className="h-[6px] rounded-[4.5px]"
        style={{ boxShadow: '0 1px 2px 1px rgba(0,0,0,0.1) inset' }}
      >
        <div className="h-full w-[1%] rounded-[4.5px] bg-[var(--primary)]"></div>
      </div>

      <p className="my-5 text-2xl font-bold text-[var(--gray-8)]">가게를 불러올게요</p>

      <div className="relative mb-4 rounded-ee-full rounded-ss-full bg-[var(--gray-1)]">
        <input
          type="text"
          placeholder="매장 주소를 입력해주세요"
          className="mx-6 my-2 w-[75%] bg-inherit"
          name="storeName"
        />
        <img src={search} className="absolute right-10 top-1/2 size-[18px] -translate-y-1/2" />
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto pb-[100px]">{renderStore()}</div>

      <button
        className="fixed bottom-4 left-[10%] right-[10%] mx-auto h-[48px] w-[80%] max-w-[480px] rounded-[10px] bg-[var(--primary)] font-bold text-white"
        onClick={onNext}
      >
        다음
      </button>
    </div>
  );
}

export default FindMyStore;
