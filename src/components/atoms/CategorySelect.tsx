import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { OnChangeValue, ActionMeta } from 'react-select';
import CategoryType from '../../types/CategoryType';
import { getFromServer, postOnServer } from '../../services/server';

interface CategorySelectProps {
  onSelect: (
    // eslint-disable-next-line no-unused-vars
    newValue: OnChangeValue<{ value: string, label: string }, false>,
    // eslint-disable-next-line no-unused-vars
    actionMeta: ActionMeta<formatedCategoryType>
  ) => void
}

type formatedCategoryType = {
  label: string,
  value: string,
}

export default function CategorySelect({ onSelect }: CategorySelectProps) {
  const [categories, setCategories] = useState<formatedCategoryType[]>([]);

  useEffect(fetchCategories, []);

  return (
    <div className="CategorySelect">
      <CreatableSelect
        options={categories}
        onCreateOption={createCategory}
        onChange={onSelect}
      />
    </div>
  );

  /**
   * Fetch categories list from the server
   */
  function fetchCategories(): void {
    getFromServer('/userCards/categories').then(({ data }) => {
      if (data) {
        const formatedData: formatedCategoryType[] = data.map(
          (category: CategoryType) => ({ label: category.title, value: category._id }),
        );
        setCategories(formatedData);
      }
    });
  }

  function createCategory(title: string) {
    postOnServer('/userCards/categories', { title }).then(fetchCategories);
  }
}
