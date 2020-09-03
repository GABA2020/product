declare namespace ENTITIES {
  export type Maybe<T> = T | null;

  interface ITime {
    seconds: number;
  }
  interface GuestUserProfile {
    email: string;
    avatar: string;
    name: string;
  }

  interface UserProfile {
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
  interface Program {
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
  interface WorkExperience {
    id: string;
    company: string;
    company_address: string;
    date_end: ITime;
    date_start: ITime;
    description: string;
    job_title: string;
  }
  interface Volunteer {
    id: string;
    date_end: ITime;
    date_start: ITime;
    description: string;
    job_title: string;
    number_of_hours_served: string;
    organization_address: string;
    organization_name: string;
  }
  interface Education {
    id: string;
    date_end: ITime;
    date_start: ITime;
    degree_type: string;
    honors: string;
    major: string;
    school: string;
    school_address: string;
  }

  interface Research {
    id: string;
    author: string;
    event_address: string;
    event_date: ITime;
    event_name: string;
    journal: string;
    link: string;
    is_show_link: boolean;
    primary_investigator: string;
    research_type: string[];
    title_of_work: string;
  }

  interface Letter {
    id: string;
    document_name: string;
    document_type: string;
    link: string;
    receive_date: ITime;
    is_show_link: boolean;
  }

  interface File {
    lastModified: number;
    lastModifiedDate: string;
    name: string;
    size: number;
    type: string;
    webkitRelativePath: string;
  }

  interface ISelect {
    label: string;
    value: string;
  }

  interface IResourceSelected {
    label: string;
    value: Resource;
  }

  interface UserResource {
    id: string;
    resource_id: string;
    match_score: number;
    date: ITime;
    actual_exam: string;
    actual_exam_score: number;
    review_body: string;
    subject: string;
    created_at: ITime;
    updated_at: ITime;
    rating: number;
  }

  interface Resource {
    id: string;
    name: string;
    picture_name: string;
    rating: number;
    link: string;
  }

  interface Message {
    id: strting;
    content: string;
    sender_email: string;
    created_at: ITime;
  }

  interface LastMessage {
    created_at: ITime;
    is_received: boolean;
    last_message: string;
    sender_email: string;
    users: string[];
    connect_status: number;
  }
}
