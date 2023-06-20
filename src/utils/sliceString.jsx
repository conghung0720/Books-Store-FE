import React, { useState } from "react";

const sliceString = ({ text, endText }) => {
  if (text.length > endText) {
    return text.substring(0, endText) + "...";
  }

  return text;
};

export default sliceString;
