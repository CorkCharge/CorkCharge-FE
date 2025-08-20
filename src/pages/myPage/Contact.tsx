import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/shared/components/common/Header';
import ContactList from '@/shared/components/myPage/ContactList';
import WriteContact from '@/shared/components/myPage/WriteContact';
import ContactPost from '@/shared/components/myPage/ContactPost';

function Contact() {
  const navigate = useNavigate();

  // 1번 - 문의글 리스트, 2번 - 문의글 작성, 3번 - 문의글 보기
  const [contactController, setContactController] = useState(1);
  const [selectedSuggestionIdx, setSelectedSuggestionIdx] = useState(-1);

  return (
    <div className="relative min-h-screen px-4">
      <Header title="문의하기" type="back" backFn={() => navigate(-1)} />
      {contactController === 1 && (
        <ContactList
          onWrite={() => setContactController(2)}
          onDetail={() => setContactController(1)}
          selectPost={setSelectedSuggestionIdx}
        />
      )}
      {contactController === 2 && <WriteContact />}
      {contactController === 3 && <ContactPost selectedIdx={selectedSuggestionIdx} />}
    </div>
  );
}

export default Contact;
