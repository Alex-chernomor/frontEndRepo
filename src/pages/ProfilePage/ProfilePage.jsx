import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import Loader from "../../components/Loader/Loader";
import css from "./ProfilePage.module.css";

export default function ProfilePage() {
  return (
    <section className={`container ${css.profileSection}`}>
      <div className={css.container}>
        <SectionTitle>My profile</SectionTitle>
        <ProfileNavigation />
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </section>
  );
}
