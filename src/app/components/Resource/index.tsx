import React, { Fragment, FC } from 'react';
import { Link } from 'react-router-dom';
import { img_locker } from 'assets/images';
import RoutesTypes from 'types/Routes';
import { useStorage } from 'hook/useStorage';
import Rate from 'antd/lib/rate';

interface IResource {
  resource: ENTITIES.Resource;
  openManageResource(resource: ENTITIES.Resource);
}

export const Resource: FC<IResource> = props => {
  const { resource, openManageResource } = props;
  const imageResource = useStorage(`resources/${resource.picture_name}`);

  return (
    <Fragment>
      <div className="media media-locker-item">
        <div className="locker-image">
          <img alt="user image" src={imageResource} width={125} height={100} />
          <div className="image-caption">
            <Link to={RoutesTypes.PRODUCT}>Path</Link>
          </div>
        </div>
        <div className="locker-information">
          <div className="title">{resource.name}</div>
          <div className="match">
            <p>{resource.match_score} % match</p>
          </div>
          <div className="review">
            {resource.rating > 0 ? (
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
            openManageResource(resource);
          }}
          className="btn btn-resource"
        >
          Manage Resource
        </a>
      </div>
    </Fragment>
  );
};
