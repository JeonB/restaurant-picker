import React from 'react';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
interface GroupRadioButtonProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}
export default function GroupRadioButton({
  category,
  setCategory,
}: GroupRadioButtonProps) {
  return (
    <div className="card flex justify-content-center">
      <div className="flex flex-wrap gap-3">
        <div className="flex align-items-center">
          <RadioButton
            inputId="category0"
            name="category"
            value="올랜덤"
            onChange={(e: RadioButtonChangeEvent) => setCategory('')}
            checked={category === ''}
          />
          <label htmlFor="category0" className="ml-2">
            올랜덤
          </label>
        </div>
        <div className="flex align-items-center">
          <RadioButton
            inputId="category1"
            name="category"
            value="한식"
            onChange={(e: RadioButtonChangeEvent) => setCategory(e.value)}
            checked={category === '한식'}
          />
          <label htmlFor="category1" className="ml-2">
            한식
          </label>
        </div>
        <div className="flex align-items-center">
          <RadioButton
            inputId="category2"
            name="category"
            value="일식"
            onChange={(e: RadioButtonChangeEvent) => setCategory(e.value)}
            checked={category === '일식'}
          />
          <label htmlFor="category2" className="ml-2">
            일식
          </label>
        </div>
        <div className="flex align-items-center">
          <RadioButton
            inputId="category3"
            name="category"
            value="중식"
            onChange={(e: RadioButtonChangeEvent) => setCategory(e.value)}
            checked={category === '중식'}
          />
          <label htmlFor="category3" className="ml-2">
            중식
          </label>
        </div>
        <div className="flex align-items-center">
          <RadioButton
            inputId="category4"
            name="category"
            value="양식"
            onChange={(e: RadioButtonChangeEvent) => setCategory(e.value)}
            checked={category === '양식'}
          />
          <label htmlFor="category4" className="ml-2">
            양식
          </label>
        </div>
      </div>
    </div>
  );
}
