import Navbar from "@/components/sections/Navbar/Navbar";
import Hero from "@/components/sections/Hero/Hero";
import Outcomes from "@/components/sections/Outcomes/Outcomes";
import LogoBar from "@/components/sections/LogoBar/LogoBar";
import UseCaseCarousel from "@/components/sections/UseCaseCarousel/UseCaseCarousel";
import Features from "@/components/sections/Features/Features";
import CustomerUI from "@/components/sections/CustomerUI/CustomerUI";
import Connectors from "@/components/sections/Connectors/Connectors";
import LibrarySupport from "@/components/sections/LibrarySupport/LibrarySupport";
import Security from "@/components/sections/Security/Security";
import GetStarted from "@/components/sections/GetStarted/GetStarted";
import Footer from "@/components/sections/Footer/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <div data-navbar-theme="dark"><Hero /></div>
      <div data-navbar-theme="dark"><LogoBar /></div>
      <div data-navbar-theme="light"><Outcomes /></div>
      <div data-navbar-theme="light" className={styles.contentContainer}>
        <UseCaseCarousel />
        <Features />
        <CustomerUI />
        <Connectors />
        <LibrarySupport />
        <Security />
      </div>
      <div data-navbar-theme="dark"><GetStarted /></div>
      <div data-navbar-theme="dark"><Footer /></div>
    </div>
  );
}
