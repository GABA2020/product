import React, { Fragment, FC, useEffect } from 'react';
interface IEducation {
  educations: ENTITIES.Education[];
}
export const Education: FC<IEducation> = props => {
  const { educations } = props;
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
  return (
    <Fragment>
      <div className="experiences-content">
        <div className="main-title">
          <h2>Education</h2>
        </div>
        <div className="accordion">
          {educations.map((item, index) => {
            return (
              <Fragment>
                <div key={index} className="accordion-item active">
                  <div className="accordion-title">
                    <a href="#">{`${item.degree_type} in ${item.major}`}</a>
                  </div>
                  <div className="accordion-content">
                    <p>{item.school}</p>
                    <p>{item.school_address}</p>
                    <p>{`${item.date_start} - ${item.date_end}`}</p>
                    <p>{item.honors}</p>
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
          </div> */}
        </div>
      </div>
    </Fragment>
  );
};
