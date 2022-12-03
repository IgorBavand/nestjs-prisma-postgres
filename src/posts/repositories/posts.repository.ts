import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostEntity } from '../entities/post.entity';

@Injectable()
export class PostsRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(createPostDto: CreatePostDto): Promise<PostEntity> {
        return this.prisma.post.create({
            data: createPostDto,
            include: {
                author: true,
            },
        });
    }

    async findAll(): Promise<PostEntity[]> {
        return this.prisma.post.findMany({
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }

    async findOne(id: number): Promise<PostEntity> {
        return this.prisma.post.findUnique({
            where: {
                id: id,
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }

    async update(
        id: number,
        updatePostDto: UpdatePostDto,
    ): Promise<PostEntity> {
        return this.prisma.post.update({
            where: {
                id: id,
            },
            data: updatePostDto,
            include: {
                author: true,
            },
        });
    }

    async remove(id: number): Promise<PostEntity> {
        return this.prisma.post.delete({
            where: {
                id: id,
            },
            include: {
                author: true,
            },
        });
    }
}
