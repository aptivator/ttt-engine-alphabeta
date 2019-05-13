import _        from 'lodash';
import {expect} from 'chai';
import {ttt}    from '../src';

describe('two-player game simulation', () => {
  it('perfect player beats lower-level player and perfect players draw', () => {
    let results = {
      o: {},
      x: {}
    };
    let even = _.partial(ttt, _, 'x');
    
    for(let level of [0, 9]) {
      let odd = _.partial(ttt, _, 'o', level);
      
      results.x[level] = {wins: 0};
      results.o[level] = {wins: 0};
      
      for(let game = 0; game < 5; game++) {
        let grid = [
          null, null, null,
          null, null, null,
          null, null, null
        ];
        
        for(let i = 0;; i++) {
          let player = i % 2 === 0 ? even : odd;
          var {move, ch, win, draw} = player(grid);
          
          if(draw) {
            break;
          }
          
          if(win) {
            results[ch][level].wins++;
            break;
          }
          
          grid[move] = ch;
        }
      }
    }
    
    expect(results.x[0].wins).to.be.above(results.o[0].wins);
    expect(results.x[9].wins).to.equal(0);
    expect(results.o[9].wins).to.equal(0);
  }).timeout(50000);
});
