// import useTheme from "./useTheme";

// export default function ThemeToggle() {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <div className="flex items-center">
//       {/* Label */}
//       <span className="mr-2 text-gray-700 dark:text-gray-200">
//         {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
//       </span>

//       {/* Toggle Switch */}
//       <input
//         type="checkbox"
//         className="toggle toggle-md toggle-primary"
//         checked={theme === "dark"}
//         onChange={(e) => toggleTheme(e.target.checked)}
//       />
//     </div>
//   );
// }

// ===================================================

// import useTheme from "./useTheme";

// export default function ThemeToggle() {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <div className="flex items-center gap-1 sm:gap-3">
//       {/* Label */}
//       <span className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-200">
//         {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
//       </span>

//       {/* Toggle Switch */}
//       <input
//         type="checkbox"
//         className="toggle toggle-sm sm:toggle-md md:toggle-lg toggle-primary"
//         checked={theme === "dark"}
//         onChange={(e) => toggleTheme(e.target.checked)}
//       />
//     </div>
//   );
// }

// =============================================================

import useTheme from "./useTheme";
import { IoIosSunny } from "react-icons/io";
import { LuSunMoon } from "react-icons/lu";

 const ThemeToggle =  () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={() => toggleTheme(theme !== "dark")}
      className="text-xl sm:text-2xl md:text-3xl text-gray-800 dark:text-orange-500 transition duration-300 cursor-pointer"
    >
      {theme === "dark" ? <IoIosSunny /> : <LuSunMoon />}
    </button>
  );
}

export default ThemeToggle


// =========================================================

// import useTheme from "./useTheme";

// export default function ThemeToggle() {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <div className="flex items-center gap-3">
      
//       {/* Left Side Icon/Text */}
//       <span className="text-gray-700 dark:text-gray-200">
//         ☀️ Light
//       </span>

//       {/* Toggle Button */}
//       <input
//         type="checkbox"
//         className="toggle toggle-md toggle-primary"
//         checked={theme === "dark"}
//         onChange={(e) => toggleTheme(e.target.checked)}
//       />

//       {/* Right Side Icon/Text */}
//       <span className="text-gray-700 dark:text-gray-200">
//         🌙 Dark
//       </span>
//     </div>
//   );
// }

