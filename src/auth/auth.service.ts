import { Injectable } from "@nestjs/common";
import { User, Bookmark } from "generated/prisma";

@Injectable({})
export class AuthService{

    signup() {
        return {msg: 'I have signed up'}
    }

    signin() {
        return {msg: 'I have signed in'}
    }
}