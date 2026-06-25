import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AttachmentFactory } from '@test/factories/make-attachments';
import { QuestionFactory } from '@test/factories/make-question';
import { StudentFactory } from '@test/factories/make-student';
import request from 'supertest';
import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/prisma/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Answer question (E2E)', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let prisma: PrismaService;
  let studentFactory: StudentFactory;
  let questionFactory: QuestionFactory;
  let attachmentFactory: AttachmentFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, AttachmentFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    prisma = moduleRef.get(PrismaService);
    studentFactory = moduleRef.get(StudentFactory);
    questionFactory = moduleRef.get(QuestionFactory);
    attachmentFactory = moduleRef.get(AttachmentFactory);

    await app.init();
  });

  test('[POST] /questions/:questionId/answers', async () => {
    const user = await studentFactory.makePrismaStudent();

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    });

    const questionId = question.id.toString();

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const attachment1 = await attachmentFactory.makePrismaAttachment();
    const attachment2 = await attachmentFactory.makePrismaAttachment();

    const response = await request(app.getHttpServer())
      .post(`/questions/${questionId}/answers`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'New content',
        attachments: [attachment1.id.toString(), attachment2.id.toString()],
      });

    expect(response.statusCode).toBe(201);

    const answerOnDatabase = await prisma.answer.findFirst({
      where: {
        content: 'New content',
      },
    });

    expect(answerOnDatabase).toBeTruthy();

    const attachmentOnDatabase = await prisma.attachment.findMany({
      where: {
        answerId: answerOnDatabase?.id,
      },
    });

    expect(attachmentOnDatabase).toHaveLength(2);
    expect(attachmentOnDatabase).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: attachment1.id.toString(),
        }),
        expect.objectContaining({
          id: attachment2.id.toString(),
        }),
      ]),
    );
  });
});
