import React from "react";

export default interface ResponseHttp {
    error: Boolean,
    data: Array<any> | any,
    message: String
}