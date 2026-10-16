import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  speed?: number;
}

export function Marquee({
  children,
  pauseOnHover = false,
  direction = "left",
  speed = 30,
  className,
  ...props
}: MarqueeProps) {
  const animationName = direction === "right" ? "marquee-reverse" : "marquee";

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
      `}</style>

      <div className={cn("w-full overflow-hidden z-10", className)} {...props}>
        <div className="relative flex overflow-hidden py-5">
          <div
            className={cn(
              "flex w-max",
              pauseOnHover && "hover:[animation-play-state:paused]",
            )}
            style={
              {
                animation: `${animationName} ${speed}s linear infinite`,
                willChange: "transform",
              } as React.CSSProperties
            }
          >
            {children}
            {children}
          </div>
        </div>
      </div>
    </>
  );
}