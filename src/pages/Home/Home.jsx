import React from "react";
import FlashSale from "./FlashSale";
import Headers from "../../components/Headers";

const Home = () => {
  return (
    <>
      <Headers />
      <div className="bg-white">
        <FlashSale />;
      </div>
    </>
  );
};

export default Home;
