module.exports = ({ username, convAmt, amount, projectName }) => {

    // const component = monthlyInvestments.map(y => (
    //     <div class="row">
    //         <div class="col-lg-11">
    //             <h1>Year:{y._id.year} / Month:{y._id.month} <strong>Total: ${y.totalInvestMonthy} </strong></h1><br />
    //             {y.invest_docs.map(x => (
    //                 <div class="container">
    //                     <p class="font-italic mb-0 text-dark"> <span className="text-success">{x.username}</span> has invested <span className="text-danger">${x.convAmt}</span> on Project <strong>{x.projectName} </strong>on date {x.date}</p>
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // ))

    return `
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Invsetment Monhtly</title>
<style>



</style>

  </head>
  <body>
  <div>
 <h1>${projectName}</h1>
 <h1>${username}</h1>
 <h1>${convAmt}</h1>
 <h1>${amount}</h1>
  </div>
  
  </body>
  </html>



`;
};