import { useState } from 'react';

import Header from '@/shared/components/common/Header';
import ContactList from '@/shared/components/myPage/ContactList';
import WriteContact from '@/shared/components/myPage/WriteContact';
import ContactPost from '@/shared/components/myPage/ContactPost';

function Contact() {
  // 1번 - 문의글 리스트, 2번 - 문의글 작성, 3번 - 문의글 보기
  const [contactController, setContactController] = useState(3);

  return (
    <div className="relative min-h-screen px-4">
      <Header title="문의하기" type="back" />
      {contactController === 1 && <ContactList onWrite={() => setContactController(2)} />}
      {contactController === 2 && <WriteContact />}
      {contactController === 3 && <ContactPost />}
    </div>
  );
}

export default Contact;
