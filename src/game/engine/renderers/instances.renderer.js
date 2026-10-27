import renderArc from "./arc.renderer";
import renderEllipse from "./ellipse.renderer";
import renderRect from "./rect.renderer";
import renderText from "./text.renderer";

/**
 * Renders instance of element of: text, rect, arc, ellipse.
 * Expects optional methods in **extra property of instance** such as: prerender, postrender, for better control of rendering process.
 * And also expects optional **_instanceCallback_** function that is called after everything else for each iteration.
 * @param {CanvasRenderingContext2D} ctx
 * @param {ReturnType<typeof createText> | ReturnType<typeof createRect> | ReturnType<typeof createArc> | ReturnType<typeof createEllipse>} instance
 * @returns {void}
 */
export default function renderInstances(ctx, sceneInstances, instanceCallback) {
  for (const categoryKey in sceneInstances) {
    const category = sceneInstances[categoryKey];

    if (Array.isArray(category)) {
      for (const instance of category) {
        middlewareRerender(instance, ctx, instanceCallback);
      }
    } else {
      // category = instance
      middlewareRerender(category, ctx, instanceCallback);
    }
  }
}

function middlewareRerender(instance, ctx, instanceCallback) {
  if ("prerender" in instance.extra) {
    instance.extra.prerender?.(instance, ctx);
  }

  switch (instance.type) {
    case "rect":
      renderRect(ctx, instance);
      break;
    case "ellipse":
      renderEllipse(ctx, instance);
      break;
    case "arc":
      renderArc(ctx, instance);
      break;
    case "text":
      renderText(ctx, instance);
      break;
  }

  if ("postrender" in instance.extra) {
    instance.extra.postrender?.(instance, ctx);
  }

  instanceCallback?.(instance);

  renderInstances(ctx, instance.instances, instanceCallback);
}
