import { combineReducers } from 'redux';

import authStateReducer from './authState/authStateReducer';
import userinfoReducer from './userinfoState/userinfoReducer';
import userPreferenceReduer from './userPreference/userPreferenceReducer';
import appinfoReducer from './appinfoState/appinfoReducer';
import groupinfoReducer from './groupinfoState/groupinfoReducer';
import contactInfoReducer from './contactInfoState/contactInfoReducer';
import serviceinfoReducer from './serviceinfoState/serviceinfoReducer';

const rootReducer = combineReducers({
  authState: authStateReducer,
  userinfo: userinfoReducer,
  userPreference: userPreferenceReduer,
  appinfo: appinfoReducer,
  groupinfo: groupinfoReducer,
  contactInfo: contactInfoReducer,
  serviceinfo: serviceinfoReducer,
});

export default rootReducer;
