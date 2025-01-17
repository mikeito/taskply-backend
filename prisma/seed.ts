import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create some users
  const user1 = await prisma.user.create({
    data: {
      email: 'admin@gmail.com',
      password: 'admin123',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user@gmail.com',
      password: 'password123',
    },
  });

  console.log('Users created:', { user1, user2 });

  // Create tasks for user1
  const tasks = await prisma.task.createMany({
    data: [
      {
        title: 'Complete Project Report',
        description: 'Prepare the final project report for submission.',
        status: 'PENDING',
        // priority: 'MEDIUM',
        deadline: new Date('2025-01-30T12:00:00Z'),
        creatorId: user1.id,
      },
      {
        title: 'Team Meeting',
        description: 'Discuss project milestones and deliverables.',
        status: 'PENDING',
        // priority: 'MEDIUM',
        deadline: new Date('2025-01-20T10:00:00Z'),
        creatorId: user1.id,
      },
    ],
  });

  console.log('Tasks created for user1:', tasks);

  // Create tasks for user2
  const task2 = await prisma.task.create({
    data: {
      title: 'Code Review',
      description: 'Review code for the latest pull requests.',
    //   status: 'PENDING',
    //   priority: '',
      deadline: new Date('2025-01-25T14:00:00Z'),
      creator: {
        connect: {
          id: user2.id,
        },
      },
    },
  });

  console.log('Task created for user2:', task2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
