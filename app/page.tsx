"use client";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "react-intersection-observer";
import { ReactLenis } from "lenis/react";
import ParallaxAnimation from "./components/parallaxanimation";

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);

  const ref1 = useRef(null);
  const [inViewRef1, setInViewRef1] = useInView({
    triggerOnce: false,
    initialInView: false,
    threshold: 0.1,
  });

  const ref2 = useRef(null);
  const [inViewRef2, setInViewRef2] = useInView({
    triggerOnce: false,
    initialInView: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (setInViewRef1) {
      gsap.to(ref1.current, { opacity: 1, duration: 1.5, ease: "power2.inOut" });
    }
    if (setInViewRef2) {
      gsap.to(ref2.current, { opacity: 1, duration: 1.5, ease: "power2.inOut" });
    }
  }, [setInViewRef1, setInViewRef2]);

  const isProd = process.env.NODE_ENV === 'production';
  // basePath is still needed for routing, but not for static image src attributes
  const basePath = isProd ? 'coldsmoke-product' : ''; 

  const images = [
    // For the carousel, if assetPrefix is set, these should also not have basePath manually added.
    // If your previous fix (removing the extra slash) works locally, 
    // it should also work in production with a correctly set assetPrefix.
    { src: `coldsmoke-1.png` }, 
    { src: `coldsmoke-hardware-2.png` },
    { src: `coldsmoke-sidewall.png` },
    { src: `coldsmoke-tip.png` },
    { src: `coldsmoke-closeup.png` },
  ];

  const [imageIndex, setImageIndex] = useState(0);
  const [timer, setTimer] = useState(2500);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, timer);

    return () => clearInterval(interval);
  }, [imageIndex, timer, images.length]);

  const model = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
        // Set initial states for all splash screens and their components
        gsap.set([
          '#splash-1', '#splash-2', '#splash-3', '#splash-4', '#splash-5',
          '#coldsmoke-1', '#coldsmoke-image', '#coldsmoke-image-2', '#coldsmoke-closeup', '#coldsmoke-sidewall',
          '#text-1', '#text-2', '#text-3', '#text-4', '#text-5'
        ], { autoAlpha: 0 });
    
    const screen = window.innerHeight;
    const elementHeight = (model.current as any)?.offsetHeight || 0; // This is snowboard height when vertical
    const yPositionTop = screen > 800 ? -250 : -150; 
    const yPosition = (screen - elementHeight) / 2; // Snowboard's final Y (center of vertical board)
    const scale = screen > 800 ? "0.65" : "0.45";

    // Get the height of the text element itself
    const textHeight = (textRef.current as any)?.offsetHeight || 0;
    // Get the effective width of the snowboard image when rotated (which becomes its height visually)
    const snowboardEffectiveWidth = (model.current as any)?.offsetWidth * parseFloat(scale) || 0;

    gsap.set(model.current, { opacity: 0, y: yPositionTop, scale: 1, rotation: 0 });
    
    const timeline = gsap.timeline({
      ease: "power2.inOut",
      scrollTrigger: {
        start: "top top",
        endTrigger: "#stop",
        end: "bottom bottom",
        scrub: true,
        pin: "#image",
        anticipatePin: 1,
      },
    });
    
    timeline.fromTo(
      model.current as any,
      { opacity: 0, y: yPositionTop, scale: 1, rotation: 0 },
      { opacity: 1, y: yPositionTop, scale: 1, rotation: 0, duration: 0.2 },
      "start"
    );
    
    timeline.fromTo(
      model.current as any,
      { opacity: 1, y: yPositionTop, scale: 1, rotation: 0 },
      { opacity: 1, y: yPosition, scale: scale, rotation: -90, duration: 0.8 }, // Ends at yPosition, rotated
      "start+=0.2"
    );
    
    // Position text just above the horizontal snowboard
    // yPosition is the center of where the snowboard (initially vertical) is placed.
    // When rotated -90deg, its visual top edge will be yPosition - (snowboardEffectiveWidth / 2)
    const snowboardTopEdgeFinal = yPosition - (snowboardEffectiveWidth / 2);
    const textYPositionEnd = snowboardTopEdgeFinal - textHeight - 20; // 20px gap above snowboard

    // Remove textYPositionStart as it's no longer needed for a different starting y position
    // const textYPositionStart = screen > 800 ? yPositionTop + 250 : yPositionTop + 150; 

    timeline.fromTo(
      textRef.current as any,
      { opacity: 0, y: textYPositionEnd }, // Start with opacity 0 at its final y position
      { opacity: 1, y: textYPositionEnd, duration: 0.8 }, // End with opacity 1 at the same y position
      "start+=0.2" // You can adjust the timing if needed
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <ReactLenis root>
      <main>
        <ParallaxAnimation />
        <nav>
          <div className="nav">
            <div className="nav-links" style={{ gap: "1rem" }}>
              {/* Logo filename uses camel case, ensure it's in public folder and path is correct */}
              {/* Remove basePath here if assetPrefix is correctly set in next.config.mjs for production */}
              <Image src={`coldSmoke-logo.png`} alt="Cold Smoke Logo" width={60} height={60} style={{ width: "auto", height: "60px" }} />
              
            </div>
            <div className="nav-links" id="links">
              <button>products</button>
              <button>store</button>
              <button>now</button>
              <button>support</button>
            </div>
          </div>
        </nav>

        <div
          className="background-holder"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          id="image"
        >
          <h1
            ref={textRef}
            style={{
              position: "absolute",
              // Adjust initial top if it flashes, but GSAP controls final position
              top: "50%", 
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "10",
              color: "#070707",
              textAlign: "center",
              pointerEvents: "none",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: "400",
              letterSpacing: "0.1em",
              textShadow: "0 1px 3px rgba(255,255,255,0.8)",
              fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              opacity: 0, 
            }}
          >
            Voodoo Splitboard
          </h1>
          <Image 
            src="coldsmoke-1.png" // Remove basePath here as well
            alt="Cold Smoke Voodoo Splitboard" 
            width={800} 
            height={600} 
            style={{ 
              maxWidth: "100%", 
              height: "auto", // Add this to maintain aspect ratio
              objectFit: "contain" // Add this to prevent squishing
            }} 
            ref={model} 
          />
        </div>
        <div
          className="container-holder"
          style={{
            zIndex: "0",
            alignItems: "flex-start",
            background: "#fff", // Changed background to white
            minHeight: "300vh",
          }}
          id="stop"
        >
          <div
            className="container"
            style={{
              textAlign: "center",
              width: "100%",
              marginTop: "16rem",
            }}
          >
          </div>
        </div>

        <div className="container-holder" ref={inViewRef1}>
          <div className="container" ref={ref1} style={{ opacity: 0 }}>
            <h1>engineered for the backcountry.</h1>
            <br />
            <br />
            <div
              style={{ display: "flex", flexWrap: "wrap", gap: "2rem 4rem" }}
            >
              <p style={{ flex: "1 1 45%" }}>
                introducing the Cold Smoke Voodoo Splitboard. crafted by a small
                production company that builds each board with meticulous attention
                to detail. featuring a stoned grind top sheet for enhanced durability,
                a plain black sintered base for optimal performance, and a lightweight
                yet responsive wood core that delivers superior feel and control.
                the Voodoo excels in deep powder conditions while maintaining
                excellent grip on steep terrain.
              </p>
              <p style={{ flex: "1 1 45%" }}>
                this splitboard strikes the perfect balance between rocker and camber,
                providing incredible acceleration and responsiveness without the
                sluggish feel of over-rockered boards. the Voodoo 163 rides like
                a much shorter board, making it incredibly maneuverable in tight
                spots while still providing the stability needed for big mountain
                lines. whether you&apos;re skinning up Red Mountain Pass or dropping
                into Teton powder, the Voodoo delivers:
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2rem 4rem",
                marginTop: "2rem",
              }}
            >
              <ul style={{ flex: "1 1 45%" }}>
                <li>LIGHTWEIGHT WOOD CORE CONSTRUCTION</li>
                <li>STONED GRIND TOP SHEET FOR DURABILITY</li>
                <li>PLAIN BLACK SINTERED BASE</li>
                <li>OPTIMIZED ROCKER AND CAMBER PROFILE</li>
                <li>EXCELLENT GRIP ON STEEP TERRAIN</li>
                <li>SUPERIOR POWDER PERFORMANCE</li>
                <li>QUICK ACCELERATION AND RESPONSIVENESS</li>
                <li>RIDES SHORTER THAN ACTUAL LENGTH</li>
                <li>SMOOTH EDGE TRANSITIONING</li>
                <li>SMALL PRODUCTION QUALITY CRAFTSMANSHIP</li>
                <li>ENHANCED MANEUVERABILITY</li>
                <li>STABLE ON FIRM SNOW CONDITIONS</li>
                <li>PERFECT BALANCE OF ROCKER</li>
                <li>NO SLUGGISH FEEL IN DEEP SNOW</li>
                <li>PRECISION ENGINEERED SIDECUT</li>
                <li>PROFESSIONAL GRADE MATERIALS</li>
                <li>TESTED IN VARIED SNOW CONDITIONS</li>
                <li>PROVEN PERFORMANCE ON RED MOUNTAIN PASS</li>
                <li>VALIDATED IN TETON POWDER</li>
                <li>HANDLES 3+ FEET OF LIGHT DENSITY SNOW</li>
                <li>EXCELLENT FOR BIG MOUNTAIN LINES</li>
                <li>SPRING SKIING PERFORMANCE</li>
                <li>VERSATILE ALL-CONDITION BOARD</li>
                <li>RESPONSIVE WOOD CORE FEEL</li>
              </ul>
              <ul style={{ flex: "1 1 45%" }}>
                <li>SUPERIOR EDGE HOLD IN STEEPS</li>
                <li>AMAZING POWDER BOARD CHARACTERISTICS</li>
                <li>VERY FUN FEEL AND RIDE</li>
                <li>GREAT BALANCE IN ROCKER DESIGN</li>
                <li>WON&apos;T LET YOU DOWN ON STEEP TERRAIN</li>
                <li>HANDLES WARM SLUSHY CONDITIONS</li>
                <li>PERFORMS IN FIRM SNOW UP HIGH</li>
                <li>SMOOTH AND CONCISE EDGE TRANSITIONS</li>
                <li>LIGHTWEIGHT YET DURABLE</li>
                <li>WOOD CORE RESPONSIVENESS</li>
                <li>BETTER THAN HYBRID OR CARBON CORES</li>
                <li>HOLDS UP WELL OVER TIME</li>
                <li>PROFESSIONAL QUALITY BUILD</li>
                <li>SMALL BATCH PRODUCTION ATTENTION</li>
                <li>TESTED BY MOUNTAIN PROFESSIONALS</li>
                <li>PROVEN IN BACKCOUNTRY CONDITIONS</li>
                <li>EXCELLENT VALUE FOR QUALITY</li>
                <li>DESERVES 5 OUT OF 5 STARS</li>
                <li>RECOMMENDED BY GEAR TESTERS</li>
                <li>PERFECT FOR SPLITBOARD ENTHUSIASTS</li>
                <li>IDEAL FOR POWDER TOWN ADVENTURES</li>
                <li>GREAT FOR SPRING CORN SNOW</li>
                <li>HANDLES VARIABLE TERRAIN</li>
                <li>BUILT FOR SERIOUS BACKCOUNTRY USE</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container-holder">
          <Image
            src="/coldsmoke-trans.png"
            alt="Cold Smoke Splitboard Transparent View"
            width={1920}
            height={1080}
            style={{ width: "100%", height: "100vh", objectFit: "cover" }}
          />
        </div>

        <div
          className="container-holder"
          style={{
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Image src={images[imageIndex].src} alt={`Cold Smoke Splitboard View ${imageIndex + 1}`} width={800} height={600} className="splash" />
          <div className="splash-id-holder">
            <div className="splash-id-container">
              <div
                className="splash-id"
                onClick={() => {
                  setImageIndex(0);
                  setTimer(2500);
                }}
                style={{
                  opacity: imageIndex == 0 ? "1" : "",
                  transform: imageIndex == 0 ? "scale(1.6)" : "scale(1)",
                }}
              ></div>
              <div
                className="splash-id"
                onClick={() => {
                  setImageIndex(1);
                  setTimer(2500);
                }}
                style={{
                  opacity: imageIndex == 1 ? "1" : "",
                  transform: imageIndex == 1 ? "scale(1.6)" : "scale(1)",
                }}
              ></div>
              <div
                className="splash-id"
                onClick={() => {
                  setImageIndex(2);
                  setTimer(2500);
                }}
                style={{
                  opacity: imageIndex == 2 ? "1" : "",
                  transform: imageIndex == 2 ? "scale(1.6)" : "scale(1)",
                }}
              ></div>
              <div
                className="splash-id"
                onClick={() => {
                  setImageIndex(3);
                  setTimer(2500);
                }}
                style={{
                  opacity: imageIndex == 3 ? "1" : "",
                  transform: imageIndex == 3 ? "scale(1.6)" : "scale(1)",
                }}
              ></div>
              <div
                className="splash-id"
                onClick={() => setImageIndex(4)}
                style={{
                  opacity: imageIndex == 4 ? "1" : "",
                  transform: imageIndex == 4 ? "scale(1.6)" : "scale(1)",
                }}
              ></div>
            </div>
          </div>
        </div>

        <div
          className="container-holder"
          ref={inViewRef2}
          style={{
            background: "linear-gradient(to bottom, rgb(245 245 245), #caccce)",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div className="container" ref={ref2} style={{ opacity: 0, marginTop: 100}}>
            <h1 >lighter, faster and powder ready.</h1>
            <br />
            <br />
            <p>
              think of the Cold Smoke Voodoo as the ultimate splitboard for
              serious backcountry enthusiasts. meticulously crafted by a small
              production company, each board receives individual attention to
              ensure the highest quality standards. the Voodoo features a
              lightweight wood core that provides superior responsiveness
              compared to hybrid or carbon alternatives. with its optimized
              rocker and camber profile, this board accelerates quickly in
              powder while maintaining excellent edge hold on firm snow. the
              stoned grind top sheet ensures long-lasting durability, while
              the plain black sintered base delivers optimal glide performance.
              whether you&apos;re skinning up for dawn patrol or dropping into
              steep couloirs, the Voodoo splitboard won&apos;t let you down.
            </p>
          </div>

          <div className="description">
            <h1>Voodoo Splitboard</h1>
            <span>$850 ships from the U.S.</span>
            <br />
            <br />
            <Link href="">
              <span style={{ fontWeight: "400", color: "rgb(0, 113, 187)" }}>
                available now. visit store
              </span>
            </Link>
          </div>
        </div>

        <div
          className="container-holder"
          style={{
            alignItems: "flex-end",
            minHeight: "fit-content",
          }}
        >
          <Image
            src="/coldsmoke-sidewall-2.png"
            alt="Cold Smoke Splitboard Sidewall Detail"
            width={1920}
            height={1080}
            style={{ width: "100%", height: "60vh", objectFit: "cover" }}
          />
        </div>

        <footer>
          <div
            className="nav"
            style={{ flexWrap: "wrap-reverse", gap: "1rem 4rem", width: "90%" }}
          >
            <span>©2025 Eric Swanson</span>
            <div className="nav-links" style={{ flexWrap: "wrap" }}>
              <button>stores</button>
              <button>privacy</button>
              <button>terms and conditions</button>
              <button>contact</button>
            </div>
          </div>
        </footer>
      </main>
    </ReactLenis>
  );
}
