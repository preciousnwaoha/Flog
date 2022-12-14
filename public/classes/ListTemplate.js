import { updateCashWapper } from "../app.js";
export class ListTemplate {
    constructor(container) {
        this.container = container;
    }
    render(item, heading, pos, storage) {
        const li = document.createElement("li");
        li.className = `${heading}`;
        if (heading === "invoice") {
            li.id = `i${storage.getIds("invoice")}`;
        }
        if (heading === "payment") {
            li.id = `p${storage.getIds("payment")}`;
        }
        const hideDelDiv = document.createElement("div");
        hideDelDiv.className = "li-hide-del-curve";
        li.append(hideDelDiv);
        const delDiv = document.createElement("div");
        delDiv.className = `li-del-curve`;
        delDiv.innerHTML = `<div class="seen-bar"></div>
    <div class="blind-circle circle"></div>
    <div class="seen-circle circle">&times;</div>
    <div class="blind-circle circle"></div>`;
        li.append(delDiv);
        const textDiv = document.createElement('div');
        textDiv.className = "li-text-div";
        const h4 = document.createElement("h4");
        h4.innerText = heading;
        textDiv.append(h4);
        const p = document.createElement("p");
        p.innerHTML = item.format();
        textDiv.append(p);
        li.append(textDiv);
        if (pos === "start") {
            this.container.prepend(li);
        }
        else {
            this.container.append(li);
        }
        storage.addItem(li);
        delDiv.addEventListener("click", () => {
            let elem = li;
            let parent = elem.parentNode;
            let listOfItems = parent.childNodes;
            let itemsTypes = [];
            for (const i in listOfItems) {
                itemsTypes.push(listOfItems[i].id);
            }
            itemsTypes = itemsTypes.filter(e => e !== undefined);
            storage.removeItem(elem, elem.id[0], itemsTypes);
            updateCashWapper();
            parent.removeChild(elem);
        });
    }
    empty(storage) {
        this.container.innerHTML = "",
            storage.emptyItems();
    }
}
