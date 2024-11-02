import { render, signal, $ } from "../framework.mjs";

export const Counter = ({ title } = {}) => {
  const count = signal(0);
  const root = render`
    <div class="card border-warning text-center">
      <div class="card-body d-grid">
        <h5 class="card-title">${title}</h5>
        <div>
          ${$(`<span class="display-1"></span>`).useEffect(
            (x) => x.text(count.value),
          )}
        </div>
        <div class="btn-group" role="group" aria-label="Basic example">
          ${$(
            `<button class="btn btn-danger">-</button>`,
          ).on("click", () => (count.value -= 1))}
          ${$(
            `<button class="btn btn-primary">+</button>`,
          ).on("click", () => (count.value += 1))}
        </div>
      </div>
    </div>
  `;

  return root;
};
