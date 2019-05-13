import {expect} from 'chai';
import {ttt}    from '../src';

describe('ttt() engine wrapper', () => {
  it('converts a string grid and produces an optimal move', () => {
    let grid = 'o        ';
    let move = ttt(grid, 'x');
    expect(move).to.deep.equal({move: 4, ch: 'x'});
  });
});
