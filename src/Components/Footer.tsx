import React from "react";
import styled from "styled-components";

function Footer() {
  return <FooterWrap>
    <p style={{marginBottom: "36px"}}>넷플릭스 대한민국</p>
    <address>
    넷플릭스서비시스코리아 유한회사 통신판매업신고번호: 제2018-서울종로-0426호 전화번호: 00-308-321-0161 (수신자 부담)<br />
    대표: 레지널드 숀 톰프슨<br />
    이메일 주소: korea@netflix.com<br />
    주소: 대한민국 서울특별시 종로구 우정국로 26, 센트로폴리스 A동 20층 우편번호 03161<br />
    사업자등록번호: 165-87-00119<br />
    클라우드 호스팅: Amazon Web Services Inc.<br />
    공정거래위원회 웹사이트<br />
    </address>
  </FooterWrap>;
}

export default Footer;

const FooterWrap = styled.footer`
  width: 100%;
  padding: 20px 60px;
  font-size: 12px;

    @media ${(props) => props.theme.tablet} {
      padding: 60px;
    }
`;