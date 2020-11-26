import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Dropdown } from 'semantic-ui-react';

import { Column, Row } from '../../../../genericComponents/Layout';
import Checkbox from '../../../../genericComponents/Checkbox';
import Stars from '../../../../genericComponents/Stars';
import theme from '../../../../../theme';
import { CREATE_REVIEW } from '../../../../../service/mutations';
import AsyncSelect from 'react-select/async';
import { getResourcesWithConditionName } from 'services';
import { Context } from 'app/globalContext/GlobalContext';
import { GET_SPECIALTIES } from '../../../../../service/queries';

const options = [
  {
    value: 'MCAT',
    key: 'mcat',
    text: 'MCAT',
  },
  {
    value: 'Step 1',
    key: 'step_1',
    text: 'Step 1',
  },
  {
    value: 'Step 2',
    key: 'step_2',
    text: 'Step 2',
  },
  {
    value: 'Step 3',
    key: 'step_3',
    text: 'Step 3',
  },
]

const initResourceSelected: ENTITIES.IResourceSelected = {
  label: 'Resource name',
  value: {
    id: '',
    name: '',
    picture_name: '',
    rating: 0,
    link: '',
  },
};

const inputFontStyle = `
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.1px;
`;

const ModalContainer = styled(Column)`
  width: 100%;
  height: 100%;
  position: fixed;
  overflow-y: hidden;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Modal = styled(Column)`
  flex-direction: column;
  position: realtive;
  width: 1000px;
  background-color: white;
  margin-top: 50px;
`;

const ModalHeader = styled.div`
  padding: 41px 200px 26px 200px;
  background-color: white;
  border-bottom: 1px solid ${props => props.theme.color.softGray};
`;

const HeaderTitle = styled.h3`
  width: 100%;
  border-bottom: 2px solid ${props => props.theme.color.gabaYellow};
  padding-bottom: 20px;
`;

const ModalContent = styled(Column)`
  padding: 26px 200px 41px 200px;
  width: 100%;
`;

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid lightgray;
  margin: 25px 0;
`;

const FormSection = styled(Row)`
  flex-wrap: wrap;
  label {
    margin-right: 25px;
    margin-top: 10px;
  }

  .react-datepicker-wrapper input {
    height: 40px;
    width: 136px;
    border: 1px solid lightgray;
    text-align: center;
    border-radius: 5px;
    margin-right: 15px;
  }

  .custom-date {
    width: 170px;
  }
`;

const Subtitle = styled.p`
  width: 100%;
  color: rgb(17, 23, 65);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0px;
  margin-bottom: 30px;
  padding-left: 10px;
  position: relative;
  &::before {
    display: inline-block;
    content: '*';
    color: red;
    width: 8px;
    height: 8px;
    font-size: 30px;
    position: absolute;
    left: -7px;
  }
`;

const CheckboxContainer = styled.div`
  width: 50%;
`;

const TextInput = styled.input`
  height: 40px;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-right: 15px;
  padding-left: 10px;
  width: 100%;
  ${inputFontStyle}
`;

const TextArea = styled.textarea`
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-right: 15px;
  padding-left: 10px;
  width: 100%;
  padding-top: 10px;
  ${inputFontStyle}
`;

const ModalButton = styled.button`
  background: ${(props: { background: string }) => props.background};
  border-radius: 6px;
  height: 48px;
  color: ${props => props.theme.color.darkBlue};
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  width: 48%;
  border: none;
`;

const ButtonsContainer = styled(Row)`
  justify-content: space-between;
  width: 100%;
`;

const DropdownContainer = styled(Row)`
  width: 100%;
`;

interface params {
  id: string;
}

