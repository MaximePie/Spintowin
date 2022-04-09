import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import CategoryType from '../../types/CategoryType';
import { getFromServer, postOnServer } from '../../services/server';

export default function CategorySelect() {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(fetchCategories, []);

  return (
    <div className="CategorySelect">
      <CreatableSelect
        options={categories}
        onCreateOption={createCategory}
      />
    </div>
  );

  /**
   * Fetch categories list from the server
   */
  function fetchCategories(): void {
    getFromServer('/userCards/categories').then(({ data }) => {
      if (data) {
        const formatedData = data.map(
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
