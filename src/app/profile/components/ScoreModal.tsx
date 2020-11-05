import Dragger from 'antd/lib/upload/Dragger';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import headerBackground from '../../assets/images/headerBackgroundYellow.png';
import { db } from 'helpers/firebase.module';
import { showWarningMessage, showConfirmMessage } from 'helpers/Swal.module';
import { toast } from 'react-toastify';

export default function ScoreModal({
  isShow = false,
  onHide,
  uploadFileMCAT,
  userProfile,
  type,
}) {
  const [isCreated, setIsCreated] = useState(false);
  const [scoreReportFile, setScoreReportFile] = useState('');
  const [score, setScore] = useState('');
  const [result, setResult] = useState(false);

  useEffect(() => {
    if (type==="MCAT" && userProfile.mcat && userProfile.mcat_document_name) {
      setScore(userProfile.mcat);
      setScoreReportFile(userProfile.mcat_document_name);
      setResult(userProfile.is_passed_mcat);
      setIsCreated(true);
    }
    if (type==="Step One" && userProfile.step_1 && userProfile.step_1_document_name) {
      setScore(userProfile.step_1);
      setScoreReportFile(userProfile.step_1_document_name);
      setResult(userProfile.is_passed_step1);
      setIsCreated(true);
    }
    if (type==="Step Two" && userProfile.step_2 && userProfile.step_2_document_name) {
      setScore(userProfile.step_2);
      setScoreReportFile(userProfile.step_2_document_name);
      setResult(userProfile.is_passed_step2);
      setIsCreated(true);
    }
    if (type==="Step Three" && userProfile.step_3 && userProfile.step_3_document_name) {
      setScore(userProfile.step_3);
      setScoreReportFile(userProfile.step_3_document_name);
      setResult(userProfile.is_passed_step3);
      setIsCreated(true);
    }
  }, []);

  function beforeUpload(file: File) {
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      showWarningMessage('You are uploading an file larger than 5Mb!');
    } else {
      setScoreReportFile(file.name);
      uploadFileMCAT(file);
    }
    return false;
  }

  async function updateMcatScore() {
    const userRef = await db
      .collection('member_data')
      .doc(userProfile.email)
      .set({
        ...userProfile,
        mcat_review_requested: true,
        mcat: score,
        mcat_document_name: scoreReportFile,
        is_passed_mcat: result,
      });
    onHide()
    window.location.reload(false);
  }
  async function updateStepOneScore() {
    const userRef = await db
      .collection('member_data')
      .doc(userProfile.email)
      .set({
        ...userProfile,
        step_1_review_requested: true,
        step_1: score,
        step_1_document_name: scoreReportFile,
        is_passed_step1: result,
      });
    onHide()
    window.location.reload(false);
  }
  async function updateStepTwoScore() {
    const userRef = await db
      .collection('member_data')
      .doc(userProfile.email)
      .set({
        ...userProfile,
        step_2_review_requested: true,
        step_2: score,
        step_2_document_name: scoreReportFile,
        is_passed_step2: result,
      });
    onHide()
    window.location.reload(false);
  }
  async function updateStepThreeScore() {
    const userRef = await db
      .collection('member_data')
      .doc(userProfile.email)
      .set({
        ...userProfile,
        step_3_review_requested: true,
        step_3: score,
        step_3_document_name: scoreReportFile,
        is_passed_step3: result,
      });
    onHide()
    window.location.reload(false);
  }

  async function validation() {
    if (!(Number(score) > 0 && Number(score) < 1000))
      return toast.error('The Score must be between 1 and 999');
    if (!scoreReportFile) return toast.error('The Score Report is required');
    const isUpdate = await showConfirmMessage(
      'Are you sure you want to update this?',
      '',
      'warning',
    );
    if (!isUpdate.value) return;
    if(type==="MCAT")updateMcatScore();
    if(type==="Step One")updateStepOneScore();
    if(type==="Step Two")updateStepTwoScore();
    if(type==="Step Three")updateStepThreeScore();
  }

  function handleScore(e) {
    if (Number(e.target.value) > 999) return;
    setScore(e.target.value);
  }

  return (
    <ModalCont
      backdrop="static"
      show={isShow}
      dialogClassName="modal-w"
      onHide={onHide}
      size="lg"
    >
      <ModalHeader>
        <Head1>
          <CloseButton onClick={onHide}>X</CloseButton>
          <Text fontSize="1.4em">{type} Score</Text>
          <IconButton color={'#FF0000'}>
            <img src={require('../../assets/images/icons/trash.png')} />
            Remove
          </IconButton>
        </Head1>
        <Text fontSize="1.2em">
          {isCreated
            ? 'If you change your score, you will need to upload a new verifiable Score Report.'
            : 'Once your score has been verified, you will see it updated on your profile.'}
        </Text>
      </ModalHeader>
      <ModalBody>
        <Text fontSize="1.1em">
          {type} Score{' '}
          {isCreated && (
            <h5>Changing this score will remove the score Report below.</h5>
          )}
        </Text>
        <RowContainer>
          <ScoreInput type="number" value={score} onChange={handleScore} />
        </RowContainer>
        <hr />
        <Text fontSize="1.2em">Result</Text>
        <RowContainer>
          <RowContainer>
            <RadioButton
              type="radio"
              id="pass"
              name="result"
              onChange={e => setResult(true)}
              value={1}
            />
            <Text fontSize="1.1em">Pass</Text>
          </RowContainer>
          <RowContainer>
            <RadioButton
              type="radio"
              id="fail"
              name="result"
              onChange={e => setResult(false)}
              defaultChecked
              value={0}
            />
            <Text fontSize="1.1em">Fail</Text>
          </RowContainer>
        </RowContainer>
        <hr />
        <Text fontSize="1.2em">Upload Score Report</Text>
        <UploadBox beforeUpload={beforeUpload} showUploadList={false}>
          {scoreReportFile ? (
            <>
              <img src={require('../../assets/images/icons/fileGreen.png')} />
              <br />
              <Text fontSize="1.2em">We got it, thanks!</Text>
              <br />
              <Text fontSize="0.8em">{scoreReportFile}</Text>
            </>
          ) : (
            <>
              <img src={require('../../assets/images/icons/upload.png')} />
              <br />
              <Text fontSize="1.2em">Drop your file here or Browse</Text>
              <br />
              <Text fontSize="0.8em">
                Supports JPG, PNG and PDF files at 5MB max
              </Text>
            </>
          )}
        </UploadBox>
        <IconButton
          onClick={() => setScoreReportFile('')}
          color={'#aaa'}
        >
          <img src={require('../../assets/images/icons/trashGrey.png')} />
          Remove File
        </IconButton>
        {/* <RowContainerSpaceBeetwen>
          <IconButton color={"#aaa"}>
            <img src={require('../../assets/images/icons/fileImportGrey.png')} />
            Replace File
          </IconButton>
        </RowContainerSpaceBeetwen> */}
        <hr />
        <RowContainerSpaceBeetwen>
          <Button onClick={onHide} backgroundColor={'#e2e4ee'}>
            Cancel
          </Button>
          <Button onClick={validation} backgroundColor={'#cacfd5'}>
            {isCreated ? 'Update Score' : 'Save Score'}
          </Button>
        </RowContainerSpaceBeetwen>
      </ModalBody>
    </ModalCont>
  );
}

