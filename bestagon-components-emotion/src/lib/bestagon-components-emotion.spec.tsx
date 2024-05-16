import { render } from '@testing-library/react';

import BestagonComponentsEmotion from './bestagon-components-emotion';

describe('BestagonComponentsEmotion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BestagonComponentsEmotion />);
    expect(baseElement).toBeTruthy();
  });
});
