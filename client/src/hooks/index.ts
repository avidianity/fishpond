import { useEffect } from 'react';

export function useService<T>(service: { getInstance(): T }) {
    return service.getInstance();
}

export function useScrollToTop() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
}
