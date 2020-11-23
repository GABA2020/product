import React, { Fragment, FC } from 'react';
import { Link } from 'react-router-dom';
import { img_locker } from 'assets/images';
import RoutesTypes from 'types/Routes';
import { useStorage } from 'hook/useStorage';
import Rate from 'antd/lib/rate';
import { useResource } from 'hook/useResource';
import styled from 'styled-components';

interface IGuestResource {
  userResource: ENTITIES.UserResource;
}

const ResourceImage: any = styled.img`
  max-height: 50px;
  max-width: 130px;
  width: auto;
  object-fit: contain;
`;

export const GuestResource: FC<IGuestResource> = props => {
  const { userResource } = props;
  const resource = useResource(userResource.resource_id);
  const imageResource = useStorage(
    `resources/${
      resource && resource.picture_name !== '' ? resource.picture_name : ''
    }`,
  );

  return (
    <Fragment>
      <div className="media media-locker-item">
        <div className="locker-image">
          
         <ResourceImage
            src={imageResource ? imageResource : img_locker}
          ></ResourceImage>
        </div>
        <div className="locker-information">
          <div className="title">
            <Link to={`/product-page/${userResource.resource_id}`}>
              {resource && resource.name}
            </Link>
          </div>
          <div className="match">
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
    </Fragment>
  );
};
