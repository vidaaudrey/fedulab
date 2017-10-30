// @flow
import React from 'react';
import { Form, Row, Input, DatePicker, Col, Select, InputNumber, Switch } from 'antd';
import Button from 'react-toolbox/lib/button/Button';
import { compose, withState, withProps, withHandlers, pure } from 'recompose';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import randomString from 'random-string';

import { graphql } from 'react-apollo';

import IdeaTypeSelect from 'src/components/IdeaTypeSelect';
import ImgurUploader from 'src/components/ImgurUploader';

import { urlRegex } from 'src/utils/validators';

import { DEFAULT_COVER_BG, DEFAULT_CATEGORIES, COURSERA_NAMES } from 'src/constants/appConstants';
import {
  CreateIdeaMutation,
  UpdateIdeaMutation,
  DeleteIdeaMutation,
  IdeaListQuery,
} from 'src/constants/appQueries';

const { TextArea } = Input;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

const DATE_FORMAT = 'YYYY-MM-DD';
const SLACK_URL_PREFIX = 'https://coursera.slack.com/messages/';

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

type Idea = {
  title: String,
  description: String,
};

type Props = {
  canDelete: boolean,
  category: Array<string>,
  checkCategory: () => void,
  checkUrl: () => void,
  form: Object,
  handleSubmit: () => void,
  idea: Idea,
  isCreateSuccess: boolean,
  isEditingMode: boolean,
  isPresenting: boolean,
  isSuperuser: boolean,
  onDeleteIdea: () => void,
  onImgUploaded: url => void,
  coverBackgroundUrlSet: string => void,
  toggleIsPresenting: boolean => void,
  toggleNeedMyLaptop: boolean => void,
  togglePresentLive: boolean => void,
  toggleIsBackgroundImageDark: boolean => void,
};

function SectionTitle({ title, tag: Tag = 'h3' }: { title: String, tag: String }) {
  return (
    <Row>
      <Col xs={tailFormItemLayout.wrapperCol.xs} sm={tailFormItemLayout.wrapperCol.sm}>
        <Tag className="p-t-2 m-b-1 font-weight-200">{title}</Tag>
      </Col>
    </Row>
  );
}

function IdeaAddEditFormForm({
  canDelete,
  checkCategory,
  checkUrl,
  form,
  handleSubmit,
  idea,
  isCreateSuccess,
  isEditingMode,
  isPresenting,
  isSuperuser,
  coverBackgroundUrlSet,
  onDeleteIdea,
  onImgUploaded,
  toggleIsPresenting,
  toggleNeedMyLaptop,
  togglePresentLive,
  toggleIsBackgroundImageDark,
}: Props) {
  const { getFieldDecorator } = form;

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <div className="text-xs-center m-b-2">
        <h2 className="font-xl font-weight-200">
          {isEditingMode ? 'Editing Idea' : 'Add My Idea'}{' '}
        </h2>
        <span className="font-weight-200">Learn-Make-Teach</span>
      </div>
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
        {getFieldDecorator('slackChannel', {
          initialValue: idea.slackChannel,
        })(<Input addonBefore={SLACK_URL_PREFIX} placeholder="Slack channel for your project" />)}
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
      {/* <FormItem {...formItemLayout} label="Background Image URL (TODO: File Upload)" hasFeedback>
        {getFieldDecorator('coverBackgroundUrl', {
          initialValue: idea.coverBackgroundUrl,
        })(<Input placeholder="coverBackgroundUrl" />)}
      </FormItem> */}

      <FormItem {...formItemLayout} label="Background Image URL">
        <ImgurUploader imgUrl={idea.coverBackgroundUrl} onImgUploaded={coverBackgroundUrlSet} />
        <div>
          <Switch
            defaultChecked={idea.isBackgroundImageDark}
            onChange={toggleIsBackgroundImageDark}
          />
          <span className="p-l-1">{'Is the background in image dark color?'}</span>
        </div>
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
      <FormItem style={{ textAlign: 'right' }} className="p-t-2 m-b-1">
        {!isCreateSuccess && (
          <Button
            className="m-r-1s"
            type="submit"
            label={isEditingMode ? 'Update Idea' : 'Add Idea'}
            raised
            primary
            onClick={handleSubmit}
          />
        )}
        {isEditingMode &&
          canDelete && <Button className="m-r-1s" label={'Delete Idea'} onClick={onDeleteIdea} />}
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

// 'time', 'username', 'title', 'howToContribute', 'courseraVideoUrl', 'description';

export const getDefaultIdea = () => ({
  pitchedBy: null,
  category: DEFAULT_CATEGORIES,
  coverBackgroundUrl: DEFAULT_COVER_BG,
  isBackgroundImageDark: true,
  description: 'Idea description goes here...',
  displayOrder: 1,
  howToContribute: "Join us and let's talk more!",
  makeathonId: 'cj8apmwh6gvzh0172zd86j8hq',
  needMyLaptop: false,
  presentLive: false,
  slackUrl: `${SLACK_URL_PREFIX}makeathon`,
  slug: `my-awesome-new-idea-${randomString({ length: 4 })}`,
  tagline: '',
  title: 'My Awesome New Idea',
  youtubeVideoUrl: null,
  startTime: '2017-11-01T07:00:00.000Z',
  estimatedFinishTime: '2017-11-03T07:00:00.000Z',
});

const IdeaAddEditFormFormHOC = compose(
  withRouter,
  withProps(({ idea, userId, isSuperuser, isIdeaOwner, ...rest }) => {
    const isEditingMode = !!idea;
    // Must use function for getting unique slug
    const DEFAULT_IDEA = getDefaultIdea();
    // Normalize the editing and creation data
    const ideaLocal = isEditingMode ? { ...idea } : DEFAULT_IDEA;
    ideaLocal.startTime = moment(ideaLocal.startTime || DEFAULT_IDEA.startTime, DATE_FORMAT);
    ideaLocal.estimatedFinishTime = moment(
      ideaLocal.estimatedFinishTime || DEFAULT_IDEA.estimatedFinishTime,
      DATE_FORMAT,
    );

    let contributorsText = [];
    if (typeof ideaLocal.contributorsText === 'string' && ideaLocal.contributorsText !== '') {
      contributorsText = ideaLocal.contributorsText.split(',');
    }
    if (ideaLocal.slackUrl) {
      ideaLocal.slackChannel = ideaLocal.slackUrl.split('/').pop();
    }
    ideaLocal.contributorsText = contributorsText;
    return {
      canDelete: isSuperuser || isIdeaOwner,
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
  withState(
    'isBackgroundImageDark',
    'toggleIsBackgroundImageDark',
    ({ idea }) => idea.isBackgroundImageDark,
  ),
  withState('isCreateSuccess', 'isCreateSuccessSet', false),
  withState('coverBackgroundUrl', 'coverBackgroundUrlSet', ({ idea }) => idea.coverBackgroundUrl),
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
      isBackgroundImageDark,
      coverBackgroundUrl,
    }) => (e) => {
      e.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          const { projectDuration, contributorsText, slackChannel, ...otherValues } = values;
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
            slackUrl: `${SLACK_URL_PREFIX}${slackChannel}`,
            coverBackgroundUrl,
            isBackgroundImageDark,
          };

          if (isEditingMode) {
            const variables = {
              ...idea,
              ...baseVariables,
            };
            console.warn('editing', variables);

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

            createIdea({
              variables,
              refetchQueries: [{ query: IdeaListQuery }],
            })
              .then((res) => {
                console.warn('res', res);
                history.push(`/ideas/${res.data.createIdea.slug}`);
                // isCreateSuccessSet(true);
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
