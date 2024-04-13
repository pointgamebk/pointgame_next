import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ICategory } from "@/lib/database/models/category.model";
import { useEffect, useState } from "react";

import { getAllCategories } from "@/lib/actions/category.actions";

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  // useEffect(() => {
  //   const getCategories = async () => {
  //     const categoryList = await getAllCategories();

  //     categoryList && setCategories(categoryList as ICategory[]);
  //   };

  //   getCategories();
  // }, []);

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      if (categoryList) {
        const sortedCategoryList = categoryList.sort(
          (a: ICategory, b: ICategory) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          }
        );

        setCategories(sortedCategoryList as ICategory[]);
      }
    };

    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Sport" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className="select-item p-regular-14"
            >
              {category.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
