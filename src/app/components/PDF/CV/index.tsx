import React, { FC } from 'react';
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import moment from 'moment';
import { MonthYearFormat } from 'helpers/Unity';

const fontSizeTitle = 14;
const fontSizeContent = 10;
const fontSizeSubTitle = 12;

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: `/roboto/Roboto-Regular.ttf`,
    },
    {
      src: `/roboto/Roboto-Bold.ttf`,
      fontWeight: 'bold',
    },
    {
      src: `/roboto/Roboto-Italic.ttf`,
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
  },
  text_right: {
    textAlign: 'right',
  },
  text_bold: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  text_italic: {
    fontFamily: 'Roboto',
    fontStyle: 'italic',
  },
  section_wrapper: {
    paddingRight: 15,
    paddingLeft: 15,
  },
  section_profile: {
    marginTop: 20,
  },
  section_profile_name: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  section_profile_ad: {
    marginTop: 5,
    fontSize: fontSizeContent,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 160,
    paddingRight: 160,
    dot: {
      marginRight: 10,
      fontSize: fontSizeTitle,
    },
  },
  section_profile_url: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 9,
  },
  // education
  section_education: {
    marginTop: 20,
  },
  section_education_title: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: fontSizeTitle,
    borderBottom: 3,
    paddingBottom: 3,
    marginBottom: 3,
    borderBottomColor: 'black',
  },
  section_education_content_wrap: {
    marginBottom: 15,
  },
  section_school_name: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: fontSizeSubTitle,
    marginBottom: 3,
  },
  section_school_content: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: fontSizeContent,
    marginBottom: 4,
    dot: {
      marginRight: 8,
    },
  },
  //additional
  section_additional: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: fontSizeContent,
  },
  section_additional_name: {
    minWidth: 100,
  },
  section_additional_name_content: {
    // minWidth: 30,
  },
  // section_education_school_wrapper: {
  //   marginTop: 5,
  //   marginBottom: 10,
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   fontSize: fontSizeSubTitle,
  //   lineHeight: 2,
  // },
  // section_education_school_degree: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   dot: {
  //     marginRight: 10,
  //   },
  // },
});

interface ICV {
  educations: ENTITIES.Education[];
  workExperiences: ENTITIES.WorkExperience[];
  volunteers: ENTITIES.Volunteer[];
  researches: ENTITIES.Research[];
  userProfile: ENTITIES.UserProfile;
  base_url: string | undefined;
}

