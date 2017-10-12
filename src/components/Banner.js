import React from 'react';
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';

const BgElement = Element.BgElement;

export default function Banner() {
  return (
    <BannerAnim prefixCls="banner-user" autoPlay style={{ minHeight: 200 }}>
      <Element prefixCls="banner-user-elem p-y-3 p-x-2" key="0">
        <BgElement
          key="bg"
          className="bg"
          style={{
            background: '#364D79',
          }}
        />
        <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
          <h2 className="color-white">Awesome Idea 1</h2>
        </TweenOne>
        <TweenOne
          className="banner-user-text"
          animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora, molestias.
        </TweenOne>
      </Element>
      <Element prefixCls="banner-user-elem p-y-3 p-x-2" key="1">
        <BgElement
          key="bg"
          className="bg"
          style={{
            background: '#64CBCC',
          }}
        />
        <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
          <h2 className="color-white">Awesome Idea 2</h2>
        </TweenOne>
        <TweenOne
          className="banner-user-text"
          animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
        >
          Lorem ipsum dolor sit amet consectetur.
        </TweenOne>
      </Element>
      <Element prefixCls="banner-user-elem p-y-3 p-x-2" key="2">
        <BgElement
          key="bg"
          className="bg"
          style={{
            background: '#64CBCC',
          }}
        />
        <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
          <h2 className="color-white">Awesome Idea 3</h2>
        </TweenOne>
        <TweenOne
          className="banner-user-text"
          animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
        >
          Nulla cumque quibusdam vero voluptate vitae libero. Quos quaerat facilis aut nemo.
        </TweenOne>
      </Element>
    </BannerAnim>
  );
}
