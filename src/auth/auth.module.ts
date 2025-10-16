import { Module } from "@nestjs/common";
import { AuthController } from "./auth.contoroller";
import { AuthService } from "./auth.service";

@Module({    
    controllers: [AuthController],
    providers: [AuthService],
})

export class AuthModule{}