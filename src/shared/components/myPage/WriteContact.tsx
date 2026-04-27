import { useState } from 'react';

import { Input } from '../common/Input';
import { usePostSuggestion } from '@/shared/queries/suggestion/usePostSuggestion';

// const TYPE = ['콜키지 정보 오류', '가게 정보 오류', '기타'];
// const TYPE_VAL = ['CORKAGE_ERROR', '', 'OTHER_ERROR'];

function WriteContact({ onPreview }: { onPreview: () => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { mutate, isPending } = usePostSuggestion();

  const uploadPost = () => {
    if (isPending) return;
    if (!title.trim() || !content.trim()) return;

    mutate(
      { title, content, category: 'OTHER_ERROR' },
      {
        onSuccess: () => {
          onPreview();
        },
        onError: (e) => {
          console.error(e);
        },
      }
    );
  };
  return (
    <>
      <Input
        placeholder="문의 제목을 입력해주세요"
        className="mt-10"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="mt-3 h-[300px] w-full resize-none rounded-2xl bg-[var(--gray-1)] px-8 py-5"
        placeholder="문의 내용을 입력해주세요"
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      {/* <button className="mt-3 flex h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-[var(--primary)] bg-white font-bold text-[var(--primary)]">
        <img src={camera} className="h-[22px] w-[25px]" />
        사진 첨부하기
      </button> */}
      <button
        className="fixed bottom-9 left-1/2 mx-auto h-[48px] w-[80%] -translate-x-1/2 rounded-[10px] bg-[var(--primary)] font-bold text-white disabled:opacity-60"
        disabled={isPending || !title.trim() || !content.trim()}
        onClick={uploadPost}
        style={{ maxWidth: 'calc(var(--app-width) * 0.8)' }}
      >
        {isPending ? '등록 중...' : '등록하기'}
      </button>
    </>
  );
}

export default WriteContact;
