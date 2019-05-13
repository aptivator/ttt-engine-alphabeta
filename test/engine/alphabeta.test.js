import {expect}    from 'chai';
import sinon       from 'sinon';
import {alphabeta} from '../../src/engine/alphabeta';

describe('aphabeta() engine', () => {
  it('diagnoses a submitted draw', () => {
    let grid = [
      'x', 'o', 'x',
      'x', 'x', 'o',
      'o', 'x', 'o'
    ];
    
    let move = alphabeta({grid, ch: 'x'});
    expect(move).to.deep.equal({draw: true});
  });
  
  it('determines a submitted win', () => {
    let grid = [
      'x', 'o', 'o',
      'x', 'x', 'o',
      'o', 'x', 'x'
    ];
    
    let move = alphabeta({grid, ch: 'x'});
    expect(move).to.deep.equal({win: [0, 4, 8], ch: 'x'});
  });
  
  it('finds a win by an opponent', () => {
    let grid = [
      'x', 'o', 'o',
      'x', 'x', 'o',
      'o', 'x', 'x'
    ];
    
    let move = alphabeta({grid, ch: 'o'});
    expect(move).to.deep.equal({win: [0, 4, 8], ch: 'x'});
  });
  
  it('finds a winning move and returns a win', () => {
    let grid = [
      'x', 'o', 'o',
      'x', 'x', 'o',
      'o', 'x', null    
    ];
    
    let move = alphabeta({grid, ch: 'x'});
    expect(move).to.deep.equal({move: 8, ch: 'x', win: [0, 4, 8]});
  });
  
  it('finds an optimal move when playing perfect', () => {
    let grid = [
      'x', null, null,
      null, null, null,
      null, null, null
    ];
    
    let move = alphabeta({grid, ch: 'o'});
    expect(move).to.deep.equal({move: 4, ch: 'o'});
  });
  
  it(`does not find an optimal move when set to be 'dumb'`, () => {
    let grid = [
      'x', null, null,
      null, null, null,
      null, null, null
    ];
    
    let move = alphabeta({grid, ch: 'o', level: 0});
    expect(move).to.deep.equal({move: 1, ch: 'o'});
  });
  
  it('is called fewer times for a similar board compared to naive minimax()', () => {
    let _alphabeta = sinon.spy(alphabeta);
    let grid = [
      null, null, null,
      null, null, null,
      null, null, null
    ];
    
    _alphabeta({grid, ch: 'x', _alphabeta});
    expect(_alphabeta.callCount).to.be.below(500000);
  }).timeout(15000);
});
