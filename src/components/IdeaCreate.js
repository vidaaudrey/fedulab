// @flow
import React from 'react';
import { Form, Row, Input, DatePicker, Col, Button, Select, InputNumber, Switch } from 'antd';
import { compose, withState, withProps, withHandlers } from 'recompose';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import randomString from 'randomstring';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import IdeaTypeSelect from 'src/components/IdeaTypeSelect';
import { urlRegex } from 'src/utils/validators';

import { DEFAULT_COVER_BG, DEFAULT_CATEGORIES } from 'src/constants/appConstants';

const { TextArea } = Input;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 6,
    },
  },
};

type Props = {
  handleSubmit: () => void,
  checkCategory: () => void,
  checkUrl: () => void,
  toggleNeedMyLaptop: boolean => void,
  togglePresentLive: boolean => void,
  form: Object,
  category: Array<string>,
  idea: {
    title: String,
    description: String,
  },
};

const DEFAULT_DATE_RANGE = {
  START: moment('2017-11-01', 'YYYY-MM-DD'),
  END: moment('2017-11-03', 'YYYY-MM-DD'),
};

function SectionTitle({ title, tag: Tag = 'h3' }: { title: String, tag: String }) {
  return (
    <Row>
      <Col xs={tailFormItemLayout.wrapperCol.xs} sm={tailFormItemLayout.wrapperCol.sm}>
        <Tag className="p-t-2 m-b-1">{title}</Tag>
      </Col>
    </Row>
  );
}

