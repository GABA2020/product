import React, { FC, Fragment, useState, useEffect } from 'react';
export const Volunteer = () => {
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
          <h2>Volunteer</h2>
        </div>
        <div className="accordion">
          <div className="accordion-item active">
            <div className="accordion-title">
              <a href="#">Medical Student111</a>
            </div>
            <div className="accordion-content">
              <p>Harvard Medical School • Full-time</p>
              <p>Jun 2016 – Present • 4 years 1 month</p>
              <p>Boston, Massachusetts</p>
            </div>
          </div>
          <div className="accordion-item">
            <div className="accordion-title">
              <a href="#">Professional Experience Title and Place 2</a>
            </div>
            <div className="accordion-content">
              <p>Boston, Massachusetts</p>
              <p>Harvard Medical School • Full-time</p>
              <p>Jun 2016 – Present • 4 years 1 month</p>
            </div>
          </div>
          <div className="accordion-item">
            <div className="accordion-title">
              <a href="#">Professional Experience Title and Place 3</a>
            </div>
            <div className="accordion-content">
              <p>Boston, Massachusetts</p>
              <p>Harvard Medical School • Full-time</p>
              <p>Jun 2016 – Present • 4 years 1 month</p>
            </div>
          </div>
          <div className="accordion-item">
            <div className="accordion-title">
              <a href="#">Professional Experience Title and Place 4</a>
            </div>
            <div className="accordion-content">
              <p>Boston, Massachusetts</p>
              <p>Harvard Medical School • Full-time</p>
              <p>Jun 2016 – Present • 4 years 1 month</p>
            </div>
          </div>
          <div className="accordion-item">
            <div className="accordion-title">
              <a href="#">Professional Experience Title and Place 5</a>
            </div>
            <div className="accordion-content">
              <p>Boston, Massachusetts</p>
              <p>Harvard Medical School • Full-time</p>
              <p>Jun 2016 – Present • 4 years 1 month</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
