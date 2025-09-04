import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.create(createUserDto);
      return { message: 'User created successfully' };
    } catch (error) {
      // Handle specific errors here
      throw error;
    }
  }

  @Get()
  async findAll() {
    const user = await this.userService.findAll();
    return {
      succcess: true,
      user,
      message: "User read successfully",
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(+id);
    return {
      succcess: true,
      user,
      message: "User read successfully",
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.userService.update(+id, updateUserDto);
    return {
      succcess: true,
      data,
      message: "User read successfully",
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userService.remove(+id);
    return {
      succcess: true,
      message: "User deleted successfully",
    }
  }
}
