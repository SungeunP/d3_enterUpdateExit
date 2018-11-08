_main = (args) => {
  console.log("=== Main ===");
  console.log("args", args);

  var data = ["10","20"];

  Main_Context.canvas = d3.select("body")
                          .append("svg")
                          .attr("width",1000)
                          .attr("height",500)
                          .attr("transform","translate(50,50)")

  // enter selection group
  var enter_selection_g = Main_Context.canvas.append("g")
                                              .attr("id","enter_selection_g");

  // enter selection example 
  enter_selection_g.append("circle")
                      .attr("cx", 100)
                      .attr("cy", 100)
                      .attr("r",50)      

  // 데이터 바인딩을 통한 Elements 추가 
  // enter selection
  // data : 2
  // exist circle : 1
  // enter selection : 1
  enter_selection_g.selectAll("circle")
                      .data(data)
                      .attr("fill","red")
                      .enter()
                        .append("circle")
                        .attr("cx",100)
                        .attr("cy",250)
                        .attr("r",50)
                        .attr("fill","green")


  // update selection group 
  var update_selection_g = Main_Context.canvas.append("g")
                                              .attr("id", "update_selection_g")

  // update selection example 
  update_selection_g.append("circle")
                      .attr("cx", 250)
                      .attr("cy", 100)
                      .attr("r",50)      

  update_selection_g.append("circle")
                      .attr("cx", 250)
                      .attr("cy", 250)
                      .attr("r",50)      

  // 존재하는 Elements들의 업데이트 Selection
  // update selection
  // data : 2
  // exist circle : 2
  // update selection : 0
  update_selection_g.selectAll("circle")
                      .data(data)
                      .attr("fill","red")
                      .enter()
                        .append("circle")
                        .attr("cx",100)
                        .attr("cy",250)
                        .attr("r",50)
                        .attr("fill","green")


  // exit selection group 
  var update_selection_g = Main_Context.canvas.append("g")
                                              .attr("id", "update_selection_g")

  // exit selection example 
  update_selection_g.append("circle")
                      .attr("cx", 400)
                      .attr("cy", 100)
                      .attr("r",50)      

  update_selection_g.append("circle")
                      .attr("cx", 400)
                      .attr("cy", 250)
                      .attr("r",50)      

  var dataForExit = [10];

  // 데이터를 바인딩하지 못한 Element의 처리를 정의할 수 있음
  // exit selection
  // data : 1
  // exist circle : 2
  // exit selection : 1
  update_selection_g.selectAll("circle")
                      .data(dataForExit)
                      .exit()
                        .attr("fill", "gray")

}

document.addEventListener("DOMContentLoaded", function () {
  _main({});
});