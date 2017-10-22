// @flow
import React from 'react';
import { Row, Col } from '@coursera/coursera-ui';
import { Link } from 'react-router-dom';
import _ from 'underscore';

import withResponsiveSection from 'src/components/hoc/withResponsiveSection';
import { CourseCardPlaceholder } from 'src/components/PlaceholderCards';

const allItems = _.range(16);

function MyEnrolledCourses({ displayCount = 1, s12ns = allItems }) {
  return (
    <Row rootClassName="MyEnrolledCourses">
      {s12ns.slice(0, displayCount).map(item => (
        <Col xs={12} sm={6} md={4} lg={3} xxl={2} key={item} rootClassName="m-b-1">
          <CourseCardPlaceholder />
        </Col>
      ))}
    </Row>
  );
}

const MyEnrolledCoursesResponsive = withResponsiveSection(MyEnrolledCourses);

export default function PopularIdeas() {
  return (
    <MyEnrolledCoursesResponsive
      moreLink="http://coursera.org"
      sectionTitle="Popular Ideas"
      total={24}
      xsDisplayCount={1}
      smDisplayCount={2}
      mdDisplayCount={3}
      lgDisplayCount={4}
      xxlDisplayCount={6}
    />
  );
}
