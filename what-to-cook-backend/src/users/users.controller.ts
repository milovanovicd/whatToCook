import { Controller, Post, HttpStatus, Body, Res, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService){}

    // @Get()
    // async getAllUsers() {
    //     const allUsers = await this.userService.findOne("dejan@gmail.com");
    //     return {
    //         message:"Dejan",
    //         user: allUsers
    //     };
    // }

    @Post('/create')
    async addUser(@Res() res, @Body() user: User) {
        const newUser = await this.userService.addUser(user);
        return res.status(HttpStatus.OK).json({
            message: "Customer has been created successfully",
            newUser
        })
    }

}
