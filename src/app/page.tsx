"use client";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Member from "../../components/Member";
import Dedication from "../../components/Dedication";
import Script from "next/script";

export default function Home() {
  return (
    <>
    <div>
      <div><Navbar /></div>
      <div id="hero"><Hero /></div>
      <div id="about"><About /></div>
      <div id="member"><Member /></div>
      <div id="dedication"><Dedication /></div>
      <Script
        src="//pl27807206.revenuecpmgate.com/05/b0/5e/05b05e893dd5ca87003b50c59a362125.js"
        strategy="afterInteractive"
        onError={(e) => console.error('Script load error', e)}
      />
    </div>
    </>
  );
}
