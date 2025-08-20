import { useEffect, useState } from 'react';

import apiClient from '@/shared/apis/apiClient';

function ContactPost({ selectedIdx }: { selectedIdx: number }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postDate, setPostDate] = useState('');

  useEffect(() => {
    if (selectedIdx < 0 || !selectedIdx) return;

    apiClient
      .get(`/suggestion/${selectedIdx}`)
      .then((res) => {
        setTitle(res.data.data.title);
        setContent(res.data.data.content);
        const formatted = dateFormatter(res.data.data.createdAt);
        setPostDate(formatted);
      })
      .catch((e) => console.error('문의하기 글 불러오기 실패 : ' + e));
  }, [selectedIdx]);

  const dateFormatter = (date: string) => {
    const onlyDate = date.split('T')[0];
    const formatter = new Date(onlyDate).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formatter;
  };

  return (
    <>
      <div className="border-b border-t border-[var(--gray-3)] py-7 font-medium">
        <p className="text-[var(--gray-8)]">{title}</p>
        <p className="text-[10px] text-[var(--gray-4)]">{postDate}</p>
        <p className="mt-3 text-sm text-[var(--gray-8)]">{content}</p>
      </div>

      {/* <div className="pt-3 font-medium">
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
      </div> */}
    </>
  );
}

export default ContactPost;
