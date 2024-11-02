import { render, signal, $ } from "../framework.mjs";

import { Loading } from "./loading.mjs";
import { CounterList } from "./counter-list.mjs";

export const App = ({} = {}) => {
  const loading = signal(true);

  setTimeout(() => {
    loading.value = false;
  }, 1000);

  const root = render`
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Counters App</a>
        </div>
      </nav>
      ${$(`<div data-id="main" class="container mt-4"></div>`).useEffect((x) =>
        x.html(loading.value ? Loading({ my: 5 }) : CounterList()),
      )}
    </div>
  `;

  return root;
};
