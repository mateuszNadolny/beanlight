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

  // Add condition for super mobile devices (width < 360px)
  const height = useTransform(
    scrollY,
    [0, SECTION_HEIGHT],
    isSuperMobile
      ? ["50vh", "130vh"] // Smaller height for very small screens
      : isMobile
      ? ["60vh", "100vh"] // Regular mobile height
      : ["75vh", "80vh"] // Desktop height
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
    isMobile ? [0, -10] : [-50, -40]
  );
  const imageScale = useTransform(
    scrollY,
    [0.4 * SECTION_HEIGHT, SECTION_HEIGHT],
    isMobile ? [1, 1.2] : [1, 0.9]
  );

  // animations for the arrow down
  const opacity = useTransform(
    scrollY,
    [0.4 * SECTION_HEIGHT, SECTION_HEIGHT * 0.8],
    [1, 0]
  );

  // Add a CSS class to ensure smooth transition when screen size is determined
  const visibilityClass = isLoaded ? "opacity-100" : "opacity-0";
  const transitionClass = "transition-opacity duration-300";

  return (
    <div
      className={`relative w-full rounded-xl sticky top-24 z-10 flex flex-col items-center justify-start pt-2 
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

      <ParallaxSectionLeft classes={"hidden md:block"} />
      <ParallaxSectionRight />
      <div
        className={`block md:hidden w-full flex absolute bottom-10 z-40 ${
          isSuperMobile ? "bottom-5" : isMobile ? "bottom-[14%]" : "bottom-0"
        }`}
      >
        <ParallaxSectionLeft classes={"block md:hidden"} />
      </div>
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
        isMobile ? "w-full h-[35vh] mt-4" : "w-full h-[80vh]"
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

const ParallaxSectionLeft = ({ classes }: { classes: string }) => {
  const { isMobile } = useScreenSize();
  const SECTION_HEIGHT = getResponsiveSectionHeight(isMobile);
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
      className={`absolute z-40 p-4 md:p-6 rounded-xl overflow-hidden
        ${classes}`}
      style={{ opacity }}
    >
      <motion.h3
        className="font-vietnam text-[1.4rem] md:text-[1.6rem] font-bold tracking-tight text-beanlight-50 leading-tight mb-4
        relative"
      >
        How can it be so good?
      </motion.h3>

      <motion.ul
        className={`flex flex-col gap-6 ${
          isMobile ? "max-w-full" : "max-w-[400px]"
        } relative`}
      >
        {features.map((feature, index) => (
          <motion.li
            key={index}
            className="flex items-center gap-4 relative overflow-hidden group"
            style={{ x: feature.xMotion }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-beanlight-900/0 group-hover:bg-beanlight-900/10 transition-all duration-300 rounded-lg -z-10" />

            <div className="text-beanlight-100 text-4xl p-2 bg-beanlight-900/10 rounded-lg">
              {feature.icon}
            </div>

            <div className="flex flex-col">
              <p className="font-vietnam text-[1rem] tracking-tighter font-[500] text-beanlight-50">
                {feature.title}
              </p>
              <p className="font-vietnam text-[12px] tracking-tighter font-thin text-beanlight-100">
                {feature.description}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

const ParallaxSectionRight = () => {
  const { isMobile } = useScreenSize();
  const SECTION_HEIGHT = getResponsiveSectionHeight(isMobile);
  const { x1, x2, x3, opacity, wrapperOpacity } = useParallaxItems(
    "right",
    SECTION_HEIGHT
  );

  return (
    <motion.div
      className={`absolute z-40 flex flex-col items-center md:items-start gap-3 p-4 md:p-6 rounded-xl overflow-hidden
        ${
          isMobile
            ? "top-[45%] w-full px-4"
            : "top-[34%] right-[3%] lg:right-[6%] max-w-[450px]"
        }`}
      style={{ opacity: wrapperOpacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h2
        className="font-vietnam text-[1.8rem] text-center md:text-left md:text-[2.1rem] font-bold tracking-tight text-beanlight-50 leading-tight 
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
        className="flex items-center justify-center outline outline-2 rounded-xl outline-beanlight-500/50 px-4 hover:bg-beanlight-500/10 md:hover:bg-transparent md:px-auto md:outline-none gap-2 z-40 text-[1.5rem] md:text-[1.75rem] font-semibold tracking-tight text-beanlight-50 
        relative py-4 group hover:text-beanlight-100"
        aria-label="Order now"
        tabIndex={0}
        style={{ x: x3, opacity }}
      >
        Order now{" "}
        <FaArrowRightLong className="text-beanlight-300 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-beanlight-100" />
      </motion.button>
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
