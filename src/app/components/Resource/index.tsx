import React, { Fragment, FC } from 'react';
import { Link } from 'react-router-dom';
import { img_locker } from 'assets/images';
import RoutesTypes from 'types/Routes';
import { useStorage } from 'hook/useStorage';
import Rate from 'antd/lib/rate';
import { useResource } from 'hook/useResource';

interface IResource {
  userResources: ENTITIES.UserResource;
  openManageResource(userResources: ENTITIES.UserResource);
}

export const Resource: FC<IResource> = props => {
  const { userResources, openManageResource } = props;

  const resource = useResource(userResources.resource_id);
  const imageResource = useStorage(
    `resources/${
      resource && resource.picture_name !== '' ? resource.picture_name : ''
    }`,
  );

  return (
    <Fragment>
      <div className="media media-locker-item">
        <div className="locker-image">
          <img
            alt="user image"
            src={imageResource ? imageResource : img_locker}
            width={125}
            height={100}
          />
          <div className="image-caption">
            {/* <Link to={RoutesTypes.PRODUCT}>Path</Link> */}
            <Link to={RoutesTypes.PRODUCT}></Link>
          </div>
        </div>
        <div className="locker-information">
          <div className="title">{resource && resource.name}</div>
          <div className="match">
            {/* <p>{userResources.match_score} % match</p> */}
            <p>% match</p>
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
      <div className="locker-button">
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            openManageResource(userResources);
          }}
          className="btn btn-resource"
        >
          Manage Resource
        </a>
      </div>
    </Fragment>
  );
};
