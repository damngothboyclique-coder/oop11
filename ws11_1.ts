class MenuItem {
  constructor(private _name: string,private _price: number,private _category: string) {}

  public get name(): string {
    return this._name;
  }

  public get price(): number {
    return this._price;
  }

  public get category(): string {
    return this._category;
  }
}

class Order {
  constructor(
    public items: { item: MenuItem; quantity: number }[] = []
  ) {}


  public calculateTotal(): number { 
    return this.items.reduce(
      (sum, { item, quantity }) => sum + item.price * quantity,
      0
    );
  }
}

class Restaurant {
  constructor(private menuItems: MenuItem[]) {}

  public processOrder(customerName: string, order: Order): void {
    console.log(`${customerName} placed an order for:`);
    console.log(`Order Details:`);

    order.items.forEach(({ item, quantity }) => {
      const subtotal = item.price * quantity;
      console.log(
        `${quantity} x ${item.name} - ${item.price.toFixed(2)} - ${item.category} = $${subtotal.toFixed(2)}`
      );
    });

    console.log(`----------------------------------`);
    const total = order.calculateTotal();
    console.log(`Total: $${total.toFixed(2)}`);
    let discount = 0;
    if (total > 500) {
      discount = total * 0.01; 
    }

    const netPrice = total - discount;

    if (discount > 0) {
      console.log(`Net Price (1% Disc): $${netPrice.toFixed(2)}`);
    } else {
      console.log(`Net Price: $${netPrice.toFixed(2)}`);
    }
  }
}
class Customer {
  constructor(private name: string) {}

  public get getName(): string {
    return this.name;
  }

  public placeOrder(restaurant: Restaurant, order: Order): void {
    restaurant.processOrder(this.name, order);
  }
}
const pizza = new MenuItem("Pizza", 250.0, "Main Course");
const salad = new MenuItem("Salad", 150.0, "Appetizer");
const restaurant = new Restaurant([pizza, salad]);
const alice = new Customer("Peter");
const aliceOrder = new Order([
  { item: pizza, quantity: 2 },
  { item: salad, quantity: 1 },
]);
alice.placeOrder(restaurant, aliceOrder);