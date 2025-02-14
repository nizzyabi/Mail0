"use client";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";
import React, { useMemo, useRef, useLayoutEffect, useState } from "react";
import { useIsMobile } from "../../hooks/use-mobile";

// Variants d'animation pour l'apparition "expand"
const containerVariants = {
  hidden: { opacity: 0, scale: 0.8, translateY: 20 },
  visible: { opacity: 1, scale: 1, translateY: 0 },
};

export const ContainerScroll = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Récupération de la progression du scroll sur le conteneur
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Calcul de la position de scroll initiale avant le rendu visuel
  useLayoutEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)),
      );
      scrollYProgress.set(progress);
      setIsInitialized(true);
    }
  }, [scrollYProgress]);

  const isMobile = useIsMobile();
  // Définition de la plage d'échelle en fonction de l'appareil
  const scaleRange = useMemo(() => (isMobile ? [0.65, 0.75] : [1.05, 1]), [isMobile]);

  // Transformation des valeurs du scroll en propriétés CSS pour l'animation
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const translateY = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInitialized ? "visible" : "hidden"}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative -mt-40 flex h-[48rem] items-center justify-center p-2 md:-mt-32 md:h-[60rem] md:p-20"
    >
      <div className="relative w-full py-10 md:py-40" style={{ perspective: "1000px" }}>
        <Card rotate={rotate} scale={scale} translateY={translateY}>
          {children}
        </Card>
      </div>
    </motion.div>
  );
};

type CardProps = {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translateY: MotionValue<number>;
  children: React.ReactNode;
};

export const Card = ({ rotate, scale, translateY, children }: CardProps) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        translateY,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
      className="mx-auto -mt-12 h-[30rem] w-full max-w-5xl rounded-[30px] border-4 border-[#6C6C6C] bg-[#222222] p-2 shadow-2xl md:h-[40rem] md:p-6"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-black dark:bg-zinc-900 md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  );
};
