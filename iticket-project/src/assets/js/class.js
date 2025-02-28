export class BasketItems {
    constructor() {
        if (!JSON.parse(localStorage.getItem("basket"))) {
            localStorage.setItem("basket", JSON.stringify([]));
            this.basketItems = [];
        } else {
            const localBasket = JSON.parse(localStorage.getItem("basket"));
            this.basketItems = [...localBasket];
        }
    }

    add(newBasketItem) {
        const found = this.basketItems.find((x) => x.id == newBasketItem.id);
        if (found) {
            found.quantity++;
        } else {
            this.basketItems.push(newBasketItem);
        }

        localStorage.setItem("basket", JSON.stringify([...this.basketItems]));
        return {
            message: found
                ? "basket item quantity increased"
                : "new basket item added",
            data: this.basketItems,
            isNew: found ? false : true,
        };
    }

    removeBasketItem(id) {
        const found = this.basketItems.find((x) => x.id == id);
        if (found) {
            const updatedBasketItems = this.basketItems.filter((x) => x.id != id);
            this.basketItems = [...updatedBasketItems];
            localStorage.setItem("basket", JSON.stringify([...updatedBasketItems]));
            return updatedBasketItems;
        } else {
            return {
                status: 404,
                message: "not found!",
            };
        }
    }

    decreaseBasketItemQuantity(id) {
        const found = this.basketItems.find((x) => x.id == id);
        if (found) {
            if (found.quantity === 1) {
                this.removeBasketItem(id);
            } else {
                found.quantity--;
            }
        }
        localStorage.setItem("basket", JSON.stringify([...this.basketItems]));
    }

    getAll() {
        return this.basketItems;
    }

    getOne(id) {
        const found = this.basketItems.find((x) => x.id == id);
        if (found) {
            return found;
        } else {
            return {
                message: "not found!",
            };
        }
    }

    clear() {
        this.basketItems = [];
        localStorage.setItem("basket", JSON.stringify([]));
    }
}