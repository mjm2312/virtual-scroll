import React from "react";
import ReactDOM from "react-dom";
import Papa from "papaparse";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      someState: "value of state",
      data: [],
      xOffset: 1
    };
    this.viewportElement = React.createRef()
    this.lastVisCol = React.createRef() //try with intersectionObserver

    this.handleScroll = this.handleScroll.bind(this);
    this.printTable = this.printTable.bind(this);
  }

  componentDidMount() {
    const context = this;
    Papa.parse('data.csv', {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: function(results) {
        //data = results.data;
        context.setState({
          data: results.data
        })
      }
    });
  }

  handleScroll(el) {
    //console.log(el.target.scrollTop)
    console.log(el.target.scrollLeft)
    if (el.target.scrollLeft >= 640) {
      this.setState({
        xOffset: this.state.xOffset += 1
      })
      console.log('ref dot curr, ', this.viewportElement.current)
      console.log('vs')
      console.log('el.target', el.target);
      this.viewportElement.current.scrollLeft = 0;
    }
  }

  printTable() {
    return (
    //header 
    <table id = "table"> 
      <thead>
        <tr>
          {Object.keys(this.state.data[0]).map((key, i) => {
            if (i >= (this.state.xOffset - 1) * 20 && i < this.state.xOffset * 20) {
              return (<th>{key}</th>)
            }
          })} 
        </tr>
      </thead>
      
      <tbody> 
      {/* body */}
        {this.state.data.map((row, index) => {
        if (index < 10) {
          return (
            <tr>
            {Object.keys(row).map((key, i) => {
              if (i < 20) {
                return (<td> {row[key]} </td>)
              }
            })
            }
          </tr>
          )
        }
        })}
      </tbody>
    </table>
  )
  }

  render() {
    if (this.state.data.length === 0) {
      return (<div>loading table
      </div>);
    } else {
      return (
        //  <div> not undefined </div>
        <div ref = {this.viewportElement}
             id = "table-container" 
             onScroll = {(el) => this.handleScroll(el)}> 
          {this.printTable()}
        </div>
      )
    }
  };
}

ReactDOM.render(<App />, document.getElementById("app"));