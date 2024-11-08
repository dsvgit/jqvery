import { render, $ } from "../framework.mjs";

import { CountersPage } from "./counters-page.mjs";
import { AboutPage } from "./about-page.mjs";
import { Navbar } from "./navbar.mjs";
import { PokemonsPage } from "./pokemons-page.mjs";

export const App = ({} = {}) => {
  const root = render`
    <div>
      ${Navbar()}
      ${$(`<div class="container mt-4"></div>`).useHistory((x, history) => {
        const { location } = history;

        if (location.pathname.startsWith("/about")) {
          x.html(AboutPage());
          return;
        }

        if (location.pathname.startsWith("/pokemon")) {
          x.html(PokemonsPage());
          return;
        }

        x.html(CountersPage());
      })}
    </div>
  `;

  return root;
};
