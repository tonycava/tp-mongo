import { writable } from 'svelte/store';
import type { User } from '@models/payload';

export const user = writable<User | null>(null)