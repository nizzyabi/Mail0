import Image from "next/image";

const HeroImage = () => {
  return (
    <div className="mx-auto mt-8 w-full max-w-5xl overflow-hidden px-4">
      <div className="relative items-center justify-center rounded-xl border border-muted bg-[#b4b2b21a] p-1 shadow-xl shadow-black backdrop-blur-lg md:flex md:animate-move-up md:p-5">
        <Image
          src="/homepage-image.png"
          alt="hero"
          width={800}
          height={600}
          className="h-full w-full rounded-xl shadow-xl shadow-black md:rounded-lg"
        />
      </div>
    </div>
  );
};

export default HeroImage;
