import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto/auth.dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "generated/prisma/runtime/library";

@Injectable(    )
export class AuthService{
    constructor(private prisma: PrismaService){}

    async signup(dto:AuthDto) {
        const passwordHash = await argon.hash(dto.password);
        try {
           const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash: passwordHash,
            }
         });
        
            const {hash, ...userWithoutHash} = user;

            return userWithoutHash;
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error;
        }

    }
 
    signin() {
        return {msg: 'I have signed in'}
    }
}