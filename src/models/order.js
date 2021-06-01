import moment from 'moment';

class Order {
  constructor(id, userId, items, totalAmount, date) {
    this.id = id;
    this.userId = userId;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }

  get readableDate() {
    return moment(this.date).format('DD/MM/YYYY, HH:mm');
  }
}

export default Order;
