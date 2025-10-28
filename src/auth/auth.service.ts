import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto/auth.dto";
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';



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
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error;
        }

    }
 
    async signin(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where:{
                email: dto.email,
            }
        });

        if(!user || !user.hash) throw new ForbiddenException('Credentials incorrect',);

        const pwMatches = await argon.verify(user.hash, dto.password)
        if(!pwMatches) throw new ForbiddenException(
            'Credentials incorrect'
        )

       const {hash, ...userWithoutHash}= user;
        return userWithoutHash;
    };
}