const { DataTypes, Model } = require('sequelize');

class UserModel extends Model {
    static getUserById(id) {
        return this.findByPk(id);
    }
}

const UserModelDefination = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

module.exports = {
    modelName: 'User',
    model: UserModel,
    defination: UserModelDefination
};