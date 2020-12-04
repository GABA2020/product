import React, { useState } from 'react';
import styled from 'styled-components';
import { Range } from '@graphistry/rc-slider';
import { Dropdown } from 'semantic-ui-react';

import { Column } from '../../genericComponents/Layout';
import theme from '../../../theme';
import { useQuery } from '@apollo/react-hooks';
import { GET_SPECIALTIES, GET_SCHOOLS } from '../../../service/queries';

const school_year = [
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

const ReviewSection = ({onPressFilter}) => {
  const defaultFiltersState = {
    school_year: '',
    location: '',
    MCAScore: [0, 1000],
    stepOneScore: [0, 1000],
    stepTwoScore: [0, 1000],
    stepThreeScore: [0, 1000],
    medical_school: '',
    specialty: '',
  };
  const [filters, setFilters]: any = useState(defaultFiltersState);
  const [schools, setSchools]: any = useState([]);
  const [specialties, setSpecialties]: any = useState([]);

  useQuery(GET_SCHOOLS, {
    onCompleted: data =>
      setSchools(
        data.school_programs.map((school, index) => ({
          text: school.school_name,
          key: school.index,
          value: school.school_name,
        })),
      ),
  });

  useQuery(GET_SPECIALTIES, {
    onCompleted: data =>
      setSpecialties(
        data.medical_specialties.map(speciality => ({
          text: speciality.specialties_name,
          key: speciality.id,
          value: speciality.specialties_name,
        })),
      ),
  });

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
            MCAT: {filters.MCAScore[0]} - {filters.MCAScore[1]}
          </p>
          <Range
            onChange={([min, max]) => handleSetFilter('MCAScore', [min, max])}
            max={1000}
            step={10}
            value={filters.MCAScore}
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
              handleSetFilter('stepOneScore', [min, max])
            }
            max={1000}
            step={10}
            value={filters.stepOneScore}
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
              handleSetFilter('stepTwoScore', [min, max])
            }
            max={1000}
            step={10}
            value={filters.stepTwoScore}
            trackStyle={{ backgroundColor: theme.color.darkBlue }}
            handleStyle={{
              borderColor: theme.color.gabaYellow,
              backgroundColor: theme.color.gabaYellow,
            }}
          />
        </div>
        <div className="mention-list">
          <p>
            Step Three: {filters.stepThreeScore[0]} -{' '}
            {filters.stepThreeScore[1]}
          </p>
          <Range
            onChange={([min, max]) =>
              handleSetFilter('stepThreeScore', [min, max])
            }
            max={1000}
            step={10}
            value={filters.stepThreeScore}
            trackStyle={{ backgroundColor: theme.color.darkBlue }}
            handleStyle={{
              borderColor: theme.color.gabaYellow,
              backgroundColor: theme.color.gabaYellow,
            }}
          />
        </div>
      </div>
      {/* <div className="portlet-filter">
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
      </div> */}
      <div className="portlet-filter">
        <h3 className="mention-title">Filter by years</h3>
        <div>
          <Dropdown
            placeholder="Select Year"
            fluid
            selection
            value={filters.school_year}
            onChange={(_, r) => handleSetFilter('school_year', r.value)}
            options={school_year}
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
            search
            value={filters.medical_school}
            onChange={(_, r) => handleSetFilter('medical_school', r.value)}
            options={schools}
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
            search
            value={filters.specialty}
            onChange={(_, r) => handleSetFilter('specialty', r.value)}
            options={specialties}
          />
        </div>
      </div>
      <div className="portlet-filter">
        <Button
          onClick={() => onPressFilter(filters)}
          style={{ marginBottom: 20, color: 'blue' }}
        >
          Filter
        </Button>
      </div>
      <div className="portlet-filter">
        <Button
          onClick={() => {
            setFilters(defaultFiltersState);
            onPressFilter(defaultFiltersState);
          }}
          style={{ marginBottom: 20 }}
        >
          Clear Filters
        </Button>
      </div>
    </FiltersContainer>
  );
};

export default ReviewSection;
