import { normalizedString } from '../card';

describe('card-relative-tests', () => {
  it('Should run', () => {
    expect(1).toBe(1);
  });

  it('Should normalize the provided answers', () => {
    const answers = [
      'haha',
      'hoho',
      'héhé',
      'héhè ',
      ' héhé ',
      ' ha hà ',
      ' hô hà ',
      ' hô hà ?',
      ' hô hà = ?',
      'thắng',
      'le héhé',
      'la haha',
      'uN hoho',
    ];
    const normalizedAnswers = answers.map((answer) => normalizedString(answer));
    expect(normalizedAnswers).toEqual([
      'haha',
      'hoho',
      'hehe',
      'hehe',
      'hehe',
      'haha',
      'hoha',
      'hoha',
      'hoha',
      'thang',
      'hehe',
      'haha',
      'hoho',
    ]);
  });
});
