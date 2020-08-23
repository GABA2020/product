import { firestore } from 'firebase';

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
    volunteers: ENTITIES.Volunteer[];
    researches: ENTITIES.Research[];
    letters: ENTITIES.Letter[];
    arrayLength: number;
    lastQuery: any;
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
    reviews: ENTITIES.Review[];
    reviewLength: number;
    lastQuery: any;
    userResourceLength: number;
    userResources: ENTITIES.UserResource[];
    listResourceCache: { [id: string]: ENTITIES.Resource | null };
  }
}
