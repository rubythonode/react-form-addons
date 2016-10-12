import React, {PropTypes} from 'react';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import map from 'lodash/map';

const propTypes = {
  classNames: PropTypes.string
}

const defaultProps = {
  classNames: ''
}

const isComponentActive = (validationKey, formData, props = {}) => {
  if (isFunction(validationKey)) {
    return validationKey(formData, props);
  }
  return get(formData, validationKey);
}

const processEntry = (entry, props) => {
  const validationKey = get(entry, 1);
  const formData = get(props, 'formData');
  if (isComponentActive(validationKey, formData, props)) {
    return get(entry, 0);
  }
  return void 0;
}

const parseToComponent = (entry, props) => {
  if (Array.isArray(entry)) {
    return processEntry(entry, props);
  }
  return entry;
}

const initComponents = (components) => (props) => {
  return map(components, (entry, key) => {
    const Component = parseToComponent(entry, props);
    return Component ? <Component {...props} key={key} /> : null;
  });
}

export const createForm = (components = []) => {
  const getComponents = initComponents(components);

  function CreatedForm(props) {
    const classes = `rfa-form ${props.className}`;
    return <div className={classes}>{getComponents(props)}</div>;
  }

  CreatedForm.propTypes = propTypes;
  CreatedForm.defaultProps = defaultProps;
  return CreatedForm;
}

export default createForm;
