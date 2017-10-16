// @flow
import React from 'react';
import { Form, Row, Input, DatePicker, Col, Button, Select, InputNumber, Switch } from 'antd';
import { compose, withState, withProps, withHandlers } from 'recompose';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import randomString from 'randomstring';

import { graphql } from 'react-apollo';

import IdeaTypeSelect from 'src/components/IdeaTypeSelect';
import { urlRegex } from 'src/utils/validators';

import { DEFAULT_COVER_BG, DEFAULT_CATEGORIES, COURSERA_NAMES } from 'src/constants/appConstants';
import {
  CreateIdeaMutation,
  UpdateIdeaMutation,
  DeleteIdeaMutation,
} from 'src/constants/appQueries';

const { TextArea } = Input;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const DATE_FORMAT = 'YYYY-MM-DD';
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
  isEditingMode: boolean,
  isPresenting: boolean,
  isSuperuser: boolean,
  canDelete: boolean,
  isCreateSuccess: boolean,
  handleSubmit: () => void,
  onDeleteIdea: () => void,
  checkCategory: () => void,
  checkUrl: () => void,
  toggleNeedMyLaptop: boolean => void,
  togglePresentLive: boolean => void,
  toggleIsPresenting: boolean => void,
  form: Object,
  category: Array<string>,
  idea: {
    title: String,
    description: String,
  },
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

