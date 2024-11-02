import { signal, $ } from "../framework.mjs";
import { Loading } from "./loading.mjs";
import { CounterList } from "./counter-list.mjs";

export const CountersPage = () => {
  const loading = signal(true);

  setTimeout(() => {
    loading.value = false;
  }, 1000);

  return $(`<div></div>`).useEffect((x) =>
    x.html(loading.value ? Loading({ my: 5 }) : CounterList()),
  );
};
