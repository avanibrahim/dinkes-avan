import * as React from "react";

export const HeroContent: React.FC = () => {
  return (
    <article className="flex relative flex-col items-start mt-10 max-md:max-w-full">
      <h1 className="self-stretch text-5xl font-bold tracking-wider leading-[51px] text-neutral-900 max-md:max-w-full max-md:text-4xl max-md:leading-10">
        Cpathlabs is India's first fully{" "}
        <span style={{ color: "rgba(62,151,132,1)" }}>
          automated diagnostic laboratory{" "}
        </span>
      </h1>
      <p className="mt-3 text-2xl tracking-wider leading-8 text-stone-500">
        with a focus on providing quality at affordable costs to
        laboratories and hospitals in India.
      </p>
      <button className="flex flex-col justify-center px-8 py-3.5 mt-12 text-lg font-medium text-white bg-teal-600 rounded-2xl max-md:px-5 max-md:mt-10 hover:bg-teal-700 transition-colors">
        Scan QR
      </button>
    </article>
  );
};
