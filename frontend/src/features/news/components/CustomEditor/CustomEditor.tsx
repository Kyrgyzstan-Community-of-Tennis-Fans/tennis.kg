import { forwardRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './customEditor.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const CustomEditor = forwardRef<ReactQuill, Props>(({ value, onChange }, ref) => {
  const toolbarOptions = [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
  ];

  return (
    <ReactQuill
      ref={ref}
      value={value}
      onChange={onChange}
      modules={{
        toolbar: toolbarOptions,
      }}
      placeholder='Содержание новости...'
      className='custom-editor'
    />
  );
});

export default CustomEditor;
