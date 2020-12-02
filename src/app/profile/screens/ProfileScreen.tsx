import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useInjectSaga } from 'utils/redux-injectors';
import {
  actions as userActions,
  sliceKey as userSliceKey,
} from 'redux/User/slice';
import {
  actions as programActions,
  sliceKey as programSliceKey,
} from 'redux/Program/slice';
import {
  actions as storageActions,
  sliceKey as storageSliceKey,
} from 'redux/Storage/slice';
import { UserSaga } from 'redux/User/saga';
import { ProgramSaga } from 'redux/Program/saga';
import { StorageSaga } from 'redux/Storage/saga';
import { Locker } from '../../containers/Locker';
import { CVWork } from '../../containers/CVWork';
import { useStorage } from 'hook/useStorage';
import { Score } from '../../containers/Score';
import { REF } from 'helpers/firebase.module';
import { GApageView } from 'app';
import { ProfileInfo, EditProfileModal } from '../components/profile';
import { LoaderModal } from '../../genericComponents';

export function Profile({ owner, userSearchProfile }) {
  useInjectSaga({ key: userSliceKey, saga: UserSaga });
  useInjectSaga({ key: programSliceKey, saga: ProgramSaga });
  useInjectSaga({ key: storageSliceKey, saga: StorageSaga });
  const dispatch = useDispatch();

  const [editModeState, setEditModeState] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const [
    isShowModalEditProfileState,
    setIsShowModalEditProfileState,
  ] = useState<boolean>(false);

  const image = useStorage(`${REF.avatars}/${userSearchProfile.avatar}`);
  useEffect(() => {
    setLoading(true)
    GApageView('Home');

  }, []);

  useEffect(() => {

    dispatch(
      programActions.getProgramReviewAction({ email: userSearchProfile.email }),
    );
    dispatch(userActions.getEducationsAction({ email: userSearchProfile.email }));
    setLoading(false)
  }, [userSearchProfile.email]);

  return loading ? (<LoaderModal />) : (<Fragment>

    <EditProfileModal
      isShow={isShowModalEditProfileState}
      onHide={() => {
        setIsShowModalEditProfileState(false);
      }}
    />
    <ProfileInfo
      userSearchProfile={userSearchProfile}
      image={image}
      owner={owner}
      setIsShowModalEditProfileState={setIsShowModalEditProfileState}
    />
    {/* owner profile will use userProfile */}
    {owner && <Score />}
    {/* locker */}
    <Locker email={userSearchProfile?.email} owner={owner} />
    {/* CV work */}
    {owner && <CVWork editMode={editModeState} />}
    <section className="section-milestones"></section>
  </Fragment>);
}
