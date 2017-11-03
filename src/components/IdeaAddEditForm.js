// @flow
import React from 'react';
import { Form, Row, Input, DatePicker, Col, Select, InputNumber, Switch, Popconfirm } from 'antd';
import Button from 'react-toolbox/lib/button/Button';
import { compose, withState, withProps, withHandlers, pure } from 'recompose';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import randomString from 'random-string';

import { graphql } from 'react-apollo';
import withPromiseHandler from 'src/components/withPromiseHandler';
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
import {
  API_BEFORE_SEND,
  API_SUCCESS,
  API_ERROR,
  API_IN_PROGRESS,
} from 'src/constants/apiNotificationConstants';

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

type ApiStatusType = API_BEFORE_SEND | API_IN_PROGRESS | API_SUCCESS | API_ERROR;

type Props = {
  apiStatus: ApiStatusType,
  allowToClaimIdea: boolean,
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
  isInFinalRound: boolean,
  isSuperuser: boolean,
  onDeleteIdea: () => void,
  onImgUploaded: url => void,
  coverBackgroundUrlSet: string => void,
  toggleIsPresenting: boolean => void,
  toggleNeedMyLaptop: boolean => void,
  toggleNeedPower: boolean => void,
  toggleNeedMonitor: boolean => void,
  toggleIsMyIdea: boolean => void,
  toggleIsBackgroundImageDark: boolean => void,
  toggleIsInFinalRound: boolean => void,
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

const BUTTON_TEXT = {
  edit: {
    API_BEFORE_SEND: 'Save',
    API_IN_PROGRESS: 'Saving...',
    API_SUCCESS: 'Saved',
    API_ERROR: 'Error',
  },
  add: {
    API_BEFORE_SEND: 'Add Idea',
    API_IN_PROGRESS: 'Adding...',
    API_SUCCESS: 'Added',
    API_ERROR: 'Error',
  },
};

function IdeaAddEditFormForm({
  allowToClaimIdea,
  canDelete,
  checkCategory,
  checkUrl,
  form,
  handleSubmit,
  idea,
  isCreateSuccess,
  isEditingMode,
  isPresenting,
  isInFinalRound,
  toggleIsInFinalRound,
  isSuperuser,
  coverBackgroundUrlSet,
  onDeleteIdea,
  onImgUploaded,
  toggleIsPresenting,
  toggleNeedMyLaptop,
  toggleNeedPower,
  toggleNeedMonitor,
  toggleIsMyIdea,
  toggleIsBackgroundImageDark,
  apiStatus,
  ...rest
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
      {allowToClaimIdea && (
        <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
          <div>
            <Switch defaultChecked={idea.isMyIdea} onChange={toggleIsMyIdea} />
            <span className="p-l-1">This is my idea</span>
          </div>
        </FormItem>
      )}

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
      <FormItem {...formItemLayout} label="Description" hasFeedback>
        {getFieldDecorator('description', {
          rules: [{ required: true, message: 'Add description to your idea' }],
          initialValue: idea.description,
        })(
          <TextArea placeholder="Details about your idea" autosize={{ minRows: 2, maxRows: 6 }} />,
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="Background Image URL">
        <ImgurUploader imgUrl={idea.coverBackgroundUrl} onImgUploaded={coverBackgroundUrlSet} />
        <div>
          <Switch
            defaultChecked={idea.isBackgroundImageDark}
            onChange={toggleIsBackgroundImageDark}
          />
          <span className="p-l-1">{'Is the background image in dark color?'}</span>
        </div>
      </FormItem>
      <FormItem {...formItemLayout} label="Youtube Video URL" hasFeedback>
        {getFieldDecorator('youtubeVideoUrl', {
          rules: [{ validator: checkUrl }],
          initialValue: idea.youtubeVideoUrl,
        })(<Input type="url" placeholder="Youtube video url for your project" />)}
      </FormItem>

      <FormItem {...formItemLayout} label="Slides URL" hasFeedback>
        {getFieldDecorator('slidesUrl', {
          rules: [{ validator: checkUrl }],
          initialValue: idea.slidesUrl,
        })(<Input type="url" placeholder="Slides for your presentation" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="Google Docs URL" hasFeedback>
        {getFieldDecorator('docsUrl', {
          rules: [{ validator: checkUrl }],
          initialValue: idea.docsUrl,
        })(<Input type="url" placeholder="Google docs for your idea" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="Video or other file URL" hasFeedback>
        {getFieldDecorator('courseraVideoUrl', {
          rules: [{ validator: checkUrl }],
          initialValue: idea.courseraVideoUrl,
        })(<Input type="url" placeholder="Google Drive video url, or other file url" />)}
      </FormItem>

      <SectionTitle title="Presentation" />
      <FormItem {...formItemLayout} label="Display Order" hasFeedback>
        {getFieldDecorator('displayOrder', {
          initialValue: idea.displayOrder,
        })(<InputNumber min={1} />)}
      </FormItem>
      <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
        <div>
          <Switch defaultChecked={idea.needPower} onChange={toggleNeedPower} />
          <span className="p-l-1">I need a power outlet</span>
        </div>
      </FormItem>
      <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
        <div>
          <Switch defaultChecked={idea.needMonitor} onChange={toggleNeedMonitor} />
          <span className="p-l-1">I need a monitor</span>
        </div>
      </FormItem>
      <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
        <div>
          <Switch defaultChecked={idea.needMyLaptop} onChange={toggleNeedMyLaptop} />
          <span className="p-l-1">I'm presenting on my laptop</span>
        </div>
      </FormItem>
      <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
        <div>
          <Switch defaultChecked={idea.isPresenting} onChange={toggleIsPresenting} />
          <span className="p-l-1"> I'm Demoing </span>
        </div>
      </FormItem>
      {isSuperuser && (
        <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
          <div>
            <Switch defaultChecked={idea.isInFinalRound} onChange={toggleIsInFinalRound} />
            <span className="p-l-1"> This is in Final Presentations. (SU Only) </span>
          </div>
        </FormItem>
      )}
      <FormItem style={{ textAlign: 'right' }} className="p-t-2 m-b-1">
        {!isCreateSuccess && (
          <Button
            className="m-r-1s"
            type="submit"
            label={isEditingMode ? BUTTON_TEXT.edit[apiStatus] : BUTTON_TEXT.add[apiStatus]}
            raised
            primary
            onClick={handleSubmit}
          />
        )}
        {isEditingMode &&
          canDelete && (
            <Popconfirm
              placement="top"
              title={'Are you sure?'}
              onConfirm={onDeleteIdea}
              okText="Yes"
              cancelText="No"
            >
              <Button icon="delete" style={{ minWidth: 32 }} />
            </Popconfirm>
          )}
        {(isEditingMode || isCreateSuccess) && (
          <Link to={`/ideas/${idea.slug}`}>
            <Button icon="visibility" style={{ minWidth: 32 }} />
          </Link>
        )}
        {(isEditingMode || isCreateSuccess) && (
          <Link to={`/ideas/${idea.slug}/show`}>
            <Button icon="airplay" style={{ minWidth: 32 }} />
          </Link>
        )}
        {isCreateSuccess && (
          <Link to={`/ideas/${idea.slug}/edit`}>
            <Button icon="mode_edit" style={{ minWidth: 32 }} />
          </Link>
        )}
      </FormItem>
    </Form>
  );
}

// 'time', 'username', 'title', 'howToContribute', 'courseraVideoUrl', 'description';
const randomSlugSurfix = randomString({ length: 4 });
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
  needPower: false,
  needMonitor: false,
  slackUrl: `${SLACK_URL_PREFIX}makeathon`,
  slug: `my-awesome-new-idea-${randomSlugSurfix}`,
  tagline: '',
  title: 'My Awesome New Idea',
  youtubeVideoUrl: null,
  slidesUrl: null,
  courseraVideUrl: null,
  docsUrls: null,
  startTime: '2017-11-01T07:00:00.000Z',
  estimatedFinishTime: '2017-11-03T07:00:00.000Z',
});

const IdeaAddEditFormFormHOC = compose(
  withRouter,
  pure,
  withProps(({ idea, userId, userEmail, isSuperuser, isIdeaOwner, ...rest }) => {
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

    const allowToClaimIdea = ideaLocal.pitchedBy === userEmail;
    ideaLocal.isMyIdea = allowToClaimIdea;

    return {
      allowToClaimIdea,
      canDelete: isSuperuser || isIdeaOwner,
      isEditingMode,
      idea: ideaLocal,
      category: ideaLocal.category,
      ...rest,
    };
  }),
  withPromiseHandler({ shouldResetToDefaultStatus: true }),
  graphql(CreateIdeaMutation, { name: 'createIdea' }),
  graphql(UpdateIdeaMutation, { name: 'updateIdea' }),
  graphql(DeleteIdeaMutation, { name: 'deleteIdea' }),
  withState('needMyLaptop', 'toggleNeedMyLaptop', ({ idea }) => idea.needMyLaptop),
  withState('needPower', 'toggleNeedPower', ({ idea }) => idea.needPower),
  withState('needMonitor', 'toggleNeedMonitor', ({ idea }) => idea.needMonitor),
  withState('isMyIdea', 'toggleIsMyIdea', ({ idea }) => idea.isMyIdea),
  withState('isPresenting', 'toggleIsPresenting', ({ idea }) => idea.isPresenting),
  withState('isInFinalRound', 'toggleIsInFinalRound', ({ idea }) => idea.isInFinalRound),
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
      needPower,
      needMonitor,
      isMyIdea,
      isPresenting,
      isInFinalRound,
      createIdea,
      updateIdea,
      history,
      userId,
      isEditingMode,
      isCreateSuccessSet,
      isBackgroundImageDark,
      coverBackgroundUrl,
      handlePromise,
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
            needPower,
            needMonitor,
            isPresenting,
            isInFinalRound,
            contributorsText: contributorsText.join(', '),
            startTime,
            estimatedFinishTime,
            slackUrl: `${SLACK_URL_PREFIX}${slackChannel}`,
            coverBackgroundUrl,
            isBackgroundImageDark,
          };

          let apiPromiseFn;

          if (isEditingMode) {
            const variables = {
              ...idea,
              ...baseVariables,
            };

            if (isMyIdea) {
              variables.createdById = userId;
            }

            if (isMyIdea) {
              variables.createdById = userId;
            }
            console.warn('variable', variables);

            apiPromiseFn = () => updateIdea({ variables });
          } else {
            const variables = {
              ...baseVariables,
              createdById: userId,
              contributorsIds: [],
            };

            apiPromiseFn = () =>
              createIdea({
                variables,
                refetchQueries: [{ query: IdeaListQuery }],
              });
          }

          handlePromise({
            apiPromiseFn,
            apiSuccessCallback: (res) => {
              if (!isEditingMode) {
                history.push(`/ideas/${res.data.createIdea.slug}`);
              }
            },
          });
        }
      });
    },
    onDeleteIdea: ({ deleteIdea, idea, history, handlePromise }) => () => {
      handlePromise({
        apiPromiseFn: () => deleteIdea({ variables: { id: idea.id } }),
        apiSuccessCallback: (res) => {
          history.push('/ideas');
        },
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
)(IdeaAddEditFormForm);

export default Form.create()(IdeaAddEditFormFormHOC);
