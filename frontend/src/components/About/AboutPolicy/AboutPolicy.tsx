import React from "react";
import styled from "styled-components";

const AboutPolicy = () => {
  return (
    <AboutPolicyWrapper>
      <AboutPolicySection>
        <AboutPolicyTitle>1. 개인정보의 처리 목적</AboutPolicyTitle>
        <AboutPolicyContent>
          Nonamed(이하 "회사")은(는) 다음의 목적을 위하여 개인정보를 처리하고
          있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.
        </AboutPolicyContent>
        <AboutPolicyList>
          <AboutPolicyItem>회원 관리</AboutPolicyItem>
          <AboutPolicyItem>서비스 제공</AboutPolicyItem>
        </AboutPolicyList>
      </AboutPolicySection>
      <AboutPolicySection>
        <AboutPolicyTitle>2. 개인정보의 처리 및 보유 기간</AboutPolicyTitle>
        <AboutPolicyContent>
          1) 회사는 정보주체로부터 개인정보를 수집할 때 동의 받은 개인정보 보유
          · 이용기간 또는 법령에 따른 개인정보 보유·이용기간 내에서 개인정보를
          처리·보유합니다.
        </AboutPolicyContent>
        <AboutPolicyContent>
          2) 구체적인 개인정보 처리 및 보유 기간은 다음과 같습니다.
        </AboutPolicyContent>
        <AboutPolicyContent>
          - 아래 예시를 참고하여 개인정보 처리업무와 개인정보 처리업무에 대한
          보유기간 및 관련 법령, 근거 등을 기재합니다.
        </AboutPolicyContent>
        <AboutPolicyContent>
          ex) 고객 가입 및 관리 : 서비스 이용계약 또는 회원가입 해지시까지, 다만
          채권·채무관계 잔존시에는 해당 채권·채무관계 정산시까지
        </AboutPolicyContent>
        <AboutPolicyContent>
          - 전자상거래에서의 계약·청약철회, 대금결제, 재화 등 공급기록 : 5년
        </AboutPolicyContent>
      </AboutPolicySection>
      <AboutPolicySection>
        <AboutPolicyTitle>
          3. 개인정보의 제3자 제공에 관한 사항
        </AboutPolicyTitle>
        <AboutPolicyContent>
          1) 회사는 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법
          제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
        </AboutPolicyContent>
        <AboutPolicyContent>
          2) 회사는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.
        </AboutPolicyContent>
        <AboutPolicyList>
          <AboutPolicyItem>개인정보를 제공받는 자 : 임규민</AboutPolicyItem>
          <AboutPolicyItem>
            제공받는 자의 개인정보 이용목적 : 이름, 서비스 이용 기록, GitHub
            사용자 아이디
          </AboutPolicyItem>
          <AboutPolicyItem>제공받는 자의 보유·이용기간 : 영구</AboutPolicyItem>
        </AboutPolicyList>
        <AboutPolicyContent>
          3) 회사는 위탁계약 체결시 개인정보 보호법 제25조에 따라 위탁업무
          수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한,
          수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등
          문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고
          있습니다.
        </AboutPolicyContent>
        <AboutPolicyContent>
          4) 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보
          처리방침을 통하여 공개하도록 하겠습니다.
        </AboutPolicyContent>
      </AboutPolicySection>
      <AboutPolicySection>
        <AboutPolicyTitle>
          4. 정보주체와 법정대리인의 권리·의무 및 그 행사방법 이용자는
          개인정보주체로써 다음과 같은 권리를 행사할 수 있습니다.
        </AboutPolicyTitle>
        <AboutPolicyContent>
          정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를
          행사할 수 있습니다.
        </AboutPolicyContent>
        <AboutPolicyList>
          <AboutPolicyItem>개인정보 열람 요구</AboutPolicyItem>
          <AboutPolicyItem>오류 등이 있을 경우 정정 요구</AboutPolicyItem>
          <AboutPolicyItem>삭제 요구</AboutPolicyItem>
          <AboutPolicyItem>처리정지 요구</AboutPolicyItem>
        </AboutPolicyList>
      </AboutPolicySection>
      <AboutPolicySection>
        <AboutPolicyTitle>5. 처리하는 개인정보의 항목 작성 </AboutPolicyTitle>
        <AboutPolicyContent>
          회사는 다음의 개인정보 항목을 처리하고 있습니다.
        </AboutPolicyContent>
        <AboutPolicyList>
          <AboutPolicyItem>
            필수항목 : 이름, 서비스 이용 기록, GitHub 사용자 아이디
          </AboutPolicyItem>
        </AboutPolicyList>
      </AboutPolicySection>
      <AboutPolicySection>
        <AboutPolicyTitle>6. 개인정보의 파기</AboutPolicyTitle>
        <AboutPolicyContent>
          회사는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당
          개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.
        </AboutPolicyContent>
        <AboutPolicySubtitle>파기절차</AboutPolicySubtitle>
        <AboutPolicyContent>
          이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우
          별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후
          혹은 즉시 파기됩니다. 이 때, DB로 옮겨진 개인정보는 법률에 의한 경우가
          아니고서는 다른 목적으로 이용되지 않습니다.
        </AboutPolicyContent>
        <AboutPolicySubtitle>파기기한</AboutPolicySubtitle>
        <AboutPolicyContent>
          이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의
          종료일로부터 5일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의
          폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을 때에는 개인정보의
          처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 그 개인정보를
          파기합니다.
        </AboutPolicyContent>
      </AboutPolicySection>
      <AboutPolicySection>
        <AboutPolicyTitle>7. 개인정보 보호책임자 작성 </AboutPolicyTitle>
        <AboutPolicyContent>
          1) 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
          처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이
          개인정보 보호책임자를 지정하고 있습니다.
        </AboutPolicyContent>
        <AboutPolicySubtitle> 개인정보 보호책임자</AboutPolicySubtitle>
        <AboutPolicyList>
          <AboutPolicyItem>성명 : 임규민</AboutPolicyItem>
          <AboutPolicyItem>연락처 : dev.limgyumin@gmail.com</AboutPolicyItem>
        </AboutPolicyList>
        <AboutPolicyContent>
          2) 정보주체께서는 회사의 서비스(또는 사업)을 이용하시면서 발생한 모든
          개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보
          보호책임자 및 담당부서로 문의하실 수 있습니다. 회사는 정보주체의
          문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.
        </AboutPolicyContent>
      </AboutPolicySection>
    </AboutPolicyWrapper>
  );
};

const AboutPolicyWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 900px;
  margin: 0 auto;
  padding: 0 1rem 6rem;
  color: ${({ theme }) => theme.color.ftColor1};
  line-height: 1.7;

  ${({ theme }) => theme.media.desktop`
    width: 680px;
  `};

  ${({ theme }) => theme.media.tablet`
    width: 480px;
  `};

  ${({ theme }) => theme.media.mobile`
    width: 100%;
  `};
`;

const AboutPolicySection = styled.section`
  :not(:last-child) {
    margin-bottom: 3rem;
  }
`;

const AboutPolicyTitle = styled.h2`
  font-weight: bold;
  font-size: 1.825rem;
`;

const AboutPolicySubtitle = styled.h3`
  font-weight: bold;
  font-size: 1.225rem;
  margin-top: 1.5rem;
`;

const AboutPolicyContent = styled.p`
  font-weight: normal;
  font-size: 1.125rem;
  margin: 0.5rem 0;
`;

const AboutPolicyList = styled.ul`
  list-style-type: disc;
  margin: 1rem 0;
  padding-inline-start: 40px;
`;

const AboutPolicyItem = styled.li`
  font-weight: normal;
  font-size: 1.125rem;
`;

export default AboutPolicy;
