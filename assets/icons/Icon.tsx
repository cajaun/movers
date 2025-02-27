import React from "react";
import Svg, { Path, Defs, Mask, G, Circle, Line } from "react-native-svg";

const icons: { [key: string]: JSX.Element } = {
  "arrow-right": (
    <Svg viewBox="0 0 24 24" width="24" height="24">
      <Path d="M7.38 21.01c.49.49 1.28.49 1.77 0l8.31-8.31a.996.996 0 0 0 0-1.41L9.15 2.98c-.49-.49-1.28-.49-1.77 0s-.49 1.28 0 1.77L14.62 12l-7.25 7.25c-.48.48-.48 1.28.01 1.76" />
    </Svg>
  ),

  "clapper-solid": (
    <Svg viewBox="0 0 24 24" width="1em" height="1em">
      <Path
        fill="currentColor"
        d="M12 2c1.845 0 3.33 0 4.54.088L13.1 7.25H8.4L11.9 2zM3.464 3.464c1.253-1.252 3.158-1.433 6.632-1.46L6.599 7.25H2.104c.147-1.764.503-2.928 1.36-3.786"
      ></Path>
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="M2 12c0-1.237 0-2.311.026-3.25h19.948C22 9.689 22 10.763 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12m11.014.585C14.338 13.44 15 13.867 15 14.5s-.662 1.06-1.986 1.915c-1.342.866-2.013 1.299-2.514.98c-.5-.317-.5-1.176-.5-2.895s0-2.578.5-2.896s1.172.115 2.514.981"
        clipRule="evenodd"
      ></Path>
      <Path
        fill="currentColor"
        d="M21.896 7.25c-.147-1.764-.503-2.928-1.36-3.786c-.598-.597-1.344-.95-2.337-1.16L14.9 7.25z"
      ></Path>
    </Svg>
  ),

  "popcorn-solid": (
    <Svg viewBox="0 0 48 48" width="1em" height="1em">
      <Defs>
        <Mask id="ipSPopcorn0">
          <G
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          >
            <Path
              fill="#fff"
              stroke="#fff"
              d="M33.696 40.868L39 17H7l5.304 23.868c.334 1.501.5 2.252 1.049 2.692s1.317.44 2.856.44H29.79c1.539 0 2.308 0 2.856-.44c.549-.44.715-1.19 1.05-2.692"
            ></Path>
            <Path stroke="#000" d="m27 44l1-27m-9 27l-1-27"></Path>
            <Path
              stroke="#fff"
              d="M31 44H15m16-27H15m-4 0s-1-3 .5-4.5s4.5-1 4.5-1s0-3 2-4s5 .5 5 .5s2-3.357 5-2.5s3 4.5 3 4.5s2.5 0 4 2s0 5 0 5"
            ></Path>
          </G>
        </Mask>
      </Defs>
      <Path
        fill="currentColor"
        d="M0 0h48v48H0z"
        mask="url(#ipSPopcorn0)"
      ></Path>
    </Svg>
  ),
  "search-solid": (
    <Svg
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <Circle cx="9" cy="9" r="7"></Circle>
      <Line x1="14" y1="14" x2="19" y2="19"></Line>
    </Svg>
  ),
};

interface IconProps {
  name: keyof typeof icons;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  [key: string]: any;
}

const Icon: React.FC<IconProps> = ({
  name,
  width = 24,
  height = 24,
  fill = "black",
  stroke = "none",
  strokeWidth = 2,
  ...props
}) => {
  const IconComponent = icons[name];
  if (!IconComponent) {
    return null;
  }

  return React.cloneElement(IconComponent, {
    width,
    height,
    fill,
    stroke,
    strokeWidth,
    ...props,
  });
};

export default Icon;
