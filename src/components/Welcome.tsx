import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
const FONT_WEIGHTS = {
  subtitle: {
    min: 100,
    max: 400,
    default: 100,
  },
  title: {
    min: 400,
    max: 900,
    default: 400,
  },
};
const setupTextHover = (container: HTMLElement, type: string) => {
  if (!container) return;
  const letters = container.querySelectorAll("span");
  const {
    min,
    max,
    default: base,
  } = FONT_WEIGHTS[type as keyof typeof FONT_WEIGHTS];
  const animateLetter = (
    letter: HTMLElement,
    weight: number,
    duration = 0.25
  ) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `"wght" ${weight}`,
    });
  };
  const handleMouseMove = (e: { clientX: number }) => {
    const { left } = container.getBoundingClientRect();
    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const mouseX = e.clientX - left;
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 20000);
      animateLetter(letter, min + (max - min) * intensity);
    });
  };
  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, base, 0.3);
    });
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};
const renderText = (
  text: string,
  className: string,
  baseWeight: number = 400
) => {
  return [...text].map((char, index) => (
    <span
      key={index}
      className={className}
      style={{ fontVariationSettings: `"wght" ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};
const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  useGSAP(() => {
    const subTitleCleanUp = setupTextHover(subtitleRef.current!, "subtitle");
    const titleCleanUp = setupTextHover(titleRef.current!, "title");
    return () => {
      if (titleCleanUp) titleCleanUp();
      if (subTitleCleanUp) subTitleCleanUp();
    };
  }, []);
  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          "Hey, I'm Mokshith! Welcome to my",
          "text-3xl font-georama",
          200
        )}
      </p>
      <h1 ref={titleRef} className="mt-7">
        {renderText("Portfolio", "text-7xl md:text-9xl font-georama", 700)}
      </h1>
    </section>
  );
};

export default Welcome;
