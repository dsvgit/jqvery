import { render } from "../framework.mjs";
import { Counter } from "./counter.mjs";

export const CounterList = () => {
  const Column = ({ children }) =>
    render`<div class="col col-6 col-md-4 col-lg-3 col-xl-2">${children}</div>`;

  const root = render`
    <div class="row gx-3 gy-3">
      ${[
        Column({ children: Counter({ title: "Counter 1" }) }),
        Column({ children: Counter({ title: "Counter 2" }) }),
        Column({ children: Counter({ title: "Counter 3" }) }),
        Column({ children: Counter({ title: "Counter 4" }) }),
      ]}
    </div>
  `;

  return root;
};
