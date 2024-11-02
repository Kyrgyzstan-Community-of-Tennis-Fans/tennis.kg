import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  placeholder?: string;
}

const FileInput: React.FC<Props> = ({ onChange, name, placeholder }) => {
  const [fileName, setFileName] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }

    onChange(e);
  };

  return (
    <>
      <input type='file' name={name} style={{ display: 'none' }} ref={inputRef} onChange={onFileChange} />
      <div className='flex items-center col-span-3'>
        <Input readOnly value={fileName} onClick={activateInput} placeholder={placeholder} className='mr-2' />
        <Button onClick={activateInput} variant='outline'>
          Выбрать
        </Button>
      </div>
    </>
  );
};

export default FileInput;
