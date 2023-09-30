import React, { Component } from 'react'

export class Widgets extends Component {
  constructor(props){
    super(props)
    this.state = {
      todos: [
        {
            id: 1,
            task: 'Level up for Antony',
            isCompleted: false
        },
        {
            id: 2,
            task: 'Follow up of team zilla',
            isCompleted: true
        },
        {
            id: 3,
            task: 'Project meeting with CEO',
            isCompleted: false
        },
        {
            id: 4,
            task: 'Duplicate a project for new customer',
            isCompleted: true
        }
      ],
      inputValue: '',
    }
    this.statusChangedHandler = this.statusChangedHandler.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }
  statusChangedHandler(event, id) {

    //const todoIndex = this.state.todos.findIndex( t => t.id === id );
    const todo = {...this.state.todos[id]};
    todo.isCompleted = event.target.checked;

    const todos = [...this.state.todos];
    todos[id] = todo;

    this.setState({
        todos: todos
    })
  }

  addTodo (event) {
      event.preventDefault();

      const todos = [...this.state.todos];
      todos.unshift({
          id: todos.length ? todos[todos.length - 1].id + 1 : 1,
          task: this.state.inputValue,
          isCompleted: false
          
      })

      this.setState({
          todos: todos,
          inputValue: ''
      })
  }

  removeTodo (index) {
      const todos = [...this.state.todos];
      todos.splice(index, 1);

      this.setState({
          todos: todos
      })
  }

