import tttUtils    from './_lib/ttt-utils';
import {alphabeta} from './engine/alphabeta';

export function ttt(grid, ch, level = Infinity) {
  grid = tttUtils.normalizeGrid(grid);
  return alphabeta({grid, ch, level});
}
