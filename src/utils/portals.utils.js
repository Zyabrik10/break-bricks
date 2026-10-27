import { portals } from "../globals";

/**
 * Description
 * @param {string} hidePortal
 * @param {string} showPortal
 * @returns {void}
 */
export function changePortal(hidePortal, showPortal) {
  const hidePortalElement = document.querySelector(
    `[data-portal="${hidePortal}"]`,
  );
  const showPortalElement = document.querySelector(
    `[data-portal="${showPortal}"]`,
  );

  hidePortalElement.classList.add("hidden");
  showPortalElement.classList.remove("hidden");
}

export function goTo(portalName) {
  const currentPortal = portals.get().at(-1);

  changePortal(currentPortal, portalName);

  const updatedPath = Array.from(new Set([...portals.get(), portalName]));

  portals.set(updatedPath);
}

export function goBack() {
  const currentPath = portals.get();

  if (currentPath.length === 1) {
    return;
  }

  const currentPortal = portals.get().at(-1);
  const lastPortal = portals.get().at(-2);

  const updatePath = currentPath.slice(0, Math.max(1, currentPath.length - 1));

  portals.set(updatePath);

  changePortal(currentPortal, lastPortal);
}

export function initPortals() {
  portals.set(["home-menu"]);

  // hide all portals except home-menu
  const allPortals = document.querySelectorAll("[data-portal]");

  allPortals.forEach((portal) => {
    if (portal.dataset.portal === "home-menu") {
      portal.classList.remove("hidden");
      return;
    }

    portal.classList.add("hidden");
  });
}