const ModalCont = styled(Modal)`
  .modal-w {
    width: 70%;
    max-width: 800px;
  }
  @media (max-width: 768px) {
    .modal-w {
      width: 97%;
    }
  }
`;
const ModalHeader = styled.div`
  width: 100%;
  padding: 20px 16%;
  background-image: url(${headerBackground});
  background-position-x: -50px;
  background-color: #fefefe;
  border-bottom: 1px solid #ddd;
`;
const ModalBody = styled.div`
  width: 100%;
  padding: 20px 16%;
`;
const CloseButton = styled.button`
  padding: 10px;
  background: none;
  border: none;
  position: absolute;
  right: 20px;
  top: 10px;
`;
const Head1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 2px solid #f7b400;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;
const IconButton = styled.button`
  padding: 10px;
  background: none;
  border: none;
  color: ${(p: { color }) => p.color};
`;
const Text = styled.label`
  font-size: ${(p: { fontSize }) => p.fontSize};
  font-weight: 600;
  margin-bottom: 0;
`;
const RowContainer = styled.div`
  display: flex;
  margin: 8px 0;
  flex: 1;
`;
const RowContainerSpaceBeetwen = styled(RowContainer)`
  justify-content: space-between;
`;
const ScoreInput = styled.input`
  &&& {
    background: none;
    border: 2px solid #35a235aa;
    width: 120px;
    height: 48px;
    padding: 10px 16px;
    margin-right: 16px;
    font-size: 1.4em;
    font-weight: bold;
    border-radius: 8px;

    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;
const RadioButton = styled.input`
  && {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    margin-bottom: 4px;
    background: #aaa;
  }
`;
const UploadBox = styled(Dragger)`
  width: 100%;
  height: 50px;
  margin: 12px 0;
  padding: 16px 0;
  background-color: #f8f8f8;
  border: dashed 2px #ccc;
  border-radius: 8px;
`;
const Button = styled.button`
  display: flex;
  flex: 1;
  border: none;
  text-align: center;
  padding: 12px;
  margin: 4px;
  border-radius: 4px;
  background-color: ${(p: { backgroundColor }) => p.backgroundColor};
`;
