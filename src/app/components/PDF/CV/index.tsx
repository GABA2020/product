import React from 'react';
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

const fontSizeTitle = 14;
const fontSizeContent = 10;
const fontSizeSubTitle = 12;

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: `/Roboto/Roboto-Regular.ttf`,
    },
    {
      src: `/Roboto/Roboto-Bold.ttf`,
      fontWeight: 'bold',
    },
    {
      src: `/Roboto/Roboto-Italic.ttf`,
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

export const CV = () => (
  <div style={{ height: '100vh' }}>
    <PDFViewer width={'100%'} height={'100%'}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section_wrapper}>
            <View style={styles.section_profile}>
              <View style={styles.section_profile_name}>
                <Text>Jax Sparrow</Text>
              </View>
              <View style={styles.section_profile_ad}>
                <Text>Nevada</Text>
                <Text style={styles.text_bold}>&middot;</Text>
                <Text>0328612018</Text>
                <Text>&middot;</Text>
                <Text>JaxSparrow@gmail.com</Text>
              </View>
              <View style={styles.section_profile_url}>
                <Text>GABA Profile URL</Text>
              </View>
            </View>
            <View style={styles.section_education}>
              <Text style={styles.section_education_title}>EDUCATION</Text>
              <View style={styles.section_education_content_wrap}>
                <View style={styles.section_school_name}>
                  <Text style={styles.text_bold}>MEDICAL SCHOOL NAME</Text>
                  <Text>City, State, Country</Text>
                </View>
                <View style={styles.section_school_name}>
                  <Text style={styles.text_bold}>Degree Type</Text>
                  <Text style={styles.text_italic}>
                    Month Year - Month Year
                  </Text>
                </View>
                <View style={styles.section_school_content}>
                  <Text style={styles.section_school_content.dot}>
                    &middot;
                  </Text>
                  <Text>Honors:</Text>
                </View>
              </View>
              <View style={styles.section_education_content_wrap}>
                <View style={styles.section_school_name}>
                  <Text style={styles.text_bold}>GRADUATE SCHOOL NAME</Text>
                  <Text>City, State, Country</Text>
                </View>
                <View style={styles.section_school_name}>
                  <Text style={styles.text_bold}>Degree Type</Text>
                  <Text style={styles.text_italic}>
                    Month Year - Month Year
                  </Text>
                </View>
                <View style={styles.section_school_content}>
                  <Text style={styles.section_school_content.dot}>
                    &middot;
                  </Text>
                  <Text>Major/Concentration:</Text>
                </View>
              </View>
              <View style={styles.section_education_content_wrap}>
                <View style={styles.section_school_name}>
                  <Text style={styles.text_bold}>
                    UNDERGRADUATE SCHOOL NAME
                  </Text>
                  <Text>City, State, Country</Text>
                </View>
                <View style={styles.section_school_name}>
                  <Text style={styles.text_bold}>Degree Type</Text>
                  <Text style={styles.text_italic}>
                    Month Year - Month Year
                  </Text>
                </View>
                <View style={styles.section_school_content}>
                  <Text style={styles.section_school_content.dot}>
                    &middot;
                  </Text>
                  <Text>Major/Concentration:</Text>
                </View>
              </View>
            </View>
            {/* work experirence */}
            <View style={styles.section_education}>
              <Text style={styles.section_education_title}>
                WORK EXPERIENCE
              </Text>
              <View style={styles.section_education_content_wrap}>
                <View style={styles.section_school_name}>
                  <Text style={styles.text_bold}>
                    NAME OF ORGANIZATION/COMPANY
                  </Text>
                  <Text>City, State, Country</Text>
                </View>
                <View style={styles.section_school_name}>
                  <Text style={styles.text_italic}>YOUR POSITION</Text>
                  <Text style={styles.text_italic}>
                    Month Year - Month Year
                  </Text>
                </View>
                <View style={styles.section_school_content}>
                  <Text style={styles.section_school_content.dot}>
                    &middot;
                  </Text>
                  <Text>Description of your activities:</Text>
                </View>
              </View>
              <View style={styles.section_education_content_wrap}>
                <View style={styles.section_school_name}>
                  <Text style={styles.text_bold}>
                    NAME OF ORGANIZATION/COMPANY
                  </Text>
                  <Text>City, State, Country</Text>
                </View>
                <View style={styles.section_school_name}>
                  <Text style={styles.text_italic}>YOUR POSITION</Text>
                  <Text style={styles.text_italic}>
                    Month Year - Month Year
                  </Text>
                </View>
                <View style={styles.section_school_content}>
                  <Text style={styles.section_school_content.dot}>
                    &middot;
                  </Text>
                  <Text>Description of your activities:</Text>
                </View>
              </View>
            </View>
            {/* volenteer experirence */}
            <View style={styles.section_education}>
              <Text style={styles.section_education_title}>
                VOLUNTEER EXPERIENCE
              </Text>
              <View style={styles.section_education_content_wrap}>
                <View style={styles.section_school_name}>
                  <Text style={styles.text_bold}>
                    NAME OF ORGANIZATION/COMPANY
                  </Text>
                  <Text>City, State, Country</Text>
                </View>
                <View style={styles.section_school_name}>
                  <Text style={styles.text_italic}>YOUR POSITION</Text>
                  <Text style={styles.text_italic}>
                    Month Year - Month Year
                  </Text>
                </View>
                <View style={styles.section_school_content}>
                  <Text style={styles.section_school_content.dot}>
                    &middot;
                  </Text>
                  <Text>Description of your activities:</Text>
                </View>
                <View style={styles.section_school_content}>
                  <Text style={styles.section_school_content.dot}>
                    &middot;
                  </Text>
                  <Text>Total Number of Hours Served:</Text>
                </View>
              </View>
              <View style={styles.section_education_content_wrap}>
                <View style={styles.section_school_name}>
                  <Text style={styles.text_bold}>
                    NAME OF ORGANIZATION/COMPANY
                  </Text>
                  <Text>City, State, Country</Text>
                </View>
                <View style={styles.section_school_name}>
                  <Text style={styles.text_italic}>YOUR POSITION</Text>
                  <Text style={styles.text_italic}>
                    Month Year - Month Year
                  </Text>
                </View>
                <View style={styles.section_school_content}>
                  <Text style={styles.section_school_content.dot}>
                    &middot;
                  </Text>
                  <Text>Description of your activities:</Text>
                </View>
                <View style={styles.section_school_content}>
                  <Text style={styles.section_school_content.dot}>
                    &middot;
                  </Text>
                  <Text>Total Number of Hours Served:</Text>
                </View>
              </View>
            </View>
            {/* research */}
            <View style={styles.section_education}>
              <Text style={styles.section_education_title}>RESEARCH</Text>
              <View style={styles.section_education_content_wrap}>
                <View style={styles.section_school_name}>
                  <Text style={styles.text_bold}>EVENT/MEETING NAME</Text>
                  <Text>City, State, Country</Text>
                </View>
                <View style={styles.section_school_name}>
                  <Text style={styles.text_italic}>
                    RESEARCH TYPE (Publication, Poster presentation etc.)
                  </Text>
                  <Text style={styles.text_italic}>Month Year</Text>
                </View>
                <View style={styles.section_school_content}>
                  <Text style={styles.section_school_content.dot}>
                    &middot;
                  </Text>
                  <Text>Title of Work</Text>
                </View>
                <View style={styles.section_school_content}>
                  <Text style={styles.section_school_content.dot}>
                    &middot;
                  </Text>
                  <Text>Author(s)/Presenters(s).</Text>
                </View>
                <View style={styles.section_school_content}>
                  <Text style={styles.section_school_content.dot}>
                    &middot;
                  </Text>
                  <Text>Primary Investigator (PI).</Text>
                </View>
                <View style={styles.section_school_content}>
                  <Text style={styles.section_school_content.dot}>
                    &middot;
                  </Text>
                  <Text>Journal (if, Publication).</Text>
                </View>
              </View>
            </View>
            {/* PRIOR TRAINING */}
            <View style={styles.section_education}>
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
            </View>
            {/* MEMBERSHIP */}
            <View style={styles.section_education}>
              <Text style={styles.section_education_title}>
                MEMBERSHIP AND HONORARY/PROFESSIONAL SOCIETIES
              </Text>
              <View style={styles.section_education_content_wrap}>
                <View style={styles.section_school_name}>
                  <Text style={styles.text_bold}>Membership/Society Name</Text>
                  <Text style={styles.text_italic}>Month and Year Joined</Text>
                </View>
                <View style={styles.section_school_name}>
                  <Text style={styles.text_bold}>Membership/Society Name</Text>
                  <Text style={styles.text_italic}>Month and Year Joined</Text>
                </View>
              </View>
            </View>
            {/* ADDITIONAL */}
            <View style={styles.section_education}>
              <Text style={styles.section_education_title}>
                MEMBERSHIP AND HONORARY/PROFESSIONAL SOCIETIES
              </Text>
              <View style={styles.section_education_content_wrap}>
                <View style={styles.section_additional}>
                  <View style={styles.section_additional_name}>
                    <Text style={styles.text_bold}>Certifications:</Text>
                  </View>
                  <View>
                    <Text style={styles.text_italic}>[Insert Here, Date]</Text>
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
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  </div>
);
