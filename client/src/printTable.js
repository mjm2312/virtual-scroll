import React from "react";

export default function printTable(xOffset, data, lastVisColRef, scrollDir, firstVisColRef) {
  scrollDir = 'right';
  
  if (scrollDir === 'right') { 
    return (
      //header 
      <div id = "table wrapper">
        <table id = "table"> 
          <thead>
            <tr>
              {Object.keys(data[0]).map((key, i) => {
                if (i > (xOffset - 1) * 20 && i <= (xOffset * 20) - 1) {
                  return (<th>{key}</th>)
                } else if (i === (xOffset * 20)) {
                  return (<th ref = {lastVisColRef}> RS {key}</th>) //need to adapt to this sol
                } else if (i === 0 && xOffset === 1) {
                  return (<th> not a sentinel {key}</th>)
                } 
                else if (i === (xOffset - 1) * 20) {
                  return (<th> LS {key}</th>) //need to adapt to this sol
                } else if (i === ((xOffset - 1) * 20) - 1) {
                  return (<th> hi {key}</th>) //need to adapt to this sol
                } else if (i === ((xOffset - 1) * 20) - 2) {
                  return (<th ref = {firstVisColRef}> hi left {key}</th>) //need to adapt to this sol
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
      </div>
    )
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
      </div>
    )
  } else {
    return (<div> what scrollDIr {scrollDir} </div>)
  }















}