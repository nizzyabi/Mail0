import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  async function loadGoogleFont(font: string) {
    const url = `https://fonts.googleapis.com/css2?family=${font}:wght@600&display=swap`;
    const css = await (await fetch(url)).text();
    const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

    if (resource) {
      const response = await fetch(resource[1]);
      if (response.status === 200) {
        return await response.arrayBuffer();
      }
    }

    throw new Error("failed to load font data");
  }

  const fontData = await loadGoogleFont("Geist");

  return new ImageResponse(
    (
      <div tw="text-white bg-black w-full py-4 px-10 h-full flex items-center justify-center flex-col">
        <div tw="opacity-10 absolute -bottom-24 -right-14 flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#ffffff"
            viewBox="0 0 256 256"
          >
            <path
              d="M184,120v61.65a8,8,0,0,1-2.34,5.65l-34.35,34.35a8,8,0,0,1-13.57-4.53L128,176ZM136,72H74.35a8,8,0,0,0-5.65,2.34L34.35,108.69a8,8,0,0,0,4.53,13.57L80,128ZM40,216c37.65,0,50.69-19.69,54.56-28.18L68.18,161.44C59.69,165.31,40,178.35,40,216Z"
              opacity="0.2"
            ></path>
            <path d="M223.85,47.12a16,16,0,0,0-15-15c-12.58-.75-44.73.4-71.41,27.07L132.69,64H74.36A15.91,15.91,0,0,0,63,68.68L28.7,103a16,16,0,0,0,9.07,27.16l38.47,5.37,44.21,44.21,5.37,38.49a15.94,15.94,0,0,0,10.78,12.92,16.11,16.11,0,0,0,5.1.83A15.91,15.91,0,0,0,153,227.3L187.32,193A15.91,15.91,0,0,0,192,181.64V123.31l4.77-4.77C223.45,91.86,224.6,59.71,223.85,47.12ZM74.36,80h42.33L77.16,119.52,40,114.34Zm74.41-9.45a76.65,76.65,0,0,1,59.11-22.47,76.46,76.46,0,0,1-22.42,59.16L128,164.68,91.32,128ZM176,181.64,141.67,216l-5.19-37.17L176,139.31Zm-74.16,9.5C97.34,201,82.29,224,40,224a8,8,0,0,1-8-8c0-42.29,23-57.34,32.86-61.85a8,8,0,0,1,6.64,14.56c-6.43,2.93-20.62,12.36-23.12,38.91,26.55-2.5,36-16.69,38.91-23.12a8,8,0,1,1,14.56,6.64Z"></path>
          </svg>
        </div>
        <div tw="flex flex-col font-normal items-center justify-center">
          <div tw="flex mb-8 rounded-xl w-60 border-white p-4 items-center">
            <div tw="flex items-center rounded-lg bg-white/20 justify-center border-2 border-white p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#ffffff"
                viewBox="0 0 256 256"
              >
                <path d="M224,96l-78.55,56h-34.9L32,96l96-64Z" opacity="0.2"></path>
                <path d="M228.44,89.34l-96-64a8,8,0,0,0-8.88,0l-96,64A8,8,0,0,0,24,96V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V96A8,8,0,0,0,228.44,89.34ZM96.72,152,40,192V111.53Zm16.37,8h29.82l56.63,40H56.46Zm46.19-8L216,111.53V192ZM128,41.61l81.91,54.61-67,47.78H113.11l-67-47.78Z"></path>
              </svg>
            </div>
            <h3 tw="ml-4 text-4xl border-l-2 px-4 border-white font-extrabold">Mail0</h3>
          </div>
          <div tw="flex flex-col items-center justify-center">
            <div tw="flex">
              <span tw="font-extrabold text-7xl">Your</span>
              <span style={{ fontFamily: "main-bold" }} tw="font-extrabold text-7xl text-[#fff]">
                open source
              </span>
            </div>
            <span tw="font-bold text-7xl">email alternative</span>
          </div>

          <div tw="text-3xl text-center font-medium text-neutral-400 w-[80%] mt-10">
            Connect and take control of your email with an open source, secure, and customizable
            platform built for everyone.
          </div>
          <div tw="text-3xl rounded-xl mt-16 text-primary w-[16rem] flex items-center justify-center h-20">
            <span tw="mr-2 border-2 border-white w-full h-16 bg-white/20 rounded-lg flex items-center justify-center">
              Register Now
            </span>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 8L22 12L18 16" />
              <path d="M2 12H22" />
            </svg> */}
          </div>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #fff  100%, #ffff  100%)",
            width: "20rem",
            height: "20rem",
            filter: "blur(180px)",
            borderRadius: "50%",
            display: "flex",
            position: "absolute",
            bottom: "-100px",
            left: "-40px",
            opacity: "0.2",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "main",
          }}
        ></div>
        <div
          style={{
            background: "linear-gradient(135deg, #fff  100%, #fff  100%)",
            width: "20rem",
            height: "20rem",
            filter: "blur(180px)",
            borderRadius: "50%",
            display: "flex",
            position: "absolute",
            top: "33%",
            right: "-40px",
            opacity: "0.4",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "main",
          }}
        ></div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "main",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
