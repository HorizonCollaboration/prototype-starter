// Fixed by Horizon: don't change this file.
import { useEffect, useState } from 'react';
import horizon from './horizon.json';

/**
 * Like useState, but kept in this browser so it's still there next time.
 * Each prototype keeps its own, separate from other prototypes.
 */
export function useStoredState(key, initialValue) {
    const storageKey = `horizon:${horizon.id}:${key}`;
    const [value, setValue] = useState(() => {
        try {
            const stored = window.localStorage.getItem(storageKey);

            return stored === null ? initialValue : JSON.parse(stored);
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(storageKey, JSON.stringify(value));
        } catch {
            // Storage can be full or switched off; the prototype still works for this visit.
        }
    }, [storageKey, value]);

    return [value, setValue];
}
