import { Session } from '@supabase/supabase-js';
import { atom } from 'jotai';

export const authStore = atom<Session>();
