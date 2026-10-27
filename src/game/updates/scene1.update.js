import {
  ballsUpdate,
  platformUpdate,
  bonusesUpdate,
  renderScene,
  updateParticles,
} from "../utils";

/**
 * Description
 * @param {Object} scene
 * @returns {void}
 */
export default function scene1Update(scene) {
  renderScene(scene);

  platformUpdate(scene);
  ballsUpdate(scene);
  bonusesUpdate(scene);
  updateParticles(scene);
}
