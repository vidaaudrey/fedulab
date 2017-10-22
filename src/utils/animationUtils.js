import { StyleSheet, transition } from '@coursera/coursera-ui';

const translateKeyframes = {
  '0%': {
    transform: 'translateY(100px)',
  },
  // '50%': {
  //   transform: 'translateY(20px)',
  // },

  '100%': {
    transform: 'translateY(0)',
  },
};

const opacityKeyframes = {
  from: {
    opacity: 0,
  },

  to: {
    opacity: 1,
  },
};

export default StyleSheet.create({
  slideUp: {
    animationName: [translateKeyframes, opacityKeyframes],
    animationDuration: '0.7s, 0.6s',
    animationTimingFunction: transition.easeOutFunction,
  },
  transition: transition.easeOut(),
  fadeIn: {
    animationName: [opacityKeyframes],
    animationDuration: '0.5s, 0.5s',
    animationTimingFunction: transition.easeOutFunction,
  },
  fadeInSlow: {
    animationName: [opacityKeyframes],
    animationDuration: '1.5s, 1s',
    animationTimingFunction: transition.easeOutFunction,
  },
});
