import {opponent} from '../_lib/vars';
import tttUtils   from '../_lib/ttt-utils';

export function alphabeta(params) {
  let {grid: _grid, ch, _ch = ch, depth = 0, _alphabeta = alphabeta} = params;
  let {alpha = -Infinity, beta = Infinity, level = Infinity} = params;
  
  if(depth > level || tttUtils.isFullAndDrawn(_grid) || depth > level) {
    return depth ? 0 : {draw: true};
  }
  
  let win = tttUtils.findWin(_grid, ch);
  
  if(win) {
    return depth ? 10 - depth : {win, ch};
  }
  
  win = tttUtils.findWin(_grid, opponent[ch]);
  
  if(win) {
    return depth ? depth - 10 : {win, ch: opponent[ch]};
  }
  
  let maximizing = ch === _ch;
  let minmax = maximizing ? -Infinity : Infinity;
  let grid = _grid.slice();
  let blanks = tttUtils.blanks(_grid);
  let move;
  
  for(let cell of blanks) {
    grid[cell] = _ch;
    let score = _alphabeta({grid, ch, _ch: opponent[_ch], alpha, beta, level, _alphabeta, depth: depth + 1});
    grid[cell] = null;

    if(maximizing && score > minmax) {
      minmax = score;
      move = cell;
      alpha = Math.max(alpha, minmax);
    } else if(!maximizing && score < minmax) {
      minmax = score;
      beta = Math.min(beta, minmax);
    }

    if(beta < alpha) {
      break;
    }
  }

  if(!depth) {
    grid[move] = ch;
    move = {move, ch};
    win = tttUtils.findWin(grid, ch);
    
    if(win) {
      Object.assign(move, {win});
    }
    
    return move;
  }
  
  return minmax;
}
