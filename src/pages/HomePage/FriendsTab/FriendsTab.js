import styled from 'styled-components'
import Theme from '../../../util/Theme/Theme'

export default styled.section`
  grid-row: 1 / -1;
  grid-column: 1 / 2;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  transition: all ${Theme.navTransitionDuration} ease-in-out;
  transform: translateX(
    ${props => (props.pageOnDisplay == "friends" ? `0` : `-5rem`)}
  );
  z-index: 2;
`;