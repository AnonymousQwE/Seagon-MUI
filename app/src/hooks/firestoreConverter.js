class Product {
  constructor(category, description, image, price, stock, title) {
    this.category = category.id;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.title = title;
  }
  toString() {
    return (
      this.category +
      ", " +
      this.description +
      ", " +
      this.price +
      ", " +
      this.stock +
      ", " +
      this.title
    );
  }
}

// Firestore data converter
export const productsConverter = {
  toFirestore: (product) => {
    return {
      category: product.category,
      description: product.description,
      price: product.price,
      stock: product.stock,
      title: product.title,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Product(
      data.category,
      data.description,
      data.price,
      data.stock,
      data.title
    );
  },
};
