import React, { forwardRef, useEffect, useRef, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";

const RatingStar = ({ rating = 5, className = "", trigger = 0 }) => {
  const [isStarFull, setIsStarFull] = useState([]);
  const [ratingStar, setRatingStar] = useState(rating);

  let styles = `${className} w-4 h-4`;

  const Hover = (value) => {
    if (trigger === 1) setRatingStar(value + 1);
    else return;
  };

  useEffect(() => {
    let tempStarFull = new Array(5).fill(null);
    tempStarFull.map((_, index) => {
      if (index < ratingStar)
        tempStarFull[index] = (
          <StarIcon
            key={index}
            onMouseEnter={() => Hover(index)}
            value={index}
            className={`${styles} text-yellow-400`}
          />
        );
      else
        tempStarFull[index] = (
          <StarIcon
            key={index}
            onMouseEnter={() => Hover(index)}
            value={index}
            className={`${styles} text-gray-400`}
          />
        );
    });
    setIsStarFull(tempStarFull);
  }, [ratingStar]);

  return <>{isStarFull.map((val) => val)}</>;
};

export default RatingStar;
