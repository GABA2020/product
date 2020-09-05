/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';

import { InjectedReducersType } from 'utils/types/injector-typings';
import { reducer as authReducer } from 'redux/Auth/slice';
import { reducer as userReducer } from 'redux/User/slice';
import { reducer as programReducer } from 'redux/Program/slice';
import { reducer as storageReducer } from 'redux/Storage/slice';
import { reducer as lockerReducer } from 'redux/Locker/slice';
import { reducer as chatReducer } from 'redux/Chat/slice';
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  return combineReducers({
    ...injectedReducers,
    auth: authReducer,
    user: userReducer,
    program: programReducer,
    storage: storageReducer,
    locker: lockerReducer,
    chat: chatReducer,
  });
}
