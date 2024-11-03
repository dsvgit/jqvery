import { render, $, history } from "../framework.mjs";

export const Navbar = () => {
  return render`
    <nav class="navbar navbar-expand-sm">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Counters App</a>
        
        <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              ${$(`<a class="nav-link" href="#">Home</a>`).on("click", (e) => {
                e.preventDefault();
                history.push("/home");
              })}
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
              <li class="nav-item">
                ${$(`<a class="nav-link" href="#">Pokemon</a>`).on(
                  "click",
                  (e) => {
                    e.preventDefault();
                    history.push("/pokemon");
                  },
                )}
              </li>
          </ul>
        </div>
      </div>
    </nav>
  `;
};
