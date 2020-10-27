import { firestore } from 'firebase';

declare namespace STATES {
  interface User {
    loading: boolean;
    loadingSearchBox: boolean;
    loadingUserSearchProfile: boolean;
    userProfile: ENTITIES.UserProfile;
    listGuestUserCache: { [email: string]: ENTITIES.GuestUserProfile | null };
    userSearchResults: ENTITIES.UserProfile[]; //search box
    userSearchProfile: ENTITIES.UserProfile;
    workExperiences: ENTITIES.WorkExperience[];
    educations: ENTITIES.Education[];
    volunteers: ENTITIES.Volunteer[];
    researches: ENTITIES.Research[];
    letters: ENTITIES.Letter[];
    arrayLength: number;
    lastQuery: any;
    showMenu: boolean
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
    loadingFile: boolean;
    fileUrls: { [file_url: string]: string | null };
  }
  interface Locker {
    loading: boolean;
    reviewLength: number;
    userResourceLength: number;
    lastQuery: any;
    reviews: ENTITIES.UserResource[];
    userResources: ENTITIES.UserResource[];
    allUserResources: ENTITIES.UserResource[];
    listResourceCache: { [id: string]: ENTITIES.Resource | null };
  }

  interface Chat {
    loading_listLastMessage: boolean;
    loading_listMessage: boolean;
    loading_connectUser: boolean;
    listMessages: ENTITIES.Message[];
    listLastMessage: ENTITIES.LastMessage[];
    last_query: any;
    messages_length: number;
    currentUserKey: string;
  }

  interface Setting {
    base_url: string | undefined;
  }
}
