"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export const FlyoutNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const SECTION_HEIGHT = 900;

  const opacity = useTransform(
    scrollY,
    [0.6 * SECTION_HEIGHT, SECTION_HEIGHT],
    [0, 1]
  );

  return (
    <motion.nav
      style={{
        opacity,
      }}
      className={`fixed top-0 z-50 w-full px-6 text-white 
      transition-all duration-300 ease-out lg:px-12
      ${
        scrolled
          ? "bg-neutral-950/0 py-6 shadow-none"
          : "bg-neutral-950/0 py-6 shadow-none"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo />
        <div className="hidden gap-6 lg:flex">
          <Links />
        </div>
      </div>
    </motion.nav>
  );
};

const Logo = ({ color = "white" }) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.png"
        alt="Beanlight Logo"
        width={100}
        height={100}
        className="w-8 h-8"
      />
      <span className="text-2xl font-bold font-hedvig" style={{ color }}>
        beanlight
      </span>
    </div>
  );
};

const Links = () => {
  return (
    <div className="flex items-center gap-12">
      {LINKS.map((l) => (
        <NavLink key={l.text} href={l.href}>
          {l.text}
        </NavLink>
      ))}
    </div>
  );
};

const NavLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <div className="relative h-fit w-fit">
      <a href={href} className="relative font-vietnam font-200 font-thin ">
        {children}
      </a>
    </div>
  );
};

const LINKS = [
  {
    text: "order online",
    href: "#",
  },
  {
    text: "menu",
    href: "#",
  },
  {
    text: "contact",
    href: "#",
  },
];
