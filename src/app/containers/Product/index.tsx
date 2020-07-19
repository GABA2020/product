import React, { Fragment } from 'react';
import { img_board } from '../../../assets/images';

export const Product = () => {
  return (
    <Fragment>
      <section id="page_content">
        <section className="section-breadcrumb">
          <div className="container">
            <ul className="breadcrumb">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Marketplace</a>
              </li>
              <li className="active">Boards &amp; Beyond</li>
            </ul>
          </div>
        </section>
        {/*end section-breadcrumb*/}
        <section className="section-boards">
          <div className="container">
            <div className="media-boards">
              <div className="boards-images">
                <img alt="image" src={img_board} width={520} height={323} />
              </div>
              <div className="media-body">
                <h3 className="boards-title">Boards &amp; Beyond</h3>
                <div className="boards-prize">
                  <div className="boards-button">
                    <a href="#" className="btn btn-boards-match">
                      95% match
                    </a>
                  </div>
                  <div className="boards-rating">
                    <div className="vote-rating">
                      <ul className="vote-rating-list">
                        <li className="rating-item active">
                          <a href="#" className="rating-star">
                            &nbsp;
                          </a>
                        </li>
                        <li className="rating-item active">
                          <a href="#" className="rating-star">
                            &nbsp;
                          </a>
                        </li>
                        <li className="rating-item active">
                          <a href="#" className="rating-star">
                            &nbsp;
                          </a>
                        </li>
                        <li className="rating-item active">
                          <a href="#" className="rating-star">
                            &nbsp;
                          </a>
                        </li>
                        <li className="rating-item">
                          <a href="#" className="rating-star">
                            &nbsp;
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="boards-review">
                    <a href="#">
                      <span className="review-num">5,156</span> Reviews
                    </a>
                  </div>
                </div>
                {/*end boards-prize*/}
                <div className="boards-caption">
                  <p className="board-paragraph">
                    Video based service that offers classroom, clinical, and
                    board prep.
                  </p>
                  <ul className="member-check">
                    <li>
                      <div className="checkbox__styled">
                        <input
                          type="checkbox"
                          className="checkbox__styled__input"
                          id="members-1"
                          name="checkbox"
                        />
                        <label
                          className="checkbox__styled__label"
                          htmlFor="members-1"
                        >
                          <span className="size-label">
                            95% of GABA members use this resource
                          </span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="checkbox__styled">
                        <input
                          type="checkbox"
                          className="checkbox__styled__input"
                          id="members-2"
                          name="checkbox"
                        />
                        <label
                          className="checkbox__styled__label"
                          htmlFor="members-2"
                        >
                          <span className="size-label">
                            90% of GABA members from your institution use this
                            resource
                          </span>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="checkbox__styled">
                        <input
                          type="checkbox"
                          className="checkbox__styled__input"
                          id="members-3"
                          name="checkbox"
                        />
                        <label
                          className="checkbox__styled__label"
                          htmlFor="members-3"
                        >
                          <span className="size-label">
                            235 is the average Step One score of GABA members
                          </span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
                {/*end boards-caption*/}
                <div className="boards-action">
                  <ul className="action-button">
                    <li>
                      <a href="#" className="btn btn-locker">
                        Add to Locker
                      </a>
                    </li>
                    <li>
                      <a href="#" className="btn btn-beyond">
                        <span className="icons-target">&nbsp;</span> Buy from
                        Boards &amp; Beyond
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/*end media-boards*/}
          </div>
        </section>
        {/*end section-boards*/}
        <section className="section-review">
          <div className="container">
            <div className="review-layout">
              <div className="review-slidebar">
                <div className="portlet-review">
                  <div className="review-heading">
                    Reviews
                    <h2 className="review-judge-title">Reviews</h2>
                    <div className="judge-sum">
                      <p>4.5 out of 5 stars</p>
                    </div>
                  </div>
                  {/*end judge-sum*/}
                  <div className="judge-category">
                    <div className="judge-item">
                      <div className="judge-num-star">
                        <span className="judge-num">5</span>
                        <span className="judge-star active">&nbsp;</span>
                      </div>
                      {/*end judge-num-star*/}
                      <div className="judge-progress">
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            aria-valuenow={85}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: '85%' }}
                          />
                        </div>
                      </div>
                      {/*end judge-progress*/}
                      <div className="judge-percent">
                        <span>85%</span>
                      </div>
                      {/*end judge-percent*/}
                    </div>
                    {/*end judge-item*/}
                    <div className="judge-item">
                      <div className="judge-num-star">
                        <span className="judge-num">4</span>
                        <span className="judge-star active">&nbsp;</span>
                      </div>
                      {/*end judge-num-star*/}
                      <div className="judge-progress">
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            aria-valuenow={60}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: '9%' }}
                          />
                        </div>
                      </div>
                      {/*end judge-progress*/}
                      <div className="judge-percent">
                        <span>9%</span>
                      </div>
                      {/*end judge-percent*/}
                    </div>
                    {/*end judge-item*/}
                    <div className="judge-item">
                      <div className="judge-num-star">
                        <span className="judge-num">3</span>
                        <span className="judge-star active">&nbsp;</span>
                      </div>
                      {/*end judge-num-star*/}
                      <div className="judge-progress">
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            aria-valuenow={60}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: '4%' }}
                          />
                        </div>
                      </div>
                      {/*end judge-progress*/}
                      <div className="judge-percent">
                        <span>4%</span>
                      </div>
                      {/*end judge-percent*/}
                    </div>
                    {/*end judge-item*/}
                    <div className="judge-item">
                      <div className="judge-num-star">
                        <span className="judge-num">2</span>
                        <span className="judge-star active">&nbsp;</span>
                      </div>
                      {/*end judge-num-star*/}
                      <div className="judge-progress">
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            aria-valuenow={1}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: '2%' }}
                          />
                        </div>
                      </div>
                      {/*end judge-progress*/}
                      <div className="judge-percent">
                        <span>1%</span>
                      </div>
                      {/*end judge-percent*/}
                    </div>
                    {/*end judge-item*/}
                    <div className="judge-item">
                      <div className="judge-num-star">
                        <span className="judge-num">1</span>
                        <span className="judge-star active">&nbsp;</span>
                      </div>
                      {/*end judge-num-star*/}
                      <div className="judge-progress">
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            aria-valuenow={1}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: '1%' }}
                          />
                        </div>
                      </div>
                      {/*end judge-progress*/}
                      <div className="judge-percent">
                        <span>1%</span>
                      </div>
                      {/*end judge-percent*/}
                    </div>
                    {/*end judge-item*/}
                  </div>
                  {/*end judge-category*/}
                </div>
                {/*end portlet-review*/}
                <div className="portlet-mention">
                  <h3 className="mention-title">See reviews that mention</h3>
                  <ul className="mention-list">
                    <li>
                      <a href="#" className="btn-mention">
                        scores improved
                      </a>
                    </li>
                    <li>
                      <a href="#" className="btn-mention">
                        boost
                      </a>
                    </li>
                    <li>
                      <a href="#" className="btn-mention">
                        cost
                      </a>
                    </li>
                    <li>
                      <a href="#" className="btn-mention">
                        schedule
                      </a>
                    </li>
                    <li>
                      <a href="#" className="btn-mention">
                        lectures
                      </a>
                    </li>
                    <li>
                      <a href="#" className="btn-mention">
                        update
                      </a>
                    </li>
                    <li>
                      <a href="#" className="btn-mention">
                        unique style
                      </a>
                    </li>
                    <li>
                      <a href="#" className="btn-mention">
                        really like
                      </a>
                    </li>
                    <li>
                      <a href="#" className="btn-mention">
                        price
                      </a>
                    </li>
                  </ul>
                </div>
                {/*end portlet-mention*/}
                <div className="portlet-filter">
                  <h3 className="mention-title">Filter by exam</h3>
                  <div className="select-box">
                    <select className="form-control">
                      <option value={0}>Select</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                    </select>
                  </div>
                </div>
                {/*end portlet-filter*/}
                <div className="portlet-filter">
                  <h3 className="mention-title">Filter by discipline</h3>
                  <div className="select-box">
                    <select className="form-control">
                      <option value={0}>Select</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                    </select>
                  </div>
                </div>
                {/*end portlet-filter*/}
                <div className="portlet-filter">
                  <h3 className="mention-title">Review this resource</h3>
                  <div className="mention-insight">
                    <p>Help other students with your insight.</p>
                  </div>
                  <div className="write-button">
                    <a href="#" className="btn btn-write-review">
                      Write a Review
                    </a>
                  </div>
                </div>
                {/*end portlet-filter*/}
              </div>
              {/*end review-slidebar*/}
              <div className="review-main">
                <div className="review-content">
                  <div className="portlet-message">
                    {/* <div className="message-item active">
                      <div className="message-box">
                        <div className="message-front">
                          <div className="message-rating">
                            <div className="vote-rating">
                              <ul className="vote-rating-list">
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="message-date">
                            <span>May 18, 2020</span>
                          </div>
                          <div className="message-type">
                            <span>Anatomy</span>
                          </div>
                        </div>
                        <div className="message-description">
                          <h4 className="message-heading">
                            dramatically improved my scores
                          </h4>
                          <p className="message-paragraph">
                            dramatically improved my scores
                          </p>
                        </div>
                        <div className="message-bellow">
                          <div className="message-action">
                            <ul className="action-update">
                              <li>
                                <a href="#" className="action-edit">
                                  <span className="icons-edit">&nbsp;</span>{' '}
                                  Edit
                                </a>
                              </li>
                              <li> |</li>
                              <li>
                                <a href="#" className="action-trash">
                                  <span className="icons-trash">&nbsp;</span>{' '}
                                  Delete
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="message-author">
                            <div className="author-descript">
                              <h4 className="author-title">
                                <a href="#">
                                  <span>@quinnthere</span>
                                </a>
                              </h4>
                              <ul className="author-link">
                                <li>
                                  <a href="#">Step One 246</a>
                                </li>
                                <li> |</li>
                                <li>
                                  <a href="#">Step Two 240</a>
                                </li>
                              </ul>
                            </div>
                            <div className="author-image">
                              <a href="#">
                                <img
                                  alt="image"
                                  src="app/images/photos/img-author-2.jpg"
                                  width={50}
                                  height={50}
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    {/*end message-item*/}
                    <div className="message-item">
                      <div className="message-box">
                        <div className="message-front">
                          <div className="message-rating">
                            <div className="vote-rating">
                              <ul className="vote-rating-list">
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="message-date">
                            <span>May 15, 2020</span>
                          </div>
                          <div className="message-type">
                            <span>Step One</span>
                          </div>
                        </div>
                        {/*end message-front*/}
                        <div className="message-description">
                          <h4 className="message-heading">
                            dude, I was almost done until I found you
                          </h4>
                          <p className="message-paragraph">
                            I live by B&amp;B! There is seriosuly nothing like
                            it!{' '}
                          </p>
                        </div>
                        {/*end message-description*/}
                        <div className="message-bellow">
                          <div className="message-action">
                            <ul className="action-enter">
                              <li>
                                <a href="#" className="btn btn-helpful">
                                  Helpful
                                </a>
                              </li>
                              <li>
                                <a href="#" className="btn btn-reply">
                                  Reply
                                </a>
                              </li>
                              <li>
                                <a href="#" className="btn-report">
                                  Report abuse
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="message-author">
                            <div className="author-descript">
                              <h4 className="author-title">
                                <a href="#">
                                  <span>@stethodope</span>
                                </a>
                              </h4>
                              <ul className="author-link">
                                <li>
                                  <a href="#">Step One 224</a>
                                </li>
                                <li> |</li>
                                <li>
                                  <a href="#">Step Two 240</a>
                                </li>
                              </ul>
                            </div>
                            <div className="author-image">
                              <img
                                alt="image"
                                src="app/images/photos/img-author-1.jpg"
                                width={50}
                                height={50}
                              />
                            </div>
                          </div>
                        </div>
                        {/*end message-bellow*/}
                      </div>
                      {/*end message-box*/}
                    </div>
                    {/*end message-item*/}
                    <div className="message-item">
                      <div className="message-box">
                        <div className="message-front">
                          <div className="message-rating">
                            <div className="vote-rating">
                              <ul className="vote-rating-list">
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="message-date">
                            <span>May 13, 2020</span>
                          </div>
                          <div className="message-type">
                            <span>Pathology</span>
                          </div>
                        </div>
                        {/*end message-front*/}
                        <div className="message-description">
                          <h4 className="message-heading">
                            awesome resource, but you’ll be paying a pretty
                            penny
                          </h4>
                          <p className="message-paragraph">
                            I love B&amp;B, but honestly it’s expensive. I agree
                            with the other reviewers here. The price could be
                            better. BUT when you’re prepping for STEP 1 you’ll
                            pay any price to get that dream score! My goal was
                            to get a 250 or above so I spared no expense.
                          </p>
                        </div>
                        {/*end message-description*/}
                        <div className="message-bellow">
                          <div className="message-action">
                            <ul className="action-enter">
                              <li>
                                <a href="#" className="btn btn-helpful">
                                  Helpful
                                </a>
                              </li>
                              <li>
                                <a href="#" className="btn btn-reply">
                                  Reply
                                </a>
                              </li>
                              <li>
                                <a href="#" className="btn-report">
                                  <span className="icons-report">&nbsp;</span>{' '}
                                  Report abuse
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="message-author">
                            <div className="author-descript">
                              <h4 className="author-title">
                                <a href="#">
                                  <span>@anotherdoc</span>
                                </a>
                              </h4>
                              <ul className="author-link">
                                <li>
                                  <a href="#">Step One 252</a>
                                </li>
                                <li> |</li>
                                <li>
                                  <a href="#">Step Two 235</a>
                                </li>
                              </ul>
                            </div>
                            <div className="author-image">
                              <img
                                alt="image"
                                src="app/images/photos/img-author-1.jpg"
                                width={50}
                                height={50}
                              />
                            </div>
                          </div>
                        </div>
                        {/*end message-bellow*/}
                      </div>
                      {/*end message-box*/}
                    </div>
                    {/*end message-item*/}
                    <div className="message-item">
                      <div className="message-box">
                        <div className="message-front">
                          <div className="message-rating">
                            <div className="vote-rating">
                              <ul className="vote-rating-list">
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="message-date">
                            <span>May 5, 2020</span>
                          </div>
                          <div className="message-type">
                            <span>Step One</span>
                          </div>
                        </div>
                        {/*end message-front*/}
                        <div className="message-description">
                          <h4 className="message-heading">
                            my first, my tried and true
                          </h4>
                          <p className="message-paragraph">
                            {' '}
                            used B&amp;B mostly for STEP 1 prep, because my
                            NBMES were stuck super low. This helped!
                          </p>
                        </div>
                        {/*end message-description*/}
                        <div className="message-bellow">
                          <div className="message-action">
                            <ul className="action-enter">
                              <li>
                                <a href="#" className="btn btn-helpful">
                                  Helpful
                                </a>
                              </li>
                              <li>
                                <a href="#" className="btn btn-reply">
                                  Reply
                                </a>
                              </li>
                              <li>
                                <a href="#" className="btn-report">
                                  Report abuse
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="message-author">
                            <div className="author-descript">
                              <h4 className="author-title">
                                <a href="#">
                                  <span>@tempcheck</span>
                                </a>
                              </h4>
                              <ul className="author-link">
                                <li>
                                  <a href="#">Step One 245</a>
                                </li>
                                <li> |</li>
                                <li>
                                  <a href="#">Step Two 230</a>
                                </li>
                              </ul>
                            </div>
                            <div className="author-image">
                              <img
                                alt="image"
                                src="app/images/photos/img-author-1.jpg"
                                width={50}
                                height={50}
                              />
                            </div>
                          </div>
                        </div>
                        {/*end message-bellow*/}
                      </div>
                      {/*end message-box*/}
                    </div>
                    {/*end message-item*/}
                    <div className="message-item">
                      <div className="message-box">
                        <div className="message-front">
                          <div className="message-rating">
                            <div className="vote-rating">
                              <ul className="vote-rating-list">
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item active">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                                <li className="rating-item">
                                  <a href="#" className="rating-star">
                                    &nbsp;
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="message-date">
                            <span>May 1, 2020</span>
                          </div>
                          <div className="message-type">
                            <span>Clinical Management</span>
                          </div>
                        </div>
                        {/*end message-front*/}
                        <div className="message-description">
                          <h4 className="message-heading">
                            love it, but it’s expensive
                          </h4>
                          <p className="message-paragraph">
                            I like the resources overall, but for me it’s a
                            steep price for PowerPoint.
                          </p>
                        </div>
                        {/*end message-description*/}
                        <div className="message-bellow">
                          <div className="message-action">
                            <ul className="action-enter">
                              <li>
                                <a href="#" className="btn btn-helpful">
                                  Helpful
                                </a>
                              </li>
                              <li>
                                <a href="#" className="btn btn-reply">
                                  Reply
                                </a>
                              </li>
                              <li>
                                <a href="#" className="btn-report">
                                  Report abuse
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="message-author">
                            <div className="author-descript">
                              <h4 className="author-title">
                                <a href="#">
                                  <span>@forgivemyloans</span>
                                </a>
                              </h4>
                              <ul className="author-link">
                                <li>
                                  <a href="#">Step One 250</a>
                                </li>
                              </ul>
                            </div>
                            <div className="author-image">
                              <img
                                alt="image"
                                src="app/images/photos/img-author-1.jpg"
                                width={50}
                                height={50}
                              />
                            </div>
                          </div>
                        </div>
                        {/*end message-bellow*/}
                      </div>
                      {/*end message-box*/}
                    </div>
                    {/*end message-item*/}
                  </div>
                  {/*end portlet-message*/}
                  <div className="load-more">
                    <a href="#" className="btn btn-loadmore">
                      Load More Reviews
                    </a>
                  </div>
                </div>
                {/*end review-content*/}
              </div>
              {/*end review-main*/}
            </div>
            {/*end review-layout*/}
          </div>
        </section>
        {/*end section-review*/}
        <section className="section-locker">
          <div className="container">
            <div className="locker-front">
              <div className="locker-left">
                <div className="main-title">
                  <h2>Recommended Resources</h2>
                </div>
              </div>
              {/*end locker-col*/}
              <div className="locker-right">
                <div className="visual-learner">
                  <a href="#" className="btn-recommendations">
                    More Recommendations
                  </a>
                </div>
              </div>
              {/*end locker-col*/}
            </div>
            {/*end locker-front*/}
            <div className="locker-panel">
              <div className="locker-category">
                <ul className="locker-list">
                  <li className="locker-item">
                    <div className="media media-locker">
                      <div className="locker-images">
                        <img
                          alt="image"
                          src="app/images/photos/img-locker.jpg"
                          width={125}
                          height={100}
                        />
                        <div className="locker-caption">
                          <a href="#">Path</a>
                        </div>
                      </div>
                      <div className="media-body">
                        <h3 className="locker-title">Boards &amp; Beyond</h3>
                        <div className="review-appear">
                          <div className="vote-rating">
                            <ul className="vote-rating-list">
                              <li className="rating-item active">
                                <a href="#" className="rating-star">
                                  &nbsp;
                                </a>
                              </li>
                              <li className="rating-item active">
                                <a href="#" className="rating-star">
                                  &nbsp;
                                </a>
                              </li>
                              <li className="rating-item active">
                                <a href="#" className="rating-star">
                                  &nbsp;
                                </a>
                              </li>
                              <li className="rating-item active">
                                <a href="#" className="rating-star">
                                  &nbsp;
                                </a>
                              </li>
                              <li className="rating-item">
                                <a href="#" className="rating-star">
                                  &nbsp;
                                </a>
                              </li>
                            </ul>
                          </div>
                          <p className="review">2,093 Reviews</p>
                        </div>
                      </div>
                    </div>
                    {/*end media-locker*/}
                    <div className="locker-button-match">
                      <p className="locker-match">
                        <span className="match-num">82 %</span> match
                      </p>
                      <a href="#" className="btn btn-resource">
                        View Resource
                      </a>
                    </div>
                    {/*end locker-button*/}
                  </li>
                  {/*end locker-item*/}
                  <li className="locker-item">
                    <div className="media media-locker">
                      <div className="locker-images">
                        <img
                          alt="image"
                          src="app/images/photos/img-locker.jpg"
                          width={125}
                          height={100}
                        />
                        <div className="locker-caption">
                          <a href="#">Path</a>
                        </div>
                      </div>
                      <div className="media-body">
                        <h3 className="locker-title">Anki: Pepper Deck</h3>
                        <div className="review-appear">
                          <div className="vote-rating">
                            <ul className="vote-rating-list">
                              <li className="rating-item active">
                                <a href="#" className="rating-star">
                                  &nbsp;
                                </a>
                              </li>
                              <li className="rating-item active">
                                <a href="#" className="rating-star">
                                  &nbsp;
                                </a>
                              </li>
                              <li className="rating-item active">
                                <a href="#" className="rating-star">
                                  &nbsp;
                                </a>
                              </li>
                              <li className="rating-item active">
                                <a href="#" className="rating-star">
                                  &nbsp;
                                </a>
                              </li>
                              <li className="rating-item">
                                <a href="#" className="rating-star">
                                  &nbsp;
                                </a>
                              </li>
                            </ul>
                          </div>
                          <p className="review">709 Reviews</p>
                        </div>
                      </div>
                    </div>
                    {/*end media-locker*/}
                    <div className="locker-button-match">
                      <p className="locker-match">
                        <span className="match-num">93 %</span> match
                      </p>
                      <a href="#" className="btn btn-resource">
                        View Resource
                      </a>
                    </div>
                    {/*end locker-button*/}
                  </li>
                  {/*end locker-item*/}
                  <li className="locker-item">
                    <div className="media media-locker">
                      <div className="locker-images">
                        <img
                          alt="image"
                          src="app/images/photos/img-locker.jpg"
                          width={125}
                          height={100}
                        />
                        <div className="locker-caption">
                          <a href="#">Path</a>
                        </div>
                      </div>
                      <div className="media-body">
                        <h3 className="locker-title">Anki: Pepper Deck</h3>
                        <div className="review-appear">
                          <div className="vote-rating">
                            <ul className="vote-rating-list">
                              <li className="rating-item active">
                                <a href="#" className="rating-star">
                                  &nbsp;
                                </a>
                              </li>
                              <li className="rating-item active">
                                <a href="#" className="rating-star">
                                  &nbsp;
                                </a>
                              </li>
                              <li className="rating-item active">
                                <a href="#" className="rating-star">
                                  &nbsp;
                                </a>
                              </li>
                              <li className="rating-item active">
                                <a href="#" className="rating-star">
                                  &nbsp;
                                </a>
                              </li>
                              <li className="rating-item">
                                <a href="#" className="rating-star">
                                  &nbsp;
                                </a>
                              </li>
                            </ul>
                          </div>
                          <p className="review">9,020 Reviews</p>
                        </div>
                      </div>
                    </div>
                    {/*end media-locker*/}
                    <div className="locker-button-match">
                      <p className="locker-match">
                        <span className="match-num">82 %</span> match
                      </p>
                      <a href="#" className="btn btn-resource">
                        View Resource
                      </a>
                    </div>
                    {/*end locker-button*/}
                  </li>
                  {/*end locker-item*/}
                </ul>
                {/*end locker-list*/}
              </div>
              {/*end locker-category*/}
            </div>
            {/*end locker-panel*/}
          </div>
        </section>
        {/*end section-locker*/}
      </section>
    </Fragment>
  );
};
