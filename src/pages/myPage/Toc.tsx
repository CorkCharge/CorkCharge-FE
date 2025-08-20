import { useNavigate } from 'react-router-dom';

import Header from '@/shared/components/common/Header';

function Toc() {
  const navigate = useNavigate();
  return (
    <div className="px-4">
      <Header title="개인정보처리방침" type="back" backFn={() => navigate(-1)} />
      <h1 className="mt-3 font-bold">코르크차지 개인정보처리방침</h1>
      <p className="text-xs">
        코르크차지는 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법 등 관련 법령상의
        개인정보 보호 규정을 준수하며, 개인정보처리방침을 통해 이용자가 제공하는 개인정보가 어떠한
        용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치를 취하고 있는지
        알려드립니다.
      </p>

      <br />
      <p className="text-xs">본 방침은 2025년 8월 21일부터 시행됩니다.</p>
      <br />

      <h2 className="mb-3 font-bold">1. 수집하는 개인정보의 항목 및 수집 방법</h2>
      <p className="text-xs">
        회사는 회원가입, 서비스 이용, 상담, 이벤트 응모 과정에서 아래와 같은 개인정보를 수집하고
        있습니다.
      </p>
      <p className="text-xs">
        <p>
          <span className="font-bold">· 회원가입 시: </span>
          이름, 이메일 주소, 비밀번호, 휴대전화번호
        </p>
        <p>
          <span className="font-bold">· 서비스 이용 시: </span>
          서비스 이용 기록, 접속 로그, IP 주소, 쿠키 등
        </p>
        <p>
          <span className="font-bold">· 유료 서비스 이용 시: </span>
          결제 정보(신용카드 정보, 은행 계좌 정보, 통신사 정보 등)
        </p>
      </p>
      <p className="text-xs">
        개인정보는 웹사이트, 서면, 전화, 이메일, 이벤트 응모 등을 통해 수집됩니다.
      </p>
      <br />

      <h2 className="mb-3 font-bold">2. 개인정보의 수집 및 이용 목적</h2>
      <p className="text-xs">회사는 수집한 개인정보를 다음의 목적으로 활용합니다.</p>
      <p className="text-xs">
        <p>
          <span className="font-bold">· 서비스 제공에 관한 계약 이행 및 서비스 제공: </span>
          콘텐츠 제공, 본인인증, 구매 및 요금 결제, 상품 배송, 금융 서비스 등
        </p>
        <p>
          <span className="font-bold">· 회원 관리: </span>
          회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량 회원의 부정 이용 방지와 비인가 사용
          방지, 가입 의사 확인, 연령 확인, 불만 처리 등 민원 처리, 고지사항 전달
        </p>
        <p>
          <span className="font-bold">· 마케팅 및 광고에 활용: </span>
          신규 서비스 개발 및 맞춤 서비스 제공, 통계학적 특성에 따른 서비스 제공 및 광고 게재,
          서비스의 유효성 확인, 이벤트 및 광고성 정보 제공 및 참여 기회 제공, 접속 빈도 파악 또는
          회원의 서비스 이용에 대한 통계
        </p>
      </p>

      <h2 className="mb-3 mt-6 font-bold">3. 개인정보의 보유 및 이용 기간</h2>
      <p className="text-xs">
        이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용 목적이 달성되면 지체 없이 파기합니다.
        단, 관계 법령의 규정에 의하여 보존할 필요가 있는 경우, 회사는 아래와 같이 관계 법령에서 정한
        기간 동안 회원 정보를 보관합니다.
      </p>
      <p className="text-xs">
        <p>
          <span className="font-bold">· 계약 또는 청약 철회 등에 관한 기록: </span>
          5년 (전자상거래 등에서의 소비자 보호에 관한 법률)
        </p>
        <p>
          <span className="font-bold">· 대금 결제 및 재화 등의 공급에 관한 기록: </span>
          5년 (전자상거래 등에서의 소비자 보호에 관한 법률)
        </p>
        <p>
          <span className="font-bold">· 소비자의 불만 또는 분쟁 처리에 관한 기록: </span>
          3년 (전자상거래 등에서의 소비자 보호에 관한 법률)
        </p>
      </p>

      <h2 className="mb-3 mt-6 font-bold">4. 개인정보의 파기 절차 및 방법</h2>
      <p className="text-xs">
        회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
      </p>
      <p className="text-xs">
        <p>
          <span className="font-bold">· 파기 절차: </span>
          이용자가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB에 옮겨져(종이의 경우
          별도의 서류함) 내부 방침 및 기타 관련 법령에 따라 일정 기간 저장된 후 혹은 즉시
          파기됩니다.
        </p>
        <p>
          <span className="font-bold">· 파기 방법: </span>
          종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다. 전자적 파일 형태로
          저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.
        </p>
      </p>

      <h2 className="mb-3 mt-6 font-bold">5. 개인정보 제공</h2>
      <p className="text-xs">
        회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로
        합니다.
      </p>
      <p className="text-xs">
        <p>· 이용자들이 사전에 동의한 경우</p>
        <p>
          · 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의
          요구가 있는 경우
        </p>
      </p>

      <h2 className="mb-3 mt-6 font-bold">6. 개인정보 처리 위탁</h2>
      <p className="text-xs">
        회사는 서비스 향상을 위해 아래와 같이 개인정보 처리를 위탁하고 있으며, 관계 법령에 따라
        위탁계약 시 개인정보가 안전하게 관리될 수 있도록 필요한 사항을 규정하고 있습니다.
      </p>
      <p className="text-xs">
        <p>
          <span className="font-bold">· 수탁자: </span>
          [예: KG이니시스, CJ대한통운 등]
        </p>
        <p>
          <span className="font-bold">· 위탁 업무 내용: </span>
          [예: 결제 처리, 상품 배송 등]
        </p>
      </p>

      <h2 className="mb-3 mt-6 font-bold">7. 이용자 및 법정대리인의 권리와 그 행사 방법</h2>
      <p className="text-xs">
        <p>
          · 이용자 및 법정대리인은 언제든지 등록되어 있는 자신 혹은 당해 만 14세 미만 아동의
          개인정보를 조회하거나 수정할 수 있으며, 가입 해지를 요청할 수도 있습니다.
        </p>
        <p>
          · 개인정보 조회, 수정은 '회원정보수정'을, 가입 해지는 '회원탈퇴'를 클릭하여 본인 확인
          절차를 거친 후 직접 처리할 수 있습니다.
        </p>
        <p>
          · 혹은 개인정보관리책임자에게 서면, 전화 또는 이메일로 연락하면 지체 없이 조치하겠습니다.
        </p>
      </p>

      <h2 className="mb-3 mt-6 font-bold">8. 개인정보 보호를 위한 기술적/관리적 대책</h2>
      <p className="text-xs">
        회사는 이용자의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지
        않도록 안전성 확보를 위하여 다음과 같은 기술적, 관리적 대책을 강구하고 있습니다.
      </p>
      <p className="text-xs">
        <p>
          <span className="font-bold">· 기술적 대책: </span>
          개인정보를 암호화하여 저장 및 관리하고 있으며, 해킹이나 바이러스에 의한 개인정보 유출 및
          훼손을 막기 위해 보안 프로그램을 설치하고 주기적으로 갱신하고 있습니다.
        </p>
        <p>
          <span className="font-bold">· 관리적 대책: </span>
          개인정보에 대한 접근 권한을 최소한의 인원으로 제한하고 있으며, 개인정보를 처리하는 직원을
          대상으로 개인정보 보호 의무에 대한 정기적인 교육을 실시하고 있습니다.
        </p>
      </p>

      <h2 className="mb-3 mt-6 font-bold">9. 개인정보관리책임자 및 담당자의 연락처</h2>
      <p className="text-xs">
        회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만
        처리 및 피해 구제 등을 위하여 아래와 같이 개인정보관리책임자를 지정하고 있습니다.
      </p>
      <p className="text-xs">
        <p>
          <span className="font-bold">· 개인정보관리책임자: </span>
          지윤상
        </p>
        <p>
          <span className="font-bold">· 소속 부서: </span>
          개인정보관리팀
        </p>
        <p>
          <span className="font-bold">· 연락처: </span>
          010-5092-5493
        </p>
      </p>

      <p className="mt-6 font-semibold">
        기타 개인정보 침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.
      </p>
      <p className="mb-5 text-xs">
        <p>· 개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)</p>
        <p>· 대검찰청 사이버수사과 (spo.go.kr / 국번없이 1301)</p>
        <p>· 개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)</p>
      </p>
    </div>
  );
}

export default Toc;
