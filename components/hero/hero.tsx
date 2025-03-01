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

// Responsive section height
const getResponsiveSectionHeight = (isMobile: boolean) =>
  isMobile ? 600 : 900;

const Hero = () => {
  const { isMobile } = useScreenSize();
  const SECTION_HEIGHT = getResponsiveSectionHeight(isMobile);

  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full px-4 md:px-6 lg:px-12 flex justify-center"
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
      className={`absolute h-[90vh] rounded-xl left-1/2 transform -translate-x-1/2 ${className}`}
      style={{ width, height }}
    >
      {children}
    </motion.div>
  );
};

const Wrapper = () => {
  const { scrollY } = useScroll();
  const { isMobile } = useScreenSize();
  const SECTION_HEIGHT = getResponsiveSectionHeight(isMobile);

  // Responsive animation values
  const width = useTransform(
    scrollY,
    [0, SECTION_HEIGHT],
    isMobile ? ["90%", "100%"] : ["30%", "100%"]
  );

  const height = useTransform(
    scrollY,
    [0, SECTION_HEIGHT],
    isMobile ? ["60vh", "70vh"] : ["75vh", "80vh"]
  );

  // animations for the title
  const titleY = useTransform(
    scrollY,
    [0, SECTION_HEIGHT],
    isMobile ? [-50, 0] : [-100, 0]
  );

  const fontSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT],
    isMobile ? ["1.5rem", "2rem"] : ["4rem", "7rem"]
  );

  const textShadow = useTransform(
    scrollY,
    [0, SECTION_HEIGHT],
    ["0px 0px 0px 0px rgba(0, 0, 0, 0)", "0px 0px 10px 0px rgba(0, 0, 0, 0.5)"]
  );

  // animations for the center image
  const imageY = useTransform(
    scrollY,
    [0.4 * SECTION_HEIGHT, SECTION_HEIGHT],
    isMobile ? [-5, 0] : [-50, -40]
  );
  const imageScale = useTransform(
    scrollY,
    [0.4 * SECTION_HEIGHT, SECTION_HEIGHT],
    isMobile ? [1, 0.5] : [1, 0.9]
  );

  // animations for the arrow down
  const opacity = useTransform(
    scrollY,
    [0.4 * SECTION_HEIGHT, SECTION_HEIGHT * 0.8],
    [1, 0]
  );

  return (
    <div className="relative w-full h-[86vh] rounded-xl sticky top-24 z-10 flex flex-col items-center justify-start pt-2">
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
        className="font-hedvig text-[#E2EAE1] tracking-tight z-30 font-[400] text-center mb-4"
        style={{ y: titleY, textShadow, fontSize }}
      >
        Brewed to perfection
      </motion.h1>

      <CenterImage
        imageY={imageY}
        isMobile={isMobile}
        imageScale={imageScale}
      />

      <ParallaxSectionLeft />
      <ParallaxSectionRight />

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
      className={`z-30 ${isMobile ? "w-full h-[50vh]" : "w-full h-[80vh]"}`}
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

const ParallaxSectionLeft = () => {
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
      className="absolute top-[35%] md:left-[5%] lg:left-[8%] z-40 
      p-4 md:p-6 backdrop-blur-sm rounded-xl overflow-hidden "
      style={{ opacity }}
    >
      <motion.div className="absolute -top-10 -right-10 w-24 h-24 bg-geometric-pattern opacity-20 rounded-full" />

      <motion.h3
        className="font-vietnam text-[1.4rem] md:text-[1.6rem] font-bold tracking-tight text-beanlight-50 leading-tight  mb-4
        relative"
      >
        Why is it so good?
      </motion.h3>

      <motion.ul className="flex flex-col gap-6 max-w-[400px] relative">
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

      <motion.div
        className="w-full h-[1px] bg-gradient-to-r from-transparent via-beanlight-300/30 to-transparent mt-4"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      />
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
      className="absolute top-[34%] md:right-[3%] lg:right-[6%] flex flex-col items-start gap-3 z-40 max-w-[450px]
      p-4 md:p-6 backdrop-blur-sm rounded-xl overflow-hidden"
      style={{ opacity: wrapperOpacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h2
        className="font-vietnam text-[1.8rem] md:text-[2.1rem] font-bold tracking-tight text-beanlight-50 leading-tight 
        relative before:content-[''] before:absolute before:-left-4 before:top-0 before:bottom-0 before:w-1 before:bg-beanlight-300/40 before:rounded-full"
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
        className="flex items-baseline gap-4 mb-2 relative"
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
        className="flex items-center justify-center gap-2 z-40 text-[1.5rem] md:text-[1.75rem] font-semibold tracking-tight text-beanlight-50 
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
      className="absolute bottom-0 flex flex-col w-full items-center justify-center"
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
