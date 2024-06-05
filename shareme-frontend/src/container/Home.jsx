import { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Routes, Route } from "react-router-dom";

import { SideBar, UserProfile } from "../components";
import Pins from "./Pins";
import { client } from "../client";
import logo from "../assets/logo.png";
import { userQuery } from "../utils/Data";
import { fetchUser } from "../utils/fetchUser";

const Home = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const userInfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.id);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      {/* THIS DIV IS FOR THE DESKTOP NAVIGATION SIDEBAR. */}
      <div className="hidden md:flex h-screen flex-initial">
        <SideBar user={user && user} />
      </div>

      {/* THIS DIV IS FOR THE MOBILE TOP NAVIGATION  */}
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={30}
            className="cursor-pointer"
            onClick={() => setToggleSideBar(true)}
          />

          <Link to={"/"}>
            <img
              src={logo}
              alt="logo"
              className="w-28"
            />
          </Link>

          {user && (
            <Link to={`/user-profile/${user?._id}`}>
              <img
                src={user?.image}
                alt="Profile picture"
              />
            </Link>
          )}
        </div>

        {toggleSideBar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSideBar(false)}
              />
            </div>

            <SideBar
              user={user && user}
              closeToggle={setToggleSideBar}
            />
          </div>
        )}
      </div>

      <div
        className="pb-2 flex-1 h-screen overflow-y-scroll"
        ref={scrollRef}
      >
        <Routes>
          <Route
            path="/user-profile/:userId"
            element={<UserProfile />}
          />

          <Route
            path="*"
            element={<Pins user={user && user} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
