import { db } from 'helpers/firebase.module';
import { DTO } from '../types/DTO';

export const getProgramOfUser = async (
  payload: DTO.Program.GetProgramReviewRequest,
) => {
  const programRef = db.collection('program_review').doc(payload.email);
  const program = await programRef.get();
  return program.data();
};
