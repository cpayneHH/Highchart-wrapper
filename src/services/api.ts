// src/services/api.ts
import type { APIResponse } from '../types';

export async function fetchItems(endpoint: string): Promise<APIResponse[]> {
    const res = await fetch(endpoint);

    if (!res.ok) {
        throw new Error(`API fetch failed with status ${res.status}`);
    }

    const json = await res.json();
    return json as APIResponse[];
}
