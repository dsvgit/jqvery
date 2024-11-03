import { effect, signal } from "./vendor/signals-core.module.js";
import jQuery from "./vendor/jquery.slim.module.min.js";
import { createHashHistory } from "./vendor/history.production.min.js";

export const render = (strings, ...elements) => {
  const elementToId = new Map();

  const walkElement = (x) => {
    if (Array.isArray(x)) {
      return x.map(walkElement).join("");
    }

    if (x instanceof $) {
      const id = Math.random().toString(16).slice(2);
      elementToId.set(x, id);
      return `<div id="${id}"></div>`;
    }

    return String(x);
  };

  const raw = String.raw({ raw: strings }, ...elements.map(walkElement));

  const root = $(raw);

  for (const element of elementToId.keys()) {
    root.find(`#${elementToId.get(element)}`).replaceWith(element);
  }

  return root;
};

export const history = createHashHistory();

export const $ = jQuery;

$.fn.useEffect = function (fn) {
  effect(() => fn(this));
  return this;
};

$.fn.useHistory = function (fn) {
  fn(this, history);
  history.listen(() => fn(this, history));
  return this;
};

export { signal, effect };
