"use strict";
require('../api/connection');
const UserModel = require('../models/user');


async function saveUser() {
    console.log("************************************");
    console.log("Request Save KichwaWord in Database Api: ");
    try {
        await UserModel.create({
            name: "firstUser",
            email:"email@gmail.com",
            password: "Trinity@1346",
            password_confirmation: "Trinity@1346"
        });

    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

saveUser()