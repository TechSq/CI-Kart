import React, { Component } from 'react';
import {Line, Bar, Doughnut, Chart} from 'react-chartjs-2';
import { ProgressBar,Tabs, Tab, Dropdown } from 'react-bootstrap';
import Progress from '@delowar/react-circle-progressbar';

//Doughchart Legend
var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  draw: function() {
    originalDoughnutDraw.apply(this, arguments);
    
    var chart = this.chart.chart;
    var ctx = chart.ctx;
    var width = chart.width;
    var height = chart.height;

    var fontSize = 3.125;
    ctx.font = "600 " + fontSize + "em sans-serif";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000";

    var text = chart.config.data.text,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;

    ctx.fillText(text, textX, textY);
  }
});


export class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      todos: [
        {
            id: 1,
            task: 'Lorem Ipsum is simply dummy text of the printing',
            isCompleted: false,
            date: '24 June 2020',
            badge: 'Due tomorrow'
        },
        {
            id: 2,
            task: 'Lorem Ipsum is simply dummy text of the printing',
            isCompleted: true,
            date: '24 June 2020',
            badge: 'Done'
        },
        {
            id: 3,
            task: 'Lorem Ipsum is simply dummy text of the printing',
            isCompleted: false,
            date: '24 June 2020',
            badge: 'Done'
        },
        {
            id: 4,
            task: 'Lorem Ipsum is simply dummy text of the printing',
            isCompleted: true,
            date: '24 June 2020',
            badge: 'Expired'
        },
        {
            id: 5,
            task: 'Lorem Ipsum is simply dummy text of the printing',
            isCompleted: false,
            date: '24 June 2020',
            badge: 'Done'
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

  SalesReportData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [{
        label: 'Offline Sales',
        data: [480, 230, 470, 210, 330],
        backgroundColor: '#ffc100'
      },
      {
        label: 'Online Sales',
        data: [400, 340, 550, 480, 170],
        backgroundColor: '#f5a623'
      }
    ]
  };
  SalesReportOptions = {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 20,
        bottom: 0
      }
    },
    scales: {
      yAxes: [{
        display: true,
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false,
          min: 0,
          max: 500
        }
      }],
      xAxes: [{
        stacked: false,
        ticks: {
          beginAtZero: true,
          fontColor: "#9fa0a2"
        },
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
          display: false
        },
        barPercentage: 1
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  northAmericaData = {
    datasets: [{
      data: [100, 50, 50],
      backgroundColor: [
        "#71c016", "#ffc100", "#248afd",
      ],
      borderColor: "rgba(0,0,0,0)"
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      'Pink',
      'Blue',
      'Yellow',
    ],
    text: '90',
  };
  northAmericaOptions = {
    responsive: true,
    maintainAspectRatio: true,
    segmentShowStroke: false,
    cutoutPercentage: 78,
    elements: {
      arc: {
          borderWidth: 4
      }
    },      
    legend: {
      display: false
    },
    tooltips: {
      enabled: true
    },
  };
  southAmericaData = {
    datasets: [{
      data: [40, 20, 30, 10],
      backgroundColor: [
        "#1F3BB3",
        "#FDD0C7",
        "#52CDFF",
        "#81DADA"
      ],
      borderColor: [
        "#1F3BB3",
        "#FDD0C7",
        "#52CDFF",
        "#81DADA"
      ]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      'Total',
      'Net',
      'Gross',
      'AVG'
    ],
    text: '',
  };
  southAmericaOptions = {
    cutoutPercentage: 50,
    animationEasing: "easeOutBounce",
    animateRotate: true,
    animateScale: false,
    responsive: true,
    maintainAspectRatio: true,
    showScale: true,
    legend: false,
  };
  ///////New charts////////
  statusSummaryLineData = {
    labels: ["SUN", "MON", "TUE", "WED", "THU", "FRI"],
      datasets: [{
        label: '# of Votes',
        data: [50, 68, 70, 10, 12, 80],
        backgroundColor: "#ffcc00",
        borderColor: [
            '#01B6A0',
        ],
        borderWidth: 2,
        fill: false, // 3: no fill
        pointBorderWidth: 0,
        pointRadius: [0, 0, 0, 0, 0, 0],
        pointHoverRadius: [0, 0, 0, 0, 0, 0],
      }]
  };

  statusSummaryLineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        display:false,
          gridLines: {
              display: false,
              drawBorder: false,
              color:"#F0F0F0"
          },
          ticks: {
            beginAtZero: false,
            autoSkip: true,
            maxTicksLimit: 4,
            fontSize: 10,
            color:"#6B778C"
          }
      }],
      xAxes: [{
          display:false,
          gridLines: {
              display: false,
              drawBorder: false,
          },
          ticks: {
            beginAtZero: false,
            autoSkip: true,
            maxTicksLimit: 7,
            fontSize: 10,
            color:"#6B778C"
          }
      }],
    },
    legend:false,
    
    elements: {
        line: {
            tension: 0.4,
        }
    },
    tooltips: {
        backgroundColor: 'rgba(31, 59, 179, 1)',
    }

  };

  marketingOverviewData = {
    labels: ["JAN","FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
    datasets: [{
      label: 'Last week',
      data: [110, 220, 200, 190, 220, 110, 210, 110, 205, 202, 201, 150],
      backgroundColor: "#52CDFF",
      borderColor: [
          '#52CDFF',
      ],
      borderWidth: 0,
      fill: true, // 3: no fill
        
    },{
      label: 'This week',
      data: [215, 290, 210, 250, 290, 230, 290, 210, 280, 220, 190, 300],
      backgroundColor: "#1F3BB3",
      borderColor: [
          '#1F3BB3',
      ],
      borderWidth: 0,
      fill: true, // 3: no fill
    }]
  };

  marketingOverviewOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        gridLines: {
            display: true,
            drawBorder: false,
            color:"#F0F0F0",
            zeroLineColor: '#F0F0F0',
        },
        ticks: {
          beginAtZero: true,
          autoSkip: true,
          maxTicksLimit: 5,
          fontSize: 10,
          color:"#6B778C"
        }
    }],
    xAxes: [{
      stacked: true,
      barPercentage: 0.35,
      gridLines: {
          display: false,
          drawBorder: false,
      },
      ticks: {
        beginAtZero: false,
        autoSkip: true,
        maxTicksLimit: 12,
        fontSize: 10,
        color:"#6B778C"
      }
  }],
    },
    legend:false,   
    elements: {   
      line: {
        tension: 0.4,
      }
    },
    tooltips: {
      backgroundColor: 'rgba(31, 59, 179, 1)',
    }
  };
  leaveReportData = {
    labels: ["Jan","Feb", "Mar", "Apr", "May"],
      datasets: [{
          label: 'Last week',
          data: [18, 25, 39, 11, 24],
          backgroundColor: "#52CDFF",
          borderColor: [
              '#52CDFF',
          ],
          borderWidth: 0,
          fill: true, // 3: no fill
          
      }]
  };

  leaveReportOptions = {
    responsive: true,
    maintainAspectRatio: false,
      scales: {
          yAxes: [{
              gridLines: {
                  display: true,
                  drawBorder: false,
                  color:"rgba(255,255,255,.05)",
                  zeroLineColor: "rgba(255,255,255,.05)",
              },
              ticks: {
                beginAtZero: true,
                autoSkip: true,
                maxTicksLimit: 5,
                fontSize: 10,
                color:"#6B778C"
              }
          }],
          xAxes: [{
            barPercentage: 0.5,
            gridLines: {
                display: false,
                drawBorder: false,
            },
            ticks: {
              beginAtZero: false,
              autoSkip: true,
              maxTicksLimit: 7,
              fontSize: 10,
              color:"#6B778C"
            }
        }],
      },
      legend:false,
      
      elements: {
          line: {
              tension: 0.4,
          }
      },
      tooltips: {
          backgroundColor: 'rgba(31, 59, 179, 1)',
      }
  };
 
  render () {
    const performaneLineData = (canvas) => {
      const ctx = canvas.getContext("2d");
      const performaneGradientBg = ctx.createLinearGradient(5, 0, 5, 100);
      performaneGradientBg.addColorStop(0, 'rgba(26, 115, 232, 0.18)');
      performaneGradientBg.addColorStop(1, 'rgba(26, 115, 232, 0.02)');

      const performaneGradientBg1= ctx.createLinearGradient(5, 0, 5, 100);
      performaneGradientBg1.addColorStop(0, 'rgba(0, 208, 255, 0.19)');
      performaneGradientBg1.addColorStop(1, 'rgba(0, 208, 255, 0.03)');
      return {
        labels: ["SUN","sun", "MON", "mon", "TUE","tue", "WED", "wed", "THU", "thu", "FRI", "fri", "SAT"],
        datasets: [{
            label: 'This week',
            data: [50, 110, 60, 290, 200, 115, 130, 170, 90, 210, 240, 280, 200],
            backgroundColor: performaneGradientBg,
            borderColor: [
                '#1F3BB3',
            ],
            borderWidth: 1.5,
            fill: true, // 3: no fill
            pointBorderWidth: 1,
            pointRadius: [4, 4, 4, 4, 4,4, 4, 4, 4, 4,4, 4, 4],
            pointHoverRadius: [2, 2, 2, 2, 2,2, 2, 2, 2, 2,2, 2, 2],
            pointBackgroundColor: ['#1F3BB3)', '#1F3BB3', '#1F3BB3', '#1F3BB3','#1F3BB3)', '#1F3BB3', '#1F3BB3', '#1F3BB3','#1F3BB3)', '#1F3BB3', '#1F3BB3', '#1F3BB3','#1F3BB3)'],
            pointBorderColor: ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff',],
        },{
          label: 'Last week',
          data: [30, 150, 190, 250, 120, 150, 130, 20, 30, 15, 40, 95, 180],
          backgroundColor: performaneGradientBg1,
          borderColor: [
              '#52CDFF',
          ],
          borderWidth: 1.5,
          fill: true, // 3: no fill
          pointBorderWidth: 1,
          pointRadius: [0, 0, 0, 4, 0],
          pointHoverRadius: [0, 0, 0, 2, 0],
          pointBackgroundColor: ['#52CDFF)', '#52CDFF', '#52CDFF', '#52CDFF','#52CDFF)', '#52CDFF', '#52CDFF', '#52CDFF','#52CDFF)', '#52CDFF', '#52CDFF', '#52CDFF','#52CDFF)'],
            pointBorderColor: ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff',],
        }]
      }
    }
    var performaneLineOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
            gridLines: {
                display: true,
                drawBorder: false,
                color:"#F0F0F0",
                zeroLineColor: '#F0F0F0',
            },
            ticks: {
              beginAtZero: false,
              autoSkip: true,
              maxTicksLimit: 4,
              fontSize: 10,
              color:"#6B778C"
            }
        }],
        xAxes: [{
          gridLines: {
              display: false,
              drawBorder: false,
          },
          ticks: {
            beginAtZero: false,
            autoSkip: true,
            maxTicksLimit: 7,
            fontSize: 10,
            color:"#6B778C"
          }
      }],
      },
      legend:false,
      
      elements: {
          line: {
              tension: 0.4,
          }
      },
      tooltips: {
          backgroundColor: 'rgba(31, 59, 179, 1)',
      }
    };

    return (
      <div>   
        <div className="row">
          <div className="col-12 col-xl-12 mb-4 mb-xl-0 grid-margin home-tab ">
            <Tabs defaultActiveKey="Overview" id="uncontrolled-tab-example">
              <Tab eventKey="Overview" title="Overview" className="test-tab">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="statistics-details d-flex align-items-center justify-content-between">
                      <div>
                        <p className="statistics-title">Bounce Rate</p>
                        <h3 className="rate-percentage">32.53%</h3>
                        <p className="text-danger d-flex"><i className="mdi mdi-menu-down"></i><span>-0.5%</span></p>
                      </div>
                      <div>
                        <p className="statistics-title">Page Views</p>
                        <h3 className="rate-percentage">7,682</h3>
                        <p className="text-success d-flex"><i className="mdi mdi-menu-up"></i><span>+0.1%</span></p>
                      </div>
                      <div>
                        <p className="statistics-title">New Sessions</p>
                        <h3 className="rate-percentage">68.8</h3>
                        <p className="text-danger d-flex"><i className="mdi mdi-menu-down"></i><span>68.8</span></p>
                      </div>
                      <div className="d-none d-md-block">
                        <p className="statistics-title">Avg. Time on Site</p>
                        <h3 className="rate-percentage">2m:35s</h3>
                        <p className="text-success d-flex"><i className="mdi mdi-menu-down"></i><span>+0.8%</span></p>
                      </div>
                      <div className="d-none d-md-block">
                        <p className="statistics-title">New Sessions</p>
                        <h3 className="rate-percentage">68.8</h3>
                        <p className="text-danger d-flex"><i className="mdi mdi-menu-down"></i><span>68.8</span></p>
                      </div>
                      <div className="d-none d-md-block">
                        <p className="statistics-title">Avg. Time on Site</p>
                        <h3 className="rate-percentage">2m:35s</h3>
                        <p className="text-success d-flex"><i className="mdi mdi-menu-down"></i><span>+0.8%</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-8 d-flex flex-column">
                    <div className="row flex-grow">
                      <div className="col-12 col-lg-4 col-lg-12 grid-margin stretch-card">
                        <div className="card card-rounded">
                          <div className="card-body">
                            <div className="d-sm-flex justify-content-between align-items-start">
                              <div>
                                <h4 className="card-title card-title-dash">Performance Line Chart</h4>
                                <h5 className="card-subtitle card-subtitle-dash">Lorem Ipsum is simply dummy text of the printing</h5>
                              </div>
                              <div id="performance-line-legend"></div>
                            </div>
                            <div className="chartjs-wrapper mt-4">
                              <Line data={performaneLineData} options={performaneLineOptions} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 d-flex flex-column">
                    <div className="row flex-grow">
                      <div className="col-md-6 col-lg-12 grid-margin stretch-card">
                        <div className="card bg-primary card-rounded">
                          <div className="card-body pb-0">
                            <h4 className="card-title card-title-dash text-white mb-4">Status Summary</h4>
                            <div className="row">
                              <div className="col-sm-4 pr-0">
                                <p className="status-summary-ight-white mb-1">Closed Value</p>
                                <h2 className="text-info">357</h2>
                              </div>
                              <div className="col-sm-8">
                                <div className="status-summary-chart-wrapper pb-4">
                                  <Line data={this.statusSummaryLineData} options={this.statusSummaryLineOptions} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-12 grid-margin stretch-card">
                        <div className="card card-rounded">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="d-flex justify-content-between align-items-center mb-2 mb-sm-0">
                                  <div className="circle-progress-width">
                                    <Progress percent={64} size={50} borderWidth={7} borderBgWidth={7} fillColor={"#3A61F6"} />
                                  </div>
                                  <div>
                                    <p className="text-small mb-2">Total Visitors</p>
                                    <h4 className="mb-0 fw-bold">26.80%</h4>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="circle-progress-width">
                                    <div id="visitperday" className="progressbar-js-circle pe-2"></div>
                                    <Progress percent={26} size={50} borderWidth={7} borderBgWidth={7} fillColor={"#3A61F6"} />
                                  </div>
                                  <div>
                                    <p className="text-small mb-2">Visits per day</p>
                                    <h4 className="mb-0 fw-bold">9065</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-8 d-flex flex-column">
                    <div className="row flex-grow">
                      <div className="col-12 grid-margin stretch-card">
                        <div className="card card-rounded">
                          <div className="card-body">
                            <div className="d-sm-flex justify-content-between align-items-start">
                              <div>
                                <h4 className="card-title card-title-dash">Market Overview</h4>
                                <p className="card-subtitle card-subtitle-dash">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                              </div>
                              <div>
                                <Dropdown>
                                  <Dropdown.Toggle variant="btn btn-light dropdown-toggle toggle-dark btn-lg mb-0 me-0" id="dropdownMenuButton1">
                                    This month
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Header>Settings</Dropdown.Header>
                                    <Dropdown.Item>Action</Dropdown.Item>
                                    <Dropdown.Item>Another action</Dropdown.Item>
                                    <Dropdown.Item>Something else here</Dropdown.Item>
                                    <Dropdown.Divider></Dropdown.Divider>
                                    <Dropdown.Item>Separated link</Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </div>
                            <div className="d-sm-flex align-items-center mt-1 justify-content-between">
                              <div className="d-sm-flex align-items-center mt-4 justify-content-between"><h2 className="me-2 fw-bold">$36,2531.00</h2><h4 className="me-2">USD</h4><h4 className="text-success">(+1.37%)</h4></div>
                              <div className="me-3"><div id="marketing-overview-legend"></div></div>
                            </div>
                            <div className="chartjs-bar-wrapper mt-3">
                              <Bar data={this.marketingOverviewData} options={this.marketingOverviewOptions} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row flex-grow">
                      <div className="col-12 grid-margin stretch-card">
                        <div className="card card-rounded table-darkBGImg">
                          <div className="card-body">
                            <div className="col-sm-8">
                              <h3 className="text-white upgrade-info mb-0">
                                Enhance your <span className="fw-bold">Campaign</span> for better outreach
                              </h3>
                              <a href="/#" className="btn btn-info upgrade-btn">Upgrade Account!</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row flex-grow">
                      <div className="col-12 grid-margin stretch-card">
                        <div className="card card-rounded">
                          <div className="card-body">
                            <div className="d-sm-flex justify-content-between align-items-start">
                              <div>
                                <h4 className="card-title card-title-dash">Pending Requests</h4>
                                <p className="card-subtitle card-subtitle-dash">You have 50+ new requests</p>
                              </div>
                              <div>
                                <button className="btn btn-primary btn-lg text-white mb-0 me-0" type="button"><i className="mdi mdi-account-plus"></i>Add new member</button>
                              </div>
                            </div>
                            <div className="table-responsive  mt-1">
                              <table className="table select-table">
                                <thead>
                                  <tr>
                                    <th>
                                      <div className="form-check form-check-flat mt-0">
                                        <label className="form-check-label">
                                          <input type="checkbox" className="form-check-input" aria-checked="false" /><i className="input-helper"></i></label>
                                      </div>
                                    </th>
                                    <th>Customer</th>
                                    <th>Company</th>
                                    <th>Progress</th>
                                    <th>Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <div className="form-check form-check-flat mt-0">
                                        <label className="form-check-label">
                                        <input type="checkbox" className="form-check-input" aria-checked="false" /><i className="input-helper"></i></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex ">
                                        <img src={require("../../assets/images/faces/face1.jpg") } alt="" />
                                        <div>
                                          <h6>Brandon Washington</h6>
                                          <p>Head admin</p>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <h6>Company name 1</h6>
                                      <p>company type</p>
                                    </td>
                                    <td>
                                      <div>
                                        <div className="d-flex justify-content-between align-items-center mb-1 max-width-progress-wrap">
                                          <p className="text-success">79%</p>
                                          <p>85/162</p>
                                        </div>
                                        <ProgressBar variant="success" className="progress-md mx-4" now={79}/>
                                      </div>
                                    </td>
                                    <td><div className="badge badge-opacity-warning">In progress</div></td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="form-check form-check-flat mt-0">
                                        <label className="form-check-label">
                                        <input type="checkbox" className="form-check-input" aria-checked="false" /><i className="input-helper"></i></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <img src={require("../../assets/images/faces/face1.jpg") } alt="" />
                                        <div>
                                          <h6>Laura Brooks</h6>
                                          <p>Head admin</p>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <h6>Company name 1</h6>
                                      <p>company type</p>
                                    </td>
                                    <td>
                                      <div>
                                        <div className="d-flex justify-content-between align-items-center mb-1 max-width-progress-wrap">
                                          <p className="text-success">65%</p>
                                          <p>85/162</p>
                                        </div>
                                        <ProgressBar variant="success" className="progress-md mx-4" now={65}/>
                                      </div>
                                    </td>
                                    <td><div className="badge badge-opacity-warning">In progress</div></td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="form-check form-check-flat mt-0">
                                        <label className="form-check-label">
                                        <input type="checkbox" className="form-check-input" aria-checked="false" /><i className="input-helper"></i></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <img src={require("../../assets/images/faces/face3.jpg") } alt="" />
                                        <div>
                                          <h6>Wayne Murphy</h6>
                                          <p>Head admin</p>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <h6>Company name 1</h6>
                                      <p>company type</p>
                                    </td>
                                    <td>
                                      <div>
                                        <div className="d-flex justify-content-between align-items-center mb-1 max-width-progress-wrap">
                                          <p className="text-success">65%</p>
                                          <p>85/162</p>
                                        </div>
                                        <ProgressBar variant="warning" className="progress-md mx-4" now={45}/>
                                      </div>
                                    </td>
                                    <td><div className="badge badge-opacity-warning">In progress</div></td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="form-check form-check-flat mt-0">
                                        <label className="form-check-label">
                                        <input type="checkbox" className="form-check-input" aria-checked="false" /><i className="input-helper"></i></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <img src={require("../../assets/images/faces/face4.jpg") } alt="" />
                                        <div>
                                          <h6>Matthew Bailey</h6>
                                          <p>Head admin</p>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <h6>Company name 1</h6>
                                      <p>company type</p>
                                    </td>
                                    <td>
                                      <div>
                                        <div className="d-flex justify-content-between align-items-center mb-1 max-width-progress-wrap">
                                          <p className="text-success">65%</p>
                                          <p>85/162</p>
                                        </div>
                                        <ProgressBar variant="danger" className="progress-md mx-4" now={15}/>
                                      </div>
                                    </td>
                                    <td><div className="badge badge-opacity-danger">Pending</div></td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="form-check form-check-flat mt-0">
                                        <label className="form-check-label">
                                        <input type="checkbox" className="form-check-input" aria-checked="false" /><i className="input-helper"></i></label>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <img src={require("../../assets/images/faces/face5.jpg") } alt="" />
                                        <div>
                                          <h6>Katherine Butler</h6>
                                          <p>Head admin</p>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <h6>Company name 1</h6>
                                      <p>company type</p>
                                    </td>
                                    <td>
                                      <div>
                                        <div className="d-flex justify-content-between align-items-center mb-1 max-width-progress-wrap">
                                          <p className="text-success">65%</p>
                                          <p>85/162</p>
                                        </div>
                                        <ProgressBar variant="info" className="progress-md mx-4" now={55}/>
                                      </div>
                                    </td>
                                    <td><div className="badge badge-opacity-success">Completed</div></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row flex-grow">
                      <div className="col-md-6 col-lg-6 grid-margin grid-margin-lg-0 stretch-card">
                        <div className="card card-rounded">
                          <div className="card-body card-rounded">
                            <h4 className="card-title  card-title-dash">Recent Events</h4>
                            <div className="list align-items-center border-bottom py-2">
                              <div className="wrapper w-100">
                                <p className="mb-2 font-weight-medium">
                                  Change in Directors
                                </p>
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="d-flex align-items-center">
                                    <i className="mdi mdi-calendar text-muted me-1"></i>
                                    <p className="mb-0 text-small text-muted">Mar 14, 2019</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="list align-items-center border-bottom py-2">
                              <div className="wrapper w-100">
                                <p className="mb-2 font-weight-medium">
                                  Other Events
                                </p>
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="d-flex align-items-center">
                                    <i className="mdi mdi-calendar text-muted me-1"></i>
                                    <p className="mb-0 text-small text-muted">Mar 14, 2019</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="list align-items-center border-bottom py-2">
                              <div className="wrapper w-100">
                                <p className="mb-2 font-weight-medium">
                                  Quarterly Report
                                </p>
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="d-flex align-items-center">
                                    <i className="mdi mdi-calendar text-muted me-1"></i>
                                    <p className="mb-0 text-small text-muted">Mar 14, 2019</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="list align-items-center border-bottom py-2">
                              <div className="wrapper w-100">
                                <p className="mb-2 font-weight-medium">
                                  Change in Directors
                                </p>
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="d-flex align-items-center">
                                    <i className="mdi mdi-calendar text-muted me-1"></i>
                                    <p className="mb-0 text-small text-muted">Mar 14, 2019</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="list align-items-center pt-3">
                              <div className="wrapper w-100">
                                <p className="mb-0">
                                  <a href="/#" className="fw-bold text-primary">Show all <i className="mdi mdi-arrow-right ms-2"></i></a>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6 grid-margin grid-margin-lg-0 stretch-card">
                        <div className="card card-rounded">
                          <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                              <h4 className="card-title card-title-dash">Activities</h4>
                              <p className="mb-0">20 finished, 5 remaining</p>
                            </div>
                            <ul className="bullet-line-list">
                              <li>
                                <div className="d-flex justify-content-between">
                                  <div><span className="text-light-green">Ben Tossell</span> assign you a task</div>
                                  <p>Just now</p>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex justify-content-between">
                                  <div><span className="text-light-green">Oliver Noah</span> assign you a task</div>
                                  <p>1h</p>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex justify-content-between">
                                  <div><span className="text-light-green">Jack William</span> assign you a task</div>
                                  <p>1h</p>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex justify-content-between">
                                  <div><span className="text-light-green">Leo Lucas</span> assign you a task</div>
                                  <p>1h</p>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex justify-content-between">
                                  <div><span className="text-light-green">Thomas Henry</span> assign you a task</div>
                                  <p>1h</p>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex justify-content-between">
                                  <div><span className="text-light-green">Ben Tossell</span> assign you a task</div>
                                  <p>1h</p>
                                </div>
                              </li>
                              <li>
                                <div className="d-flex justify-content-between">
                                  <div><span className="text-light-green">Ben Tossell</span> assign you a task</div>
                                  <p>1h</p>
                                </div>
                              </li>
                            </ul>
                            <div className="list align-items-center pt-3">
                              <div className="wrapper w-100">
                                <p className="mb-0">
                                  <a href="/#" className="fw-bold text-primary">Show all <i className="mdi mdi-arrow-right ms-2"></i></a>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 d-flex flex-column">
                    <div className="row flex-grow">
                      <div className="col-12 grid-margin stretch-card">
                        <div className="card card-rounded">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-lg-12">
                                <h4 className="card-title card-title-dash">Todo list</h4>
                                  <form  className="add-items d-flex mt-0 justify-content-between align-items-center" onSubmit={this.addTodo}>
                                    <input 
                                        type="text" 
                                        className="form-control h-auto mb-2" 
                                        placeholder="Add new task" 
                                        value={this.state.inputValue} 
                                        onChange={this.inputChangeHandler}
                                        required />
                                    <button type="submit" className="add btn btn-icons btn-rounded btn-primary todo-list-add-btn text-white me-0 pl-1"><i className="mdi mdi-plus"></i></button>
                                  </form>
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
                                              {todo.date}
                                              {todo.badge}
                                            </ListItem>
                                        })}
                                    </ul>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row flex-grow">
                      <div className="col-12 grid-margin stretch-card">
                        <div className="card card-rounded">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                  <h4 className="card-title card-title-dash">Type By Amount</h4>
                                </div>
                                <Doughnut data={this.southAmericaData} options={this.southAmericaOptions} />
                                <div className="chartjs-legend mt-5 text-center">
                                  <ul className="justify-content-center">
                                    <li>
                                      <span className="amount-type-box bg-primary"></span>
                                      <span className="amount-type-text">Total</span>
                                    </li>
                                    <li>
                                      <span className="amount-type-box bg-warning"></span>
                                      <span className="amount-type-text">Net</span>
                                    </li>
                                    <li>
                                      <span className="amount-type-box bg-info"></span>
                                      <span className="amount-type-text">Gross</span>
                                    </li>
                                    <li>
                                      <span className="amount-type-box bg-success"></span>
                                      <span className="amount-type-text">AVG</span>
                                    </li>

                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row flex-grow">
                      <div className="col-12 grid-margin stretch-card">
                        <div className="card card-rounded">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                  <div>
                                    <h4 className="card-title card-title-dash">Leave Report</h4>
                                  </div>
                                  <div>
                                    <Dropdown>
                                      <Dropdown.Toggle variant="btn btn-light dropdown-toggle toggle-dark btn-lg mb-0 me-0" id="dropdownMenuButton1">
                                      Month Wise
                                      </Dropdown.Toggle>
                                      <Dropdown.Menu>
                                        <Dropdown.Header>week Wise</Dropdown.Header>
                                        <Dropdown.Item>Year Wise</Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="mt-3">
                                <Bar data={this.leaveReportData} options={this.leaveReportOptions} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row flex-grow">
                      <div className="col-12 grid-margin grid-margin-lg-0 stretch-card">
                        <div className="card card-rounded">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                  <div>
                                    <h4 className="card-title card-title-dash">Top Performer</h4>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <div className="wrapper d-flex align-items-center justify-content-between py-2 border-bottom">
                                    <div className="d-flex">
                                      <img className="img-sm rounded-10" src={require("../../assets/images/faces/face1.jpg") } alt="profile" />
                                      <div className="wrapper ms-3">
                                        <p className="ms-1 mb-1 fw-bold">Brandon Washington</p>
                                        <small className="text-muted mb-0">162543</small>
                                      </div>
                                    </div>
                                    <div className="text-muted text-small">
                                      1h ago
                                    </div>
                                  </div>
                                  <div className="wrapper d-flex align-items-center justify-content-between py-2 border-bottom">
                                    <div className="d-flex">
                                    <img className="img-sm rounded-10" src={require("../../assets/images/faces/face2.jpg") } alt="profile" />
                                      <div className="wrapper ms-3">
                                        <p className="ms-1 mb-1 fw-bold">Wayne Murphy</p>
                                        <small className="text-muted mb-0">162543</small>
                                      </div>
                                    </div>
                                    <div className="text-muted text-small">
                                      1h ago
                                    </div>
                                  </div>
                                  <div className="wrapper d-flex align-items-center justify-content-between py-2 border-bottom">
                                    <div className="d-flex">
                                      <img className="img-sm rounded-10" src={require("../../assets/images/faces/face3.jpg") } alt="profile" />
                                      <div className="wrapper ms-3">
                                        <p className="ms-1 mb-1 fw-bold">Katherine Butler</p>
                                        <small className="text-muted mb-0">162543</small>
                                      </div>
                                    </div>
                                    <div className="text-muted text-small">
                                      1h ago
                                    </div>
                                  </div>
                                  <div className="wrapper d-flex align-items-center justify-content-between py-2 border-bottom">
                                    <div className="d-flex">
                                    <img className="img-sm rounded-10" src={require("../../assets/images/faces/face4.jpg") } alt="profile" />
                                      <div className="wrapper ms-3">
                                        <p className="ms-1 mb-1 fw-bold">Matthew Bailey</p>
                                        <small className="text-muted mb-0">162543</small>
                                      </div>
                                    </div>
                                    <div className="text-muted text-small">
                                      1h ago
                                    </div>
                                  </div>
                                  <div className="wrapper d-flex align-items-center justify-content-between pt-2">
                                    <div className="d-flex">
                                      <img className="img-sm rounded-10" src={require("../../assets/images/faces/face5.jpg") } alt="profile" />
                                      <div className="wrapper ms-3">
                                        <p className="ms-1 mb-1 fw-bold">Rafell John</p>
                                        <small className="text-muted mb-0">Alaska, USA</small>
                                      </div>
                                    </div>
                                    <div className="text-muted text-small">
                                      1h ago
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="Audiences" title="Audiences" disabled>
                <div className="media">
                  <img className="me-3 w-25 rounded" src={ require("../../assets/images/faces/face12.jpg") } alt="sample"/>
                  <div className="media-body">
                    <h4 className="mt-0">John Doe</h4>
                    <p>
                      Fail most room even gone her end like. Comparison dissimilar unpleasant six compliment two unpleasing any add. Ashamed my
                      company thought wishing colonel it prevent he in. Pretended residence are something far engrossed old
                      off.
                    </p>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="Demographics" title="Demographics" disabled>
                <h4>Contact us </h4>
                  <p>
                    Feel free to contact us if you have any questions!
                  </p>
                  <p>
                    <i className="ti-headphone-alt text-info me-2"></i>
                    +123456789
                  </p>
                  <p>
                    <i className="ti-email text-success me-2"></i>
                    contactus@example.com
                  </p>
                </Tab>
                <Tab eventKey="More" title="More" disabled>
                <h4>Contact us </h4>
                  <p>
                    Feel free to contact us if you have any questions!
                  </p>
                  <p>
                    <i className="ti-headphone-alt text-info me-2"></i>
                    +123456789
                  </p>
                  <p>
                    <i className="ti-email text-success me-2"></i>
                    contactus@example.com
                  </p>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    );
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
export default Dashboard;