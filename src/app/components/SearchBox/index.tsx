import { useQuery } from '@apollo/client';
import React, { Fragment, FC, useState, useEffect, useRef } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { USERS_QUERY_PG_USERNAME } from 'service/queries';
import { history } from 'utils/history';

interface SearchBoxProps {
  
}

export const SearchBox: FC<SearchBoxProps> = props => {
 
  const wrapperRef = useRef(null);
  const [searchResultsState, setSearchResultsState] = useState<
    ENTITIES.UserProfile[]
  >([]);
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
  const [searchUsers, setSearchUsers] = useState('');
  const {
    data: userResponse,
    loading: loadinUsers,
    error: userError,
    refetch: fetchSearchUser,
  } = useQuery(USERS_QUERY_PG_USERNAME, { variables: { like: `%${searchUsers}%` } });


 //console.log(userError, userResponse)
  const renderSearchResults = () => {
    return searchUsers&&userResponse? 
       userResponse.user_account.map((item, index) => (
          <div key={index} className="search-result-item">
            <span
              onClick={() => {
                history.push(`/home/${item.username}`);
                setSearchResultsState([]);
              }}
            >
              {item.username}
            </span>
          </div>
        ))
      :null;
  };
  
  // useEffect(() => {
  //   setSearchResultsState(userResponse.user_account);
  // }, [userResponse.user_account]);
  useOutsideAlerter(wrapperRef);
  return (
    <Fragment>
      <div className="search" ref={wrapperRef}>
        <div className="search-pc">
          <div className="search-pc-inner">
            <div className="input-group">
              <DebounceInput
                debounceTimeout={300}
                onChange={async e => {
                  setSearchUsers(e.target.value);
                  await fetchSearchUser();
                  setSearchResultsState(userResponse.user_account)
                }}
                onFocus={async e => {
                  setSearchUsers(e.target.value);
                  await fetchSearchUser();
                  setSearchResultsState(userResponse.user_account)
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
