import {Body, Controller, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthGuard} from "@nestjs/passport";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {LoginDTO} from "./dto/login.dto";
import {Role} from "../role/role.model";

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    @ApiOperation({ summary: "Login to your account" })
    @ApiResponse({status: HttpStatus.OK, description: "Success", type: Role})
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
    async login(@Body() user: LoginDTO) {
        return this.authService.login(user);
    }

    @Post('/registration')
    @ApiOperation({ summary: "Registration new account" })
    @ApiResponse({status: HttpStatus.OK, description: "Success", type: Role})
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
    registration(@Body() userDto: LoginDTO) {
        return this.authService.registration(userDto)
    }
}
