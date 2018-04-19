import React, { PropTypes } from 'react';
import styles from './Note.css';
import Edit from '../../components/Edit';

const Note = props =>
  <li className={styles.Note}>{props.children}</li>;

Note.propTypes = {
  children: PropTypes.any,
};

export default Note;