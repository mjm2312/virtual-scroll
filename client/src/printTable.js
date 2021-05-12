import React from "react";

const NUM = 20; //size of batch;

//NEED TO APPLY SENTINEL LOGIC TO WHOLE COLUMN NOT JUST TD HEADER

export default function printTable(xOffset, data, lastVisColRef, scrollDir, firstVisColRef) {
  scrollDir = 'right';
  
  if (scrollDir === 'right') { 
    return (
      //header 
      <div id = "table wrapper">
        <table id = "table1"> 
          <thead>
            <tr>
              {Object.keys(data[0]).map((key, i) => {
                if (i >= (xOffset - 1) * NUM && i <= (xOffset * NUM) - 1) {
                  return (<th>{key}</th>)
                } else if (i === (xOffset * NUM)) {
                  return (<th ref = {lastVisColRef}> RS {key}</th>) //need to adapt to this sol
                } 
                //else if (i === 0 && xOffset === 1) {
                //   return (<th> not a sentinel {key}</th>)
                // } 
                // else if (i === (xOffset - 1) * NUM) {
                //   return (<th> LS {key}</th>) //need to adapt to this sol
                // } 
                else if (i === ((xOffset - 1) * NUM) - 1) {
                  return (<th> hi {key}</th>) //including to
                } else if (i === ((xOffset - 1) * NUM) - 2) {
                  return (<th ref = {firstVisColRef}> hi left {key}</th>) //need to adapt to this sol
                }
      
    
              })} 
            </tr>
          </thead>
          
          <tbody> 
          {/* body */}
            {data.map((row, index) => {
            if (index < 50) { //only need first 50 for assignment
              return (
                <tr>
                  {Object.keys(row).map((key, i) => {
                    if (i > (xOffset - 1) * NUM && i !== (xOffset * NUM)   && i <= (xOffset * NUM) ) { //ADD +3 to end this is just for adjacent table testing. Correct this + 3 thing. lookinto why you're rendering more cols of th than td on the right side
                      return row[key] === null ? <td className = "null-cell"> null </td> : <td> {row[key]} </td>
                    } else if (i === (xOffset * NUM)) {
                      return <td className = "lastVisCol"> {row[key]} </td>
                    } else if (i === ((xOffset - 1) * NUM) - 2) {
                      return <td className = "firstVisCol"> {row[key]} </td>
                    }
                  })}
                </tr>
              )
              }

            })}
          </tbody>
        </table>
      
       {/*dup */}
        {/* <table id = "table2"> 
          <thead>
            <tr>
              {Object.keys(data[0]).map((key, i) => {
                if (i >= (xOffset - 1) * NUM && i <= (xOffset * NUM) - 1) {
                  return (<th>{key}</th>)
                } else if (i === (xOffset * NUM)) {
                  return (<th ref = {lastVisColRef}> RS {key}</th>) //need to adapt to this sol
                } 
                //else if (i === 0 && xOffset === 1) {
                //   return (<th> not a sentinel {key}</th>)
                // } 
                // else if (i === (xOffset - 1) * NUM) {
                //   return (<th> LS {key}</th>) //need to adapt to this sol
                // } 
                else if (i === ((xOffset - 1) * NUM) - 1) {
                  return (<th> hi {key}</th>) //including to
                } else if (i === ((xOffset - 1) * NUM) - 2) {
                  return (<th ref = {firstVisColRef}> hi left {key}</th>) //need to adapt to this sol
                }
      
    
              })} 
            </tr>
          </thead>
          
          <tbody> 
          {/* body */}
            {/* {data.map((row, index) => {
            if (index < 50) { //only need first 50 for assignment
              return (
                <tr>
                  {Object.keys(row).map((key, i) => {
                    if (i > (xOffset - 1) * NUM && i <= (xOffset * NUM) + 3) { //Correct this + 3 thing. lookinto why you're rendering more cols of th than td on the right side
                      return row[key] === null ? <td className = "null-cell"> null </td> : <td> {row[key]} </td>
                    } 
                  })}
                </tr>
              )
              }

            })}
          </tbody>
        </table> */} */}











      </div>
    )
  
  
  
  
  
  
  //Need to delete this
  } else if (scrollDir === 'left') {
    return (
      //header 
      <div id = "table wrapper">
        <table id = "table"> 
          <thead>
            <tr>
              {Object.keys(data[0]).map((key, i) => {
                if (i >= (xOffset - 2) * 20 && i < (xOffset - 1 * 20) - 1) {
                  return (<th>{key}</th>)
                } else if (i === (xOffset - 1 * 20)) {
                  return (<th ref = {firstVisColRef}> hi {key}</th>) //need to adapt to this sol
                } 
      
    
              })} 
            </tr>
          </thead>
          
          <tbody> 
          {/* body */}
            {data.map((row, index) => {
            if (index < 20) {
              return (
                <tr>
                {Object.keys(row).map((key, i) => {
                  if (i < 20) {
                    console.log(row[key] === null)
                    return row[key] === null ? <td> null </td> : <td> {row[key]} </td>
                  }
                })
                }
              </tr>
              )
            }
            })}
          </tbody>
        </table>
      </div>
    )
  } else {
    return (<div> what scrollDIr {scrollDir} </div>)
  }















}