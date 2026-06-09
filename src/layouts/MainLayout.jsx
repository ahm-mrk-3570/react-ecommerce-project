import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const MainLayout = ({ openMenu }) => {
  return (
    <>
      <Header openMenu={openMenu} />
      <Outlet />
    </>
  )
}

export default MainLayout;