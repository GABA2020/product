import React, { Fragment, FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { img_locker } from 'assets/images';
import { useStorage } from 'hook/useStorage';
import Rate from 'antd/lib/rate';
import { useResource } from 'hook/useResource';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { DELETE_FROM_LOCKER } from 'service/mutations';
import { Context } from 'app/globalContext/GlobalContext';

interface IResource {
  userResources: ENTITIES.UserResourceLocker;
  refetch: Function;
  owner: Boolean;
}
const ResourceImage: any = styled.img`
  max-height: 50px;
  max-width: 130px;
  width: auto;
  object-fit: contain;
`;

export const Resource: FC<IResource> = props => {
  const {
    state: { user },
  } = useContext(Context);
  const { userResources, refetch, owner } = props;
  const [removeFromLocker] = useMutation(DELETE_FROM_LOCKER);
  const resource = useResource(userResources.resource_id);
  const imageResource = useStorage(
    `resources/${
      resource && resource.picture_name !== '' ? resource.picture_name : ''
    }`,
  );

  return (
    <Fragment>
      <div className="media media-locker-item">
        <div>
          <ResourceImage
            src={imageResource ? imageResource : img_locker}
          ></ResourceImage>
        </div>
        <div className="locker-information">
          <div className="title">
            <NavLink to={`/product-page/${userResources.resource_id}`}>
              {resource && resource.name}
            </NavLink>
          </div>
          <div className="match">
            {/* <p>{userResources.match_score} % match</p> */}
            <p></p>
          </div>
          <div className="review">
            {resource && resource.rating > 0 ? (
              <div className="vote-star">
                <Rate disabled defaultValue={resource.rating}></Rate>
              </div>
            ) : (
              <p>No review</p>
            )}
          </div>
        </div>
      </div>
      {owner && (
        <div className="locker-button">
          <a
            href="#"
            onClick={async e => {
              e.preventDefault();

              await removeFromLocker({
                variables: {
                  user_id: user.email,
                  resource_id: userResources.resource_id,
                },
              });
              refetch();
            }}
            className="btn btn-resource"
          >
            Remove from Locker
          </a>
        </div>
      )}
    </Fragment>
  );
};
