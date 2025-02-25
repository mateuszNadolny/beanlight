"use client";

import React from "react";
import { ReactLenis } from "lenis/react";
import { motion, useTransform, useScroll } from "framer-motion";
import { IoIosArrowRoundDown } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { GiCoffeeBeans } from "react-icons/gi";
import { PiPlantFill } from "react-icons/pi";
import { MdNoMeetingRoom } from "react-icons/md";

const SmoothScrollHero = () => {
  return (
    <div className="bg-gradient-to-b from-beanlight-950 to-beanlight-1000">
      <ReactLenis
        root
        options={{
          // Learn more -> https://github.com/darkroomengineering/lenis?tab=readme-ov-file#instance-settings
          lerp: 0.05,
          //   infinite: true,
          //   syncTouch: true,
        }}
      >
        <Hero />
      </ReactLenis>
    </div>
  );
};

const SECTION_HEIGHT = 900;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full px-6 lg:px-12 flex justify-center"
    >
      <Wrapper />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </div>
  );
};

const Wrapper = () => {
  const { scrollY } = useScroll();

  // animations for the title
  const y = useTransform(scrollY, [0, SECTION_HEIGHT], [-100, 0]);
  const fontSize = useTransform(scrollY, [0, SECTION_HEIGHT], ["4rem", "8rem"]);
  const textShadow = useTransform(
    scrollY,
    [0, SECTION_HEIGHT],
    ["0px 0px 0px 0px rgba(0, 0, 0, 0)", "0px 0px 10px 0px rgba(0, 0, 0, 0.5)"]
  );

  // animations for the wrapper
  const width = useTransform(scrollY, [0, SECTION_HEIGHT], ["30%", "100%"]);
  const height = useTransform(scrollY, [0, SECTION_HEIGHT], ["75vh", "80vh"]);

  return (
    <div className="relative w-full h-[80vh] rounded-xl sticky top-24 z-10 flex items-start pt-4 justify-center">
      <motion.div
        className="absolute h-[80vh] rounded-xl z-10 bg-beanlight-900 left-1/2 transform -translate-x-1/2"
        style={{
          width,
          height,
        }}
      />
      <motion.div
        className="absolute h-[80vh] rounded-xl z-20 bg-[radial-gradient(ellipse_at_50%_75%,theme(colors.beanlight.200),theme(colors.beanlight.400),theme(colors.beanlight.900))] opacity-40 left-1/2 transform -translate-x-1/2"
        style={{
          width,
          height,
        }}
      />
      <motion.div
        className="absolute h-[80vh] rounded-xl z-20 bg-geometric-pattern bg-repeat bg-center opacity-40 left-1/2 transform -translate-x-1/2"
        style={{
          width,
          height,
        }}
      />
      <motion.h1
        className="font-hedvig text-[#E2EAE1] tracking-tight z-30 font-[400]"
        style={{
          y,
          fontSize,
          textShadow,
        }}
      >
        Brewed to perfection
      </motion.h1>

      <CenterImage />
      <ParallaxSectionLeft />
      <ParallaxSectionRight />
      <ArrowDown />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const y = useTransform(
    scrollY,
    [0.4 * SECTION_HEIGHT, SECTION_HEIGHT],
    [-160, 0]
  );

  return (
    <motion.div
      className="absolute bottom-[-90] z-30 w-[500px] h-[500px]"
      style={{
        y,
        backgroundImage: "url('/pouring-coffee.png')",
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxSectionLeft = () => {
  const { scrollY } = useScroll();

  const x1 = useTransform(scrollY, [0, SECTION_HEIGHT], [-100, 0]);
  const x2 = useTransform(scrollY, [0, SECTION_HEIGHT], [-150, 0]);
  const x3 = useTransform(scrollY, [0, SECTION_HEIGHT], [-200, 0]);
  const opacity = useTransform(
    scrollY,
    [0.6 * SECTION_HEIGHT, SECTION_HEIGHT],
    [0, 1]
  );

  return (
    <motion.div
      className="absolute top-[50%] xl:left-[8%] z-40"
      style={{
        opacity,
      }}
    >
      <motion.ul className="flex flex-col gap-8 max-w-[400px]">
        <motion.li className="flex items-center gap-4" style={{ x: x1 }}>
          <GiCoffeeBeans className="text-beanlight-100 text-5xl" />
          <div className="flex flex-col">
            <p className="font-vietnam text-[1rem] tracking-tighter font-[500] text-beanlight-50">
              Premium Coffee Beans
            </p>
            <p className="font-vietnam text-[12px] tracking-tighter font-thin text-beanlight-100">
              Crafted from the finest, ethically sourced coffee beans for a
              superior taste.
            </p>
          </div>
        </motion.li>
        <motion.li className="flex items-center gap-4" style={{ x: x2 }}>
          <PiPlantFill className="text-beanlight-100 text-5xl" />
          <div className="flex flex-col">
            <p className="font-vietnam text-[1rem] tracking-tighter font-[500] text-beanlight-50">
              Plant-Based Milk
            </p>
            <p className="font-vietnam text-[12px] tracking-tighter font-thin text-beanlight-100">
              Delight in creamy, dairy-free options made from almond, oat, or
              soy milk.
            </p>
          </div>
        </motion.li>
        <motion.li className="flex items-center gap-4" style={{ x: x3 }}>
          <MdNoMeetingRoom className="text-beanlight-100 text-5xl" />
          <div className="flex flex-col">
            <p className="font-vietnam text-[1rem] tracking-tighter font-[500] text-beanlight-50">
              No sugar added{" "}
            </p>
            <p className="font-vietnam text-[12px] tracking-tighter font-thin text-beanlight-100">
              Pure, natural flavors of your favorite brews without any added
              sugar.
            </p>
          </div>
        </motion.li>
      </motion.ul>
    </motion.div>
  );
};

const ParallaxSectionRight = () => {
  const { scrollY } = useScroll();

  const x = useTransform(scrollY, [0, SECTION_HEIGHT], [130, 0]);
  const opacity = useTransform(
    scrollY,
    [0.4 * SECTION_HEIGHT, SECTION_HEIGHT * 0.8],
    [0, 1]
  );
  return (
    <motion.div
      className="absolute top-[50%] xl:right-[6%] flex flex-col items-start gap-3 z-40 max-w-[450px]"
      style={{
        x,
        opacity,
      }}
    >
      <h2 className="font-vietnam text-[2.2rem] font-light tracking-tight text-beanlight-50 leading-tight">
        Vietnamese Iced Coffee
        <br />
        with Almond Milk
      </h2>
      <div className="flex items-baseline gap-4 mb-2">
        <p className="font-vietnam text-[1.25rem] font-light line-through text-beanlight-300/80">
          $13.99
        </p>
        <p className="font-vietnam text-[2.5rem] font-bold text-beanlight-50">
          $9.99
        </p>
      </div>
      <button
        className="flex items-center justify-center gap-2 z-40 text-[1.75rem] font-semibold tracking-tight text-beanlight-50 group hover:text-beanlight-100 transition-colors duration-300"
        aria-label="Order now"
        tabIndex={0}
        onKeyDown={(e) =>
          e.key === "Enter" && console.log("Order button clicked")
        }
      >
        Order now{" "}
        <FaArrowRightLong className="text-beanlight-300 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-beanlight-100" />
      </button>
    </motion.div>
  );
};

const ArrowDown = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(
    scrollY,
    [0.4 * SECTION_HEIGHT, SECTION_HEIGHT * 0.8],
    [1, 0]
  );
  const pulseAnimation = {
    y: [0, 6, 0],
    opacity: [1, 0.6, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };
  return (
    <motion.div
      className="absolute bottom-[-40] flex flex-col w-full items-center justify-center"
      style={{
        opacity,
      }}
      animate={pulseAnimation}
    >
      <IoIosArrowRoundDown className="text-beanlight-600 text-2xl" />
      <p className="font-vietnam text-[.625rem] font-light tracking-tight text-beanlight-600">
        and has its own story
      </p>
    </motion.div>
  );
};

export default SmoothScrollHero;
