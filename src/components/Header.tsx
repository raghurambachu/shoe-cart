import styled from "@emotion/styled";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3.2rem;
  height: 100%;
`;

const BrandTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 400;
  letter-spacing: -1.5px;
`;

const SearchWrapper = styled.div`
  position: relative;
  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -5%;
    font-size: 1.6rem;
    color: var(--section-border);
    margin-left: 1.2rem;
  }
`;

const SearchBar = styled.input`
  width: calc(100vw - 82.5rem);
  display: inline-block;
  padding: 1.15rem 2.5rem;
  padding-left: 3.6rem;
  border: 1px solid var(--section-border);
  border-radius: 0.5rem;
  font-size: 1.4rem;
  margin-left: -5%;
  line-height: 1.4;
  font-weight: 500;
`;

const UserArea = styled.div`
  display: flex;
  align-items: center;
  .notification-icon {
    font-size: 2.8rem;
  }
`;

const UserIcon = styled.div`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  border: 2px solid var(--base-red);
  margin-left: 2.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .user-image {
    width: 3.2rem;
    height: 3.2rem;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Header = () => {
  const { appState, appDispatch } = useContext(AppContext);
  return (
    <HeaderWrapper>
      <BrandTitle>Shoe.</BrandTitle>
      <SearchWrapper>
        <FiSearch className="search-icon" />
        <SearchBar
          value={appState.search}
          onChange={(e) =>
            appDispatch({
              type: "SET_SEARCH",
              payload: { search: e.target.value },
            })
          }
          placeholder="Search your sneakers"
        />
      </SearchWrapper>
      <UserArea>
        <IoNotificationsOutline className="notification-icon" />
        <UserIcon>
          <img
            alt="user"
            className="user-image"
            src="https://raghuram.live/static/media/raghurambachu.704c56a2.svg"
          />
        </UserIcon>
      </UserArea>
    </HeaderWrapper>
  );
};

export default Header;
