import intervals from '../data/cards';
import UserCard from '../types/UserCard';
import UserInterval from '../types/UserInterval';

/**
 * Remove the diacritics from a string, make it lowercase, remove all spaces and
 * remove all special characters and remove un, une, le, la, les, du, de, des, d' and l'
 * from the beginning
 * of the string
 * @param unnormalizedString - The string to normalize
 * @return {string} - The string without diacritics, lowercase and without spaces
 */
export function normalizedString(unnormalizedString: string) {
  return unnormalizedString
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .replace(/^(un|une|le|la|les|du|de|des|d'|l')/, '');
}
