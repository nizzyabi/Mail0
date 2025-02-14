import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";

const HeroImage = () => {
  return (
    <div className="mx-auto -mt-5 w-full max-w-5xl overflow-hidden px-4 md:-mt-5">
      <ContainerScroll>
        <Image
          src="/homepage-image.png"
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto h-full rounded-2xl object-cover object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
};

export default HeroImage;
