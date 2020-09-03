import React, { Fragment, useEffect, FC } from 'react';
import moment from 'moment';
import _ from 'lodash';
interface IWork {
  workExperiences: ENTITIES.WorkExperience[];
  userProfile: ENTITIES.UserProfile;
}
export const Work: FC<IWork> = props => {
  const { workExperiences, userProfile } = props;
  useEffect(() => {
    var accordion = new (jQuery as any).DEVFUNC.accordion();
    accordion.handleAccordion();
    /*****Smartphone menu settings*****/
    (jQuery as any).DEVFUNC.spMenu({
      menuBtn: [
        {
          oBtn: '#btn-nav-sp a',
          target: '#sub-menu-sp',
        },
      ],
      closeBtn: '.close_btn',
      addClass: 'spmenu_open',
    });
  }, []);
  const renderDescription = (text: string) => {
    return text.split('-').map((item, index) => {
      return item !== '' ? <p key={index}>- {item}</p> : null;
    });
  };
  return (
    <Fragment>
      <div className="experiences-content">
        <div className="main-title">
          <h2> Work</h2>
          <p>Experiences</p>
        </div>
        <div className="experiences-caption">
          <p>{userProfile.about}</p>
        </div>
        <div className="accordion">
          {workExperiences.map((item, index) => {
            return (
              <Fragment>
                <div key={index} className="accordion-item active">
                  <div className="accordion-title">
                    <a href="#">{item.job_title}</a>
                  </div>
                  <div className="accordion-content">
                    <p>{item.company}</p>
                    <p>{`${item.date_start} - ${item.date_end}`}</p>
                    <p>{item.company_address}</p>
                    {renderDescription(item.description)}
                  </div>
                </div>
              </Fragment>
            );
          })}

          {/* <div className="accordion-item">
            <div className="accordion-title">
              <a href="#">Professional Experience Title and Place 2</a>
            </div>
            <div className="accordion-content">
              <p>Boston, Massachusetts</p>
              <p>Harvard Medical School • Full-time</p>
              <p>Jun 2016 – Present • 4 years 1 month</p>
            </div>
          </div>
          </div> */}
        </div>
      </div>
    </Fragment>
  );
};
