import React from "react";
import { Counter } from "./Counter";

export const CounterGroup = () => {
  return (
    <>
      <Counter exercise="Pull Ups" max={100} increments={[2, 5, 10, 20]} />
      <Counter exercise="Push Ups" max={200} increments={[4, 10, 20, 40]} />
      <Counter exercise="Squats" max={300} increments={[6, 15, 30, 60]} />
    </>
  );
};
