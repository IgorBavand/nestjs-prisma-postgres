import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { PostsRepository } from './repositories/posts.repository';

@Injectable()
export class PostsService {
    constructor(private readonly postRepository: PostsRepository) {}

    private readonly ERROR_POST_NOT_FOUND: string = 'Post não encontrado';

    async create(createPostDto: CreatePostDto): Promise<PostEntity> {
        return this.postRepository.create(createPostDto);
    }

    async findAll(): Promise<PostEntity[]> {
        return this.postRepository.findAll();
    }

    async findOne(id: number): Promise<PostEntity> {
        return this.postRepository.findOne(id);
    }

    async update(
        id: number,
        updatePostDto: UpdatePostDto,
    ): Promise<PostEntity> {
        return this.postRepository.update(id, updatePostDto);
    }

    async remove(id: number): Promise<PostEntity> {
        return this.postRepository.remove(id);
    }
}
