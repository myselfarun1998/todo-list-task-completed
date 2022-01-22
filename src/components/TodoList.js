import React from 'react';
import { Component } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

const emojiList = {
  one: '😃',
  two: '😏',
  three: '😭',
};

const emojiNameList = {
  one: 'Smile',
  two: 'Sad',
  three: 'Cry',
};

class TodoList extends Component {
  constructor() {
    super();
    const d = new Date();
    let m = d.getMonth() + 1;
    let date = d.getDate();
    if (m < 10) {
      m = '0' + m;
    }
    if (date < 10) {
      date = '0' + date;
    }
    this.dateval = d.getFullYear() + '-' + m + '-' + date;
    console.log(this.dateval);
    this.time = d.getHours() + ':' + d.getMinutes();
    this.formBasicDate = React.createRef();
    this.formBasicTime = React.createRef();
    this.formBasicTaskTitle = React.createRef();
    this.state = {
      todoList: [],
      currentTodo: {
        taskTitle: '',
        date: '',
        time: '',
        emoji: '',
      },
      isEditMode: false,
      editTodoId: '',
    };
    this.edit = 'submit';
  }
  updateTodo = (event) => {
    if (this.edit === 'submit') {
      this.edit = 'update';
    } else {
      this.edit = 'submit';
    }
  };

  addTodo = (event) => {
    event.preventDefault();

    const { taskTitle, date, time, emoji } = this.state.currentTodo;

    if (!taskTitle || !emoji) {
      return alert('Fill all the details ');
    }

    const newTodo = {
      taskTitle,
      date,
      time,
      emoji,
      id: this.state.isEditMode ? this.state.editTodoId : Date.now().toString(),
    };

    if (this.state.isEditMode) {
      const currentTodoIndex = this.state.todoList.findIndex(
        (todo) => todo.id === this.state.editTodoId
      );
      this.setState((prev) => {
        const currentList = [...prev.todoList];
        currentList[currentTodoIndex] = newTodo;

        return {
          ...prev,
          todoList: currentList,
          currentTodo: { taskTitle: '', date: '', time: '', emoji: '' },
          isEditMode: false,
          editTodoId: '',
        };
      });
    } else {
      this.setState((prev) => {
        return {
          ...prev,
          todoList: [...prev.todoList, newTodo],
          currentTodo: { taskTitle: '', date: '', time: '', emoji: '' },
        };
      });
    }
  };

  editTodo = (id) => {
    if (this.edit === 'submit') {
      this.edit = 'update';
    }
    const neededTodo = this.state.todoList.find((todo) => todo.id === id);

    this.setState((prev) => {
      return {
        ...prev,
        currentTodo: {
          taskTitle: neededTodo.taskTitle,
          date: neededTodo.date,
          time: neededTodo.time,
          emoji: neededTodo.emoji,
        },
        isEditMode: true,
        editTodoId: neededTodo.id,
      };
    });
  };

  deleteTodo = (id) => {
    this.setState((prev) => {
      return {
        ...prev,
        todoList: prev.todoList.filter((todo) => todo.id !== id),
      };
    });
  };

  handleChangeValues = (e) => {
    this.setState((prev) => {
      return {
        ...prev,
        currentTodo: { ...prev.currentTodo, [e.target.name]: e.target.value },
      };
    });
  };

  handleEmojiChange = (value) => {
    this.setState((prev) => {
      return {
        ...prev,
        currentTodo: { ...prev.currentTodo, emoji: value },
      };
    });
  };

  render() {
    console.log(this.state.todoList);
    return (
      <>
        <Form onSubmit={this.addTodo}>
          <Form.Group controlId="formBasicDate">
            <Form.Label className="lab">Select The date:</Form.Label>
            <Form.Control
              className="text"
              type="date"
              placeholder="mm/dd/yyyy"
              // value={this.state.currentTodo.date}
              onChange={this.handleChangeValues}
              name="date"
              ref={this.formBasicDate}
              defaultValue={this.dateval}
            />
          </Form.Group>
          <Form.Group controlId="formBasicTime">
            <Form.Label className="lab">Select The Time:</Form.Label>
            <Form.Control
              className="text"
              type="time"
              placeholder="Enter the Time"
              name="time"
              defaultValue={this.time}
              // value={this.state.currentTodo.time}
              onChange={this.handleChangeValues}
              ref={this.formBasicTime}
            />
          </Form.Group>
          <Form.Group controlId="formBasicTaskTitle">
            <Form.Label className="lab">write your today task:</Form.Label>
            <Form.Control
              className="text"
              type="text"
              placeholder="write something about your Task"
              name="taskTitle"
              // value={this.state.currentTodo.taskTitle}
              onChange={this.handleChangeValues}
              ref={this.formBasicTaskTitle}
            />
          </Form.Group>
          <label>Whats your feeling today</label> <br />
          <div className="">
            <Button
              className="emo"
              name="emjio"
              value="😃"
              onClick={() => this.handleEmojiChange('one')}
              style={{
                backgroundColor:
                  this.state.currentTodo.emoji === 'one' ? 'red' : '#041562',
                borderStyle: 'dotted',
              }}
              class="btn btn-primary btn-lg active"
            >
              😃
            </Button>
            <Button
              className="emo"
              name="emjio"
              value="😏"
              onClick={() => this.handleEmojiChange('two')}
              style={{
                backgroundColor:
                  this.state.currentTodo.emoji === 'two' ? 'red' : '#041562',
                borderStyle: 'dotted',
              }}
              class="btn btn-primary btn-lg active"
            >
              😏
            </Button>
            <Button
              className="emo"
              name="emjio"
              value="😭"
              onClick={() => this.handleEmojiChange('three')}
              style={{
                backgroundColor:
                  this.state.currentTodo.emoji === 'three' ? 'red' : '#041562',
                borderStyle: 'dotted',
              }}
              class="btn btn-primary btn-lg active"
            >
              😭
            </Button>
          </div>
          {this.edit === 'submit' && (
            <Button
              type="submit"
              style={{ marginTop: '12%' }}
              className="success"
            >
              Submit
            </Button>
          )}
          {this.edit === 'update' && (
            <Button
              type="submit"
              style={{ marginTop: '12%' }}
              className="success"
              onClick={this.updateTodo}
            >
              update
            </Button>
          )}
        </Form>
        <div className="box">
          <ListGroup className="list text-white">
            {this.state.todoList.length
              ? this.state.todoList.map((task, index) => {
                  return (
                    <ListGroup.Item
                      style={{ backgroundColor: '#041562', color: 'white' }}
                      key={task.id}
                      variant="success"
                    >
                      <div className="emoji">
                        {emojiList[task.emoji]}&nbsp;&nbsp;
                        {emojiNameList[task.emoji]}
                      </div>
                      <div className="disc">{task.taskTitle}&nbsp;&nbsp; </div>
                      <p className="txt">
                        {' '}
                        {task.date}&nbsp;&nbsp; {task.time}
                      </p>
                      <Button
                        style={{ marginLeft: '50px' }}
                        className="edit"
                        type="button"
                        onClick={() => this.editTodo(task.id)}
                        value={index}
                      >
                        Edit
                      </Button>
                      <Button
                        style={{ marginLeft: '20px' }}
                        className="delete"
                        type="button"
                        variant="danger"
                        onClick={() => this.deleteTodo(task.id)}
                        value={index}
                      >
                        Delete
                      </Button>
                    </ListGroup.Item>
                  );
                })
              : "You  dont have Any Todo's Today"}
          </ListGroup>
        </div>
      </>
    );
  }
}

export default TodoList;
