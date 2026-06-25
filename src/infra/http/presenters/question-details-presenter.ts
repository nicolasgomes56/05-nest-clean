import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details';
import { AttachmentPresenter } from './attachment-presenter';

export class QuestionDetailsPresenter {
  static present(questionDetails: QuestionDetails) {
    return {
      questionId: questionDetails.questionId.toString(),
      authorId: questionDetails.authorId.toString(),
      bestAnswerId: questionDetails.bestAnswerId?.toString(),
      author: questionDetails.author,
      title: questionDetails.title,
      slug: questionDetails.slug.value,
      content: questionDetails.content,
      attachments: questionDetails.attachments.map(AttachmentPresenter.present),
      createdAt: questionDetails.createdAt,
      updatedAt: questionDetails.updatedAt,
    };
  }
}
