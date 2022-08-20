import { ICtx } from 'queenjs/framework';
import { inject } from 'vue';

export function useCurrCtx() {
  return inject('QueenContext') as ICtx
}
