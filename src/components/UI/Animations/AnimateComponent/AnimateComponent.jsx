import React, { useState } from "react";
import { Transition } from "react-transition-group";

// Takes a duration and compatibly designed component as props

export default function AnimateComponent({ duration, Animation }) {
  // controls whether animation is happening
  const [animate, setAnimate] = useState(false);

  const triggerAnimation = useCallback(() => {
    setAnimate(true);
  }, [setTimeout(() => setAnimate(false), duration)]);
  return (
    <div>
      {/* Transition change state with `in` props */}
      <Transition in={animate} timeout={500}>
        {/* state change: exited -> entering -> entered -> exiting -> exited */}
        {(state) => <Animation state={state}>Hi</Animation>}
      </Transition>
    </div>
  );
}
