import { useState } from 'react';

import PreferDrink from '@/shared/components/onBoarding/PreferDrink';
import PreferMenu from '@/shared/components/onBoarding/PreferMenu';

function PreferSelect() {
  const [page, setPage] = useState(1);

  return (
    <>
      {page === 1 && <PreferDrink onNext={setPage} />}
      {page === 2 && <PreferMenu />}
    </>
  );
}

export default PreferSelect;
