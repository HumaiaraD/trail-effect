import React, { useRef, useEffect, useState } from "react";
import { gsap } from 'gsap';
import './traileffect.css';

const Traileffect = () => {

    const NUM_TRAILS = 10;
    const trailRefs = useRef([]);

    const [trailIndex, setTrailIndex] = useState(0);

    useEffect(() => {
        trailRefs.current = new Array(NUM_TRAILS).fill().map(() => null);
    }, []);


    const creatTrailEffect = (event) => {
        const trail = trailRefs.current[trailIndex];
        if(!trail) return;

        const x = event.clientX;
        const y = event.clientY;

        gsap.set(trail, {x, y, opacity: 1, scale: 1});

        gsap.to(trail, {
            x: x + Math.random() * 30 - 15, 
            y: y + Math.random() * 30 - 15,
            opacity: 0.7,
            scale: 1,
            duration: 1.5,
            ease: "elastic.out(1, 0.3)",
        })
        setTrailIndex((prev) => (prev + 1) % NUM_TRAILS);

    };

    useEffect(() => {
        window.addEventListener("mousemove", creatTrailEffect);
        return () => {
            window.removeEventListener("mousemove", creatTrailEffect)
        }
    }, []);

    const trails = new Array(10).fill(0).map((_, i) => {
        <div key={i} ref={(el) => trailRefs.current[i] = el} className="trail" ></div>
    })



    return (
        <>
          {new Array(NUM_TRAILS).fill().map((_, i) => (
            <div
            key={i}
            ref={(el) => (trailRefs.current[i] = el)}
            className="trail"
            >❤️</div>
        ))}
        </>
    )
}

export default Traileffect;