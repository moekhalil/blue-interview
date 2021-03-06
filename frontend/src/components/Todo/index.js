import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Example from '../Example';
import { fetchTasks, addTask, changeFormValue } from './actions';
import Create from './Create';
import './styles.sass';


const List = ({ tasks }) => (
  <ul className="list-group">
    { tasks.map(task => <li key={task} className="list-group-item">{task}</li>) }
  </ul>
);

List.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.string).isRequired
};


class ToDo extends Component {
  componentDidMount() {
    this.props.fetchTasks();
  }

  render() {
    const { onAdd, onChange, tasks, formValue } = this.props;

    return (
      <div>
        <Example
          header="Bonus Example"
          title="Todo List"
          description="Create and view tasks."
          result={(
            <div>
              <h5>Last Task Fetched:</h5>
              <p>{tasks.slice(-1)}</p>
            </div>
          )}
        >
          <Create onAdd={onAdd} onChange={onChange} formValue={formValue} />
          <List tasks={tasks} />
        </Example>
      </div>
    );
  }
}

ToDo.propTypes = {
  formValue: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAdd: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  fetchTasks: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    formValue: state.todo.formValue,
    tasks: state.todo.tasks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: () => dispatch(fetchTasks()),
    onChange: event => dispatch(changeFormValue(event.target.value)),
    onAdd: value => dispatch(addTask(value))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
