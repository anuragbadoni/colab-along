import React, { ChangeEvent, useEffect } from 'react';
import qs from 'query-string';
import { useDebounceValue } from 'usehooks-ts';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

export default function SearchInput() {
  const router = useRouter();
  const [debouncedValue, setValue] = useDebounceValue('', 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: '/dashboard',
        query: {
          search: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className='w-full relative'>
      <Search className='absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
      <Input
        onChange={handleChange}
        className='w-full max-w-[516px] pl-9'
        placeholder='Search boards'
      />
    </div>
  );
}
