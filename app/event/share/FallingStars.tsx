// // components/FallingStars.tsx
// "use client"; 

// import React from "react";

// export function FallingStars() {
//   const STAR_COUNT = 20;
//   const starImage = "/images/star.png";

//   const random = (min: number, max: number) =>
//     Math.random() * (max - min) + min;

//   return (
//     <div className="pointer-events-none fixed top-0 left-0 w-full h-full overflow-hidden z-50">
//       {Array.from({ length: STAR_COUNT }).map((_, i) => {
//         const left = `${random(0, 100)}%`;
//         const delay = `${random(0, 5)}s`;
//         const duration = `${random(5, 10)}s`;

//         return (
//           <img
//             key={i}
//             src={starImage}
//             alt="star"
//             className="fall-animation"
//             style={{
//               left,
//               animationDelay: delay,
//               animationDuration: duration,
//               width: "30px",
//               height: "30px",
//             }}
//           />
//         );
//       })}
//     </div>
//   );
// }
