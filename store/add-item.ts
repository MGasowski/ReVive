import { atom } from 'jotai';
import * as Location from 'expo-location';
import { ImagePickerAsset } from 'expo-image-picker';

// Define initial states for clarity
const initialName = '';
const initialDescription = '';
const initialImage: ImagePickerAsset | null = null;
const initialReservable = false;
const initialLocation: Location.LocationObject | null = null;

// Atoms for each field
export const nameAtom = atom<string>(initialName);
export const descriptionAtom = atom<string>(initialDescription);
export const imageAtom = atom<ImagePickerAsset | null>(initialImage);
export const reservableAtom = atom<boolean>(initialReservable);
export const locationAtom = atom<Location.LocationObject | null>(initialLocation);
export const addressAtom = atom<string | null>(null);

// Clear handler atom: Action atom to reset all states
export const clearStoreAtom = atom(null, (get, set) => {
  set(nameAtom, initialName);
  set(descriptionAtom, initialDescription);
  set(imageAtom, initialImage);
  set(reservableAtom, initialReservable);
  set(locationAtom, initialLocation);
  set(addressAtom, null);
});
