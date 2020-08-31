import React, { Fragment, FC } from 'react';
import { Link } from 'react-router-dom';
import { img_locker } from 'assets/images';
import RoutesTypes from 'types/Routes';
import { useStorage } from 'hook/useStorage';
import Rate from 'antd/lib/rate';
interface IResource {
  resource: ENTITIES.Resource;
}
export const GuestResource: FC<IResource> = props => {
  const { resource } = props;
  const image = useStorage(`resources/${resource.picture_name}`);

  return (
    <Fragment>
      <div className="media media-locker-item">
        <div className="locker-image">
          <img alt="user image" src={image} width={125} height={100} />
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
    </Fragment>
  );
};
