import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PreferDrink from '@/shared/components/onBoarding/PreferDrink';
import PreferMenu from '@/shared/components/onBoarding/PreferMenu';

function PreferSelect() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  return (
    <>
      {page === 1 && <PreferDrink onNext={setPage} />}
      {page === 2 && <PreferMenu onNext={() => navigate('/')} />}
    </>
  );
}

export default PreferSelect;
