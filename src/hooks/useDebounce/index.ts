import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

const useDebounce = (value: string, delay: number): string => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = debounce(() => {
            setDebouncedValue(value);
        }, delay);

        handler();

        return () => {
            handler.cancel();
        };
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;