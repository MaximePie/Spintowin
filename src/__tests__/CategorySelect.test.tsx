/* eslint-disable no-undef */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ObjectID, ObjectId } from 'bson';
import CategorySelect from '../components/atoms/CategorySelect';
import CategoryType from '../types/CategoryType';

function categoriesGenerator(): CategoryType[] {
  const userId = new ObjectID(ObjectId.generate());
  const categories: CategoryType[] = [];

  for (let position = 0; position < 10; position += 1) {
    categories.push({
      _id: new ObjectID(ObjectId.generate()),
      creatorId: userId,
      title: 'ABCDEFGHIJKLMOP'.split('')[position],
    });
  }

  return categories;
}

test('Category Select is warninged when no value is selected', () => {
  const emptyFunction = () => {};

  const category = render(<CategorySelect
    onSelect={emptyFunction}
    onSelectMultiple={emptyFunction}
    value=""
    variant="creatable"
  />);

  expect(category.container.firstChild).toHaveClass('CategorySelect--warning');
});
