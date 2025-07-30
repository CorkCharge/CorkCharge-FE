import Header from '@/shared/components/common/Header';

function Contact() {
  return (
    <div className="px-4">
      <Header title="문의하기" type="back" />
      <div className="border-b border-t border-[var(--gray-3)] py-2 text-center text-sm font-medium text-[var(--gray-6)]">
        내가 남긴 문의
      </div>

      <ul>
        <li className="relative border-b border-[var(--gray-3)] px-2 py-4">
          <p className="font-medium text-[var(--gray-8)]">문의제목입니다.</p>
          <span className="text-[10px] font-medium text-[var(--gray-4)]">2025년 7월 24일</span>
          <span className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-[#DACBB6] px-3 py-1 text-[10px] text-white">
            대기중
          </span>
        </li>

        <li className="relative border-b border-[var(--gray-3)] px-2 py-4">
          <p className="font-medium text-[var(--gray-8)]">문의제목입니다.</p>
          <span className="text-[10px] font-medium text-[var(--gray-4)]">2025년 7월 24일</span>
          <span className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-[rgba(116,151,85,0.75)] px-3 py-1 text-[10px] text-white">
            완료
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Contact;
