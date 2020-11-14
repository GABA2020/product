import React, { useState } from 'react';
import styled from 'styled-components';
import { Range } from '@graphistry/rc-slider';
import { Dropdown } from 'semantic-ui-react';

import { Column } from '../../genericComponents/Layout';
import theme from '../../../theme';

const judgeReviews = [
  {
    value: 85,
    stars: 5,
  },
  {
    value: 9,
    stars: 4,
  },
  {
    value: 4,
    stars: 3,
  },
  {
    value: 1,
    stars: 2,
  },
  {
    value: 1,
    stars: 1,
  },
];

const countryOptions = [
  { value: 'Alabama', key: 'Alabama', text: 'Alabama' },
  { value: 'Alaska', key: 'Alaska', text: 'Alaska' },
  { value: 'American Samoa', key: 'American Samoa', text: 'American Samoa' },
  { value: 'Arizona', key: 'Arizona', text: 'Arizona' },
  { value: 'Arkansas', key: 'Arkansas', text: 'Arkansas' },
  { value: 'California', key: 'California', text: 'California' },
  { value: 'Colorado', key: 'Colorado', text: 'Colorado' },
  { value: 'Connecticut', key: 'Connecticut', text: 'Connecticut' },
  { value: 'Delaware', key: 'Delaware', text: 'Delaware' },
  {
    value: 'District of Columbia',
    key: 'District of Columbia',
    text: 'District of Columbia',
  },
  {
    value: 'Federated States of Micronesia',
    key: 'Federated States of Micronesia',
    text: 'Federated States of Micronesia',
  },
  { value: 'Florida', key: 'Florida', text: 'Florida' },
  { value: 'Georgia', key: 'Georgia', text: 'Georgia' },
  { value: 'Guam', key: 'Guam', text: 'Guam' },
  { value: 'Hawaii', key: 'Hawaii', text: 'Hawaii' },
  { value: 'Idaho', key: 'Idaho', text: 'Idaho' },
  { value: 'Illinois', key: 'Illinois', text: 'Illinois' },
  { value: 'Indiana', key: 'Indiana', text: 'Indiana' },
  { value: 'Iowa', key: 'Iowa', text: 'Iowa' },
  { value: 'Kansas', key: 'Kansas', text: 'Kansas' },
  { value: 'Kentucky', key: 'Kentucky', text: 'Kentucky' },
  { value: 'Louisiana', key: 'Louisiana', text: 'Louisiana' },
  { value: 'Maine', key: 'Maine', text: 'Maine' },
  {
    value: 'Marshall Islands',
    key: 'Marshall Islands',
    text: 'Marshall Islands',
  },
  { value: 'Maryland', key: 'Maryland', text: 'Maryland' },
  { value: 'Massachusetts', key: 'Massachusetts', text: 'Massachusetts' },
  { value: 'Michigan', key: 'Michigan', text: 'Michigan' },
  { value: 'Minnesota', key: 'Minnesota', text: 'Minnesota' },
  { value: 'Mississippi', key: 'Mississippi', text: 'Mississippi' },
  { value: 'Missouri', key: 'Missouri', text: 'Missouri' },
  { value: 'Montana', key: 'Montana', text: 'Montana' },
  { value: 'Nebraska', key: 'Nebraska', text: 'Nebraska' },
  { value: 'Nevada', key: 'Nevada', text: 'Nevada' },
  { value: 'New Hampshire', key: 'New Hampshire', text: 'New Hampshire' },
  { value: 'New Jersey', key: 'New Jersey', text: 'New Jersey' },
  { value: 'New Mexico', key: 'New Mexico', text: 'New Mexico' },
  { value: 'New York', key: 'New York', text: 'New York' },
  { value: 'North Carolina', key: 'North Carolina', text: 'North Carolina' },
  { value: 'North Dakota', key: 'North Dakota', text: 'North Dakota' },
  {
    value: 'Northern Mariana Islands',
    key: 'Northern Mariana Islands',
    text: 'Northern Mariana Islands',
  },
  { value: 'Ohio', key: 'Ohio', text: 'Ohio' },
  { value: 'Oklahoma', key: 'Oklahoma', text: 'Oklahoma' },
  { value: 'Oregon', key: 'Oregon', text: 'Oregon' },
  { value: 'Palau', key: 'Palau', text: 'Palau' },
  { value: 'Pennsylvania', key: 'Pennsylvania', text: 'Pennsylvania' },
  { value: 'Puerto Rico', key: 'Puerto Rico', text: 'Puerto Rico' },
  { value: 'Rhode Island', key: 'Rhode Island', text: 'Rhode Island' },
  { value: 'South Carolina', key: 'South Carolina', text: 'South Carolina' },
  { value: 'South Dakota', key: 'South Dakota', text: 'South Dakota' },
  { value: 'Tennessee', key: 'Tennessee', text: 'Tennessee' },
  { value: 'Texas', key: 'Texas', text: 'Texas' },
  { value: 'Utah', key: 'Utah', text: 'Utah' },
  { value: 'Vermont', key: 'Vermont', text: 'Vermont' },
  { value: 'Virgin Island', key: 'Virgin Island', text: 'Virgin Island' },
  { value: 'Virginia', key: 'Virginia', text: 'Virginia' },
  { value: 'Washington', key: 'Washington', text: 'Washington' },
  { value: 'West Virginia', key: 'West Virginia', text: 'West Virginia' },
  { value: 'Wisconsin', key: 'Wisconsin', text: 'Wisconsin' },
  { value: 'Wyoming', key: 'Wyoming', text: 'Wyoming' },
];

