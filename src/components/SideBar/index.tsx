import { useState } from "react";

import { Container, Content, ClosedSideBar, OpenSideBar } from "./styles";

import { IoNotificationsSharp } from "react-icons/io5"; // Ionicons
import { MdSettings } from "react-icons/md"; // Material Design Icons
import { BsArrowRight, BsArrowLeft } from "react-icons/bs"; // Bootstrap Icons
import { DiReact } from "react-icons/di"; // Devicons
import { RiLogoutCircleRLine } from "react-icons/ri"; // Remix Icon

import logoImg from "../../assets/images/react.png";
import userImg from "../../assets/images/eu.jpg";
import dnaIcon from "../../assets/images/dna.png";

export function SideBar() {
  const [sideBar, setSideBar] = useState(false);

  function handleChangeSideBar() {
    setSideBar((prevState) => !prevState);
  }
  return (
    <Container>
      <Content>
        {!sideBar ? (
          <ClosedSideBar>
            <nav>
              <button onClick={handleChangeSideBar}>
                <BsArrowRight />
              </button>

              <img src={dnaIcon} alt="Eu" />

              {/* Links principais do app */}
              <ul>
                <a href="/" title="악성코드 DNA분석 결과 시각화">
                  <DiReact />
                </a>
                <a href="/" title="악성코드 API 서열 분석 결과 시각화">
                  <DiReact />
                </a>
                <a href="/" title="샌드박스 상태 관리">
                  <DiReact />
                </a>
                <a href="/" title="분석 진행 상태 가시화">
                  <DiReact />
                </a>
                <a href="/" title="샌드박스 결과 가시화">
                  <DiReact />
                </a>
              </ul>
            </nav>
            <div>
              {/* Icones que pode não ser tão principais no app */}
              <ul>
                <a href="/" title="Notificações">
                  <IoNotificationsSharp />
                </a>
                <a href="/" title="Configurações">
                  <MdSettings />
                </a>
                <a href="/" title="Sair da conta">
                  <RiLogoutCircleRLine />
                </a>
              </ul>

              <span>
                <img src={userImg} alt="Eu" />
              </span>
            </div>
          </ClosedSideBar>
        ) : (
          <OpenSideBar>
            <section>
              <nav>
                <span>
                  <button onClick={handleChangeSideBar}>
                    <BsArrowLeft />
                  </button>
                </span>
                <div>
                  <img src={dnaIcon} alt="Eu" />
                  <h1>사이버게놈 시각화</h1>
                </div>
                <div>
                  <h3>악성코드 게놈 분석</h3>
                </div>
                {/* Icones principais do app */}
                <ul>
                  <a href="/" title="악성코드 DNA분석 결과 시각화">
                    {/* <DiReact /> */}
                    <p>악성코드 DNA분석 결과 시각화</p>
                  </a>
                  <a href="/" title="악성코드 API 서열 분석 결과 시각화">
                    {/* <DiReact /> */}
                    <p>악성코드 API 서열 분석 결과 시각화</p>
                  </a>
                  <a href="/" title="샌드박스 상태 관리">
                    {/* <DiReact /> */}
                    <p>샌드박스 상태 관리</p>
                  </a>
                  <a href="/" title="분석 진행 상태 가시화">
                    {/* <DiReact /> */}
                    <p>분석 진행 상태 가시화</p>
                  </a>
                  <a href="/" title="샌드박스 결과 가시화">
                    {/* <DiReact /> */}
                    <p>샌드박스 결과 가시화</p>
                  </a>
                </ul>
                <div>
                  <h3>사이버게놈 분석 결과 3D 시각화</h3>
                </div>
                {/* Icones principais do app */}
                <ul>
                  <a href="/" title="표적 공격 특성 인자 3차원 가시화">
                    {/* <DiReact /> */}
                    <p>표적 공격 특성 인자 3차원 가시화</p>
                  </a>
                  <a href="/" title="행위 패턴 3차원 가시화">
                    {/* <DiReact /> */}
                    <p>행위 패턴 3차원 가시화</p>
                  </a>
                  <a href="/" title="공격 특성 연관 정보 3차원 가시화">
                    {/* <DiReact /> */}
                    <p>공격 특성 연관 정보 3차원 가시화</p>
                  </a>
                </ul>
              </nav>
              <div>
                {/* Icones que pode não ser tão principais no app */}
                <ul>
                  <a href="/">
                    <IoNotificationsSharp />
                    <p>Notification</p>
                  </a>
                  <a href="/">
                    <MdSettings />
                    <p>Configuration</p>
                  </a>
                  <a href="/">
                    <RiLogoutCircleRLine />
                    <p> Logout </p>
                  </a>
                </ul>

                <span>
                  <img src={userImg} alt="Eu" />
                  <p style={{ color: "#fff" }}>Kim</p>
                </span>
              </div>
            </section>
            <aside onClick={handleChangeSideBar} />
          </OpenSideBar>
        )}
      </Content>
    </Container>
  );
}
