// DTO only ref to ENTITIES.d.ts
import { UserProfile } from 'redux/User/types';

declare namespace DTO {
  export namespace User {
    interface GetUserProfileResponse {
      email: string;
      avatar: string;
      awards: string;
      about: string;
      class_quartile: string;
      clerkship_honors: string[];
      complex_1: number;
      complex_2: number;
      couples_match: boolean;
      cs_pe: string;
      degrees: string;
      edit: boolean;
      gender: string;
      interview_offers: string;
      interview_offers_prelim: string;
      interview_offers_ty: string;
      interviews_cancelled_or_declined: string;
      learning_style: string;
      match: boolean;
      mcat: number;
      name: string;
      number_of_apps_categorical: string;
      number_of_apps_preliminary_year: string;
      number_of_general_publications: string;
      number_of_ir_applications: string;
      number_of_ir_interviews: string;
      number_of_presentations: string;
      number_of_sub_1: string;
      places_interviewed: string;
      reapplicant: string;
      red_flag: string;
      rejections: string;
      specialty_interest: string;
      specialty_specific_publications: string;
      step_1: number;
      step_1_resources_used: string[];
      step_2: number;
      step_2_resources_used: string[];
      student_location: string;
      student_status: string;
      total_interviews_attended: string;
      total_ranked: string;
      username: string;
      verified: boolean;
      waitlists: number;
      year: string;
      year_in_program: number;
    }

    interface SearchUsersRequest {
      text: string;
    }
    interface SearchUsersResponse {
      listUser: ENTITIES.UserProfile[];
    }

    interface GetUserSearchProfileRequest {
      username: string;
    }
    interface GetUserSearchProfileResponse {
      email: string;
      avatar: string;
      awards: string;
      about: string;
      class_quartile: string;
      clerkship_honors: string[];
      complex_1: number;
      complex_2: number;
      couples_match: boolean;
      cs_pe: string;
      degrees: string;
      edit: boolean;
      gender: string;
      interview_offers: string;
      interview_offers_prelim: string;
      interview_offers_ty: string;
      interviews_cancelled_or_declined: string;
      learning_style: string;
      match: boolean;
      mcat: number;
      name: string;
      number_of_apps_categorical: string;
      number_of_apps_preliminary_year: string;
      number_of_general_publications: string;
      number_of_ir_applications: string;
      number_of_ir_interviews: string;
      number_of_presentations: string;
      number_of_sub_1: string;
      places_interviewed: string;
      reapplicant: string;
      red_flag: string;
      rejections: string;
      specialty_interest: string;
      specialty_specific_publications: string;
      step_1: number;
      step_1_resources_used: string[];
      step_2: number;
      step_2_resources_used: string[];
      student_location: string;
      student_status: string;
      total_interviews_attended: string;
      total_ranked: string;
      username: string;
      verified: boolean;
      waitlists: number;
      year: string;
      year_in_program: number;
    }

    interface GetWorkExperiencesRequest {
      email: string;
    }
    interface GetWorkExperiencesResponse {
      workExperiences: ENTITIES.WorkExperience[];
    }
    interface GetEducationsRequest {
      email: string;
    }
    interface GetEducationsResponse {
      educations: ENTITIES.Education[];
    }
  }

  export namespace Program {
    interface GetProgramReviewRequest {
      email: string;
    }
    interface GetProgramReviewResponse {
      benefits: string;
      books_or_education_funds: string;
      cons: string;
      culture: string;
      details_of_grand_rounds_presentation: string;
      edit: boolean;
      free_parking: boolean;
      ground_rounds_presentation: boolean;
      housing_stipend_or_subsidized_housing: string;
      impression_type: string;
      interactions_w_pd_or_chair_faculty_for_letters: string;
      interview_day_specifics: string;
      maternity_leaves_weeks: string;
      moonlighting: boolean;
      name_of_emr: string;
      other: string;
      other_program_benefits: string;
      paternity_leaves_weeks: string;
      pgy_2_salary: string;
      pgy_5_salary: string;
      position_on_your_rank_list: string;
      program_awards: string;
      program_name: string;
      pros: string;
      region: string;
      research_support: string;
      specialty: string;
      state: string;
      surrounding_community: string;
      training: string;
      vacation_weeks: string;
      year: string;
    }
  }

  export namespace Auth {
    interface LoginRequest {
      email: string;
      password: string;
    }
    interface LoginResponse {
      username: string;
    }
  }
}
