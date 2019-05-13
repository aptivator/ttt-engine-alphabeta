import {wins, opponent} from './vars';

export default {
  blanks(grid) {
    return grid.reduce((blanks, ch, index) => {
      if(!ch) {
        blanks.push(index);
      }
      
      return blanks;
    }, []);  
  },
  
  findWin(grid, ch) {
    winsLoop: for(let win of wins) {
      for(let cell of win) {
        if(grid[cell] !== ch) {
          continue winsLoop;
        }
      }
      
      return win;
    }
  },

  isFullAndDrawn(grid) {
    let blanks = this.blanks(grid);
    let [ch, _ch] = Object.keys(opponent);
    let win = this.findWin(grid, ch);
    let _win = this.findWin(grid, _ch);
    
    if(!blanks.length && !win && !_win) {
      return true;
    }
  },
  
  normalizeGrid(grid) {
    if(!Array.isArray(grid)) {
      grid = grid.split('').map(ch => ch === ' ' ? null : ch);
    }
    
    return grid;
  }
};
