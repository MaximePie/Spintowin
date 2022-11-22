import { render } from '@testing-library/react';
import React from 'react';
import CategorySelect from '../components/atoms/CategorySelect';

test('Cards', () => {
  const emptyFunction = () => {};

  const category = render(<CategorySelect
    onSelect={emptyFunction}
    onSelectMultiple={emptyFunction}
    value=""
    variant="creatable"
  />);

  expect(category.container.firstChild).toHaveClass('CategorySelect--warning');
});
