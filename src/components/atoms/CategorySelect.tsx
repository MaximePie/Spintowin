import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select, {
  OnChangeValue, ActionMeta, MultiValue,
} from 'react-select';
import classNames from 'classnames';
import CategoryType from '../../types/CategoryType';
import { getFromServer, postOnServer } from '../../services/server';

type formatedCategoryType = {
  label: string,
  value: string,
}

type CategorySelectProps = {
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
    => void | null,
  value: string | null
}

export default function CategorySelect(
  {
    onSelect, variant, onSelectMultiple, value,
  }: CategorySelectProps,
) {
  const [categories, setCategories] = useState<formatedCategoryType[]>([]);

  const classnames = classNames('CategorySelect', {
    'CategorySelect--warning': !value,
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchCategories();
    }
    return () => { isMounted = false; };
  }, []);

  return (
    <div className={classnames}>
      {variant === 'creatable' && (
        <CreatableSelect
          classNamePrefix="CategorySelect__select"
          options={categories}
          onCreateOption={createCategory}
          onChange={onSelect}
          value={defaultValue()}
          placeholder="Catégorie"
        />
      )}

      {variant === 'multi' && (
        <Select
          isMulti
          options={categories}
          placeholder="Catégorie"
          onChange={onSelectMultiple}
        />
      )}
    </div>
  );

  /**
   * Return the formated default value based on categories
   */
  function defaultValue() {
    if (categories?.length) {
      return categories.find(
        (inspectedCategory) => inspectedCategory.value === value,
      );
    }
    return null;
  }

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
