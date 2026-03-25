import { useRef } from "react";

const useScrollToSection = () => {
  const sectionRef = useRef(null);
  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });

      setTimeout(() => {
        sectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }, 100);
    }
  };

  return { sectionRef, scrollToSection };
};

export default useScrollToSection;
