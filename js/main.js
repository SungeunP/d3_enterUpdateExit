_main = (args) => {
  console.log("=== Main ===");
  console.log("args", args);

  var biggestDataValue = Main_Context.getBiggestNumber();
  var smallestDataValue = Main_Context.getSmallestNumber();
  console.log(biggestDataValue);
  console.log(smallestDataValue)
  
  // 메인 SVG 캔버스
  Main_Context.svgCanvas_test = d3.select("body")
                                  .append("svg")
                                  .attr("width",biggestDataValue + 200)
                                  .attr("height",500)
                                  .append("g") // 그룹 생성
                                  .attr("transform", "translate(30, 0)"); // x : 30 변경
  
  // 3.0v 강좌 : d3.scale.linear() ==> deprecated
  // 5.0v 업데이트 : d3.scaleLinear()
  var widthScale = d3.scaleLinear()
                // Note : domain 안에 데이터가 해당 되면 데이터들을 range에 있는 크기에 맞추어 백분률 계산  
                .domain([0, biggestDataValue]) // 실제 데이터의 범위
                .range([0, 500]); // 백분률 
  
  // 데이터 값에 따른 색 지정 //
  var color = d3.scaleLinear()
                .domain([0, biggestDataValue]) // 실제 데이터의 범위
                .range(["#dbdbdb","black"]); // 백분률에 맞추어 표현하고 싶은 색 범위

  // 데이터 간격 표현 축 (x 축)
  // d3 v3 : d3.svg.axis ==> deprecated
  // d3 v5 : d3.axisBottom
  // axis의 값은 scale의 domain 값을 따라감!
  // scale.range에서 백분률 계산은 해주나, 값은 domain을 따라가서 0~100 이런 식으로 나타내고 싶으면
  // -> 전처리과정이 필요
  var axis = d3.axisBottom()
              .ticks(5) // scale.domain 에 해당하는 값을 i(5)의 값으로 나눔
              .scale(widthScale); // x축 스케일 지정

  // 데이터 그리기
  var bars = Main_Context.svgCanvas_test.selectAll("rect")
                              .data(Main_Context.graphData) // 데이터 바인딩
                              .enter() // 데이터 enter - data in datas
                                .append("rect") // data 표현
                                .attr("width", function (d, i) {
                                  return widthScale(d.value); // 해당 데이터의 value만큼 width값 반환
                                })
                                .attr("height",50) // 고정 높이값
                                .attr("y", function (d, i) {
                                  return 70 * i; // 고정 y축 너미값
                                })
                                .attr("fill", function (d) {
                                  return color(d.value); // 데이터 값에 맞는 동적 색 표현을 위해 scaleLinear 사용
                                })
                                .attr("value", function (d, i) {
                                  return d.name; // test data binding at DOM
                                });

  // axis(데이터 간격 표현 x축)
  Main_Context.svgCanvas_test.append("g")
                              .attr("transform", "translate(0,400)") // 고정 y값
                              .call(axis); // d3.axis 호출

  // Main_Context.svgCanvas_test.append("rect")
  //                             .attr("width",100)
  //                             .attr("height",100)
  //                             .attr("x",200)
  //                             .attr("y",200);

  // Main_Context.svgCanvas_test.append("circle")
  //                             .attr("cx",250)
  //                             .attr("cy",250)
  //                             .attr("r",50)
  //                             .attr("fill","gray");
}

document.addEventListener("DOMContentLoaded", function () {
  _main({});
});