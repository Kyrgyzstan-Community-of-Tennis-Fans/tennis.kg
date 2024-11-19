import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label?: string;
  multiple?: boolean;
  id?: string
}

const FileInput: React.FC<Props> = ({ onChange, name, label, multiple = false }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState<string | string[]>('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (multiple) {
        const filesArray = Array.from(e.target.files).map((file) => file.name);
        setFilename(filesArray);
      } else {
        setFilename(e.target.files[0].name);
      }
    } else {
      setFilename('');
    }

    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className='flex flex-col space-y-2'>
      <Label htmlFor={name}>{label}</Label>
      <input style={{ display: 'none' }} type='file' name={name} onChange={onFileChange} ref={inputRef} />
      <div className='flex items-center space-x-2'>
        <Input
          disabled
          value={Array.isArray(filename) ? filename.join(', ') : filename}
          placeholder='Выберите файл'
          onClick={activateInput}
          className='cursor-pointer'
        />
        <Button onClick={activateInput} type='button'>
          Выбрать
        </Button>
      </div>
    </div>
  );
};

export default FileInput;
