import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import withSideEffects from 'src/withSideEffects';
import TestDiv from './mocks/TestDiv';

describe('withSideEffects', function () {
  it('should return a react component', function () {
    const Component = withSideEffects()(TestDiv);
    const elem = shallow(<Component />);
    expect(elem.html()).to.equal('<div>test</div>');
  });

  it('decorated component should be called with expected props', function () {
    const Component = withSideEffects()(TestDiv);
    const elem = shallow(<Component />);
    const props = elem.props();

    expect(props.onChange).to.be.an.function;
  });
});
