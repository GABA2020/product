// DTO only ref to ENTITIES.d.ts
import { UserProfile } from 'redux/User/types';
import { Volunteer } from 'app/components/Volunteer';
import { Education } from 'app/components/Education';
import { firestore } from 'firebase';

declare namespace DTO {
  export namespace User {
    interface GetGuestUserProfileCacheRequest {
      email: string;
    }

    interface GetGuestUserProfileCacheResponse {
      email: string;
      avatar: string;
      name: string;
      username: string;
    }

    interface GetUserProfileResponse {
      email: string;
      phone_number: string;
      address: string;
      avatar: string;
      membership_type: string;
      payment_complete: boolean;
      last_login: string;
      awards: string;
      about: string;
      class_quartile: string;
      clerkship_honors: string[];
      honors: string[];
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
      is_passed_mcat: boolean;
      mcat_document_name: string;
      mcat_review_requested: boolean;
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
      is_passed_step1: boolean;
      step_1_document_name: string;
      step_1_review_requested: boolean;
      step_1_resources_used: string[];
      step_2: number;
      is_passed_step2: boolean;
      step_2_resources_used: string[];
      step_2_document_name: string;
      step_2_review_requested: boolean;
      student_location: string;
      student_status: string;
      total_interviews_attended: string;
      total_ranked: string;
      username: string;
      verified: boolean;
      waitlists: number;
      year: string;
      year_in_program: number;
      step_3: number;
      is_passed_step3: boolean;
      step_3_document_name: string;
      step_3_resources_used: string[];
      step_3_review_requested: boolean;
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
      phone_number: string;
      address: string;
      avatar: string;
      membership_type: string;
      payment_complete: boolean;
      last_login: string;
      awards: string;
      about: string;
      class_quartile: string;
      clerkship_honors: string[];
      honors: string[];
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
      is_passed_mcat: boolean;
      mcat_document_name: string;
      mcat_review_requested: boolean;
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
      is_passed_step1: boolean;
      step_1_document_name: string;
      step_1_review_requested: boolean;
      step_1_resources_used: string[];
      step_2: number;
      is_passed_step2: boolean;
      step_2_resources_used: string[];
      step_2_document_name: string;
      step_2_review_requested: boolean;
      student_location: string;
      student_status: string;
      total_interviews_attended: string;
      total_ranked: string;
      username: string;
      verified: boolean;
      waitlists: number;
      year: string;
      year_in_program: number;
      step_3: number;
      is_passed_step3: boolean;
      step_3_document_name: string;
      step_3_resources_used: string[];
      step_3_review_requested: boolean;
    }

    interface UpdateUserProfileRequest {
      userProfile: ENTITIES.UserProfile;
    }

    namespace WorkExperience {
      interface GetAllWorkExperiencesRequest {
        email: string;
      }
      interface GetAllWorkExperiencesResponse {
        workExperiences: ENTITIES.WorkExperience[];
      }

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
      interface GetAllEducationsRequest {
        email: string;
      }

      interface GetAllEducationsResponse {
        educations: ENTITIES.Education[];
      }

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
      interface GetAllVolunteersRequest {
        email: string;
      }
      interface GetAllVolunteersResponse {
        volunteers: ENTITIES.Volunteer[];
      }
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
      interface GetAllResearchesRequest {
        email: string;
      }
      interface GetAllResearchesResponse {
        researches: ENTITIES.Research[];
      }
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
      membership_type: string;
      payment_complete: boolean;
      last_login: string;
    }
  }

  export namespace Storage {
    interface UploadFileRequest {
      name: string; //->file/email/file_name
      file: File;
    }

    interface UploadFileResponse {
      name: string;
      url: string;
    }

    interface GetFileUrlRequest {
      name: string; //->file/email/file_name
    }

    interface GetFileUrlResponse {
      name: string;
      url: string;
    }
  }

  export namespace Locker {
    namespace Review {
      interface GetReviewsRequest {
        email: string;
      }

      interface GetReviewsResponse {
        reviews: ENTITIES.UserResource[];
        lastQuery: any;
        reviewLength: number;
      }

      interface GetMoreReviewsRequest {
        email: string;
        lastQuery: any;
      }

      interface GetMoreReviewsResponse {
        reviews: ENTITIES.UserResource[];
        lastQuery: any;
      }
    }

    namespace Resource {
      interface GetResourceDetailRequest {
        id: string;
      }

      interface GetResourceDetailResponse {
        id: string;
        resource: ENTITIES.Resource;
      }
    }

    namespace UserResource {
      interface getAllUserResourcesRequest {
        email: string;
      }

      interface getAllUserResourcesResponse {
        userResources: ENTITIES.UserResource[];
      }

      interface getUserResourcesRequest {
        email: string;
      }

      interface getUserResourcesResponse {
        userResources: ENTITIES.UserResource[];
        lastQuery: any;
        userResourceLength: number;
      }

      interface getMoreUserResourcesRequest {
        email: string;
        lastQuery: any;
      }

      interface getMoreUserResourcesResponse {
        userResources: ENTITIES.UserResource[];
        lastQuery: any;
      }

      interface AddUserResourceRequest {
        email: string;
        userResource: ENTITIES.UserResource;
      }
      interface AddUserResourceResponse {
        userResource: ENTITIES.UserResource;
      }

      interface EditUserResourceRequest {
        email: string;
        userResource: ENTITIES.UserResource;
      }
      interface EditUserResourceResponse {
        userResource: ENTITIES.UserResource;
      }

      interface DeleteUserResourceRequest {
        email: string;
        userResource: ENTITIES.UserResource;
      }
      interface DeleteUserResourceResponse {
        userResource: ENTITIES.UserResource;
      }
    }
  }

  export namespace Chat {
    interface ListenListLastMessageRequest {
      email: string;
    }

    interface ListenListLastMessageResponse {
      listLastMessage: ENTITIES.LastMessage[];
    }

    interface GetListMessageRequest {
      users_mail_key: string;
    }

    interface GetListMessageResponse {
      listMessage: ENTITIES.Message[];
      last_query: any;
      messages_length: number;
    }

    interface GetMoreListMessageRequest {
      users_mail_key: string;
      last_query: any;
    }

    interface GetMoreListMessageResponse {
      listMessage: ENTITIES.Message[];
      last_query: any;
    }

    interface SendMessageRequest {
      users_mail_key: string;
      message: ENTITIES.Message;
      lastMessage: ENTITIES.LastMessage;
    }

    interface SendMessageResponse {
      message: ENTITIES.Message;
      lastMessage: ENTITIES.LastMessage;
    }

    interface listenNewMessageRequest {
      users_mail_key: string;
    }

    interface listenNewMessageResponse {
      message: ENTITIES.Message;
    }

    interface SetMessageToReadRequest {
      users_mail_key: string;
    }

    interface ListenMessageNotificationRequest {
      email: string;
    }

    interface ListenMessageNotificationResponse {
      notificationCount: number;
    }

    interface ConnectUserRequest {
      users_mail_key: string;
      senderEmail: string;
    }

    interface ConnectUserResponse {
      users_mail_key: string;
    }

    interface ResponseConnectRequest {
      lastMessage: ENTITIES.LastMessage;
    }

    interface ResponseConnectResponse {
      // lastMessage: ENTITIES.LastMessage;
    }
  }
}
