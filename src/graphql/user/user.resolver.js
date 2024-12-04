const { users } = require("./user.js");

module.exports = { 
    Query: {
        users: async (parent, args) => {
            return users; 
        }
    }
}