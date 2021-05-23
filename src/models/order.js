class Order {
    constructor(id, userId, items, totalAmount, date) {
        this.id = id;
        this.userId = userId;
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date;
    }
}

export default Order;