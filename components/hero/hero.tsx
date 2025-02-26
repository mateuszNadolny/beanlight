"use client";

import React from "react";

import { useParallaxItems } from "@/hooks/useParallaxItems";

import { ReactLenis } from "lenis/react";
import { motion, useTransform, useScroll, MotionValue } from "framer-motion";
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
          syncTouch: true,
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

// Reusable component for wrapper animations
const AnimatedContainer = ({
  children,
  className = "",
  width,
  height,
}: {
  children?: React.ReactNode;
  className?: string;
  width?: MotionValue<string>;
  height?: MotionValue<string>;
}) => {
  return (
    <motion.div
      className={`absolute h-[80vh] rounded-xl left-1/2 transform -translate-x-1/2 ${className}`}
      style={{ width, height }}
    >
      {children}
    </motion.div>
  );
};

const Wrapper = () => {
  const { scrollY } = useScroll();

  // animations for the container
  const width = useTransform(scrollY, [0, SECTION_HEIGHT], ["30%", "100%"]);
  const height = useTransform(scrollY, [0, SECTION_HEIGHT], ["75vh", "80vh"]);

  // animations for the title
  const titleY = useTransform(scrollY, [0, SECTION_HEIGHT], [-100, 0]);
  const fontSize = useTransform(scrollY, [0, SECTION_HEIGHT], ["4rem", "8rem"]);
  const textShadow = useTransform(
    scrollY,
    [0, SECTION_HEIGHT],
    ["0px 0px 0px 0px rgba(0, 0, 0, 0)", "0px 0px 10px 0px rgba(0, 0, 0, 0.5)"]
  );

  // animations for the center image
  const imageY = useTransform(
    scrollY,
    [0.4 * SECTION_HEIGHT, SECTION_HEIGHT],
    [-10, 0]
  );

  // animations for the arrow down
  const opacity = useTransform(
    scrollY,
    [0.4 * SECTION_HEIGHT, SECTION_HEIGHT * 0.8],
    [1, 0]
  );

  return (
    <div className="relative w-full h-[80vh] rounded-xl sticky top-24 z-10 flex flex-col items-center justify-start pt-4">
      <AnimatedContainer
        className="z-10 bg-beanlight-900"
        width={width}
        height={height}
      />
      <AnimatedContainer
        className="z-20 bg-[radial-gradient(ellipse_at_50%_75%,theme(colors.beanlight.200),theme(colors.beanlight.400),theme(colors.beanlight.900))] opacity-40"
        width={width}
        height={height}
      />
      <AnimatedContainer
        className="z-20 bg-geometric-pattern bg-repeat bg-center opacity-40"
        width={width}
        height={height}
      />

      <motion.h1
        className="font-hedvig text-[#E2EAE1] tracking-tight z-30 font-[400]"
        style={{ y: titleY, fontSize, textShadow }}
      >
        Brewed to perfection
      </motion.h1>

      <CenterImage imageY={imageY} />
      <ParallaxSectionLeft />
      <ParallaxSectionRight />
      <ArrowDown opacity={opacity} />
    </div>
  );
};

const CenterImage = ({ imageY }: { imageY: MotionValue<number> }) => {
  return (
    <motion.div
      className="z-30 w-[60vh] h-[60vh]"
      style={{
        y: imageY,
        backgroundImage: "url('/pouring-coffee.png')",
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  xMotion: MotionValue<number>;
}

const FeatureItem = ({
  icon,
  title,
  description,
  xMotion,
}: FeatureItemProps) => (
  <motion.li className="flex items-center gap-4" style={{ x: xMotion }}>
    <div className="text-beanlight-100 text-5xl">{icon}</div>
    <div className="flex flex-col">
      <p className="font-vietnam text-[1rem] tracking-tighter font-[500] text-beanlight-50">
        {title}
      </p>
      <p className="font-vietnam text-[12px] tracking-tighter font-thin text-beanlight-100">
        {description}
      </p>
    </div>
  </motion.li>
);

const ParallaxSectionLeft = () => {
  const { x1, x2, x3, opacity } = useParallaxItems("left", SECTION_HEIGHT);

  const features = [
    {
      icon: <GiCoffeeBeans />,
      title: "Premium Coffee Beans",
      description:
        "Crafted from the finest, ethically sourced coffee beans for a superior taste.",
      xMotion: x1,
    },
    {
      icon: <PiPlantFill />,
      title: "Plant-Based Milk",
      description:
        "Delight in creamy, dairy-free options made from almond, oat, or soy milk.",
      xMotion: x2,
    },
    {
      icon: <MdNoMeetingRoom />,
      title: "No sugar added",
      description:
        "Pure, natural flavors of your favorite brews without any added sugar.",
      xMotion: x3,
    },
  ];

  return (
    <motion.div
      className="absolute top-[50%] xl:left-[8%] z-40"
      style={{ opacity }}
    >
      <motion.ul className="flex flex-col gap-8 max-w-[400px]">
        {features.map((feature, index) => (
          <FeatureItem key={index} {...feature} />
        ))}
      </motion.ul>
    </motion.div>
  );
};

const ParallaxSectionRight = () => {
  const { x1, x2, x3, opacity } = useParallaxItems("right", SECTION_HEIGHT);

  return (
    <div className="absolute top-[50%] xl:right-[6%] flex flex-col items-start gap-3 z-40 max-w-[450px]">
      <motion.h2
        className="font-vietnam text-[2.2rem] font-light tracking-tight text-beanlight-50 leading-tight"
        style={{ x: x1, opacity }}
      >
        Vietnamese Iced Coffee
        <br />
        with Almond Milk
      </motion.h2>
      <motion.div
        className="flex items-baseline gap-4 mb-2"
        style={{ x: x2, opacity }}
      >
        <p className="font-vietnam text-[1.25rem] font-light line-through text-beanlight-300/80">
          $13.99
        </p>
        <p className="font-vietnam text-[2.5rem] font-bold text-beanlight-50">
          $9.99
        </p>
      </motion.div>
      <motion.button
        className="flex items-center justify-center gap-2 z-40 text-[1.75rem] font-semibold tracking-tight text-beanlight-50 group hover:text-beanlight-100 transition-colors duration-300"
        aria-label="Order now"
        tabIndex={0}
        onKeyDown={(e) =>
          e.key === "Enter" && console.log("Order button clicked")
        }
        style={{ x: x3, opacity }}
      >
        Order now{" "}
        <FaArrowRightLong className="text-beanlight-300 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-beanlight-100" />
      </motion.button>
    </div>
  );
};

const ArrowDown = ({ opacity }: { opacity: MotionValue<number> }) => {
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
