declare namespace STATES {
  interface User {
    loading: boolean;
    loadingSearchBox: boolean;
    loadingUserSearchProfile: boolean;
    userProfile: ENTITIES.UserProfile;
    userSearchResults: ENTITIES.UserProfile[]; //search box
    userSearchProfile: ENTITIES.UserProfile;
    workExperiences: ENTITIES.WorkExperience[];
    educations: ENTITIES.Education[];
  }
  interface Program {
    loading: boolean;
    program: ENTITIES.Program;
  }
  interface Auth {
    loading: boolean;
    isAuth: boolean;
    email: string;
    username: string;
  }
  interface Storage {
    loading: boolean;
    avatar_url: string;
  }
}
