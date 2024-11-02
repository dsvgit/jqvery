import { render } from "../framework.mjs";

export const Loading = ({ my = 0 } = {}) => {
  const root = render`
    <div class="d-flex justify-content-center my-${my}">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;

  return root;
};
