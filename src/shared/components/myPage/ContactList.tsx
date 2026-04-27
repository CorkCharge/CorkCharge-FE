import { useGetSuggestionList } from '@/shared/queries/suggestion/useSuggestion';

import plus from '@/shared/components/myPage/images/plus-button.svg';

interface ContactListProps {
  onWrite: () => void;
  onDetail: () => void;
  selectPost: React.Dispatch<React.SetStateAction<number>>;
}

function ContactList({ onWrite, onDetail, selectPost }: ContactListProps) {
  const { data: posts } = useGetSuggestionList();

  const renderPosts = () =>
    posts?.map((post) => (
      <li
        key={post.suggestionId}
        className="relative cursor-pointer border-b border-[var(--gray-3)] px-2 py-4"
        onClick={() => gotoPost(post.suggestionId)}
      >
        <p className="font-medium text-[var(--gray-8)]">{post.title}</p>
        <span className="text-[10px] font-medium text-[var(--gray-4)]">
          {dateFormatter(post.createdAt)}
        </span>
        <span
          className={`absolute right-5 top-1/2 -translate-y-1/2 rounded-full px-3 py-2 text-[10px] text-white ${post.completed ? 'bg-[rgba(116,151,85,0.75)]' : 'bg-[#DACBB6]'}`}
        >
          {post.completed ? '완료' : '대기중'}
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

      <img src={plus} className="absolute bottom-4 right-4 cursor-pointer" onClick={onWrite} />
    </>
  );
}

export default ContactList;
