import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface BestagonComponentsEmotionProps {}

const StyledBestagonComponentsEmotion = styled.div`
  color: pink;
`;

export function BestagonComponentsEmotion(
  props: BestagonComponentsEmotionProps
) {
  return (
    <StyledBestagonComponentsEmotion>
      <h1>Welcome to BestagonComponentsEmotion!</h1>
    </StyledBestagonComponentsEmotion>
  );
}

export default BestagonComponentsEmotion;
