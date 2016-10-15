import React, {PropTypes} from 'react';
import map from 'lodash/map';
import noop from 'lodash/noop';

const propTypes = {
  onChange: PropTypes.func,
  onToggle: PropTypes.func
}

const defaultProps = {
  onChange: noop,
  onToggle: noop
}

const handleEvent = (name, callback) => (evt, formData, formError) => {
  const target = {
    error: formError,
    name,
    value: formData
  }
  callback({...evt, target});
}

const getComponents = (name, components, props) => {
  return map(components, (Component, idx) => (
    <Component
      {...props}
      key={`${name}-collection-${idx}`}
      onChange={handleEvent(name, props.onChange)}
      onToggle={handleEvent(name, props.onToggle)} />
  ));
}

export const collection = (name, components = []) => {
  const CollectionForm = (props) => {
    return (
      <div className='rfa-collection'>
        {getComponents(name, components, props)}
      </div>
    );
  }

  CollectionForm.propTypes = propTypes;
  return CollectionForm;
}

export default collection;
