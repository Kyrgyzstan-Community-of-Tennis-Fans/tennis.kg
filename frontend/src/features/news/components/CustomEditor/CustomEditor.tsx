import { forwardRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const CustomEditor = forwardRef<ReactQuill, Props>(({ value, onChange }, ref) => {
  return (
    <div>
      <ReactQuill
        ref={ref}
        value={value}
        onChange={onChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
          ],
        }}
        placeholder='Содержание новости...'
      />
    </div>
  );
});

export default CustomEditor;
