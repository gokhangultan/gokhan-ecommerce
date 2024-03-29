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
    <div className="mt-5 ">
      <div>
        <div className="flex lg:flex-row flex-col  pl-[5px] lg:pl-[250px] collection-text  ">
          <div className="  flex flex-col basis-1/3  gap-4  sm:w-[607px] w-[387px] ">
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
              <button className="bg-primaryColor px-4 py-2 rounded-md text-white w-[193px] h-[52px] hover:bg-gray-300">
                Get Quote Now
              </button>
            </div>
          </div>
          <div className="basis-2/3  ">
            <button className="rounded-full bg-[#977DF4] w-[12px] h-[12px] sm:absolute relative lg:top-[190px] top-[80px] sm:top-[450px] lg:left-[79%] left-[78%]  sm:left-[68%] transform translate-x-[-50%] lg:flex sm:hidden flex z-10"></button>
            <button className="rounded-full bg-[#977DF4] w-[12px] h-[12px] sm:absolute relative lg:top-[350px] top-[260px] sm:top-[550px] lg:left-[55%] left-[5%] sm:left-[30%] transform translate-x-[-50%] lg:flex sm:hidden flex z-10"></button>
            <button className="rounded-full bg-[#FFE9EA] sm:w-[55px] sm:h-[55px] w-[45px] h-[45px] sm:absolute relative top-[70px] sm:top-[420px] lg:top-[120px] left-[10%] sm:left-[30%]  lg:left-[55%] transform translate-x-[-50%] lg:flex sm:hidden flex z-10"></button>
            <button className="rounded-full bg-[#FFE9EA] sm:w-[25px] sm:h-[25px] w-[15px] h-[15px] sm:absolute relative lg:top-[250px] top-[200px] sm:top-[530px] left-[81%] sm:left-[70%] lg:left-[52%] transform translate-x-[-50%] lg:flex sm:hidden flex z-10"></button>
            <button className="rounded-full bg-[#FFE9EA] w-[225px] h-[225px] sm:w-[355px] sm:h-[355px] sm:absolute relative top-[10px] sm:top-[400px] lg:top-[120px] left-[45%] sm:left-[48%] lg:left-[65%] transform translate-x-[-50%] lg:flex sm:hidden flex z-10"></button>
            <img
              src="about.png"
              className="sm:absolute relative  lg:top-[50px] sm:top-[320px] top-[5px]  lg:left-[65%] sm:left-[45%] left-[-10%] transform translate-x-[-5%] translate-y-[-90%] sm:translate-y-0 sm:translate-x-[-50%] z-10 max-w-[500px]  sm:max-h-[500px] max-h-[300px] sm:max-w-[700px] lg:flex sm:hidden flex "
            />
          </div>
        </div>
      </div>
      <div className="px-[50px] md:px-[255px] collection-text">
        <div className="pt-[100px]  ">
          <p className="text-sm leading-5 text-[#E74040] mb-3">
            Problems trying
          </p>

          <div className="flex md:flex-row flex-col justify-between gap-[80px]">
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

        <div className=" text-center py-5 ">
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

        <div className="relative pt-5 justify-center flex">
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
              className="bg-primaryColor rounded-full w-[52px] h-[52px] md:w-[92px] md:h-[92px] absolute z-10 top-[50%] left-[50%] transform translate-x-[-50%]"
              onClick={handlePlay}
            >
              <FontAwesomeIcon icon={faPlay} style={{ color: "#FFFFFF" }} />
            </button>
          )}
        </div>
      </div>
      <div className="px-[50px] pt-5 mb-[100px]">
        <Team />
      </div>
      <div className="bg-[#FAFAFA] py-[100px] px-[50px] ">
        <div className="flex flex-col text-center gap-5  ">
          <h2 className="text-[#252B42] font-bold text-[40px] leading-[40px]">
            Big Companies Are Here
          </h2>
          <p className="text-sm text-secondaryColor leading-5 ">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics
          </p>
        </div>
        <div className="bg-[#FAFAFA] py-5 ">
          <Companies />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between bg-[#2A7CC7] ">
        <div className="flex-col  basis-1/3 flex justify-center gap-4 mx-20 sm:mx-40 py-5 collection-text ">
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
            <button className="border-1 border-white px-4 py-2 rounded-md text-white sm:w-[193px] w-[123px] h-[52px] hover:bg-gray-300 hover:text-primaryColor">
              Button
            </button>
          </div>
        </div>
        <div className="justify-end flex items-end">
          <img
            src="about2.jpeg"
            className="md:w-[590px] w-full h-[640px] hidden md:flex "
          />
        </div>
      </div>
    </div>
  );
}
