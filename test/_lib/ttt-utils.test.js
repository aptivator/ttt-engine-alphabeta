import {expect} from 'chai';
import tttUtils from '../../src/_lib/ttt-utils';

describe('tic-tac-toe utilities library', () => {
  it('assembles all blank cell ids', () => {
    let grid = [
      'x', 'o', null,
      'o', 'x', null,
      null, null, 'o'
    ];
    
    let blanks = tttUtils.blanks(grid);
    expect(blanks).to.deep.equal([2, 5, 6, 7]);
  });
  
  it('finds a win', () => {
    let grid = [
      'x', 'o', null,
      'o', 'x', null,
      'o', null, 'x'
    ];
    
    let win = tttUtils.findWin(grid, 'x');
    expect(win).to.deep.equal([0, 4, 8]);
  });
  
  it('determines if a grid is full and drawn', () => {
    let grid = [
      'x', 'o', 'x',
      'o', 'o', 'x',
      'x', 'x', 'o'
    ];
    
    let isFull = tttUtils.isFullAndDrawn(grid);
    expect(isFull).to.equal(true);
  });
  
  it('determines that a grid is not drawn if it is full and has a win', () => {
    let grid = [
      'o', 'o', 'x',
      'o', 'o', 'x',
      'x', 'x', 'o'
    ];    
    
    let isFull = tttUtils.isFullAndDrawn(grid);
    expect(isFull).to.equal(undefined);
  });
  
  it('converts string board into an array', () => {
    let grid = 'xo       ';
    grid = tttUtils.normalizeGrid(grid);
    expect(grid).to.deep.equal(['x', 'o', null, null, null, null, null, null, null]);
  });
  
  it('returns grid as is if it is an array already', () => {
    let grid = [
      'x', 'o', null,
      null, null, null,
      null, null, null
    ];
    
    let _grid = tttUtils.normalizeGrid(grid);
    expect(_grid).to.equal(grid);
  });
});
