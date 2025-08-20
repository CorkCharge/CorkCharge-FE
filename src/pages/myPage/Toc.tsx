import { useNavigate } from 'react-router-dom';

import Header from '@/shared/components/common/Header';

function Toc() {
  const navigate = useNavigate();
  return (
    <div className="px-4">
      <Header title="개인정보처리방침" type="back" backFn={() => navigate(-1)} />
      <h1 className="font-bold">코르크차지 개인정보처리방침</h1>
      <p className="text-xs">
        코르크차지는 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법 등 관련 법령상의
        개인정보 보호 규정을 준수하며, 개인정보처리방침을 통해 이용자가 제공하는 개인정보가 어떠한
        용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치를 취하고 있는지
        알려드립니다.
      </p>

      <br />
      <p className="text-xs">본 방침은 2025년 8월 21일부터 시행됩니다.</p>
      <br />

      <h2 className="font-bold">1. 수집하는 개인정보의 항목 및 수집 방법</h2>
      <p>
        회사는 회원가입, 서비스 이용, 상담, 이벤트 응모 과정에서 아래와 같은 개인정보를 수집하고
        있습니다.
      </p>
    </div>
  );
}

export default Toc;
