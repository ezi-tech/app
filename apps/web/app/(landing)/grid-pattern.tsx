import { useId } from "react";

export function GridPattern(props: any) {
  let patternId = useId();

  return (
    <svg aria-hidden="true" className="absolute inset-0 h-full w-full">
      <defs>
        <pattern
          id={patternId}
          width="180"
          height="180"
          patternUnits="userSpaceOnUse"
          {...props}
        >
          <path d="M0 180V.5H180" fill="none" stroke="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
