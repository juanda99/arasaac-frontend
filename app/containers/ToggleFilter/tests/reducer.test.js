import expect from 'expect';
import toggleFilterReducer from '../reducer';
import { fromJS } from 'immutable';

describe('toggleFilterReducer', () => {
  it('returns the initial state', () => {
    expect(toggleFilterReducer(undefined, {})).toEqual(fromJS({}));
  });
});
