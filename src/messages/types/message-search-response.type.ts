import { MessageSearchBody } from './message-search-body.type';

export interface MessageSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: MessageSearchBody;
    }>;
  };
}
