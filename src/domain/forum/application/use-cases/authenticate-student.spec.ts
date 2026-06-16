import { FakerEncrypter } from '@test/cryptography/fake-encrypter';
import { FakerHasher } from '@test/cryptography/fake-hasher';
import { makeStudent } from '@test/factories/make-student';
import { InMemoryStudentsRepository } from '@test/repositories/in-memory-students-repository';
import { AuthenticateStudentUseCase } from './authenticate-student';

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let fakeHasher: FakerHasher;
let fakeEncrypter: FakerEncrypter;

let sut: AuthenticateStudentUseCase;

describe('Authenticate Student', () => {
  beforeEach(() => {
    fakeHasher = new FakerHasher();
    fakeEncrypter = new FakerEncrypter();
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    sut = new AuthenticateStudentUseCase(inMemoryStudentsRepository, fakeHasher, fakeEncrypter);
  });

  it('should be able to authenticate a student', async () => {
    const student = makeStudent({
      email: 'jonhdoe@example.com',
      password: await fakeHasher.hash('123456'),
    });

    inMemoryStudentsRepository.create(student);

    const result = await sut.execute({
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });
});
