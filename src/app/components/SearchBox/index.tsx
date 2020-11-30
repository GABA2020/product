import React, { Fragment, FC, useState, useEffect, useRef } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { history } from 'utils/history';

interface SearchBoxProps {
  onchangeSearchText(text: string): void;
  searchResults: ENTITIES.UserProfile[];
}

export const SearchBox: FC<SearchBoxProps> = props => {
  const { searchResults, onchangeSearchText } = props;
  const [searchResultsState, setSearchResultsState] = useState<
    ENTITIES.UserProfile[]
  >([]);
  const wrapperRef = useRef(null);

  const useOutsideAlerter = ref => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setSearchResultsState([]);
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  const renderSearchResults = () => {
    return searchResultsState.length > 0
      ? searchResultsState.map((item, index) => (
          <div key={index} className="search-result-item">
            <span
              onClick={() => {
                history.push(`/home/${item.username}`);
                onchangeSearchText('');
                setSearchResultsState([]);
              }}
            >
              {item.username}
            </span>
          </div>
        ))
      : null;
  };

  useEffect(() => {
    setSearchResultsState(searchResults);
  }, [searchResults]);
  useOutsideAlerter(wrapperRef);
  return (
    <Fragment>
      <div className="search" ref={wrapperRef}>
        <div className="search-pc">
          <div className="search-pc-inner">
            <div className="input-group">
              <DebounceInput
                debounceTimeout={300}
                onChange={e => {
                  onchangeSearchText(e.target.value);
                }}
                onFocus={e => {
                  onchangeSearchText(e.target.value);
                }}
                type="text"
                className="form-control"
                placeholder="Search"
              />
            </div>
            <div className="search-result">{renderSearchResults()}</div>
          </div>
        </div>

        {/*end search-pc*/}
      </div>
    </Fragment>
  );
};
