import { render, signal, $, history } from "../framework.mjs";

import { Loading } from "./loading.mjs";
import { CounterList } from "./counter-list.mjs";
import { CountersPage } from "./counters-page.mjs";
import { AboutPage } from "./about-page.mjs";

export const App = ({} = {}) => {
  const root = render`
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Counters App</a>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                ${$(`<a class="nav-link" href="#">Home</a>`).on(
                  "click",
                  (e) => {
                    e.preventDefault();
                    history.push("/home");
                  },
                )}
              </li>
              <li class="nav-item">
                ${$(`<a class="nav-link" href="#">About</a>`).on(
                  "click",
                  (e) => {
                    e.preventDefault();
                    history.push("/about");
                  },
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      ${$(`<div class="container mt-4"></div>`).useHistory((x, history) => {
        const { location } = history;

        if (location.pathname.startsWith("/about")) {
          x.html(AboutPage());
          return;
        }

        x.html(CountersPage());
      })}
    </div>
  `;

  return root;
};
