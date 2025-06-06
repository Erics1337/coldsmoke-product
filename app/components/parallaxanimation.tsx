'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxAnimation = () => {
  const mainRef = useRef(null);
  const scrollDistRef = useRef(null);
  const arrowRef = useRef(null);
  const snowboardRef = useRef(null);

  useEffect(() => {
    const arrowBtn = mainRef.current as HTMLElement | null;
    const arrowBtnElement = arrowBtn?.querySelector('#arrow-btn');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollDistRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    tl.fromTo('.sky', { y: 0 }, { y: -200 }, 0)
      .fromTo('.cloud1', { y: 100 }, { y: -800 }, 0)
      .fromTo('.cloud2', { y: -150 }, { y: -500 }, 0)
      .fromTo('.cloud3', { y: -50 }, { y: -650 }, 0)
      .fromTo('.mountBg', { y: -10 }, { y: -100 }, 0)
      .fromTo('.mountMg', { y: -30 }, { y: -250 }, 0)
      .fromTo('.mountFg', { y: -50 }, { y: -600 }, 0)
      // EXPLORE text scrolls up and out of view
      .fromTo('.explore-text', { y: 0 }, { y: -400 }, 0)
      // Snowboard scrolls at same rate as cloud1 - using class selector
      .fromTo('.snowboard', 
        { y: 900, x: 500, rotation: 0 }, 
        { y: -800, x: 600, rotation: -45 }, 0);

    const handleMouseEnter = () => {
      gsap.to(arrowRef.current, { y: 10, duration: 0.8, ease: 'back.inOut(3)', overwrite: 'auto' });
    };

    const handleMouseLeave = () => {
      gsap.to(arrowRef.current, { y: 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
    };

    const handleClick = () => {
      gsap.to(window, { scrollTo: window.innerHeight, duration: 1.5, ease: 'power1.inOut' });
    };

    if (arrowBtn) {
      arrowBtn.addEventListener('mouseenter', handleMouseEnter);
      arrowBtn.addEventListener('mouseleave', handleMouseLeave);
      arrowBtn.addEventListener('click', handleClick);
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (arrowBtn) {
        arrowBtn.removeEventListener('mouseenter', handleMouseEnter);
        arrowBtn.removeEventListener('mouseleave', handleMouseLeave);
        arrowBtn.removeEventListener('click', handleClick);
      }
    };
  }, []);

  return (
    <div ref={scrollDistRef} id="parallax-container" className="h-[200vh] w-full">
      <main ref={mainRef} className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[1200px] h-full bg-[#fff]">
        <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <mask id="m">
            <g className="cloud1">
              <rect fill="#fff" width="100%" height="801" y="799" />
              <image xlinkHref="https://assets.codepen.io/721952/cloud1Mask.jpg" width="1200" height="800" />
            </g>
          </mask>

          <image className="sky" xlinkHref="https://assets.codepen.io/721952/sky.jpg" width="1200" height="590" />
          <image className="mountBg" xlinkHref="https://assets.codepen.io/721952/mountBg.png" width="1200" height="800" />
          <image className="mountMg" xlinkHref="https://assets.codepen.io/721952/mountMg.png" width="1200" height="800" />
          <image className="cloud2" xlinkHref="https://assets.codepen.io/721952/cloud2.png" width="1200" height="800" />
          <image className="mountFg" xlinkHref="https://assets.codepen.io/721952/mountFg.png" width="1200" height="800" />
          <image className="cloud1" xlinkHref="https://assets.codepen.io/721952/cloud1.png" width="1200" height="800" />
          <image className="cloud3" xlinkHref="https://assets.codepen.io/721952/cloud3.png" width="1200" height="800" />
          
          {/* Snowboard - using class selector for GSAP animation */}
          <image className="snowboard" xlinkHref="/coldsmoke-1.png" width="200" height="200" />
          
          <text fill="#fff" x="350" y="200" fontSize="150px" className="font-['Montserrat',_sans-serif] text-center explore-text">EXPLORE</text>
          <polyline ref={arrowRef} className="arrow" fill="#fff" points="599,250 599,289 590,279 590,282 600,292 610,282 610,279 601,289 601,250" />

          <g mask="url(#m)">
            <rect fill="#fff" width="100%" height="100%" />
            <text x="350" y="200" fontSize="150px" fill="#162a43" className="font-['Montserrat',_sans-serif] text-center">FURTHER</text>
          </g>

          <rect id="arrow-btn" width="100" height="100" opacity="0" x="550" y="220" className="cursor-pointer" />
        </svg>
      </main>
    </div>
  );
};

export default ParallaxAnimation;