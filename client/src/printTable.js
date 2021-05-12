import React from 'react';

const NUM = 20; // size of batch;

export default function printTable(xOffset, data, lastVisColRef, firstVisColRef) {
  return (
  // header
    <div id="table-wrapper">
      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key, i) => {
              if (i >= (xOffset - 1) * NUM && i <= (xOffset * NUM) - 1) {
                return (<th>{key}</th>);
              } if (i === (xOffset * NUM)) {
                return (
                  <th ref={lastVisColRef}>
                    {key}
                  </th>
                ); // need to adapt to this sol
              } if (i === ((xOffset - 1) * NUM) - 1) {
                return (
                  <th>
                    {key}
                  </th>
                ); // scrolling ltr, this is last value we saw, e.g. 20. repeat it again here for rtl scrolls.
              } if (i === ((xOffset - 1) * NUM) - 2) {
                return (
                  <th ref={firstVisColRef}>
                    {key}
                  </th>
                ); // 1 value prior to last val (e.g. 19), so use it as sentinel
              }
            })}
          </tr>
        </thead>

        <tbody>
          {/* body */}
          {data.map((row, index) => {
            if (index < 50) { // only need first 50 for assignment
              return (
                <tr>
                  {Object.keys(row).map((key, i) => {
                    if (i > (xOffset - 1) * NUM && i !== (xOffset * NUM) && i <= (xOffset * NUM)) { // +2 bc we render 2 extra headers (last two else ifs)
                      return row[key] === null ? <td className="null-cell"> null </td> : (
                        <td>
                            {' '}
                            {row[key]}
                            {' '}
                          </td>
                      );
                    } if (i === (xOffset * NUM)) {
                      return row[key] === null ? <td className="null-cell lastVisCol"> null </td> : (
                        <td className="lastVisCol">
                            {' '}
                            {row[key]}
                            {' '}
                          </td>
                      );
                    } if (i === ((xOffset - 1) * NUM) - 1) {
                      return row[key] === null ? <td className="null-cell"> null </td> : (
                        <td>
                            {' '}
                            {row[key]}
                            {' '}
                          </td>
                      );
                    } if (i === ((xOffset - 1) * NUM) - 2) {
                      return row[key] === null ? <td className="null-cell firstVisCol"> null </td> : (
                        <td className="firstVisCol">
                            {' '}
                            {row[key]}
                            {' '}
                          </td>
                      );
                    }
                  })}
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
}
