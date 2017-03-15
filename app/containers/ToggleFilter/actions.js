/*
 *
 * ToggleFilter actions
 *
 */

import { action } from 'utils/actions'

export const TOGGLE_FILTER = 'app/ToggleFilter/TOGGLE_FILTER'

export const toggleFilter = (filter) => action(TOGGLE_FILTER, { filter })
