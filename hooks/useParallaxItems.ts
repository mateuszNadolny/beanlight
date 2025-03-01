import { useScroll, useTransform } from "framer-motion";

export const useParallaxItems = (
  direction: "left" | "right",
  sectionHeight: number
) => {
  const multiplier = direction === "left" ? -1 : 1;
  const { scrollY } = useScroll();

  const x1 = useTransform(scrollY, [0, sectionHeight], [100 * multiplier, 0]);
  const x2 = useTransform(scrollY, [0, sectionHeight], [150 * multiplier, 0]);
  const x3 = useTransform(scrollY, [0, sectionHeight], [200 * multiplier, 0]);

  const opacityRange =
    direction === "left"
      ? [0.6 * sectionHeight, sectionHeight]
      : [0.4 * sectionHeight, sectionHeight * 0.8];

  const wrapperOpacity = useTransform(
    scrollY,
    [sectionHeight * 0.8, sectionHeight],
    [0, 1]
  );

  const opacity = useTransform(scrollY, opacityRange, [0, 1]);

  return { x1, x2, x3, opacity, wrapperOpacity };
};
