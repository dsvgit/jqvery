import { render, effect, signal, $ } from "../framework.mjs";
import { Loading } from "./loading.mjs";
import { PokemonCard } from "./pokemon-card.mjs";

export const PokemonsPage = () => {
  const next = signal("https://pokeapi.co/api/v2/pokemon?offset=0&limit=12");
  const list = signal([]);

  const fetchList = () =>
    fetch(next.value)
      .then((res) => res.json())
      .then((data) => {
        list.value = list.value.concat(data.results);
        next.value = data.next;
      });

  fetchList();

  const Column = ({ children }) =>
    render`<div class="col col-6 col-md-4 col-lg-3 col-xl-2">${children}</div>`;

  return render`
    <div>
      ${$(`<div></div>`).useEffect((x) => {
        if (!list.value.length) {
          x.html(Loading({ my: 5 }));
        } else {
          x.html("");
        }
      })}
    
      ${$(`<div class="row gx-3 gy-3"></div>`).useEffect((x) => {
        x.append(
          list.value
            .slice(list.value.length - 12)
            .map((pokemon) => Column({ children: PokemonCard(pokemon) })),
        );
      })}
      
      <div class="d-flex justify-content-center p-4">
        ${$(`<button class="btn btn-secondary btn-sm">Load more...</button>`).on(
          "click",
          () => {
            fetchList();
          },
        )}
      </div>
    </div>
  `;
};
