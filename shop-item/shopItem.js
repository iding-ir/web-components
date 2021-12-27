const template = document.createElement("template");
template.innerHTML = `
    <style>
        .item {
            display: grid;
            grid-gap: 1rem;
            padding: 1rem;
            grid-template-areas:
                "image name"
                "image price"
                "image toggle"
                "image description";
            grid-template-rows: auto auto auto auto;
            grid-template-columns: 200px auto;
            background-color: rgba(130, 130, 130, 0.3)
        }

        .image {
            grid-area: image;
            width: 100%;
            height: auto;
        }

        .name {
            grid-area: name;
            margin: 0;
        }

        .price {
            grid-area: price;
        }

        .toggle {
            grid-area: toggle;
        }

        .description {
            grid-area: description;
        }

        .hidden {
            display: none;
        }
    </style>

    <div class="item">
        <img class="image" />

        <h3 class="name"></h3>

        <div class="price">
            <slot name="price" />
        </div>

        <button class="toggle">Hide Description</button>

        <p class="description">
            <slot name="description" />
        </p>
    </div>
`;

class ShopItem extends HTMLElement {
  constructor() {
    super();

    this.visibility = true;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.querySelector(".name").innerText =
      this.getAttribute("name");

    this.shadowRoot.querySelector(".image").src = this.getAttribute("image");
    this.shadowRoot.querySelector(".image").alt = this.getAttribute("name");
  }

  toggle() {
    this.visibility = !this.visibility;

    if (this.visibility) {
      this.shadowRoot.querySelector(".toggle").innerText = "Hide Description";

      this.shadowRoot.querySelector(".description").classList.remove("hidden");
    } else {
      this.shadowRoot.querySelector(".toggle").innerText = "Show Description";

      this.shadowRoot.querySelector(".description").classList.add("hidden");
    }
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector(".toggle")
      .addEventListener("click", () => this.toggle());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector(".toggle").removeEventListener("click");
  }
}

window.customElements.define("shop-item", ShopItem);
