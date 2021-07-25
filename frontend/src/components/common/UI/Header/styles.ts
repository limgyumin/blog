import styled from "styled-components";
import { ReactComponent as Logo } from "assets/images/logo.svg";

export const HeaderWrapper = styled.header`
  width: 100%;
  height: 3.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.bgColor};
  transition: transform ease 0.5s, box-shadow ease 0.3s;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  border-bottom: 1px solid ${({ theme }) => theme.color.bdColor};
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 1rem;
  max-width: 1250px;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const HeaderLogo = styled(Logo)`
  width: auto;
  height: 1.125rem;

  & > path {
    fill: ${({ theme }) => theme.color.ftColor};
  }
`;
