"use client";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Member from "../../components/Member";
import Dedication from "../../components/Dedication";

export default function Home() {
  return (
    <>
    <div>
      <div><Navbar /></div>
      <div id="hero"><Hero /></div>
      <div id="about"><About /></div>
      <div id="member"><Member /></div>
      <div id="dedication"><Dedication /></div>
    </div>
    </>
  );
}
