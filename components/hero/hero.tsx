"use client";

import { useScreenSize } from "@/hooks/useScreenSize";
import { useParallaxItems } from "@/hooks/useParallaxItems";

import { ReactLenis } from "lenis/react";
import { motion, useTransform, useScroll, MotionValue } from "framer-motion";
import { IoIosArrowRoundDown } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { GiCoffeeBeans } from "react-icons/gi";
import { PiPlantFill } from "react-icons/pi";
import { MdNoMeetingRoom } from "react-icons/md";

// Hook to detect screen size

const SmoothScrollHero = () => {
  const { isMobile, isSuperMobile } = useScreenSize();
  return (
    <div
      className={`bg-gradient-to-b from-beanlight-950 to-beanlight-1000 ${
        isSuperMobile ? "h-[380vh]" : isMobile ? "h-[260vh]" : ""
      }`}
    >
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

// Update the responsive section height function to provide more space on mobile
const getResponsiveSectionHeight = (isMobile: boolean) =>
  isMobile ? 600 : 900;

const Hero = () => {
  const { isMobile, isLoaded } = useScreenSize();
  // Use a default value for the initial render to match server-side
  const SECTION_HEIGHT = getResponsiveSectionHeight(isMobile);

  // Add a CSS class to hide content until we know the screen size
  const visibilityClass = isLoaded ? "opacity-100" : "opacity-0";
  const transitionClass = "transition-opacity duration-300";

  return (
    <div
      style={{
        height: `calc(${SECTION_HEIGHT}px + ${isMobile ? "150vh" : "100vh"})`,
      }}
      className={`relative w-full px-4 md:px-6 lg:px-12 flex flex-col items-center ${visibilityClass} ${transitionClass}`}
    >
      <Wrapper />
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
      className={`absolute rounded-xl left-1/2 transform -translate-x-1/2 ${className}`}
      style={{ width, height }}
    >
      {children}
    </motion.div>
  );
};

const Wrapper = () => {
  const { scrollY } = useScroll();
  const { isMobile, isSuperMobile, isLoaded } = useScreenSize();
  const SECTION_HEIGHT = getResponsiveSectionHeight(isMobile);

  // Responsive animation values for animated containers
  const width = useTransform(
    scrollY,
    [0, SECTION_HEIGHT],
    isMobile ? ["90%", "100%"] : ["30%", "100%"]
  );

  const height = useTransform(
    scrollY,
    [0, SECTION_HEIGHT],
    isSuperMobile
      ? ["50vh", "200vh"]
      : isMobile
      ? ["60vh", "150vh"]
      : ["75vh", "80vh"]
  );

  // animations for the title
  const titleY = useTransform(
    scrollY,
    [0, SECTION_HEIGHT],
    isMobile ? [-50, 20] : [-100, 0]
  );

  const fontSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT],
    isMobile ? ["1.7rem", "1.8rem"] : ["4rem", "7rem"]
  );

  const textShadow = useTransform(
    scrollY,
    [0, SECTION_HEIGHT],
    ["0px 0px 0px 0px rgba(0, 0, 0, 0)", "0px 0px 10px 0px rgba(0, 0, 0, 0.5)"]
  );

  // animations for the second title
  const fontSize2 = useTransform(
    scrollY,
    [0, SECTION_HEIGHT],
    isMobile ? ["1.2rem", "1.3rem"] : ["2.5rem", "3rem"]
  );

  const textOpacity = useTransform(
    scrollY,
    [0, SECTION_HEIGHT],
    isMobile ? [1, 0] : [1, 0]
  );

  // animations for the center image
  const imageY = useTransform(
    scrollY,
    [0.4 * SECTION_HEIGHT, SECTION_HEIGHT],
    isSuperMobile ? [0, -5] : isMobile ? [0, 18] : [-80, -70]
  );

  const imageScale = useTransform(
    scrollY,
    [0, SECTION_HEIGHT],
    isMobile ? [1.3, 1.2] : [1, 1.2]
  );

  // animations for the arrow down
  const opacity = useTransform(
    scrollY,
    [0.7 * SECTION_HEIGHT, SECTION_HEIGHT * 0.8],
    [1, 0]
  );

  // Add a CSS class to ensure smooth transition when screen size is determined
  const visibilityClass = isLoaded ? "opacity-100" : "opacity-0";
  const transitionClass = "transition-opacity duration-300";

  return (
    <div
      className={`relative w-full rounded-xl sticky top-24 z-10 flex flex-col items-center justify-start pt-2 overflow-x-clip
        ${isMobile ? "h-[120vh]" : "h-[86vh]"} 
        ${visibilityClass} ${transitionClass}`}
    >
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
        className={`font-hedvig text-[#E2EAE1] tracking-tight z-30 font-[400] text-center ${
          isMobile ? "mb-2" : "mb-4"
        }`}
        style={{ y: titleY, textShadow, fontSize }}
      >
        Brewed to perfection
      </motion.h1>
      <motion.h2
        className={`font-hedvig text-[#E2EAE1] tracking-tight z-30 font-[400] text-center ${
          isMobile ? "mb-2" : "mb-4"
        }`}
        style={{ y: titleY, fontSize: fontSize2, opacity: textOpacity }}
      >
        and has its own story
      </motion.h2>

      <CenterImage
        imageY={imageY}
        isMobile={isMobile}
        imageScale={imageScale}
      />

      <ParallaxSection />
      <Features />
      <ArrowDown opacity={opacity} />
    </div>
  );
};