function IdeaAddEditFormForm({
  isEditingMode,
  isCreateSuccess,
  isSuperuser,
  isPresenting,
  canDelete,
  handleSubmit,
  form,
  checkCategory,
  checkUrl,
  idea,
  toggleNeedMyLaptop,
  togglePresentLive,
  toggleIsPresenting,
  onDeleteIdea,
}: Props) {
  const { getFieldDecorator } = form;

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <h2 className="text-xs-center font-lg m-b-2">
        {isEditingMode ? 'Editing Idea' : 'Add My Idea'}
      </h2>
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
          initialValue: idea.category,
        })(<IdeaTypeSelect />)}
      </FormItem>

      <SectionTitle title="Collaboration" />
      <FormItem {...formItemLayout} label="How to contribute" hasFeedback>
        {getFieldDecorator('howToContribute', {
          rules: [{ pattern: '.{0}|.{3,120}', message: '3 - 120 characters' }],
          initialValue: idea.howToContribute,
        })(<Input placeholder="How others can contribute" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="Contributors" hasFeedback>
        {getFieldDecorator('contributorsText', {
          initialValue: idea.contributorsText,
        })(
          <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']}>
            {COURSERA_NAMES.map(name => <Option key={name}>{name}</Option>)}
          </Select>,
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="Slack URL" hasFeedback>
        {getFieldDecorator('slackUrl', {
          initialValue: idea.slackUrl,
        })(
          <Input
            addonBefore="https://coursera.slack.com/messages/"
            placeholder="Slack url for your project"
          />,
        )}
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
      {isSuperuser && (
        <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
          <div>
            <Switch defaultChecked={idea.isPresenting} onChange={toggleIsPresenting} />
            <span className="p-l-1">Presenting in the final round (Edit by SU only)</span>
          </div>
        </FormItem>
      )}
      <FormItem style={{ textAlign: 'right' }}>
        {!isCreateSuccess && (
          <Button type="primary" htmlType="submit">
            {isEditingMode ? 'Update Idea' : 'Add Idea'}
          </Button>
        )}
        {isEditingMode &&
          canDelete && (
            <Button type="danger" onClick={onDeleteIdea} className="m-x-1">
              Delete Idea
            </Button>
          )}
        {(isEditingMode || isCreateSuccess) && (
          <Link className="m-r-1" to={`/ideas/${idea.slug}`}>
              Preview
          </Link>
        )}
        {isCreateSuccess && <Link to={`/ideas/${idea.slug}/edit`}>Edit</Link>}
      </FormItem>
    </Form>
  );
}

const DEFAULT_IDEA = {
  category: DEFAULT_CATEGORIES,
  coverBackgroundUrl: DEFAULT_COVER_BG,
  description: 'Lorem ipsum dolor, sit amet consectetur adipisicing el',
  displayOrder: 1,
  howToContribute: "Join us and let's talk more!",
  makeathonId: 'cj8apmwh6gvzh0172zd86j8hq',
  needMyLaptop: false,
  presentLive: false,
  slackUrl: 'https://coursera.slack.com/messages/makeathon',
  slug: `my-awesome-new-idea-${randomString.generate({ length: 4, capitalization: 'lowercase' })}`,
  tagline: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, dicta!',
  title: 'My Awesome New Idea',
  youtubeVideoUrl: 'https://www.youtube.com/watch?v=I-ovzUNno7g&t=50s',
  startTime: '2017-11-01T07:00:00.000Z',
  estimatedFinishTime: '2017-11-03T07:00:00.000Z',
};

const IdeaAddEditFormFormHOC = compose(
  withRouter,
  withProps(({ idea, userId, isSuperuser, ...rest }) => {
    const isEditingMode = !!idea;
    // Normalize the editing and creation data
    const ideaLocal = isEditingMode ? { ...idea } : DEFAULT_IDEA;
    ideaLocal.startTime = moment(ideaLocal.startTime || DEFAULT_IDEA.startTime, DATE_FORMAT);
    ideaLocal.estimatedFinishTime = moment(
      ideaLocal.estimatedFinishTime || DEFAULT_IDEA.estimatedFinishTime,
      DATE_FORMAT,
    );

    console.warn(
      'props',
      idea,
      isEditingMode,
      ideaLocal,
      ideaLocal.contributorsText,
      ideaLocal.startTime,
      ideaLocal.estimatedFinishTime,
    );
    let contributorsText = [];
    if (typeof ideaLocal.contributorsText === 'string' && ideaLocal.contributorsText !== '') {
      contributorsText = ideaLocal.contributorsText.split(',');
    }

    ideaLocal.contributorsText = contributorsText;
    const ideaCreatedById = idea && idea.createdBy && idea.createdBy.id;

    return {
      canDelete: isSuperuser || ideaCreatedById === userId,
      isEditingMode,
      idea: ideaLocal,
      category: ideaLocal.category,
      ...rest,
    };
  }),
  graphql(CreateIdeaMutation, { name: 'createIdea' }),
  graphql(UpdateIdeaMutation, { name: 'updateIdea' }),
  graphql(DeleteIdeaMutation, { name: 'deleteIdea' }),
  withState('needMyLaptop', 'toggleNeedMyLaptop', ({ idea }) => idea.needMyLaptop),
  withState('presentLive', 'togglePresentLive', ({ idea }) => idea.presentLive),
  withState('isPresenting', 'toggleIsPresenting', ({ idea }) => idea.isPresenting),
  withState('isCreateSuccess', 'isCreateSuccessSet', false),
  withHandlers({
    handleSubmit: ({
      idea,
      form,
      needMyLaptop,
      presentLive,
      isPresenting,
      createIdea,
      updateIdea,
      history,
      userId,
      isEditingMode,
      isCreateSuccessSet,
    }) => (e) => {
      e.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          const { projectDuration, contributorsText, ...otherValues } = values;
          const startTime = projectDuration[0].toISOString();
          const estimatedFinishTime = projectDuration[1].toISOString();
          const baseVariables = {
            ...otherValues,
            needMyLaptop,
            presentLive,
            isPresenting,
            contributorsText: contributorsText.join(','),
            startTime,
            estimatedFinishTime,
          };

          if (isEditingMode) {
            const variables = {
              ...idea,
              ...baseVariables,
            };

            updateIdea({ variables })
              .then((res) => {
                console.warn('res', res);
              })
              .catch(error => console.warn('error', error));
          } else {
            const variables = {
              ...baseVariables,
              createdById: userId,
              contributorsIds: [],
            };
            createIdea({ variables })
              .then((res) => {
                console.warn('res', res);
                isCreateSuccessSet(true);
                // const slug = res.data && res.data.createIdea.slug;
                // if (slug) {
                //   history.push(`/ideas/${slug}/edit`);
                // }
              })
              .catch(error => console.warn('error', error));
          }
        }
      });
    },
    onDeleteIdea: ({ deleteIdea, idea, history }) => () => {
      deleteIdea({ variables: { id: idea.id } })
        .then((res) => {
          console.warn('res', res);
          history.push('/ideas');
        })
        .catch(error => console.warn('error', error));
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
)(IdeaAddEditFormForm);

export default Form.create()(IdeaAddEditFormFormHOC);