const Button = styled.button`
  color: ${props => props.theme.color.darkBlue};
  font-size: 1.6rem;
  font-weight: 500;
  padding: 9px 14px;
  line-height: 1.1;
  color: ${props => props.theme.color.darkBlue};
  background-color: ${props => props.theme.color.softPurple};
  border-radius: 2px;
  margin-top: -20px;
  outline: none;
  border: none;
  margin-bottom: 5px;
`;

const FiltersContainer = styled(Column)`
  margin-right: 30px;
  width: 30%;
  display: flex;
`;

const ReviewSection = () => {
  const defaultFiltersState = {
    years: 0,
    location: '',
    MCAScore: [0, 100],
    stepOneScore: [0, 100],
    stepTwoScore: [0, 100],
    stepThreeScore: [0, 100],
    school: '',
    discipline: '',
  };
  const [filters, setFilters]: any = useState(defaultFiltersState);

  function handleSetFilter(filterName, value) {
    setFilters({
      ...filters,
      [filterName]: value,
    });
  }

  return (
    <FiltersContainer>
      <div className="portlet-review">
        <div className="review-heading">
          <h2 className="review-judge-title">Filter users</h2>
        </div>
      </div>
      <div className="portlet-mention">
        <h3 className="mention-title">Filter by exam score</h3>
        <div className="mention-list">
          <p>
            MCA: {filters.MCAScore[0]} - {filters.MCAScore[1]}
          </p>
          <Range
            onChange={([min, max]) =>
              handleSetFilter('MCAScore', [min * 10, max * 10])
            }
            trackStyle={{ backgroundColor: theme.color.darkBlue }}
            handleStyle={{
              borderColor: theme.color.gabaYellow,
              backgroundColor: theme.color.gabaYellow,
            }}
          />
        </div>
        <div className="mention-list">
          <p>
            Step One: {filters.stepOneScore[0]} - {filters.stepOneScore[1]}
          </p>
          <Range
            onChange={([min, max]) =>
              handleSetFilter('stepOneScore', [min * 10, max * 10])
            }
            trackStyle={{ backgroundColor: theme.color.darkBlue }}
            handleStyle={{
              borderColor: theme.color.gabaYellow,
              backgroundColor: theme.color.gabaYellow,
            }}
          />
        </div>
        <div className="mention-list">
          <p>
            Step Two: {filters.stepTwoScore[0]} - {filters.stepTwoScore[1]}
          </p>
          <Range
            onChange={([min, max]) =>
              handleSetFilter('stepTwoScore', [min * 10, max * 10])
            }
            trackStyle={{ backgroundColor: theme.color.darkBlue }}
            handleStyle={{
              borderColor: theme.color.gabaYellow,
              backgroundColor: theme.color.gabaYellow,
            }}
          />
        </div>
        <div className="mention-list">
          <p>
            Step Three: {filters.stepThreeScore[0]} - {filters.stepThreeScore[1]}
          </p>
          <Range
            onChange={([min, max]) =>
              handleSetFilter('stepThreeScore', [min * 10, max * 10])
            }
            trackStyle={{ backgroundColor: theme.color.darkBlue }}
            handleStyle={{
              borderColor: theme.color.gabaYellow,
              backgroundColor: theme.color.gabaYellow,
            }}
          />
        </div>
      </div>
      <div className="portlet-filter">
        <h3 className="mention-title">Filter by location</h3>
        <div>
          <Dropdown
            placeholder="Select Location"
            fluid
            search
            selection
            options={countryOptions}
          />
        </div>
      </div>
      <div className="portlet-filter">
        <h3 className="mention-title">Filter by years</h3>
        <div>
          <Dropdown
            placeholder="Select Year"
            fluid
            selection
            options={[
              {
                key: '1',
                value: 'MS1',
                text: 'MS1',
              },
              {
                key: '2',
                value: 'MS2',
                text: 'MS2',
              },
              {
                key: '3',
                value: 'MS3',
                text: 'MS3',
              },
              {
                key: '4',
                value: 'MS4',
                text: 'MS4',
              },
              {
                key: '5',
                value: 'Resident',
                text: 'Resident',
              },
              {
                key: '6',
                value: 'Fellow',
                text: 'Fellow',
              },
            ]}
          />
        </div>
      </div>
      <div className="portlet-filter">
        <h3 className="mention-title">Filter by Medical School</h3>
        <div>
          <Dropdown
            placeholder="Select Medical School"
            fluid
            selection
            options={[
              {
                key: '1',
                value: '1',
                text: '1',
              },
              {
                key: '2',
                value: '2',
                text: '2',
              },
              {
                key: '3',
                value: '3',
                text: '3',
              },
              {
                key: '4',
                value: '4',
                text: '4',
              },
              {
                key: '5',
                value: '5',
                text: '5',
              },
              {
                key: '6',
                value: '6',
                text: '6',
              },
            ]}
          />
        </div>
      </div>
      <div className="portlet-filter">
        <h3 className="mention-title">Filter by speciality</h3>
        <div>
          <Dropdown
            placeholder="Select Speciality"
            fluid
            selection
            options={[
              {
                key: '1',
                value: '1',
                text: '1',
              },
              {
                key: '2',
                value: '2',
                text: '2',
              },
              {
                key: '3',
                value: '3',
                text: '3',
              },
              {
                key: '4',
                value: '4',
                text: '4',
              },
              {
                key: '5',
                value: '5',
                text: '5',
              },
              {
                key: '6',
                value: '6',
                text: '6',
              },
            ]}
          />
        </div>
      </div>
      <div className="portlet-filter">
        <Button
          onClick={() => setFilters(defaultFiltersState)}
          style={{ marginBottom: 20 }}
        >
          Clear Filters
        </Button>
      </div>
    </FiltersContainer>
  );
};

export default ReviewSection;
