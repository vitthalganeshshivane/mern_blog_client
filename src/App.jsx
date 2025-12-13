import { json, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { Toaster } from "react-hot-toast";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";
import Editor from "./pages/editor.pages";
import HomePage from "./pages/home.page";
import SearchPage from "./pages/search.page";
import PageNotFound from "./pages/404.page";
import ProfilePage from "./pages/profile.page";
import BlogPage from "./pages/blog.page";
import SideNav from "./components/sidenavbar.component";
import ChangePassword from "./pages/change-password.page";
import EditProfile from "./pages/edit-profile.page";
import Notifications from "./pages/notifications.page";
import ManageBlogs from "./pages/manage-blogs.page";

export const userContext = createContext({});

export const ThemeContext = createContext({});

const darkThemePreference = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const App = () => {
  const [userAuth, setUserAuth] = useState({ access_token: null });
  const [theme, setTheme] = useState("light");

  // useEffect(() => {
  //   let userInSession = lookInSession("user");
  //   let themeInSession = lookInSession("theme");

  //   userInSession
  //     ? setUserAuth(JSON.parse(userInSession))
  //     : setUserAuth({ access_token: null });

  //   if (themeInSession) {
  //     setTheme(() => {
  //       document.body.setAttribute("data-theme", theme);
  //       return themeInSession;
  //     });
  //   } else {
  //     document.body.setAttribute("data-theme", theme);
  //   }
  // }, []);

  useEffect(() => {
    const userInSession = lookInSession("user");
    const themeInSession = lookInSession("theme");

    // user auth
    if (userInSession) {
      setUserAuth(JSON.parse(userInSession));
    } else {
      setUserAuth({ access_token: null });
    }

    // theme resolution priority:
    // 1. session
    // 2. system preference
    // 3. light
    const resolvedTheme =
      themeInSession ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    setTheme(resolvedTheme);
    document.body.setAttribute("data-theme", resolvedTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <userContext.Provider value={{ userAuth, setUserAuth }}>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/editor" element={<Editor />} />
          <Route path="/editor/:blog_id" element={<Editor />} />
          <Route path="/" element={<Navbar />}>
            <Route index element={<HomePage />} />
            <Route path="dashboard" element={<SideNav />}>
              <Route path="blogs" element={<ManageBlogs />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>
            <Route path="settings" element={<SideNav />}>
              <Route path="edit-profile" element={<EditProfile />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
            <Route path="signin" element={<UserAuthForm type="sign-in" />} />
            <Route path="signup" element={<UserAuthForm type="sign-up" />} />
            <Route path="search/:query" element={<SearchPage />} />
            <Route path="user/:id" element={<ProfilePage />} />
            <Route path="blog/:blog_id" element={<BlogPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </userContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