export const CV: FC<ICV> = props => {
  const {
    educations,
    workExperiences,
    volunteers,
    researches,
    userProfile,
    base_url,
  } = props;

  const renderEducations = (educations: ENTITIES.Education[]) => {
    return educations.map((item, index) => {
      return (
        <View key={index} style={styles.section_education_content_wrap}>
          <View style={styles.section_school_name}>
            <Text style={styles.text_bold}>{item.school}</Text>
            <Text>{item.school_address}</Text>
          </View>
          <View style={styles.section_school_name}>
            <Text style={styles.text_bold}>{item.degree_type}</Text>
            <Text style={styles.text_italic}>
              {moment.unix(item.date_start.seconds).format(MonthYearFormat)} -
              {moment.unix(item.date_end.seconds).format(MonthYearFormat)}
            </Text>
          </View>
          {item.honors !== '' && (
            <View style={styles.section_school_content}>
              <Text style={styles.section_school_content.dot}>&middot;</Text>
              <Text>Honors: {item.honors}</Text>
            </View>
          )}
          {item.major !== '' && (
            <View style={styles.section_school_content}>
              <Text style={styles.section_school_content.dot}>&middot;</Text>
              <Text>Major: {item.major}</Text>
            </View>
          )}
        </View>
      );
    });
  };

  const renderWorkExperiences = (
    workExperiences: ENTITIES.WorkExperience[],
  ) => {
    return workExperiences.map((item, index) => {
      return (
        <View key={index} style={styles.section_education_content_wrap}>
          <View style={styles.section_school_name}>
            <Text style={styles.text_bold}>{item.company}</Text>
            <Text>{item.company_address}</Text>
          </View>
          <View style={styles.section_school_name}>
            <Text style={styles.text_italic}>{item.job_title}</Text>
            <Text style={styles.text_italic}>
              {moment.unix(item.date_start.seconds).format(MonthYearFormat)} -
              {moment.unix(item.date_end.seconds).format(MonthYearFormat)}
            </Text>
          </View>
          {item.description.split(/x?[-+\n]/).map((value, index) => {
            return (
              value !== '' && (
                <View key={index} style={styles.section_school_content}>
                  <Text style={styles.section_school_content.dot}>
                    &middot;
                  </Text>
                  <Text>{value}</Text>
                </View>
              )
            );
          })}
        </View>
      );
    });
  };

  const renderVolunteers = (volunteers: ENTITIES.Volunteer[]) => {
    return volunteers.map((item, index) => {
      return (
        <View key={index} style={styles.section_education_content_wrap}>
          <View style={styles.section_school_name}>
            <Text style={styles.text_bold}>{item.organization_name}</Text>
            <Text>{item.organization_address}</Text>
          </View>
          <View style={styles.section_school_name}>
            <Text style={styles.text_italic}>{item.job_title}</Text>
            <Text style={styles.text_italic}>
              {moment.unix(item.date_start.seconds).format(MonthYearFormat)} -
              {moment.unix(item.date_end.seconds).format(MonthYearFormat)}
            </Text>
          </View>
          {item.description.split(/x?[-+\n]/).map((value, index) => {
            return (
              value !== '' && (
                <View key={index} style={styles.section_school_content}>
                  <Text style={styles.section_school_content.dot}>
                    &middot;
                  </Text>
                  <Text>{value}</Text>
                </View>
              )
            );
          })}
          <View style={styles.section_school_content}>
            <Text style={styles.section_school_content.dot}>&middot;</Text>
            <Text>
              Total Number of Hours Served: {item.number_of_hours_served}
            </Text>
          </View>
        </View>
      );
    });
  };

  const renderResearches = (researches: ENTITIES.Research[]) => {
    return researches.map((item, index) => {
      return (
        <View key={index} style={styles.section_education_content_wrap}>
          <View style={styles.section_school_name}>
            <Text style={styles.text_bold}>{item.event_name}</Text>
            <Text>{item.event_address}</Text>
          </View>
          <View style={styles.section_school_name}>
            <Text style={styles.text_italic}>
              {item.research_type.join(', ')}
            </Text>
            <Text style={styles.text_italic}>
              {moment.unix(item.event_date.seconds).format(MonthYearFormat)}
            </Text>
          </View>
          <View style={styles.section_school_content}>
            <Text style={styles.section_school_content.dot}>&middot;</Text>
            <Text>Title of Work: {item.title_of_work}</Text>
          </View>
          <View style={styles.section_school_content}>
            <Text style={styles.section_school_content.dot}>&middot;</Text>
            <Text>Author(s)/Presenters: {item.author}</Text>
          </View>
          <View style={styles.section_school_content}>
            <Text style={styles.section_school_content.dot}>&middot;</Text>
            <Text>Primary Investigator: {item.primary_investigator}</Text>
          </View>
          {item.research_type.find(item => item === 'Publication') !==
            undefined && (
            <View style={styles.section_school_content}>
              <Text style={styles.section_school_content.dot}>&middot;</Text>
              <Text>Journal: {item.link}</Text>
            </View>
          )}
        </View>
      );
    });
  };

  return (
    <div style={{ height: '100vh' }}>
      <PDFViewer width={'100%'} height={'100%'}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section_wrapper}>
              <View style={styles.section_profile}>
                <View style={styles.section_profile_name}>
                  <Text>{userProfile.name}</Text>
                </View>
                {/*This is formatted incorrectly and there's nowhere to input phone numbers or addresses on the profile*/}
                <View style={styles.section_profile_ad}>
                  <Text>{userProfile.address}</Text>
                  <Text style={styles.text_bold}>&middot;</Text>
                  <Text>{userProfile.phone_number}</Text>
                  <Text>&middot;</Text>
                  <Text>{userProfile.email}</Text>
                </View>
                <View style={styles.section_profile_url}>
                  <Text>{`${base_url}/${userProfile.username}`}</Text>
                </View>
              </View>
              {educations.length > 0 && (
                <View style={styles.section_education}>
                  <Text style={styles.section_education_title}>EDUCATION</Text>
                  {renderEducations(educations)}
                </View>
              )}
              {/* work experirence */}
              {workExperiences.length > 0 && (
                <View style={styles.section_education}>
                  <Text style={styles.section_education_title}>
                    WORK EXPERIENCE
                  </Text>
                  {renderWorkExperiences(workExperiences)}
                </View>
              )}

              {/* volenteer experirence */}
              {volunteers.length > 0 && (
                <View style={styles.section_education}>
                  <Text style={styles.section_education_title}>
                    VOLUNTEER EXPERIENCE
                  </Text>
                  {renderVolunteers(volunteers)}
                </View>
              )}

              {/* research */}
              {researches.length > 0 && (
                <View style={styles.section_education}>
                  <Text style={styles.section_education_title}>RESEARCH</Text>
                  {renderResearches(researches)}
                </View>
              )}
              {/* PRIOR TRAINING */}
              {/* <View style={styles.section_education}>
                <Text style={styles.section_education_title}>
                  CURRENT/PRIOR TRAINING
                </Text>
                <View style={styles.section_education_content_wrap}>
                  <View style={styles.section_school_name}>
                    <Text style={styles.text_bold}>INSTITUTION/PROGRAM</Text>
                    <Text>City, State, Country</Text>
                  </View>
                  <View style={styles.section_school_name}>
                    <Text style={styles.text_italic}>
                      TYPE OF TRAINING, SPECIALTY
                    </Text>
                    <Text style={styles.text_italic}>Month Year</Text>
                  </View>
                  <View style={styles.section_school_content}>
                    <Text style={styles.section_school_content.dot}>
                      &middot;
                    </Text>
                    <Text>Program Director Name</Text>
                  </View>
                  <View style={styles.section_school_content}>
                    <Text style={styles.section_school_content.dot}>
                      &middot;
                    </Text>
                    <Text>Supervisor Name</Text>
                  </View>
                </View>
              </View> */}
              {/* MEMBERSHIP */}
              <View style={styles.section_education}>
                <Text style={styles.section_education_title}>
                  MEMBERSHIP AND HONORARY/PROFESSIONAL SOCIETIES
                </Text>
                <View style={styles.section_education_content_wrap}>
                  {userProfile.honors.map((item, index) => {
                    return (
                      <View key={index} style={styles.section_school_name}>
                        <Text style={styles.text_bold}>{item}</Text>
                      </View>
                    );
                  })}

                  {/* <View style={styles.section_school_name}>
                    <Text style={styles.text_bold}>
                      Membership/Society Name
                    </Text>
                    <Text style={styles.text_italic}>
                      Month and Year Joined
                    </Text>
                  </View> */}
                </View>
              </View>
              {/* ADDITIONAL */}
              {/* <View style={styles.section_education}>
                <Text style={styles.section_education_title}>
                  MEMBERSHIP AND HONORARY/PROFESSIONAL SOCIETIES
                </Text>
                <View style={styles.section_education_content_wrap}>
                  <View style={styles.section_additional}>
                    <View style={styles.section_additional_name}>
                      <Text style={styles.text_bold}>Certifications:</Text>
                    </View>
                    <View>
                      <Text style={styles.text_italic}>
                        [Insert Here, Date]
                      </Text>
                    </View>
                  </View>
                  <View style={styles.section_additional}>
                    <View style={styles.section_additional_name}>
                      <Text style={styles.text_bold}>Licensure:</Text>
                    </View>
                    <View style={styles.section_additional_name_content}>
                      <Text style={styles.text_italic}>
                        [State, License Type, License Number, Expiration Month,
                        Expiration Year]
                      </Text>
                    </View>
                  </View>
                  <View style={styles.section_additional}>
                    <View style={styles.section_additional_name}>
                      <Text style={styles.text_bold}>Languages:</Text>
                    </View>
                    <View style={styles.section_additional_name_content}>
                      <Text style={styles.text_italic}>
                        Language – Proficiency, Language – Proficiency
                      </Text>
                    </View>
                  </View>
                  <View style={styles.section_additional}>
                    <View style={styles.section_additional_name}>
                      <Text style={styles.text_bold}>Hobbies/Interests:</Text>
                    </View>
                    <View style={styles.section_additional_name_content}>
                      <Text style={styles.text_italic}>[Insert Here]</Text>
                    </View>
                  </View>
                </View>
              </View> */}
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};
