import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.prisma.user.create({
            data: createUserDto,
            include: {
                posts: true,
            },
        });
    }

    async findAll(): Promise<UserEntity[]> {
        return this.prisma.user.findMany({
            include: {
                posts: true,
            },
        });
    }

    async findOne(id: number): Promise<UserEntity> {
        return this.prisma.user.findUnique({
            where: {
                id: id,
            },
            include: {
                posts: true,
            },
        });
    }

    async update(
        id: number,
        updateUserDto: UpdateUserDto,
    ): Promise<UserEntity> {
        return this.prisma.user.update({
            where: {
                id: id,
            },
            data: updateUserDto,
            include: {
                posts: true,
            },
        });
    }

    async remove(id: number): Promise<UserEntity> {
        return this.prisma.user.delete({
            where: {
                id: id,
            },
            include: {
                posts: true,
            },
        });
    }
}
