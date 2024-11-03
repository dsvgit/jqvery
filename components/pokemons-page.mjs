import { render, effect, signal, $ } from "../framework.mjs";
import { Loading } from "./loading.mjs";
import { PokemonCard } from "./pokemon-card.mjs";

export const PokemonsPage = () => {
  const offset = 8;
  const next = signal(
    `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${offset}`,
  );
  const list = signal([]);
  const loading = signal(false);

  const fetchList = () => {
    loading.value = true;
    fetch(next.value)
      .then((res) => res.json())
      .then((data) => {
        list.value = list.value.concat(data.results);
        next.value = data.next;
        loading.value = false;
      });
  };

  fetchList();

  const Column = ({ children }) =>
    render`<div class="col col-6 col-md-3">${children}</div>`;

  const spinner = $(
    `<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>`,
  );

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
            .slice(list.value.length - offset)
            .map((pokemon) => Column({ children: PokemonCard(pokemon) })),
        );
      })}
      
      <div class="d-flex justify-content-center p-4">
        ${$(`<button class="btn btn-secondary btn-sm">Load more...</button>`)
          .on("click", () => {
            fetchList();
          })
          .useEffect((x) => {
            if (!list.value.length) {
              x.hide();
            } else {
              x.show();
            }
          })
          .useEffect((x) => {
            if (loading.value) {
              x.prepend(spinner);
            } else {
              spinner.remove();
            }
          })}
      </div>
    </div>
  `;
};
