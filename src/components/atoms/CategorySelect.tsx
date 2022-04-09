import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select, { OnChangeValue, ActionMeta, MultiValue } from 'react-select';
import CategoryType from '../../types/CategoryType';
import { getFromServer, postOnServer } from '../../services/server';

type formatedCategoryType = {
  label: string,
  value: string,
}

interface CategorySelectProps {
  onSelect: (
    // eslint-disable-next-line no-unused-vars
    newValue: OnChangeValue<formatedCategoryType, false>,
    // eslint-disable-next-line no-unused-vars
    actionMeta: ActionMeta<formatedCategoryType>
  ) => void | null,
  variant: 'creatable' | 'multi',
  onSelectMultiple: (
    // eslint-disable-next-line no-unused-vars
    newValue: MultiValue<formatedCategoryType>,
    // eslint-disable-next-line no-unused-vars
    actionMeta: ActionMeta<formatedCategoryType>
  )
    => void | null
}

export default function CategorySelect(
  { onSelect, variant, onSelectMultiple }: CategorySelectProps,
) {
  const [categories, setCategories] = useState<formatedCategoryType[]>([]);

  useEffect(fetchCategories, []);

  return (
    <div className="CategorySelect">
      {variant === 'creatable' && (
        <CreatableSelect
          options={categories}
          onCreateOption={createCategory}
          onChange={onSelect}
        />
      )}

      {variant === 'multi' && (
        <Select
          isMulti
          options={categories}
          onChange={onSelectMultiple}
        />
      )}
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
