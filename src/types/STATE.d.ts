declare namespace STATES {
  interface User {
    loading: boolean;
    loadingSearchBox: boolean;
    userProfile: ENTITIES.UserProfile;
    userSearchResults: ENTITIES.UserProfile[]; //search box
    userSearchProfile: ENTITIES.UserProfile;
    workExperiences: ENTITIES.Work[];
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
}
