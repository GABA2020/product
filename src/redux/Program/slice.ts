import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { DTO } from 'types/DTO';
export const initialState: STATES.Program = {
  loading: true,
  program: {
    benefits: '',
    books_or_education_funds: '',
    cons: '',
    culture: '',
    details_of_grand_rounds_presentation: '',
    edit: false,
    free_parking: false,
    ground_rounds_presentation: false,
    housing_stipend_or_subsidized_housing: '',
    impression_type: '',
    interactions_w_pd_or_chair_faculty_for_letters: '',
    interview_day_specifics: '',
    maternity_leaves_weeks: '',
    moonlighting: false,
    name_of_emr: '',
    other: '',
    other_program_benefits: '',
    paternity_leaves_weeks: '',
    pgy_2_salary: '',
    pgy_5_salary: '',
    position_on_your_rank_list: '',
    program_awards: '',
    program_name: '',
    pros: '',
    region: '',
    research_support: '',
    specialty: '',
    state: '',
    surrounding_community: '',
    training: '',
    vacation_weeks: '',
    year: '',
  },
};

const ProgramSliceState = createSlice({
  name: 'program',
  initialState,
  reducers: {
    getProgramReviewAction(
      state,
      action: PayloadAction<DTO.Program.GetProgramReviewRequest>,
    ) {
      state.loading = true;
      state.program = initialState.program;
    },
    getProgramReviewActionSuccess(
      state,
      action: PayloadAction<DTO.Program.GetProgramReviewResponse>,
    ) {
      state.loading = false;
      state.program = action.payload;
    },
    getProgramReviewActionFailed(state) {
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = ProgramSliceState;
