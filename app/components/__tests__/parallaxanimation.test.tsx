import { render } from '@testing-library/react';
import ParallaxAnimation from '../parallaxanimation';

describe('ParallaxAnimation', () => {
  it('renders the arrow button', () => {
    const { container } = render(<ParallaxAnimation />);
    expect(container.querySelector('#arrow-btn')).toBeInTheDocument();
  });
});
