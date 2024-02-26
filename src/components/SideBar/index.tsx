import { useState } from "react";

import { Container, Content, ClosedSideBar, OpenSideBar } from "./styles";

import { IoNotificationsSharp } from "react-icons/io5"; // Ionicons
import { MdSettings } from "react-icons/md"; // Material Design Icons
import { BsArrowRight, BsArrowLeft } from "react-icons/bs"; // Bootstrap Icons
import { DiReact } from "react-icons/di"; // Devicons
import { RiLogoutCircleRLine } from "react-icons/ri"; // Remix Icon

import logoImg from "../../assets/images/react.png";
import userImg from "../../assets/images/eu.jpg";

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

              <img src={logoImg} alt="Eu" />

              {/* Links principais do app */}
              <ul>
                <a href="/" title="Alguma coisa">
                  <DiReact />
                </a>
                <a href="/" title="Alguma coisa">
                  <DiReact />
                </a>
                <a href="/" title="Alguma coisa">
                  <DiReact />
                </a>
                <a href="/" title="Alguma coisa">
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
                  <img src={logoImg} alt="Eu" />
                  <h1>Minha logo </h1>
                </div>

                {/* Icones principais do app */}
                <ul>
                  <a href="/" title="Alguma coisa">
                    <DiReact />
                    <p>악성코드 DNA분석 결과 시각화</p>
                  </a>
                  <a href="/" title="Alguma coisa">
                    <DiReact />
                    <p>악성코드 API 서열 분석 결과 시각화</p>
                  </a>
                  <a href="/" title="Alguma coisa">
                    <DiReact />
                    <p>샌드박스 상태 관리</p>
                  </a>
                  <a href="/" title="Alguma coisa">
                    <DiReact />
                    <p>분석 진행 상태 가시화</p>
                  </a>
                  <a href="/" title="Alguma coisa">
                    <DiReact />
                    <p>샌드박스 결과 가시화</p>
                  </a>
                </ul>
              </nav>
              <div>
                {/* Icones que pode não ser tão principais no app */}
                <ul>
                  <a href="/">
                    <IoNotificationsSharp />
                    <p>Notificações</p>
                  </a>
                  <a href="/">
                    <MdSettings />
                    <p>Configurações</p>
                  </a>
                  <a href="/">
                    <RiLogoutCircleRLine />
                    <p> Sair da conta </p>
                  </a>
                </ul>

                <span>
                  <img src={userImg} alt="Eu" />
                  <p>Tiago Gonçalves de Castro</p>
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
