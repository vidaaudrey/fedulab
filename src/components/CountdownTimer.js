// @flow
import React from 'react';
import { css, StyleSheet, Box } from '@coursera/coursera-ui';

import BANNER_BG from 'src/assets/imgs/banner_bg.jpg';

const MILLIS_PER_SECOND = 1000;
const MILLIS_PER_MINUTE = MILLIS_PER_SECOND * 60;
const MILLIS_PER_HOUR = MILLIS_PER_MINUTE * 60;
const MILLIS_PER_DAY = MILLIS_PER_HOUR * 24;

const CONFIG = {
  minHeight: 400,
  timerBoxSize: 175,
};

const styles = StyleSheet.create({
  timerContainer: {
    minHeight: CONFIG.minHeight,
    background: `
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url(${BANNER_BG})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
  },
  timerBox: {
    width: CONFIG.timerBoxSize,
    height: CONFIG.timerBoxSize,
    margin: '1rem',
    border: '8px solid white',
    borderRadius: '15%',
  },
  timerNumber: {
    fontSize: '4rem',
    fontWeight: 900,
    color: 'white',
  },
  timerText: {
    margin: '-10px 0 10px 0',
  },
  description: {
    fontSize: '2rem',
    fontWeight: '200',
  },
});

type Props = {
  startTime: Date,
  endTime: Date,
  description: string,
};

type State = {
  timeRemaining: {
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
  },
};

function getPluralText(number: number, string: string) {
  return `${string}${number === 1 ? '' : 's'}`;
}

export default class CountdownTimer extends React.Component<Props, State> {
  state = {
    timeRemaining: this.getTimeRemaining(),
  };

  componentDidMount() {
    this.updateIntervalHandle = setInterval(() => {
      this.setState({ timeRemaining: this.getTimeRemaining() });
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.updateIntervalHandle);
  }

  getTimeRemaining() {
    const { endTime } = this.props;
    const now = new Date();

    const timeLeft = endTime - now;

    return {
      days: Math.floor(timeLeft / MILLIS_PER_DAY),
      hours: Math.floor((timeLeft % MILLIS_PER_DAY) / MILLIS_PER_HOUR),
      minutes: Math.floor((timeLeft % MILLIS_PER_HOUR) / MILLIS_PER_MINUTE),
      seconds: Math.floor((timeLeft % MILLIS_PER_MINUTE) / MILLIS_PER_SECOND),
    };
  }
  updateIntervalHandle = undefined;

  render() {
    const { description } = this.props;
    const { days, hours, minutes, seconds } = this.state.timeRemaining;

    return (
      <Box
        rootClassName={styles.timerContainer}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box rootClassName="p-y-1" justifyContent="center">
          {days > 0 && (
            <Box
              rootClassName={styles.timerBox}
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <h1 {...css(styles.timerNumber)}>{days}</h1>
              <p {...css(styles.timerText)}>{getPluralText(days, 'day')}</p>
            </Box>
          )}
          <Box
            rootClassName={styles.timerBox}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <h1 {...css(styles.timerNumber)}>{hours}</h1>
            <p {...css(styles.timerText)}>{getPluralText(hours, 'hour')}</p>
          </Box>
          <Box
            rootClassName={styles.timerBox}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <h1 {...css(styles.timerNumber)}>{minutes}</h1>
            <p {...css(styles.timerText)}>{getPluralText(minutes, 'minute')}</p>
          </Box>
          <Box
            rootClassName={styles.timerBox}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <h1 {...css(styles.timerNumber)}>{seconds}</h1>
            <p {...css(styles.timerText)}>{getPluralText(seconds, 'second')}</p>
          </Box>
        </Box>
        {description && <p {...css(styles.description)}>{description}</p>}
      </Box>
    );
  }
}
