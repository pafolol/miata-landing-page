import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import NA from "../assets/na.jpg";
import NA1 from "../assets/na1.jpg"
import NB from "../assets/nb.jpg"
import ND from "../assets/nd.jpg"

import ND2 from "../assets/miata2.jpg"


export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });



  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
          Historia del Mazda MX-5 Miata
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-md md:text-base max-w-sm">
          Desde 1989, el Miata se ha convertido en el roadster más vendido y
          querido del mundo. Aquí está su historia.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full text-white">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-red-600 via-red-400 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export function TimelineDemo() {
  const data = [
    {
      title: "1989 – El inicio",
      content: (
        <div>
          <p className="mb-8 text-md text-neutral-800 dark:text-neutral-200">
            El Miata debutó en el Auto Show de Chicago, inspirado en los
            roadsters británicos clásicos. Ligero, divertido y accesible: nació
            un ícono.
          </p>
          <img
            src={NA1}
            alt="Mazda Miata NA"
            className="rounded-lg shadow-md w-full md:w-2/3"
          />
        </div>
      ),
    },
    {
      title: "1990s – Generación NA",
      content: (
        <div>
          <p className="mb-8 text-md text-neutral-800 dark:text-neutral-200">
            El primer MX-5 con faros escamoteables conquistó al mundo. Más de
            400,000 unidades vendidas convirtieron al Miata en un fenómeno.
          </p>
          <img
            src={NA}
            alt="Miata NA clásico"
            className="rounded-lg shadow-md w-full md:w-2/3"
          />
        </div>
      ),
    },
    {
      title: "2000s – NB y NC",
      content: (
        <div>
          <p className="mb-8 text-md text-neutral-800 dark:text-neutral-200">
            El NB trajo un diseño más moderno con faros fijos. El NC creció en
            tamaño y seguridad, manteniendo la esencia del roadster.
          </p>
          <img
            src={NB}
            alt="Mazda MX-5 NB"
            className="rounded-lg shadow-md w-full md:w-2/3"
          />
        </div>
      ),
    },
    {
      title: "2015 – La generación ND",
      content: (
        <div>
          <p className="mb-8 text-md   text-neutral-800 dark:text-neutral-200">
            Más ligero, agresivo y tecnológico. El ND reafirmó al MX-5 como el
            auto deportivo más vendido de la historia.
          </p>
          <img
            src={ND}
            alt="Mazda MX-5 ND"
            className="rounded-lg shadow-md w-full md:w-2/3"
          />
        </div>
      ),
    },
    {
      title: "Hoy",
      content: (
        <div>
          <p className="mb-8 text-md text-neutral-800 dark:text-neutral-200">
            Con el espíritu “Jinba Ittai” (jinete y caballo como uno), el Miata
            sigue siendo un símbolo de diversión, libertad y estilo.
          </p>
          <img
            src={ND2}
            alt="Miata ND actual"
            className="rounded-lg shadow-md w-full md:w-2/3"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
