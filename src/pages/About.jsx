import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import YouTube from "react-youtube";
import Team from "./Team";
import Companies from "../components/Companies";

export default function About() {
  const [isPlaying, setIsPlaying] = useState(false);

  const opts = {
    height: "540px",
    width: "989px",
    playerVars: {
      autoplay: 1,
    },
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };
  return (
    <div className=" ">
      <div>
        <div className="flex lg:flex-row flex-col container collection-text items-center justify-between ">
          <div className="  flex flex-col basis-1/3  gap-4 ">
            <h5 className="font-bold text-base leading-6 text-[#252B42]">
              ABOUT COMPANY
            </h5>
            <h1 className="font-bold text-6xl leading-[80px] text-[#252B42]">
              ABOUT US
            </h1>
            <h4 className="text-xl text-secondaryColor leading-7">
              We know how large objects will act, but things on a small scale
            </h4>
            <div>
              <button className="button-main px-5 py-3">
                Get Quote Now
              </button>
            </div>
          </div>
          <div className="basis-2/3">
          <img src="/about-us-hero.svg" className=" max-h-[612px] lg:w-full" />

          </div>
        </div>
      </div>
      <div className="container collection-text">
        <div className="py-5">
          <p className="text-sm leading-5 text-[#E74040] mb-3">
            Problems trying
          </p>

          <div className="flex md:flex-row flex-col justify-between gap-5">
            <div className="flex basis-1/3">
              <h3 className="font-bold text-2xl leading-8 text-[#252B42]">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent.
              </h3>
            </div>
            <div className="flex basis-2/3">
              <p className="text-secondaryColor text-sm leading-5 text-start">
                Problems trying to resolve the conflict between the two major
                realms of Classical physics: Newtonian mechanics{" "}
              </p>
            </div>
          </div>
        </div>

        <div className=" text-center py-5 container ">
          <div className="flex md:flex-row flex-col gap-3 justify-between">
            <div className="flex-col">
              <h1 className="font-bold text-6xl leading-[80px] text-[#252B42]">
                15K
              </h1>
              <h5 className="text-base text-secondaryColor font-bold leading-6">
                Happy Customers
              </h5>
            </div>
            <div>
              <h1 className="font-bold text-6xl leading-[80px] text-[#252B42]">
                150K
              </h1>
              <h5 className="text-base text-secondaryColor font-bold leading-6">
                Monthly Visitors
              </h5>
            </div>
            <div>
              <h1 className="font-bold text-6xl leading-[80px] text-[#252B42]">
                15
              </h1>
              <h5 className="text-base text-secondaryColor font-bold leading-6">
                Countries Worldwide
              </h5>
            </div>
            <div>
              <h1 className="font-bold text-6xl leading-[80px] text-[#252B42]">
                100+
              </h1>
              <h5 className="text-base text-secondaryColor font-bold leading-6">
                Top Partners
              </h5>
            </div>
          </div>
        </div>

        <div className="relative pt-5 justify-center flex container">
          {isPlaying ? (
            <YouTube videoId="Tjynzum7UpI" opts={opts} />
          ) : (
            <img
              src="video.jpeg"
              className="w-[500px]  sm:w-[600px] md:w-[600px] lg:w-[989px] shadow-xl rounded-2xl"
              alt="Video Thumbnail"
            />
          )}
          {!isPlaying && (
            <button
              className=" rounded-full button-main  absolute z-10 top-[50%] left-[50%] transform translate-x-[-50%] p-4"
              onClick={handlePlay}
            >
              <FontAwesomeIcon icon={faPlay} style={{ color: "#FFFFFF" }} />
            </button> 
          )}
        </div>
      </div>
      <div className="container py-5">
        <Team />
      </div>
      <div className=" py-5 container ">
        <div className="flex flex-col text-center gap-5  ">
          <h2 className="text-[#252B42] font-bold text-[40px] leading-[40px]">
            Big Companies Are Here
          </h2>
          <p className="text-sm text-secondaryColor leading-5 ">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics
          </p>
        </div>
        <div className=" py-5 ">
          <Companies />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between bg-[#2A7CC7] mb-5">
        <div className="flex-col basis-1/3 flex justify-center gap-4 container py-5 collection-text ">
          <h5 className="text-sm font-bold text-white leading-6">
            WORK WITH US
          </h5>
          <h2 className="font-bold leading-[50px] text-[40px] text-white">
            Now Let’s grow Yours
          </h2>
          <p className="text-sm leading-5 text-white">
            The gradual accumulation of information about atomic and small-scale
            behavior during the first quarter of the 20th{" "}
          </p>
          <div>
            <button className="button-main py-2.5 px-5 hover:bg-gray-300 border-white bg-[#2A7CC7]">
              Button
            </button>
          </div>
        </div>
        <div className="justify-end flex items-end">
          <img
            src="about2.jpeg"
            className=" w-full h-[640px] hidden md:flex object-contain "
          />
        </div>
      </div>
    </div>
  );
}
