import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { UnauthorizedError } from 'src/common/errors/types/UnauthorizedError';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UsersRepository) {}

    private readonly ERROR_USER_NOT_FOUND: string = 'Usuário não encontrado';

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.userRepository.create(createUserDto);
    }

    async findAll(): Promise<UserEntity[]> {
        //throw new UnauthorizedError('Não autorizado');
        return this.userRepository.findAll();
    }

    async findOne(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne(id);

        if (!user) {
            throw new NotFoundError(this.ERROR_USER_NOT_FOUND);
        }

        return user;
    }

    async update(
        id: number,
        updateUserDto: UpdateUserDto,
    ): Promise<UserEntity> {
        return this.userRepository.update(id, updateUserDto);
    }

    async remove(id: number): Promise<UserEntity> {
        return this.userRepository.remove(id);
    }
}
