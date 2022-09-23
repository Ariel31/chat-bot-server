import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { MessageSearchResult } from './types/message-search-response.type';
import { MessageSearchBody } from './types/message-search-body.type';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export default class MessagesSearchService {
  index = 'messages';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexAnswer(message: MessageSearchBody) {
    const { answer, downvotes, upvotes, id, question } = message;
    return this.elasticsearchService.index<MessageSearchBody>({
      index: this.index,
      refresh: true,
      document: {
        id,
        downvotes,
        upvotes,
        answer,
        question,
      },
    });
  }

  async update(id, updateAnswerDto: UpdateAnswerDto) {
    const script = Object.entries(updateAnswerDto).reduce(
      (result, [key, value]) => {
        return `${result} ctx._source['${key}']=${value};`;
      },
      '',
    );

    return this.elasticsearchService.updateByQuery({
      index: this.index,
      refresh: true,
      body: {
        query: {
          match: {
            id,
          },
        },
        script,
      },
    });
  }

  async search(text: string) {
    const { hits } =
      await this.elasticsearchService.search<MessageSearchResult>({
        index: this.index,
        body: {
          query: {
            multi_match: {
              type: 'most_fields',
              query: text,
              fields: ['question', 'answer'],
            },
          },
        },
      });
    const matches = hits.hits;
    return matches.map((item) => item._source);
  }
}
