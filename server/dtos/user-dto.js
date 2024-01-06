module.exports = class UserDto {
    email;
    id;
    isActivated;
    products;
    photo;

    constructor(model){
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.products = model.products;
        this.lastName= model.lastName;
        this.firstName= model.firstName;
        this.phone = model.phone;
        this.photo = model.photo

    }

}