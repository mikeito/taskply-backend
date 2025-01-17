import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';
import { Priorities, Status, Task, User } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateTaskDto, user: User) : Promise<Task> {
    const {
      title,
      description,
      status,
      priority,
      deadline
    } = dto

    const task = await this.prisma.task.create({
      data: {
        title: title,
        description: description,
        status: status as Status,
        priority: priority as Priorities,
        deadline: deadline,
        creatorId: user.id
      },
    })

     return task;
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(id: number, dto: UpdateTaskDto, user: User) {
    const {
      title,
      description,
      status,
      priority,
      deadline
    } = dto

    const updateUser = await this.prisma.task.update({
      where: {
        id,
      },
      data: {
        title: title,
        description: description,
        status: status as Status,
        priority: priority as Priorities,
        deadline: deadline,
        creatorId: user.id
      },
    })
  }

  async remove(id: number): Promise<void> {
    const deleteUser = await this.prisma.task.delete({
      where: {
        id
      },
    })
  }
}
