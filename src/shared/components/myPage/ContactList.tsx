import { useEffect, useState } from 'react';

import apiClient from '@/shared/apis/apiClient';

import plus from '@/shared/components/myPage/images/plus-button.svg';

interface ContactPost {
  suggestionId: number;
  title: string;
  createdAt: string;
}
interface ContactListProps {
  onWrite: () => void;
  onDetail: () => void;
  selectPost: React.Dispatch<React.SetStateAction<number>>;
}

function ContactList({ onWrite, onDetail, selectPost }: ContactListProps) {
  const [posts, setPosts] = useState<ContactPost[]>([]);

  useEffect(() => {
    apiClient
      .get('/suggestion')
      .then((res) => {
        setPosts(res.data.data);
      })
      .catch((e) => console.error('문의하기 목록 호출 실패 : ' + e));
  }, []);

  const renderPosts = () =>
    posts.map((post) => (
      <li
        key={post.suggestionId}
        className="relative border-b border-[var(--gray-3)] px-2 py-4"
        onClick={() => gotoPost(post.suggestionId)}
      >
        <p className="font-medium text-[var(--gray-8)]">{post.title}</p>
        <span className="text-[10px] font-medium text-[var(--gray-4)]">
          {dateFormatter(post.createdAt)}
        </span>
        <span className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-[#DACBB6] px-3 py-1 text-[10px] text-white">
          완료
        </span>
      </li>
    ));

  const gotoPost = (postId: number) => {
    selectPost(postId);
    onDetail();
  };

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
      <div className="border-b border-t border-[var(--gray-3)] py-2 text-center text-sm font-medium text-[var(--gray-6)]">
        내가 남긴 문의
      </div>

      <ul>{renderPosts()}</ul>

      <div className="fixed bottom-[20px] left-0 right-0 mx-auto max-w-[600px] cursor-pointer bg-[yellow]">
        <img src={plus} className="absolute bottom-0 right-4" onClick={onWrite} />
      </div>
    </>
  );
}

export default ContactList;
