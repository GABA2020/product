import { db } from 'helpers/firebase.module';
import { DTO } from '../types/DTO';

const getProgramOfUser = async (
  payload: DTO.Program.GetProgramReviewRequest,
) => {
  const programRef = db.collection('program_review').doc(payload.email);
  const program = await programRef.get();
  return program.data();
};

const updateProgramOfUser = async (
  payload: DTO.Program.UpdateProgramRequest,
) => {
  const programRef = await db
    .collection('program_review')
    .doc(payload.email)
    .set({
      specialty: payload.program.specialty,
    });
  return programRef;
};

export { getProgramOfUser, updateProgramOfUser };
