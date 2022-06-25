import { FunctionComponent } from "react";
import "./SvgIconStyle.scss";

interface SvgIconProps {
  type: string;
  className?: string;
  onClick?: () => void;
}

interface SvgIcons {
  [icon: string]: { path: string[]; viewBox: string };
}

export const SvgIcon: FunctionComponent<SvgIconProps> = ({
  type,
  className,
  onClick,
}) => (
  <svg
    className={`icon${className ? ` ${className}` : ""}`}
    viewBox={icons[type].viewBox}
    onClick={onClick}
  >
    {icons[type].path.map((p, i) => (
      <path key={i} d={p} />
    ))}
  </svg>
);

const icons: SvgIcons = {
  piano: {
    path: [
      "M7.9,9.8V250h240.2V9.8H7.9z M179.2,173.6v64.1h-45.3v-64.1h13.6V22.2h18.1v151.5H179.2z M90.4,173.6V22.2h18.1v151.5h13.6 v64.1H76.8v-64.1H90.4z M20.2,22.2h31.1v151.5h13.6v64.1H20.2V22.2z M235.8,237.7h-44.7v-64.1h13.6V22.2h31.1V237.7z",
    ],
    viewBox: "0 0 256 256",
  },
  notes: {
    path: [
      "M388.241,315.399c6.957,22.525-6.975,50.058-33.963,64.415c-29.737,15.806-63.967,9.587-76.438-13.891 c-12.483-23.478,1.513-55.324,31.244-71.124c15.179-8.068,31.517-10.367,45.537-7.596l-0.674-246.313L155.534,75.548 l-0.029,281.981c6.833,22.491-7.099,49.923-34.022,64.227c-29.737,15.8-63.958,9.6-76.438-13.878 c-12.475-23.489,1.513-55.337,31.25-71.142c15.196-8.08,31.551-10.38,45.592-7.584l0.044-282.505L389.104,0L388.241,315.399z",
    ],
    viewBox: "0 0 430.499 430.499",
  },
  play: {
    path: [
      "M405.284,201.188L130.804,13.28C118.128,4.596,105.356,0,94.74,0C74.216,0,61.52,16.472,61.52,44.044v406.124 c0,27.54,12.68,43.98,33.156,43.98c10.632,0,23.2-4.6,35.904-13.308l274.608-187.904c17.66-12.104,27.44-28.392,27.44-45.884 C432.632,229.572,422.964,213.288,405.284,201.188z",
    ],
    viewBox: "0 0 494.148 494.148",
  },
  stop: {
    path: [
      "M41.346,0H5.388C2.417,0,0,2.417,0,5.388v35.958c0,2.971,2.417,5.388,5.388,5.388h35.958c2.971,0,5.388-2.417,5.388-5.388 V5.388C46.733,2.417,44.316,0,41.346,0z",
    ],
    viewBox: "0 0 46.734 46.734",
  },
};
