import { createAnimation, verticalSin } from "../engine";

export const sinAnimation = createAnimation({
  animations: [verticalSin(1, 0.2)],
});
