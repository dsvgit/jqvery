import { render, signal, $ } from "../framework.mjs";

export const PokemonCard = ({ name, url }) => {
  const pokemon = signal(null);
  const description = signal("");

  fetch(url.replace("pokemon", "characteristic"))
    .then((res) => res.json())
    .then((data) => {
      description.value = data.descriptions.find(
        (x) => x.language.name === "en",
      ).description;
    });

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      pokemon.value = data;
    });

  return render`
    <div class="card">
      ${$(
        `<img src="" class="card-img-top" alt="Pokemon ${name}" style="min-height: 200px">`,
      ).useEffect((x) => {
        if (pokemon.value) {
          x.attr("src", pokemon.value.sprites.front_default);
        }
      })}
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        ${$(`<p class="card-text"></p>`).useEffect((x) => {
          x.text(description.value);
        })}
      </div>
    </div>
  `;
};
