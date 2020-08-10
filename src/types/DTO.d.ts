// DTO only ref to ENTITIES.d.ts
import { UserProfile } from 'redux/User/types';
import { Volunteer } from 'app/components/Volunteer';
import { Education } from 'app/components/Education';
import { firestore } from 'firebase';

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

    interface UpdateUserProfileRequest {
      userProfile: ENTITIES.UserProfile;
    }
    namespace WorkExperience {
      interface GetWorkExperiencesRequest {
        email: string;
      }
      interface GetWorkExperiencesResponse {
        workExperiences: ENTITIES.WorkExperience[];
        arrayLength: number;
        lastQuery: any;
      }

      interface GetMoreWorkExperiencesRequest {
        email: string;
        lastQuery: any;
      }
      interface GetMoreWorkExperiencesResponse {
        workExperiences: ENTITIES.WorkExperience[];
        lastQuery: any;
      }

      interface AddNewWorkExperiencesRequest {
        email: string;
        workExperience: ENTITIES.WorkExperience;
      }

      interface EditWorkExperiencesRequest {
        email: string;
        workExperience: ENTITIES.WorkExperience;
      }

      interface DeleteWorkExperiencesRequest {
        email: string;
        id: string;
      }
    }
    namespace Education {
      interface GetEducationsRequest {
        email: string;
      }
      interface GetEducationsResponse {
        educations: ENTITIES.Education[];
        arrayLength: number;
        lastQuery: any;
      }

      interface GetMoreEducationsRequest {
        email: string;
        lastQuery: any;
      }
      interface GetMoreEducationsResponse {
        educations: ENTITIES.Education[];
        lastQuery: any;
      }

      interface AddNewEducationRequest {
        email: string;
        education: ENTITIES.Education;
      }

      interface EditEducationRequest {
        email: string;
        education: ENTITIES.Education;
      }

      interface DeleteEducationRequest {
        email: string;
        id: string;
      }
    }

    namespace Volunteer {
      interface GetVolunteersRequest {
        email: string;
      }
      interface GetVolunteersResponse {
        volunteers: ENTITIES.Volunteer[];
        arrayLength: number;
        lastQuery: any;
      }

      interface GetMoreVolunteersRequest {
        email: string;
        lastQuery: any;
      }
      interface GetMoreVolunteersResponse {
        volunteers: ENTITIES.Volunteer[];
        lastQuery: any;
      }

      interface AddNewVolunteerRequest {
        email: string;
        volunteer: ENTITIES.Volunteer;
      }
      interface EditVolunteerRequest {
        email: string;
        volunteer: ENTITIES.Volunteer;
      }
      interface DeleteVolunteerRequest {
        email: string;
        id: string;
      }
    }
    namespace Research {
      interface GetResearchesRequest {
        email: string;
      }
      interface GetResearchesResponse {
        researches: ENTITIES.Research[];
        arrayLength: number;
        lastQuery: any;
      }
      interface GetMoreResearchesRequest {
        email: string;
        lastQuery: any;
      }
      interface GetMoreResearchesResponse {
        researches: ENTITIES.Research[];
        lastQuery: any;
      }
      interface AddNewResearchRequest {
        email: string;
        research: ENTITIES.Research;
      }
      interface EditResearchRequest {
        email: string;
        research: ENTITIES.Research;
      }
      interface DeleteResearchRequest {
        email: string;
        id: string;
      }
    }

    namespace Letter {
      interface GetLettersRequest {
        email: string;
      }
      interface GetLettersResponse {
        letters: ENTITIES.Letter[];
        arrayLength: number;
        lastQuery: any;
      }

      interface GetMoreLettersRequest {
        email: string;
        lastQuery: any;
      }
      interface GetMoreLettersResponse {
        letters: ENTITIES.Letter[];
        lastQuery: any;
      }

      interface AddNewLetterRequest {
        email: string;
        letter: ENTITIES.Letter;
      }
      interface EditLetterRequest {
        email: string;
        letter: ENTITIES.Letter;
      }
      interface DeleteLetterRequest {
        email: string;
        id: string;
      }
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

    interface UpdateProgramRequest {
      email: string;
      program: ENTITIES.Program;
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

  export namespace Storage {
    interface GetAvatarUrlRequest {
      name: string;
    }

    interface UploadAvatarRequest {
      name: string;
      content: string;
    }
    // interface UploadAvatarResponse {
    //   url: string;
    // }
  }

  export namespace Locker {
    interface GetReviewsRequest {
      email: string;
    }

    interface GetReviewsResponse {
      reviews: ENTITIES.Review[];
      lastQuery: any;
      arrayLength: number;
    }

    interface GetMoreReviewsRequest {
      email: string;
      lastQuery: any;
    }

    interface GetMoreReviewsResponse {
      reviews: ENTITIES.Review[];
      lastQuery: any;
    }

    namespace Resource {
      interface getResourcesRequest {
        email: string;
      }

      interface getResourcesResponse {
        resources: ENTITIES.Resource[];
        lastQuery: any;
        arrayLength: number;
      }

      interface getMoreResourcesRequest {
        email: string;
        lastQuery: any;
      }

      interface getMoreResourcesResponse {
        resources: ENTITIES.Resource[];
        lastQuery: any;
      }
    }
  }
}
