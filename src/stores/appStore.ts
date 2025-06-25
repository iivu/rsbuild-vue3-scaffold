import { defineStore } from 'pinia';
import { getPageURL} from '@iivu/utils';

import * as api from '@/services/api';
import * as t from '@/types';

type State = {};

type Actions = {};

type Getters = {};

export const useAppStore = defineStore<'appStore', State, Getters, Actions>('appStore', {
  state: () => ({}),
  actions: {},
  getters: {},
});
