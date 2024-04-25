import { render } from '@testing-library/react';

import BestagonComponents from './bestagon-components';

describe('BestagonComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BestagonComponents />);
    expect(baseElement).toBeTruthy();
  });
});
