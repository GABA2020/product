import React from 'react';
import { img_board } from '../../../assets/images';

const BoardSection = () => (
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
)

export default BoardSection;