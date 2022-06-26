import { CSSProp, css } from 'styled-components';

export const mobile = (props: CSSProp) => {
  return css`
    @media only screen and (max-width: 600px) {
      ${props}
    }
  `;
};
