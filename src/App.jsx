import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import carImage from "./assets/car-image.png";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const scrollRef = useRef(null);
  const scrollCarRef = useRef(null); 
  const carRef = useRef(null);       
  const textRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill());

    gsap.fromTo(
      ".line",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 }
    );

    gsap.fromTo(
      carRef.current,
      { x: "-100vw", opacity: 0 },
      { x: "0vw", opacity: 1, duration: 1.2, ease: "power2.out" }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollRef.current,
        start: "top top",
        end: "+=1500",
        scrub: 1,
        pin: true,
      },
    });

    tl.to(textRef.current, { opacity: 0, y: -50, duration: 0.3 }, 0)
      .to(scrollCarRef.current, { x: "150vw", ease: "none", duration: 1 }, 0);

  }, []);

  return (
    <div className="bg-black text-white w-full overflow-x-hidden">
      <div ref={scrollRef} className="relative h-screen w-full flex flex-col items-center overflow-hidden">
        
        <div ref={textRef} className="relative z-20 pt-24 text-center">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
            <span className="line inline-block">Welcome</span>
            <br />
            <span className="line inline-block text-blue-500">Itzfizz</span>
          </h1>
        </div>
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-10">
          <div ref={scrollCarRef} className="w-full">
            <img
              ref={carRef}
              src={carImage}
              alt="Car"
              className="w-full h-auto object-contain block will-change-transform"
            />
          </div>
        </div>
        
      </div>

      <div className="relative z-30 h-screen bg-zinc-900 flex items-center justify-center">
        <h2 className="text-3xl font-bold uppercase tracking-widest text-zinc-700">
          Footer Content
        </h2>
      </div>
    </div>
  );
};

export default Hero;