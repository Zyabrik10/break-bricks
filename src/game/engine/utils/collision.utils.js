/**
 * Returns rect sides which collided with arc and do they have collision in general
 * @param {Object} arcInstance
 * @param {Object} rectInstance
 * @returns {{
 *  hasCollision: false,
 *  top: boolean;
 *  right: boolean;
 *  bottom: boolean;
 *  left: boolean;
 * }}
 */
export function getCollidedSidesRectWithArc(arcInstance, rectInstance) {
  const collidedRectSide = {
    hasCollision: false,
    top: false,
    right: false,
    bottom: false,
    left: false,
  };

  const arcX = arcInstance.coor.x;
  const arcY = arcInstance.coor.y;
  const radius = arcInstance.radius;

  const rectLeft = rectInstance.coor.x;
  const rectRight = rectInstance.coor.x + rectInstance.width;
  const rectTop = rectInstance.coor.y;
  const rectBottom = rectInstance.coor.y + rectInstance.height;

  // Closest point on the rect to the arc's center handles edges AND corners.
  const closestX = Math.max(rectLeft, Math.min(arcX, rectRight));
  const closestY = Math.max(rectTop, Math.min(arcY, rectBottom));

  const dx = arcX - closestX;
  const dy = arcY - closestY;

  if (dx * dx + dy * dy > radius * radius) {
    return collidedRectSide;
  }

  collidedRectSide.hasCollision = true;

  if (dx === 0 && dy === 0) {
    // Arc center is inside the rect: bounce off whichever side is closest.
    const overlapLeft = arcX - rectLeft;
    const overlapRight = rectRight - arcX;
    const overlapTop = arcY - rectTop;
    const overlapBottom = rectBottom - arcY;
    const minOverlap = Math.min(
      overlapLeft,
      overlapRight,
      overlapTop,
      overlapBottom
    );

    if (minOverlap === overlapTop) collidedRectSide.top = true;
    else if (minOverlap === overlapBottom) collidedRectSide.bottom = true;
    else if (minOverlap === overlapLeft) collidedRectSide.left = true;
    else collidedRectSide.right = true;
  } else if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0) collidedRectSide.right = true;
    else collidedRectSide.left = true;
  } else if (dy > 0) {
    collidedRectSide.bottom = true;
  } else {
    collidedRectSide.top = true;
  }

  return collidedRectSide;
}
