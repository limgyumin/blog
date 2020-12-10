import React from "react";
import "./Header.scss";
import { ReactComponent as Logo } from "../../../assets/images/logo.svg";
import { ReactComponent as GitHub } from "../../../assets/images/github_logo.svg";
import { ReactComponent as Option } from "../../../assets/images/option.svg";
import { ReactComponent as Arrows } from "../../../assets/images/arrows.svg";
import { OAUTH } from "../../../config/config.json";
import { Link } from "react-router-dom";
import UserType from "../../../util/types/User";
import HeaderOption from "./HeaderOption";
import { CategoryType } from "../../../util/types/Category";
import HeaderCategoryItem from "./HeaderCategoryItem";

interface HeaderProps {
  transparent: boolean;
  shadow: boolean;
  hide: boolean;
  admin: boolean;
  login: boolean;
  user: UserType;
  showOption: boolean;
  setShowOption: React.Dispatch<React.SetStateAction<boolean>>;
  closeOption: (e: any) => void;
  handleLogout: () => void;
  totalPostCount: number;
  categories: CategoryType[];
  pathname: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({
  transparent,
  shadow,
  hide,
  admin,
  login,
  user,
  showOption,
  setShowOption,
  closeOption,
  handleLogout,
  totalPostCount,
  categories,
  pathname,
  open,
  setOpen,
}: HeaderProps) => {
  const total_view = {
    idx: 0,
    name: "전체",
    post_count: totalPostCount,
  };

  return (
    <>
      <div
        className={
          transparent
            ? hide
              ? "Header-Transparent-Hide Header-Transparent Header"
              : "Header-Transparent Header"
            : hide
            ? "Header-Hide Header"
            : shadow
            ? "Header-Shadow Header"
            : "Header"
        }
      >
        <div className="Header-Container">
          <div className="Header-Container-Content">
            <Link to="/">
              <Logo
                className={
                  transparent
                    ? "Header-Container-Content-Image-White Header-Container-Content-Image"
                    : "Header-Container-Content-Image"
                }
              />
            </Link>
            <div className="Header-Container-Content-Profile">
              {login ? (
                <>
                  {admin && (
                    <Link
                      to="/write"
                      className={
                        transparent
                          ? "Header-Container-Content-Profile-Write-White Header-Container-Content-Profile-Write"
                          : "Header-Container-Content-Profile-Write"
                      }
                    >
                      글 쓰기
                    </Link>
                  )}
                  <div className="Header-Container-Content-Profile-Wrapper">
                    <div
                      className="Header-Container-Content-Profile-Wrapper-User"
                      onClick={() => setShowOption(true)}
                    >
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="Header-Container-Content-Profile-Wrapper-User-Avatar"
                      />
                      <Option
                        className={
                          transparent
                            ? "Header-Container-Content-Profile-Wrapper-User-Option-White Header-Container-Content-Profile-Wrapper-User-Option"
                            : "Header-Container-Content-Profile-Wrapper-User-Option"
                        }
                      />
                    </div>
                    {showOption && (
                      <HeaderOption
                        admin={admin}
                        closeOption={closeOption}
                        handleLogout={handleLogout}
                      />
                    )}
                  </div>
                </>
              ) : (
                <a
                  href={OAUTH}
                  className={
                    transparent
                      ? "Header-Container-Content-Profile-Button-White Header-Container-Content-Profile-Button"
                      : "Header-Container-Content-Profile-Button"
                  }
                >
                  <GitHub
                    className={
                      transparent
                        ? "Header-Container-Content-Profile-Button-Logo-White Header-Container-Content-Profile-Button-Logo"
                        : "Header-Container-Content-Profile-Button-Logo"
                    }
                  />
                </a>
              )}
            </div>
          </div>
          {pathname === "/" && (
            <>
              <div
                className={
                  open
                    ? "Header-Container-Categories-Open Header-Container-Categories"
                    : "Header-Container-Categories"
                }
              >
                <HeaderCategoryItem category={total_view} />
                {categories.map((category, idx) => (
                  <HeaderCategoryItem key={idx} category={category} />
                ))}
              </div>
              <div className="Header-Container-UpDown">
                <Arrows
                  onClick={() => setOpen(!open)}
                  className={
                    open
                      ? "Header-Container-UpDown-Icon-Open Header-Container-UpDown-Icon"
                      : "Header-Container-UpDown-Icon"
                  }
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
