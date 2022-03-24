import { HasFormatter } from "../interfaces/HasFormatter.js";
import { Storage } from "./Storage.js"


export class ListTemplate {
  constructor(private container: HTMLUListElement) {}

  render(item: HasFormatter, heading: string, pos: "start" | "end", storage: Storage) {
    const li = document.createElement("li") as HTMLLIElement;
    li.className = `${heading}`
    if (heading === "invoice") {
      li.id = `i${storage.getIds("invoice")}`
    }

    if (heading === "payment") {
      li.id = `p${storage.getIds("payment")}`
    }

    const hideDelDiv = document.createElement("div") as HTMLDivElement;
    hideDelDiv.className = "li-hide-del-curve"
    li.append(hideDelDiv)

    const delDiv = document.createElement("div") as HTMLDivElement;
    delDiv.className = `li-del-curve`
    delDiv.innerHTML = `<div class="seen-bar"></div>
    <div class="blind-circle circle"></div>
    <div class="seen-circle circle">&times;</div>
    <div class="blind-circle circle"></div>`
    li.append(delDiv)

    const textDiv = document.createElement('div') as HTMLDivElement;
    textDiv.className = "li-text-div"

    const h4 = document.createElement("h4");
    h4.innerText = heading;
    textDiv.append(h4)

    const p = document.createElement("p");
    p.innerHTML = item.format();
    textDiv.append(p)

    li.append(textDiv)

    if (pos === "start") {
        this.container.prepend(li)
    } else {
        this.container.append(li)
    }

    storage.addItem(li)


    li.addEventListener("click", (e: Event) => {

      let elem = e.currentTarget as HTMLLIElement;

      let parent = elem.parentNode as HTMLUListElement;
      storage.removeItem(elem, elem.id[0])
      parent.removeChild(elem)
    })
  }
}
