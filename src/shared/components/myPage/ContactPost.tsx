function ContactPost() {
  return (
    <>
      <div className="border-b border-t border-[var(--gray-3)] py-7 font-medium">
        <p className="text-[var(--gray-8)]">문의제목입니다.</p>
        <p className="text-[10px] text-[var(--gray-4)]">2025년 7월 24일</p>
        <p className="mt-3 text-sm text-[var(--gray-8)]">
          아이디 찾기를 했는데, 제가 사용하던 계정이 아니에요.
        </p>
      </div>

      <div className="pt-3 font-medium">
        <span className="text-[10px] font-semibold text-[var(--primary)]">Re</span>
        <p className="text-[var(--gray-8)]">문의제목입니다.</p>
        <p className="text-[10px] text-[var(--gray-4)]">2025년 7월 24일</p>
        <p className="mt-3 text-sm text-[var(--gray-6)]">
          고객님의 휴대폰 번호를 사용하시던 분이 연락처 변경 후 회원 정보에서 수정하지 않았을 수
          있습니다.
          <br />
          <br /> 계정 확인 시 고객님께서 사용하는 아이디가 아니라면, 아래 경로를 통해 새로운 계정을
          생성하실 수 있습니다. <br /> 새 계정에 휴대폰 번호가 연결되면, 기존 계정은 다시 사용할 수
          없으니 안심하셔도 됩니다.
        </p>
      </div>
    </>
  );
}

export default ContactPost;
