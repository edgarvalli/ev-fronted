import React from "react";

export default interface Client {
    id: Number,
    name: String,
    email: String,
    rfc: String,
    phone: String,
    address: String,
    city: String,
    country: String,
    zip_code: Number,
    created_date: Date,
    updated_date: Date,
}
