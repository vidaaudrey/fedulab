/**
 * Setup some test globals s othat they dont' have to be required in every file.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import toJson from 'enzyme-to-json';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

global.React = React;
global.ReactDOM = ReactDOM;
global.toJson = toJson;
global.shallow = shallow;
global.mount = mount;
global.render = render;
