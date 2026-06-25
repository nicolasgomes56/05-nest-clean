import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { QuestionFactory } from '@test/factories/make-question';
import { QuestionCommentFactory } from '@test/factories/make-question-comment';
import { StudentFactory } from '@test/factories/make-student';
import request from 'supertest';
import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/prisma/database.module';

describe('Fetch question comments (E2E)', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let studentFactory: StudentFactory;
  let questionFactory: QuestionFactory;
  let questionCommentsFactory: QuestionCommentFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, QuestionCommentFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    studentFactory = moduleRef.get(StudentFactory);
    questionFactory = moduleRef.get(QuestionFactory);
    questionCommentsFactory = moduleRef.get(QuestionCommentFactory);

    await app.init();
  });

  test('[GET] /questions/:questionId/comments', async () => {
    const user = await studentFactory.makePrismaStudent({
      name: 'John Doe',
    });

    const accessToken = jwt.sign({ sub: user.id.toString() });

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    });

    await Promise.all([
      questionCommentsFactory.makePrismaQuestionComment({
        authorId: user.id,
        questionId: question.id,
        content: 'Comment 1',
      }),
      questionCommentsFactory.makePrismaQuestionComment({
        authorId: user.id,
        questionId: question.id,
        content: 'Comment 2',
      }),
    ]);

    const questionId = question.id.toString();

    const response = await request(app.getHttpServer())
      .get(`/questions/${questionId}/comments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      comments: expect.arrayContaining([
        expect.objectContaining({
          content: 'Comment 1',
          authorName: 'John Doe',
        }),
        expect.objectContaining({
          content: 'Comment 2',
          authorName: 'John Doe',
        }),
      ]),
    });
  });
});
