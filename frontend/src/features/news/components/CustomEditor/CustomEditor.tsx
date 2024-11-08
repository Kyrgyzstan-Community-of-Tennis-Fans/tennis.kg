import ReactQuill from 'react-quill-new';
import { forwardRef, useEffect } from 'react';
import 'react-quill-new/dist/quill.snow.css';

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

  useEffect(() => {
    // bug in quill editor with word-wrap problem(it is solution)
    const qlEditor = document.querySelector('.ql-editor');
    if (qlEditor) {
      (qlEditor as HTMLElement).style.wordWrap = 'anywhere';
    }
  }, []);

  return (
    <ReactQuill
      ref={ref}
      value={value}
      onChange={onChange}
      modules={{
        toolbar: toolbarOptions,
      }}
      placeholder='Содержание новости...'
      className='max-h-[500px] h-[200px] overflow-y-auto'
    />
  );
});

export default CustomEditor;
