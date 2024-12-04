const { users } = require("../user/user.js");

module.exports = {
    Product: {
        user: async (parent, args) => {
            return users.find(u => u.id === parent.userId);
        }
    },
    Query: {
        products: async (parent, args) => {
            return [{ id: 1, name: "Product 1", price: 100.5, userId: 1 }];
        }
    }
};