const AddReviewModal = ({ onClose }: { onClose: () => void }) => {
  const [startDateValue, setStartDateValue] = useState(new Date());
  const [endDateValue, setEndDateValue] = useState(new Date());
  const [exams, setExams]: any = useState([]);
  const [examDate, setExamDate] = useState(new Date());
  const [stars, setStars] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [id, setId] = useState('');
  const [titleHeader, setTitleHeadet] = useState('Choose a resource:');
  const [specialties, setSpecialties]: any = useState([]);
  const [specialtiesValue, setSpecialtiesValue]: any = useState([]);
  //let { id }: params = useParams();
  //const email = useSelector((state: any) => state.auth.email);
  const {
    state: { user },
  } = useContext(Context);
  const [createReview, { data }] = useMutation(CREATE_REVIEW, {
    onCompleted: () => onClose(),
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

  const [resourceSelectedState, setResourceSelectedState] = useState<
    ENTITIES.IResourceSelected
  >(initResourceSelected);

  const handleCheckboxChange = exam =>
    setExams(prevExams => {
      return {
        ...prevExams,
        [exam]: !prevExams[exam],
      };
    });

  const handleSave = () => {
    createReview({
      variables: {
        comment,
        myRating: stars,
        resourceId: id,
        specialties: specialtiesValue,
        subjects: [],
        title,
        usedInTests: exams,
        used_end: endDateValue,
        used_start: startDateValue,
        userId: user.email,
        username: user.username,
      },
    });
  };

  const getAsyncOptions = (input: string) => {
    const resourceOptions: ENTITIES.IResourceSelected[] = [];
    return new Promise((resolve, reject) => {
      getResourcesWithConditionName(input.trim())
        .then(resources => {
          resources.forEach(item => {
            const newResource = {
              label: item.get('name'),
              value: { id: item.id, ...item.data() } as ENTITIES.Resource,
            };
            resourceOptions.push(newResource);
            // if (
            //   allUserResources.find(
            //     item => item.resource_id === newResource.value.id,
            //   ) === undefined
            // ) {
            //   resourceOptions.push(newResource);
            // }
          });
          resolve(resourceOptions);
        })
        .catch(() => {
          reject(resourceOptions);
        });
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <HeaderTitle>{titleHeader}</HeaderTitle>
          <AsyncSelect
            cacheOptions
            value={resourceSelectedState}
            onChange={select => {
              setResourceSelectedState(select);
              setId(select.value.id);
              setTitleHeadet(select.label);
              // setFieldValue('name', select.label);
            }}
            defaultOptions
            loadOptions={getAsyncOptions}
          ></AsyncSelect>
        </ModalHeader>
        <ModalContent>
          <FormSection>
            <Subtitle>When did you start?</Subtitle>
            <Row>
              <label>Start: </label>
              <DatePicker
                selected={startDateValue}
                onChange={date => setStartDateValue(date)}
                dateFormat="MM / yyyy"
                showMonthYearPicker
              />
            </Row>
            <Row>
              <label>End: </label>
              <DatePicker
                selected={endDateValue}
                onChange={date => setEndDateValue(date)}
                dateFormat="MM / yyyy"
                showMonthYearPicker
              />
            </Row>
          </FormSection>
          <Divider />
          <FormSection>
            <Subtitle>What test did you use this resource for?</Subtitle>
            <DropdownContainer>
              <Dropdown
                placeholder="Select tests"
                value={exams}
                onChange={(_, data) => setExams(data.value)}
                fluid
                multiple
                search
                selection
                options={options}
              />
            </DropdownContainer>
          </FormSection>
          <Divider />
          <FormSection>
            <Subtitle>
              Which disciplines did you use this resource for?
            </Subtitle>
            <DropdownContainer>
              <Dropdown
                placeholder="Select disciplines"
                value={specialtiesValue}
                onChange={(_, data) => setSpecialtiesValue(data.value)}
                fluid
                multiple
                search
                selection
                options={specialties}
              />
            </DropdownContainer>
          </FormSection>
          <Divider />
          <FormSection>
            <Subtitle>When did you take the exam?</Subtitle>
            <Row>
              <label>Date: </label>
              <DatePicker
                selected={examDate}
                onChange={date => setExamDate(date)}
                dateFormat="MM / dd / yyyy"
                calendarClassName="custom-date"
              />
            </Row>
          </FormSection>
          <Divider />
          <FormSection>
            <Subtitle>Star Rating</Subtitle>
            <Row>
              <Stars
                onChange={numOfStars => setStars(numOfStars)}
                numberOfStars={stars}
                color="yellow"
              />
            </Row>
          </FormSection>
          <Divider />
          <FormSection>
            <Subtitle>Review Title</Subtitle>
            <TextInput
              value={title}
              onChange={({ target: { value } }) => setTitle(value)}
            />
          </FormSection>
          <Divider />
          <FormSection>
            <Subtitle>Review</Subtitle>
            <TextArea
              rows={6}
              value={comment}
              onChange={({ target: { value } }) => setComment(value)}
            />
          </FormSection>
          <Divider />
          <FormSection>
            <ButtonsContainer>
              <ModalButton
                onClick={onClose}
                background={theme.color.softPurple}
              >
                Cancel
              </ModalButton>
              <ModalButton
                onClick={handleSave}
                background={theme.color.darkGray}
              >
                Save To Locker
              </ModalButton>
            </ButtonsContainer>
          </FormSection>
        </ModalContent>
      </Modal>
    </ModalContainer>
  );
};

export default AddReviewModal;
