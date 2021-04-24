import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [isShowing2, setIsShowing2] = useState(false);
  const [isShowing3, setIsShowing3] = useState(false);
  const [isShowing4, setIsShowing4] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }
  function toggle2() {
    setIsShowing2(!isShowing2);
  }
  function toggle3() {
    debugger
    setIsShowing3(!isShowing3);
    debugger
  }
  function toggle4() {
    setIsShowing4(!isShowing4);
  }

  return {
    isShowing,
    toggle,
    isShowing2,
    toggle2,
    isShowing3,
    toggle3,
    isShowing4,
    toggle4,
  }
};
export default useModal;