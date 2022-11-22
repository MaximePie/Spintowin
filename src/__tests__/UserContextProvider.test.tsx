/* eslint-disable no-undef */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserContext, UserContextProvider } from '../contexts/user';

const expectedResult = 'haha';

function ExampleComponent() {
  return (
    <UserContext.Consumer>
      {({ selectedCategory, setSelectedCategory }) => (
        <div className="ExampleComponent">
          <p>{selectedCategory}</p>
          <button
            data-testid="button"
            type="button"
            onClick={() => setSelectedCategory(expectedResult)}
          >
            Change Selected Category
          </button>
        </div>
      )}
    </UserContext.Consumer>
  );
}

test('UserContext can modify selected category from children component', () => {
  const exampleComponent = render(
    <UserContextProvider>
      <ExampleComponent />
    </UserContextProvider>,
  );

  const componentAction = exampleComponent.getByTestId('button');

  fireEvent.click(componentAction);

  expect(screen.getByText(expectedResult));
});
