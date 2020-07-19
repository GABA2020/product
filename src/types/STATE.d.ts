declare namespace STATES {
  interface User {
    loading: boolean;
    loadingSearchBox: boolean;
    userProfile: ENTITIES.UserProfile;
    userSearchResults: ENTITIES.UserProfile[];
    userSearchProfile: ENTITIES.UserProfile;
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
