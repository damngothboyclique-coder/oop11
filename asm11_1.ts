abstract class TravelPackage {
  private _packageId: string;
  private _packageName: string;
  protected _basePrice: number;

  constructor(packageId: string, packageName: string, basePrice: number) {
    this._packageId = packageId;
    this._packageName = packageName;
    this._basePrice = basePrice;
  }

  public get packageId(): string { return this._packageId; }
  public get packageName(): string { return this._packageName; }
  public get basePrice(): number { return this._basePrice; }

  abstract calculatePrice(people: number): number;
}

class OneDayTrip extends TravelPackage {
  constructor(packageId: string, packageName: string, basePrice: number) {
    super(packageId, packageName, basePrice);
  }

  public calculatePrice(people: number): number {
    let total = this._basePrice * people;
    if (people >= 5) {
      total *= 0.90; 
    }
    return total;
  }
}

class OvernightTrip extends TravelPackage {
  private _numberOfNights: number;

  constructor(packageId: string, packageName: string, basePrice: number, numberOfNights: number) {
    super(packageId, packageName, basePrice);
    this._numberOfNights = numberOfNights;
  }

  public calculatePrice(people: number): number {
    let total = this._basePrice * people * this._numberOfNights;
    if (this._numberOfNights >= 3) {
      total *= 0.85; 
    }
    return total;
  }
}

class Customer {
  private _customerId: string;
  private _name: string;
  private _phone: string;

  constructor(customerId: string, name: string, phone: string) {
    this._customerId = customerId;
    this._name = name;
    this._phone = phone;
  }

  public get name(): string { return this._name; }
}

class BookingDetail {
  constructor(public name: string, public age?: number) {}
}

class Booking {
  private _bookingId: string;
  private _customer: Customer;
  private _travelPackage: TravelPackage;
  private _travelers: BookingDetail[] = []; 

  constructor(bookingId: string, customer: Customer, travelPackage: TravelPackage) {
    this._bookingId = bookingId;
    this._customer = customer;
    this._travelPackage = travelPackage;
  }

  public addTraveler(name: string, age?: number): void {
    this._travelers.push(new BookingDetail(name, age));
  }

  public calculateTotal(): number {
    return this._travelPackage.calculatePrice(this._travelers.length);
  }

  public printBookingDetails(): void {
    const total = this.calculateTotal();
    const travelerNames = this._travelers.map(t => t.name).join(', ');
    console.log(`===== Booking Detail =====`);
    console.log(`Booking ID: ${this._bookingId}`);
    console.log(`Customer: ${this._customer.name}`);
    console.log(`Package: ${this._travelPackage.packageName}`);
    console.log(`Travelers: ${this._travelers.length} (${travelerNames})`);
    console.log(`Total Price: ${total.toLocaleString('en-US', {minimumFractionDigits: 2})} Baht`);
  }
}

class TravelAgency {
  private _agencyName: string;
  private _packages: TravelPackage[] = []; 

  constructor(agencyName: string) {
    this._agencyName = agencyName;
  }

  public addPackage(pkg: TravelPackage): void {
    this._packages.push(pkg);
  }
}

const customer1 = new Customer("C001", "Alice", "0812345678");
const oneDayPackage = new OneDayTrip("P001", "Bangkok City Tour", 1500);

const booking = new Booking("B001", customer1, oneDayPackage);
booking.addTraveler("Alice", 30);
booking.addTraveler("Bob", 28);
booking.addTraveler("Carol", 35);
booking.addTraveler("David", 32);
booking.addTraveler("Eve", 25);

booking.printBookingDetails();