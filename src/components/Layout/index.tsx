import styled from "@emotion/styled";
import Header from "../Header";

const LayoutWrapper = styled.div`
  display: grid;
  max-height: 100vh;
  grid-template-columns: 30rem 1fr 40rem;
  grid-template-rows: 8rem calc(100vh - 8rem);
  grid-template-areas:
    "header header header"
    "lsidebar scrollable rsidebar";

  .header {
    grid-area: header;
    border-bottom: 1px solid var(--section-border);
    height: 100%;
  }
  .left-sidebar,
  .scrollable,
  .right-sidebar {
    height: 100%;
  }
  .left-sidebar {
    grid-area: lsidebar;
    border-right: 1px solid var(--section-border);
  }
  .scrollable {
    grid-area: scrollable;
  }
  .right-sidebar {
    grid-area: rsidebar;
    border-left: 1px solid var(--section-border);
  }
`;

const Layout = () => {
  return (
    <LayoutWrapper>
      <header className="header">
        <Header />
      </header>
      <aside className="left-sidebar"> </aside>
      <section className="scrollable"></section>
      <aside className="right-sidebar"></aside>
    </LayoutWrapper>
  );
};

export default Layout;
