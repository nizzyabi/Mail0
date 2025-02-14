import { TextLoop } from "@/components/ui/text-loop";

export default function Hero() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center">
      <h1 className="mb-16 text-6xl font-bold tracking-tight">
        <TextLoop
          className="overflow-y-clip"
          interval={4.5}
          transition={{
            type: "spring",
            stiffness: 900,
            damping: 80,
            mass: 10,
          }}
          variants={{
            initial: {
              y: 20,
              rotateX: 90,
              opacity: 0,
              filter: "blur(4px)",
            },
            animate: {
              y: 0,
              rotateX: 0,
              opacity: 1,
              filter: "blur(0px)",
            },
            exit: {
              y: -20,
              rotateX: -90,
              opacity: 0,
              filter: "blur(4px)",
            },
          }}
        >
          <span>
            Zero{" "}
            <TextLoop
              className="overflow-y-clip"
              interval={1.5}
              transition={{
                type: "spring",
                stiffness: 900,
                damping: 80,
                mass: 10,
              }}
              variants={{
                initial: {
                  y: 20,
                  rotateX: 90,
                  opacity: 0,
                  filter: "blur(4px)",
                },
                animate: {
                  y: 0,
                  rotateX: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                },
                exit: {
                  y: -20,
                  rotateX: -90,
                  opacity: 0,
                  filter: "blur(4px)",
                },
              }}
            >
              <span>Spam</span>
              <span>Tracking</span>
              <span>Other Word</span>
            </TextLoop>
          </span>
          <span>Mail0</span>
        </TextLoop>
        .
      </h1>

      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8">
        <div className="relative grid w-full grid-cols-3 text-sm">
          {/* Grid lines */}
          <div className="absolute inset-0 overflow-visible">
            {/* Horizontal lines */}
            <div className="absolute left-[-2rem] top-0 h-[1px] w-[calc(100%+4rem)] border-t border-dashed border-gray-800"></div>
            <div className="absolute bottom-0 left-[-2rem] h-[1px] w-[calc(100%+4rem)] border-t border-dashed border-gray-800"></div>
            {/* Vertical lines */}
            <div className="absolute left-0 top-[-2rem] h-[calc(100%+4rem)] w-[1px] border-l border-dashed border-gray-800"></div>
            <div className="absolute left-1/3 top-[-2rem] h-[calc(100%+4rem)] w-[1px] border-l border-dashed border-gray-800"></div>
            <div className="absolute left-2/3 top-[-2rem] h-[calc(100%+4rem)] w-[1px] border-l border-dashed border-gray-800"></div>
            <div className="absolute right-0 top-[-2rem] h-[calc(100%+4rem)] w-[1px] border-l border-dashed border-gray-800"></div>
          </div>

          <div className="relative px-4 py-8 text-center">
            <h3 className="text-xl font-medium">Easy to self host</h3>
          </div>
          <div className="relative px-4 py-8 text-center">
            <h3 className="text-xl font-medium">Connect popular services</h3>
          </div>
          <div className="relative px-4 py-8 text-center">
            <h3 className="text-xl font-medium">Customizable</h3>
          </div>
        </div>

        {/* <div className="flex w-full max-w-md gap-2">
            <Input type="email" placeholder="Your email" className="border-gray-800 bg-gray-900" />
            <Button>Join waitlist</Button>
          </div> */}
      </div>

      {/* App Preview */}
      {/* <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="overflow-hidden rounded-lg border border-gray-800">
          <img src="/app-preview.png" alt="Mail0 App Preview" className="w-full" />
        </div>
      </div> */}
    </div>
  );
}