  inputChangeHandler(event) {
      this.setState({
          inputValue: event.target.value
      });
  }
  
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="d-sm-flex flex-row flex-wrap text-center text-sm-left align-items-center">
                  <img src={require("../../assets/images/faces/face11.jpg")} className="img-lg rounded" alt="profile icon" />
                  <div className="ms-xl-3 mt-2 mt-xl-0">
                    <h6 className="text-dark">Maria</h6>
                    <p className="text-muted">maria@gmail.com</p>
                    <p className="mt-2 text-success font-weight-bold">Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="d-sm-flex flex-row flex-wrap text-center text-sm-left align-items-center">
                  <img src={require("../../assets/images/faces/face9.jpg")} className="img-lg rounded" alt="profile icon" />
                  <div className="ms-xl-3 mt-2 mt-xl-0">
                    <h6 className="text-dark">Thomas Edison</h6>
                    <p className="text-muted">thomas@gmail.com</p>
                    <p className="mt-2 text-success font-weight-bold">Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="d-sm-flex flex-row flex-wrap text-center text-sm-left align-items-center">
                  <img src={require("../../assets/images/faces/face12.jpg")} className="img-lg rounded" alt="profile icon" />
                  <div className="ms-xl-3 mt-2 mt-xl-0">
                    <h6 className="text-dark">Edward</h6>
                    <p className="text-muted">edward@gmail.com</p>
                    <p className="mt-2 text-success font-weight-bold">Tester</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-6 col-xl-3 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Todays Income</h4>
                <div className="d-flex justify-content-between">
                  <p className="text-muted">Avg. Session</p>
                  <p className="text-muted">max: 40</p>
                </div>
                <div className="progress progress-md">
                  <div className="progress-bar bg-info w-25" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-xl-3 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Total Revenue</h4>                      
                <div className="d-flex justify-content-between">
                  <p className="text-muted">Avg. Session</p>
                  <p className="text-muted">max: 120</p>
                </div>
                <div className="progress progress-md">
                  <div className="progress-bar bg-success w-25" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-xl-3 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Pending Product</h4>
                <div className="d-flex justify-content-between">
                  <p className="text-muted">Avg. Session</p>
                  <p className="text-muted">max: 54</p>
                </div>
                <div className="progress progress-md">
                  <div className="progress-bar bg-danger w-25" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-xl-3 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Sales</h4>
                <div className="d-flex justify-content-between">
                  <p className="text-muted">Avg. Session</p>
                  <p className="text-muted">max: 143</p>
                </div>
                <div className="progress progress-md">
                  <div className="progress-bar bg-warning w-25" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 grid-margin">
            <div className="card d-flex align-items-center">
              <div className="card-body">
                <div className="d-flex flex-row align-items-center">
                  <i className="ti-facebook text-facebook icon-md"></i>
                  <div className="ms-3">
                    <h6 className="text-facebook">50k likes</h6>
                    <p className="mt-2 text-muted card-text">You main list growing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin">
            <div className="card d-flex align-items-center">
              <div className="card-body">
                <div className="d-flex flex-row align-items-center">
                  <i className="ti-youtube text-youtube icon-md"></i>
                  <div className="ms-3">
                    <h6 className="text-youtube">2.62k Subscribers</h6>
                    <p className="mt-2 text-muted card-text">You main list growing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin">
            <div className="card d-flex align-items-center">
              <div className="card-body">
                <div className="d-flex flex-row align-items-center">
                  <i className="ti-twitter-alt text-twitter icon-md"></i>
                  <div className="ms-3">
                    <h6 className="text-twitter">3k followers</h6>
                    <p className="mt-2 text-muted card-text">You main list growing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 grid-margin">
            <div className="card bg-facebook d-flex align-items-center">
              <div className="card-body">
                <div className="d-flex flex-row align-items-center">
                  <i className="ti-facebook text-white icon-md"></i>
                  <div className="ms-3">
                    <h6 className="text-white">50k likes</h6>
                    <p className="mt-2 text-white card-text">You main list growing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin">
            <div className="card bg-linkedin d-flex align-items-center">
              <div className="card-body">
                <div className="d-flex flex-row align-items-center">
                  <i className="ti-linkedin text-white icon-md"></i>
                  <div className="ms-3">
                    <h6 className="text-white">5k connections</h6>
                    <p className="mt-2 text-white card-text">You main list growing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin">
            <div className="card bg-twitter d-flex align-items-center">
              <div className="card-body">
                <div className="d-flex flex-row align-items-center">
                  <i className="ti-twitter-alt text-white icon-md"></i>
                  <div className="ms-3">
                    <h6 className="text-white">3k followers</h6>
                    <p className="mt-2 text-white card-text">You main list growing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">To Do Lists</h4>
                <div className="list-wrapper">
                    <ul className="d-flex flex-column todo-list">
                        {this.state.todos.map((todo, index) =>{
                            return <ListItem 
                            isCompleted={todo.isCompleted}
                            changed={(event) => this.statusChangedHandler(event, index)}
                            key={todo.id}
                            remove={() => this.removeTodo(index) }
                            >
                              {todo.task}
                            </ListItem>
                        })}
                    </ul>
                </div>
                <form  className="add-items d-flex" onSubmit={this.addTodo}>
                  <input 
                      type="text" 
                      className="form-control h-auto" 
                      placeholder="Add new task" 
                      value={this.state.inputValue} 
                      onChange={this.inputChangeHandler}
                      required />
                  <button type="submit" className="btn btn-icon text-primary todo-list-add-btn bg-transparent"><i className="ti-location-arrow"></i></button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Recommended</h4>
                <div className="d-flex align-items-center pb-3 border-bottom">
                  <img className="img-sm rounded-circle" src={require("../../assets/images/faces/face5.jpg")} alt="profile"/>
                  <div className="ms-3">
                    <h6 className="mb-1">Stella Davidson</h6>
                    <small className="text-muted mb-0"><i className="ti-location-pin me-1"></i>New York City, USA</small>
                  </div>
                  <i className="ti-check font-weight-bold ms-auto px-1 py-1 text-info"></i>
                </div>
                <div className="d-flex align-items-center py-3 border-bottom">
                  <img className="img-sm rounded-circle" src={require("../../assets/images/faces/face6.jpg")} alt="profile"/>
                  <div className="ms-3">
                    <h6 className="mb-1">Daniel Russel</h6>
                    <small className="text-muted mb-0"><i className="ti-location-pin me-1"></i>Florida, USA</small>
                  </div>
                  <i className="ti-plus font-weight-bold ms-auto px-1 py-1 text-success"></i>
                </div>
                <div className="d-flex align-items-center py-3 border-bottom">
                  <img className="img-sm rounded-circle" src={require("../../assets/images/faces/face7.jpg")} alt="profile"/>
                  <div className="ms-3">
                    <h6 className="mb-1">Bruno King</h6>
                    <small className="text-muted mb-0"><i className="ti-location-pin me-1"></i>Arkansas, USA</small>
                  </div>
                  <i className="ti-plus font-weight-bold ms-auto px-1 py-1 text-success"></i>
                </div>
                <div className="d-flex align-items-center py-3 border-bottom">
                  <img className="img-sm rounded-circle" src={require("../../assets/images/faces/face8.jpg")} alt="profile"/>
                  <div className="ms-3">
                    <h6 className="mb-1">David Moore</h6>
                    <small className="text-muted mb-0"><i className="ti-location-pin me-1"></i>Arizon, USA</small>
                  </div>
                  <i className="ti-check font-weight-bold ms-auto px-1 py-1 text-info"></i>
                </div>
                <div className="d-flex align-items-center pt-3">
                  <img className="img-sm rounded-circle" src={require("../../assets/images/faces/face9.jpg")} alt="profile"/>
                  <div className="ms-3">
                    <h6 className="mb-1">Rafell John</h6>
                    <small className="text-muted mb-0"><i className="ti-location-pin me-1"></i>Alaska, USA</small>
                  </div>
                  <i className="ti-plus font-weight-bold ms-auto px-1 py-1 text-success"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="card-body">
									<h4 className="card-title">Updates</h4>
									<ul className="bullet-line-list">
										<li>
											<h6>User confirmation</h6>
											<p>Lorem Ipsum is simply dummy text of the printing </p>
											<p className="text-muted mb-4">
												<i className="ti-time"></i>
												7 months ago.
											</p>
										</li>
										<li>
											<h6>Continuous evaluation</h6>
											<p>Lorem Ipsum is simply dummy text of the printing </p>
											<p className="text-muted mb-4">
												<i className="ti-time"></i>
												7 months ago.
											</p>
										</li>
										<li>
											<h6>Promotion</h6>
											<p>Lorem Ipsum is simply dummy text of the printing </p>
											<p className="text-muted">
												<i className="ti-time"></i>
												7 months ago.
											</p>
										</li>
									</ul>
								</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 grid-margin grid-margin-md-0 stretch-card">
            <div className="card">
              <div className="card-body text-center">
                <div>
                  <img src={require("../../assets/images/faces/face5.jpg")} className="img-lg rounded-circle mb-2" alt="profile"/>
                  <h4>Maria Johnson</h4>
                  <p className="text-muted mb-0">Developer</p>
                </div>
                <p className="mt-2 card-text">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Lorem
                </p>
                <button className="btn btn-info btn-sm mt-3 mb-4">Follow</button>
                <div className="border-top pt-3">
                  <div className="row">
                    <div className="col-4">
                      <h6>5896</h6>
                      <p>Post</p>
                    </div>
                    <div className="col-4">
                      <h6>1596</h6>
                      <p>Followers</p>
                    </div>
                    <div className="col-4">
                      <h6>7896</h6>
                      <p>Likes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7 grid-margin grid-margin-md-0 stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Tickets</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="pt-1 pl-0">
                          Assigned
                        </th>
                        <th className="pt-1">
                          Product
                        </th>
                        <th className="pt-1">
                          Priority
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-1 pl-0">
                          <div className="d-flex align-items-center">
                            <img src={require("../../assets/images/faces/face1.jpg")} alt="profile"/>
                            <div className="ms-3">
                              <p className="mb-0">Sophia Brown</p>
                              <p className="mb-0 text-muted text-small">Product Designer</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          Web App
                        </td>
                        <td>
                          <label className="badge badge-success">Low</label>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1 pl-0">
                          <div className="d-flex align-items-center">
                            <img src={require("../../assets/images/faces/face6.jpg")} alt="profile"/>
                            <div className="ms-3">
                              <p className="mb-0">Rachel Newton</p>
                              <p className="mb-0 text-muted text-small">Mobile Developer</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          Mobile App
                        </td>
                        <td>
                          <label className="badge badge-warning">Medium</label>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1 pl-0">
                          <div className="d-flex align-items-center">
                            <img src={require("../../assets/images/faces/face15.jpg")} alt="profile"/>
                            <div className="ms-3">
                              <p className="mb-0">Marcus Stevens</p>
                              <p className="mb-0 text-muted text-small">Core Developer</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          Plugin
                        </td>
                        <td>
                          <label className="badge badge-danger">High</label>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1 pl-0">
                          <div className="d-flex align-items-center">
                            <img src={require("../../assets/images/faces/face2.jpg")} alt="profile"/>
                            <div className="ms-3">
                              <p className="mb-0">Theresa Becker</p>
                              <p className="mb-0 text-muted text-small">Product Designer</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          Web App
                        </td>
                        <td>
                          <label className="badge badge-success">Low</label>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1 pl-0">
                          <div className="d-flex align-items-center">
                            <img src={require("../../assets/images/faces/face3.jpg")} alt="profile"/>
                            <div className="ms-3">
                              <p className="mb-0">Jessie Ortiz</p>
                              <p className="mb-0 text-muted text-small">Web Developer</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          SAAS App
                        </td>
                        <td>
                          <label className="badge badge-danger">High</label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const ListItem = (props) => {
    
  return (
      <li className={(props.isCompleted ? 'completed' : null)}>
          <div className="form-check">
              <label htmlFor="" className="form-check-label"> 
                  <input className="checkbox" type="checkbox" 
                      checked={props.isCompleted} 
                      onChange={props.changed} 
                      /> {props.children} <i className="input-helper"></i>
              </label>
          </div>
          <i className="remove ti-close" onClick={props.remove}></i>
      </li>
  )
};

export default Widgets