function IdeaCreateForm({
  handleSubmit,
  form,
  category,
  checkCategory,
  checkUrl,
  idea,
  toggleNeedMyLaptop,
  togglePresentLive,
}: Props) {
  const { getFieldDecorator } = form;

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <h2 className="text-xs-center font-lg m-b-2">Add My Idea</h2>
      <SectionTitle title="Basic Information" />
      <FormItem {...formItemLayout} label="Title" hasFeedback>
        {getFieldDecorator('title', {
          rules: [
            { required: true, message: 'Please input the title!' },
            { pattern: '.{3,40}', message: '3 - 40 characters' },
          ],
          initialValue: idea.title,
        })(<Input placeholder="Title" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="Slug" hasFeedback>
        {getFieldDecorator('slug', {
          rules: [
            { required: true, message: 'Please input the slug!' },
            { pattern: '.{3,50}', message: '3 - 50 characters' },
          ],
          initialValue: idea.slug,
        })(<Input placeholder="Slug" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="Tagline" hasFeedback>
        {getFieldDecorator('tagline', {
          rules: [{ pattern: '.{0}|.{3,80}', message: '3 - 80 characters' }],
          initialValue: idea.tagline,
        })(<Input placeholder="Tagline for this project" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="Category">
        {getFieldDecorator('category', {
          rules: [{ validator: checkCategory }],
          initialValue: category,
        })(<IdeaTypeSelect />)}
      </FormItem>

      <SectionTitle title="Collaboration" />
      <FormItem {...formItemLayout} label="How to contribute" hasFeedback>
        {getFieldDecorator('howToContribute', {
          rules: [{ pattern: '.{0}|.{3,120}', message: '3 - 120 characters' }],
          initialValue: idea.howToContribute,
        })(<Input placeholder="How others can contribute" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="Slack URL" hasFeedback>
        {getFieldDecorator('slackUrl', {
          rules: [{ validator: checkUrl }],
          initialValue: idea.slackUrl,
        })(<Input type="url" placeholder="Slack url for your project" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="Project Time">
        {getFieldDecorator('projectDuration', {
          rules: [{ type: 'array', required: true, message: 'Please select time!' }],
          initialValue: [idea.startTime, idea.estimatedFinishTime],
        })(<RangePicker />)}
      </FormItem>
      <SectionTitle title="Idea Details" />
      <FormItem {...formItemLayout} label="Youtube Video URL" hasFeedback>
        {getFieldDecorator('youtubeVideoUrl', {
          rules: [{ validator: checkUrl }],
          initialValue: idea.youtubeVideoUrl,
        })(<Input type="url" placeholder="Youtube video url for your project" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="Coursera Video URL" hasFeedback>
        {getFieldDecorator('courseraVideoUrl', {
          rules: [{ validator: checkUrl }],
          initialValue: idea.courseraVideoUrl,
        })(<Input type="url" placeholder="Coursera video url for your project" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="Description" hasFeedback>
        {getFieldDecorator('description', {
          rules: [{ required: true, message: 'Add description to your idea' }],
          initialValue: idea.description,
        })(
          <TextArea placeholder="Details about your idea" autosize={{ minRows: 2, maxRows: 6 }} />,
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="Background Image URL (TODO: File Upload)" hasFeedback>
        {getFieldDecorator('coverBackgroundUrl', {
          initialValue: idea.coverBackgroundUrl,
        })(<Input placeholder="coverBackgroundUrl" />)}
      </FormItem>
      <SectionTitle title="Presentation" />
      <FormItem {...formItemLayout} label="Display Order" hasFeedback>
        {getFieldDecorator('displayOrder', {
          initialValue: idea.displayOrder,
        })(<InputNumber min={1} />)}
      </FormItem>
      <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
        <div>
          <Switch defaultChecked={idea.needMyLaptop} onChange={toggleNeedMyLaptop} />
          <span className="p-l-1">I need my laptop to present</span>
        </div>
      </FormItem>
      <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
        <div>
          <Switch defaultChecked={idea.presentLive} onChange={togglePresentLive} />
          <span className="p-l-1">{" I'm presenting Live"}</span>
        </div>
      </FormItem>
      <FormItem style={{ textAlign: 'right' }}>
        <Button type="primary" htmlType="submit">
          Add Idea
        </Button>
      </FormItem>
    </Form>
  );
}

const DEFAULT_IDEA = {
  category: DEFAULT_CATEGORIES,
  coverBackgroundUrl: DEFAULT_COVER_BG,
  description: 'Lorem ipsum dolor, sit amet consectetur adipisicing el',
  displayOrder: 1,
  estimatedFinishTime: DEFAULT_DATE_RANGE.END,
  howToContribute: "Join us and let's talk more!",
  makeathonId: 'cj8apmwh6gvzh0172zd86j8hq',
  needMyLaptop: false,
  presentLive: false,
  slackUrl: 'https://coursera.slack.com/messages',
  slug: `my-awesome-new-idea-${randomString.generate({ length: 4, capitalization: 'lowercase' })}`,
  startTime: DEFAULT_DATE_RANGE.START,
  tagline: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, dicta!',
  title: 'My Awesome New Idea',
  youtubeVideoUrl: 'https://www.youtube.com/watch?v=I-ovzUNno7g&t=50s',
};

const CreateIdeaMutation = gql`
  mutation createIdeaMutation(
    $contributorsIds: [ID!]
    $createdById: ID
    $makeathonId: ID
    $category: [IdeaCategory!]
    $courseraVideoUrl: String
    $coverBackgroundUrl: String!
    $description: String!
    $displayOrder: Int!
    $estimatedFinishTime: DateTime!
    $howToContribute: String!
    $needMyLaptop: Boolean
    $presentLive: Boolean
    $slackUrl: String
    $slug: String!
    $startTime: DateTime!
    $tagline: String!
    $title: String!
    $youtubeVideoUrl: String
  ) {
    createIdea(
      contributorsIds: $contributorsIds
      createdById: $createdById
      makeathonId: $makeathonId
      category: $category
      courseraVideoUrl: $courseraVideoUrl
      coverBackgroundUrl: $coverBackgroundUrl
      description: $description
      displayOrder: $displayOrder
      estimatedFinishTime: $estimatedFinishTime
      howToContribute: $howToContribute
      needMyLaptop: $needMyLaptop
      presentLive: $presentLive
      slackUrl: $slackUrl
      slug: $slug
      startTime: $startTime
      tagline: $tagline
      title: $title
      youtubeVideoUrl: $youtubeVideoUrl
    ) {
      id
      category
      title
      description
      tagline
      slug
    }
  }
`;

const IdeaCreateFormHOC = compose(
  withProps(({ isEditingMode, idea = DEFAULT_IDEA, ...rest }) => ({
    idea,
    category: idea.category,
    ...rest,
  })),
  withRouter,
  graphql(CreateIdeaMutation, { name: 'createIdea' }),
  withState('needMyLaptop', 'toggleNeedMyLaptop', ({ idea }) => idea.needMyLaptop),
  withState('presentLive', 'togglePresentLive', ({ idea }) => idea.presentLive),
  withHandlers({
    handleSubmit: ({ form, needMyLaptop, presentLive, createIdea, history }) => (e) => {
      e.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          const { projectDuration, ...otherValues } = values;
          const startTime = projectDuration[0].toISOString();
          const estimatedFinishTime = projectDuration[1].toISOString();
          const variables = {
            ...otherValues,
            startTime,
            estimatedFinishTime,
            createdById: 'cj898xsy8zdfe0172p603308w',
            makeathonId: 'cj8apmwh6gvzh0172zd86j8hq',
            contributorsIds: ['cj898xsy8zdfe0172p603308w'],
          };
          createIdea({
            variables: {
              ...otherValues,
              startTime,
              estimatedFinishTime,
              createdById: 'cj898xsy8zdfe0172p603308w',
              makeathonId: 'cj8apmwh6gvzh0172zd86j8hq',
              contributorsIds: ['cj898xsy8zdfe0172p603308w'],
            },
          })
            .then((res) => {
              console.warn('res', res);
              const slug = res.data && res.data.createIdea.slug;
              if (slug) {
                history.push(`/ideas/${slug}`);
              }
            })
            .catch(error => console.warn('error', error));

          console.log(
            'Received values of form: ',
            variables,
            values,
            startTime,
            estimatedFinishTime,
            needMyLaptop,
            presentLive,
          );
        }
      });
    },
    checkUrl: ({ form }) => (rule, value, callback) => {
      if (value && !value.match(urlRegex)) {
        callback('Must input valid url');
      } else {
        callback();
      }
    },
    checkCategory: ({ form }) => (rule, value, callback) => {
      if (value && value.length === 0) {
        callback('Must select at least one category');
      } else {
        callback();
      }
    },
  }),
)(IdeaCreateForm);

export default Form.create()(IdeaCreateFormHOC);
