import { useState } from 'react';

import FindMyStore from '@/shared/components/myPage/FindMyStore';
import AuthMaster from '@/shared/components/myPage/AuthMaster';
import CompleteSignUp from '@/shared/components/myPage/CompleteSignUp';

function MasterSignUp() {
  const [page, setPage] = useState(3);

  const nextPage = () => setPage((prev) => prev + 1);

  return (
    <>
      {page === 1 && <FindMyStore onNext={nextPage} />}
      {page === 2 && <AuthMaster onNext={nextPage} />}
      {page === 3 && <CompleteSignUp />}
    </>
  );
}

export default MasterSignUp;
