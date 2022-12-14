import { updateCashWapper } from "../app.js";
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


    delDiv.addEventListener("click", () => {

      let elem = li as HTMLLIElement;
      let parent = elem.parentNode as HTMLUListElement;
      let listOfItems: any = parent.childNodes
      let itemsTypes: string[] = []

      for (const i in listOfItems) {
        itemsTypes.push(listOfItems[i].id)
        
      }
      itemsTypes = itemsTypes.filter(e => e !== undefined)

      storage.removeItem(elem, elem.id[0], itemsTypes)
      updateCashWapper()
      parent.removeChild(elem)
    })
  }

  empty (storage: Storage) {
    this.container.innerHTML = "",
    storage.emptyItems()
  }
}
