import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AboutCorkage from '@/shared/components/onBoarding/AboutCorkage';
import AboutSaving from '@/shared/components/onBoarding/AboutSaving';
import AboutHotStore from '@/shared/components/onBoarding/AboutHotStore';
import AboutPlease from '@/shared/components/onBoarding/AboutPlease';

function OnBoarding() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  return (
    <>
      {page === 1 && <AboutCorkage onNext={setPage} />}
      {page === 2 && <AboutSaving onNext={setPage} />}
      {page === 3 && <AboutHotStore onNext={setPage} />}
      {page === 4 && (
        <AboutPlease
          onNext={() => {
            navigate('/signin');
          }}
        />
      )}
    </>
  );
}

export default OnBoarding;
