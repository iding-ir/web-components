const template = document.createElement("template");
template.innerHTML = `
    <style>
        .item {
            display: grid;
            width: 100%;
            grid-gap: 1rem;
            padding: 1rem;
            grid-template-areas:
                "image name price"
                "image toggle toggle"
                "image description description";
            grid-template-rows: 2rem 2rem minmax(auto, calc(100% - 4rem));
            grid-template-columns: 200px 1fr 1fr;
            border-radius: 4px;
            background-color: rgba(130, 130, 130, 0.2);
            box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
        }

        .image {
            grid-area: image;
            width: 100%;
            height: auto;
            border-radius: 4px;
        }

        .name {
            grid-area: name;
            line-height: 2rem;
            margin: 0;
        }

        .price {
            grid-area: price;
            line-height: 2rem;
            text-align: right;
        }

        .toggle {
            grid-area: toggle;
            border: none;
            outline: none;
            background-color: transparent;
            border-bottom: 1px solid rgba(130, 130, 130, 0.4);
            cursor: pointer;
        }

        .description {
            grid-area: description;
            margin: 0;
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

        <button class="toggle">Show Description</button>

        <p class="description hidden">
            <slot name="description" />
        </p>
    </div>
`;

class ShopItem extends HTMLElement {
  constructor() {
    super();

    this.visibility = false;

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