const CenterImage = ({
  imageY,
  isMobile,
  imageScale,
}: {
  imageY: MotionValue<number>;
  isMobile: boolean;
  imageScale: MotionValue<number>;
}) => {
  return (
    <motion.div
      className={`z-30 ${
        isMobile ? "w-full h-[35vh] mt-4" : "w-full h-[145vh]"
      }`}
      style={{
        y: imageY,
        backgroundImage: "url('/pouring-coffee.png')",
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        scale: imageScale,
      }}
    />
  );
};

const ParallaxSection = () => {
  const { isMobile } = useScreenSize();
  const SECTION_HEIGHT = getResponsiveSectionHeight(isMobile);
  const { x1, x2, x3, opacity, wrapperOpacity } = useParallaxItems(
    "left",
    SECTION_HEIGHT
  );

  return (
    <motion.div
      className={`absolute z-40 top-[50%] md:left-[22%] md:top-[55%] md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col items-center md:items-start gap-3 p-4 md:p-6 rounded-xl overflow-hidden`}
      style={{ opacity: wrapperOpacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h2
        className="font-vietnam text-[1.8rem] text-center md:text-left md:text-[2rem] font-bold tracking-tight text-beanlight-50 leading-tight 
        relative md:before:content-[''] md:before:absolute md:before:-left-4 md:before:top-0 md:before:bottom-0 md:before:w-1 md:before:bg-beanlight-300/40 md:before:rounded-full"
        style={{ x: x1, opacity }}
      >
        Vietnamese Iced Coffee
        <br />
        with Almond Milk
        <span className="block text-sm text-beanlight-200 mt-1 font-vietnam italic">
          Signature blend
        </span>
      </motion.h2>

      <motion.div
        className="flex items-baseline gap-2 md:gap-4 mb-2 relative"
        style={{ x: x2, opacity }}
      >
        <p className="font-vietnam text-[1.1rem] md:text-[1.25rem] font-light line-through text-beanlight-300/80">
          $13.99
        </p>
        <p className="font-vietnam text-[2.2rem] md:text-[2.5rem] font-bold text-beanlight-50">
          $9.99
        </p>
        <span className="absolute -right-12 top-0 rotate-12 bg-beanlight-500/80 text-beanlight-50 text-xs py-1 px-2 rounded-md font-vietnam">
          SALE
        </span>
      </motion.div>

      <motion.button
        className="flex items-center justify-center rounded-xl bg-beanlight-500 px-4 hover:bg-beanlight-500/10 md:hover:bg-transparent gap-2 z-40 text-[1.5rem] md:text-[1.75rem] font-semibold tracking-tight text-beanlight-50 
        relative py-4 group hover:text-beanlight-100"
        aria-label="Order now"
        tabIndex={0}
        style={{ x: x3, opacity }}
      >
        Order now{" "}
        <FaArrowRightLong className="text-beanlight-300 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-beanlight-100" />
      </motion.button>
      {/* <Features /> */}
    </motion.div>
  );
};

const Features = () => {
  const { isMobile, isSuperMobile } = useScreenSize();
  const SECTION_HEIGHT = getResponsiveSectionHeight(isMobile);
  const { x1, x2, x3, wrapperOpacity } = useParallaxItems(
    "right",
    SECTION_HEIGHT
  );

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
      className={`z-40 absolute md:-right-[10%] md:top-[55%] md:-translate-x-1/2 md:-translate-y-1/2 px-4 ${
        isSuperMobile ? "top-[110%]" : "top-[88%]"
      }`}
      style={{ opacity: wrapperOpacity }}
    >
      <motion.h2 className="font-vietnam text-2xl tracking-tighter font-bold text-beanlight-50 mb-6">
        What makes it special?
      </motion.h2>
      <motion.ul
        className={`flex flex-col gap-6 ${
          isMobile ? "max-w-full" : "max-w-[400px]"
        } relative`}
      >
        {features.map((feature, index) => (
          <motion.li
            key={index}
            className="flex items-center gap-4 relative overflow-hidden group backdrop-blur-md w-full rounded-full"
            style={{ x: feature.xMotion }}
          >
            <div className="text-beanlight-100 text-2xl md:text-4xl p-2 bg-beanlight-400 rounded-full">
              {feature.icon}
            </div>

            <div className="flex flex-col">
              <p className="font-vietnam text-lg md:text-xl tracking-tighter font-[500] text-beanlight-50">
                {feature.title}
              </p>
              <p className="font-vietnam text-[12px] md:text-[14px] tracking-tighter font-thin text-beanlight-100">
                {feature.description}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

const ArrowDown = ({ opacity }: { opacity: MotionValue<number> }) => {
  const { isMobile } = useScreenSize();
  const pulseAnimation = {
    y: [0, 6, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };
  return (
    <motion.div
      className={`absolute flex flex-col w-full items-center justify-center
        ${isMobile ? "bottom-[35%]" : "bottom-0"}`}
      style={{
        opacity,
      }}
      animate={pulseAnimation}
    >
      <IoIosArrowRoundDown className="text-beanlight-600 text-2xl" />
      <p className="font-vietnam text-[.625rem] font-light tracking-tight text-beanlight-600">
        Swipe to see more
      </p>
    </motion.div>
  );
};

export default SmoothScrollHero;
