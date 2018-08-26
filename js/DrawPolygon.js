document.write("<script language='JavaScript' src='../../Build/Cesium/Cesium.js'></script>");
/**
 * 绘制直箭头
 * @param viewer: Cesium中生成的viewer
 * @param anchorpoints: 点击事件生成的屏幕坐标
 */
function plotingStraightArrow(viewer,anchorpoints) {
    let window_points = _computeStraightArrowPoints(anchorpoints);
    let GeoPoints = _createGeoPoints(viewer,window_points);
    viewer.entities.add({
        name:'StraightArrow',
        polygon:{
            hierarchy: Cesium.Cartesian3.fromDegreesArray(GeoPoints),
            material:Cesium.Color.RED.withAlpha(0.5),
            outline:true,
            outlineColor:Cesium.Color.GREEN,
            outlineWidth:5
        }
    })
}
/**
 * 绘制斜箭头
 * @param viewer
 * @param anchorpoints
 */
function plotingDiagonalArrow(viewer,anchorpoints){
    let window_points = _computeDiagonalArrow(anchorpoints);
    let GeoPoints = _createGeoPoints(viewer,window_points);
    let poly = viewer.entities.add({
        name:'DiagonalArrow',
        polygon:{
            hierarchy: Cesium.Cartesian3.fromDegreesArray(GeoPoints),
            material:Cesium.Color.RED.withAlpha(0.5),
            outline:true,
            outlineColor:Cesium.Color.GREEN,
            outlineWidth:5
        }
    });
}
/**
 * 绘制燕尾箭头
 * @param viewer
 * @param anchorpoints
 */
function plotingSwallowtailArrow(viewer,anchorpoints){
    let window_points = _computeSwallowtailArrow(anchorpoints);
    let GeoPoints = _createGeoPoints(viewer,window_points);
    viewer.entities.add({
        name:'SwallowtailArrow',
        polygon:{
            hierarchy: Cesium.Cartesian3.fromDegreesArray(GeoPoints),
            material:Cesium.Color.RED.withAlpha(0.5),
            outline:true,
            outlineColor:Cesium.Color.GREEN,
            outlineWidth:5
        }
    })
}
/**
 * 绘制双箭头
 * @param viewer
 * @param anchorpoints
 */
function plotingDoubleArrow(viewer,anchorpoints){
    let window_points = _create_doublearrow(anchorpoints);
    let GeoPoints = _createGeoPoints(viewer,window_points);
    viewer.entities.add({
        name:'DoubleArrow',
        polygon:{
            hierarchy: Cesium.Cartesian3.fromDegreesArray(GeoPoints),
            material:Cesium.Color.RED.withAlpha(0.5),
            outline:true,
            outlineColor:Cesium.Color.GREEN,
            outlineWidth:5
        }
    })
}
/**
 * 绘制聚集区
 * @param viewer
 * @param anchorpoints
 */
function plotingGatheringPlace(viewer,anchorpoints){
    let GatheringPlacePoints = _computeGatheringPlacePoints(anchorpoints);
    let CardinalPoints = createCloseCardinal(GatheringPlacePoints);
    let window_points = calculatePointsFBZ3(CardinalPoints,100);
    let GeoPoints = _createGeoPoints(viewer,window_points);
    viewer.entities.add({
        name:'GatheringPlace',
        polygon:{
            hierarchy: Cesium.Cartesian3.fromDegreesArray(GeoPoints),
            material:Cesium.Color.RED.withAlpha(0.5),
            outline:true,
            outlineColor:Cesium.Color.GREEN,
            outlineWidth:5
        }
    })
}
function plotingRegularPolygon(viewer,anchorpoints){
    let points = _computeRegularPolygonPoints(anchorpoints);
    let Geo_points = _createGeoPoints(viewer,points);
    viewer.entities.add({
        name:'RegularPolygon',
        polygon:{
            hierarchy: Cesium.Cartesian3.fromDegreesArray(Geo_points),
            material:Cesium.Color.RED.withAlpha(0.5),
            height:0,
            outline:true,
            outlineColor:Cesium.Color.GREEN,
            outlineWidth:5
        }
    })
}
/**
 * 绘制平行四边形
 * @param viewer
 * @param anchorpoints
 */
function plotingParallelogram(viewer,anchorpoints){
    let points = _computeParallelogramPoints(anchorpoints);
    let Geo_points = _createGeoPoints(viewer,points);
    viewer.entities.add({
        name:'Parallelogram',
        polygon:{
            hierarchy: Cesium.Cartesian3.fromDegreesArray(Geo_points),
            material:Cesium.Color.RED.withAlpha(0.5),
            height:0,
            outline:true,
            outlineColor:Cesium.Color.GREEN,
            outlineWidth:5
        }
    })
}
/**
 * 绘制跑道
 * @param viewer
 * @param anchorpoints
 */
function plotingTrack(viewer,anchorpoints){
    let points = _computeTrackPoints(anchorpoints);
    let Geo_points = _createGeoPoints(viewer,points);
    viewer.entities.add({
        name:'Track',
        polygon:{
            hierarchy: Cesium.Cartesian3.fromDegreesArray(Geo_points),
            material:Cesium.Color.RED.withAlpha(0.5),
            height:0,
            outline:true,
            outlineColor:Cesium.Color.GREEN,
            outlineWidth:5
        }
    })
}
/**
 * 绘制圆角矩形
 * @param viewer
 * @param anchorpoints
 */
function plotingRoundedRectangle(viewer,anchorpoints){
    let points = _computeRoundedRectanglePoints(anchorpoints);
    let Geo_points = _createGeoPoints(viewer,points);

    viewer.entities.add({
        name:'RoundedRectangle',
        polygon:{
            hierarchy: Cesium.Cartesian3.fromDegreesArray(Geo_points),
            material:Cesium.Color.RED.withAlpha(0.5),
            height:0,
            outline:true,
            outlineColor:Cesium.Color.GREEN,
            outlineWidth:5
        }
    })
}
/**
 * 绘制弓形
 * @param viewer
 * @param anchorpoints
 */
function plotingBow(viewer,anchorpoints){
    let points = _computeBowPoints(anchorpoints);
    let Geo_points = _createGeoPoints(viewer,points);
    viewer.entities.add({
        name:'Bow',
        polygon:{
            hierarchy: Cesium.Cartesian3.fromDegreesArray(Geo_points),
            material:Cesium.Color.RED.withAlpha(0.5),
            height:0,
            outline:true,
            outlineColor:Cesium.Color.GREEN,
            outlineWidth:5
        }
    })
}
/**
 * 绘制圆
 * @param viewer
 * @param anchorpoints
 */
function plotingCircle(viewer,anchorpoints){
    let points = _computeCirclePoints(anchorpoints);
    let Geo_points = _createGeoPoints(viewer,points);
    viewer.entities.add({
        name:'Circle',
        polygon:{
            hierarchy: Cesium.Cartesian3.fromDegreesArray(Geo_points),
            material:Cesium.Color.RED.withAlpha(0.5),
            //height:0,
            outline:true,
            outlineColor:Cesium.Color.GREEN,
            outlineWidth:5
        }
    })
}
/**
 * 绘制扇形
 * @param viewer
 * @param anchorpoints
 */
function plotingSector(viewer,anchorpoints){
    let points = _computeSectorPoints(anchorpoints);
    let Geo_points = _createGeoPoints(viewer,points);
    viewer.entities.add({
        name:'Sector',
        polygon:{
            hierarchy: Cesium.Cartesian3.fromDegreesArray(Geo_points),
            material:Cesium.Color.RED.withAlpha(0.5),
            height:0,
            outline:true,
            outlineColor:Cesium.Color.GREEN,
            outlineWidth:5
        }
    })
}
/**
 * 绘制椭圆
 * @param viewer
 * @param anchorpoints
 */
function plotingEllipse(viewer,anchorpoints){
    let points = _computeEllipsePoints(anchorpoints);
    let Geo_points = _createGeoPoints(viewer,points);
    viewer.entities.add({
        name:'Ellipse',
        polygon:{
            hierarchy: Cesium.Cartesian3.fromDegreesArray(Geo_points),
            material:Cesium.Color.RED.withAlpha(0.5),
            height:0,
            outline:true,
            outlineColor:Cesium.Color.GREEN,
            outlineWidth:5
        }
    })
}
/**
 * 绘制矩形
 * @param anchorpoints
 * @returns {Array}
 */
function plotingRectangle(viewer,anchorpoints){
    let window_points=_computeRectanglePoints(anchorpoints);

    let GeoPoints = _createGeoPoints(viewer,window_points);
    console.log(Cesium.Cartesian3.fromDegreesArray(GeoPoints));
      viewer.entities.add({
        name:'Rectangle',
        polygon:{
            hierarchy: Cesium.Cartesian3.fromDegreesArray(GeoPoints),
            material:Cesium.Color.RED.withAlpha(0.5),
            outline:true,
            outlineColor:Cesium.Color.GREEN,
            outlineWidth:5
        }
    });
    return GeoPoints;
}
/**
 * 根据输入的屏幕坐标计算直线箭头其余特征点的屏幕坐标
 * @param anchorpoints
 * @param ratio
 * @returns {Array} 特征点屏幕坐标
 * @private
 */
function _computeStraightArrowPoints(anchorpoints,ratio=6){
    let width = Math.sqrt(Math.pow(anchorpoints[1].x-anchorpoints[0].x,2)+
        Math.pow(anchorpoints[1].y-anchorpoints[0].y,2));
    let height = width/ratio;
    let offset = 0.5*height;
    let delta_y = Math.abs((anchorpoints[1].x-anchorpoints[0].x)*(offset/width));
    let delta_x;
    let window_points = [];
    if (delta_y==offset){
        delta_x = 0;
    }
    else{
        delta_x = Math.abs((anchorpoints[1].y-anchorpoints[0].y)*(offset/width));
    }
    if(anchorpoints[1].y>anchorpoints[0].y){
        let arrowBased = {x:anchorpoints[0].x+(5/6)*Math.abs((anchorpoints[1].x-anchorpoints[0].x)),
            y:anchorpoints[0].y+(5/6)*Math.abs((anchorpoints[1].y-anchorpoints[0].y))};
        let point1 = {x:anchorpoints[0].x-delta_x,y:anchorpoints[0].y+delta_y};
        let point2 = {x:anchorpoints[0].x+delta_x,y:anchorpoints[0].y-delta_y};
        let point3 = {x:arrowBased.x+delta_x,y:arrowBased.y-delta_y};
        let point4 = {x:arrowBased.x+(1/6)*Math.abs((anchorpoints[1].y-anchorpoints[0].y)),
            y:arrowBased.y-(1/6)*Math.abs((anchorpoints[1].x-anchorpoints[0].x))};
        let point5 = {x:anchorpoints[1].x,y:anchorpoints[1].y};
        let point6 = {x:arrowBased.x-(1/6)*Math.abs((anchorpoints[1].y-anchorpoints[0].y)),
            y:arrowBased.y+(1/6)*Math.abs((anchorpoints[1].x-anchorpoints[0].x))};
        let point7 = {x:arrowBased.x-delta_x,y:arrowBased.y+delta_y};
        window_points.push(point1,point2,point3,point4,point5,point6,point7);
    }
    else{
        let arrowBased = {x:anchorpoints[0].x+(5/6)*Math.abs((anchorpoints[1].x-anchorpoints[0].x)),
            y:anchorpoints[0].y-(5/6)*Math.abs((anchorpoints[1].y-anchorpoints[0].y))};
        let point1 = {x:anchorpoints[0].x+delta_x,y:anchorpoints[0].y+delta_y};
        let point2 = {x:anchorpoints[0].x-delta_x,y:anchorpoints[0].y-delta_y};
        let point3 = {x:arrowBased.x-delta_x,y:arrowBased.y-delta_y};
        let point4 = {x:arrowBased.x-(1/6)*Math.abs((anchorpoints[1].y-anchorpoints[0].y)),
            y:arrowBased.y-(1/6)*Math.abs((anchorpoints[1].x-anchorpoints[0].x))};
        let point5 = {x:anchorpoints[1].x,y:anchorpoints[1].y};
        let point6 = {x:arrowBased.x+(1/6)*Math.abs((anchorpoints[1].y-anchorpoints[0].y)),
            y:arrowBased.y+(1/6)*Math.abs((anchorpoints[1].x-anchorpoints[0].x))};
        let point7 = {x:arrowBased.x+delta_x,y:arrowBased.y+delta_y};
        window_points.push(point1,point2,point3,point4,point5,point6,point7);
    }
    return window_points;
}
/**
 * 计算斜箭头特征点屏幕坐标
 * @param anchorpoints
 * @returns {any[]}
 * @private
 */
function _computeDiagonalArrow(anchorpoints) {
    let x0 = anchorpoints[0].x;
    let y0 = anchorpoints[0].y;
    let x1 = anchorpoints[1].x;
    let y1 = anchorpoints[1].y;
    let xt = (15.8 * x1 + 3.2 * x0) / 19;
    let yt = (15.8 * y1 + 3.2 * y0) / 19;
    let ap = new Array(7);
    ap[0]={x:x1,y:y1};
    ap[1] = {x:xt + 0.85 / 3.2 * (y1 - yt),y: yt - 0.85 / 3.2 * (x1 - xt)};
    ap[2] = {x:xt + 0.25 / 3.2 * (y1 - yt), y:yt - 0.25 / 3.2 * (x1 - xt)};
    ap[3] = {x:x0 + 1.6 / 19 * (y1 - y0), y:y0 - 1.6 / 19 * (x1 - x0)};
    ap[4] = {x:x0 - 1.6 / 19 * (y1 - y0), y:y0 + 1.6 / 19 * (x1 - x0)};
    ap[5] = {x:xt - 0.25 / 3.2 * (y1 - yt),y: yt + 0.25 / 3.2 * (x1 - xt)};
    ap[6] = {x:xt - 0.85 / 3.2 * (y1 - yt), y:yt + 0.85 / 3.2 * (x1 - xt)};
    return ap;
}
/**
 * 计算燕尾箭头特征点屏幕坐标
 * @param anchorpoints
 * @returns {any[]}
 * @private
 */
function _computeSwallowtailArrow(anchorpoints) {
    let x0 = anchorpoints[0].x;
    let y0 = anchorpoints[0].y;
    let x1 = anchorpoints[1].x;
    let y1 = anchorpoints[1].y;
    let xt = (15.8 * x1 + 3.2 * x0) / 19;
    let yt = (15.8 * y1 + 3.2 * y0) / 19;
    let ap = new Array(7);
    ap[0]={x:x1,y:y1};
    ap[1] = {x:xt + 0.85 / 3.2 * (y1 - yt),y: yt - 0.85 / 3.2 * (x1 - xt)};
    ap[2] = {x:xt + 0.25 / 3.2 * (y1 - yt), y:yt - 0.25 / 3.2 * (x1 - xt)};
    ap[3] = {x:x0 + 1.6 / 19 * (y1 - y0), y:y0 - 1.6 / 19 * (x1 - x0)};
    ap[4]={x:(3.2*x1+15.8*x0)/19,y:(3.2*y1+15.8*y0)/19};
    ap[5] = {x:x0 - 1.6 / 19 * (y1 - y0), y:y0 + 1.6 / 19 * (x1 - x0)};
    ap[6] = {x:xt - 0.25 / 3.2 * (y1 - yt),y: yt + 0.25 / 3.2 * (x1 - xt)};
    ap[7] = {x:xt - 0.85 / 3.2 * (y1 - yt), y:yt + 0.85 / 3.2 * (x1 - xt)};
    return ap;
}
/**
 * 生成双箭头屏幕坐标
 * @param Anchorpoints
 * @private
 */
function _create_doublearrow(Anchorpoints) {
    let pointU_1 = Anchorpoints[1];
    let pointU_2 = Anchorpoints[0];
    let pointU_3 = Anchorpoints[3];
    let pointU_4 = Anchorpoints[2];
    let pointU_C={x:((pointU_1.x+pointU_2.x)*5+(pointU_3.x+pointU_4.x))/12,y:((pointU_1.y+pointU_2.y)*5+(pointU_3.y+pointU_4.y))/12};
    var pointC_l_out = calculateIntersectionFromTwoCorner(pointU_1,pointU_4,Math.PI/8,Math.PI/6)[0];

    var pointC_l_inner = calculateIntersectionFromTwoCorner(pointU_C,pointU_4,Math.PI/8,Math.PI/16)[0];

    var pointC_r_out = calculateIntersectionFromTwoCorner(pointU_2,pointU_3,Math.PI/8,Math.PI/6)[1];

    var pointC_r_inner = calculateIntersectionFromTwoCorner(pointU_C,pointU_3,Math.PI/8,Math.PI/16)[1];
    var v_l_out = {x:pointC_l_out.x-pointU_4.x,y:pointC_l_out.y-pointU_4.y};
    var d_l_out = Math.sqrt(v_l_out.x*v_l_out.x+v_l_out.y*v_l_out.y);

    var v_l_out_1 = {x:v_l_out.x/d_l_out,y:v_l_out.y/d_l_out};

    var v_l_inner = {x:pointC_l_inner.x-pointU_4.x,y:pointC_l_inner.y-pointU_4.y};
    var d_l_inner = Math.sqrt(v_l_inner.x*v_l_inner.x+v_l_inner.y*v_l_inner.y);

    var v_l_inner_1 = {x:v_l_inner.x/d_l_inner,y:v_l_inner.y/d_l_inner};

    var ab = 0.25;
    var d_l_a = d_l_out<d_l_inner?d_l_out*ab:d_l_inner*ab;
    //
    var pointC_l_out_2 = {x:v_l_out_1.x*d_l_a+pointU_4.x,y:v_l_out_1.y*d_l_a+pointU_4.y};
    var pointC_l_inner_2 = {x:v_l_inner_1.x*d_l_a+pointU_4.x,y:v_l_inner_1.y*d_l_a+pointU_4.y};


    var pointC_l_a_l = {x:pointC_l_out_2.x*1.5-pointC_l_inner_2.x*0.5,y:pointC_l_out_2.y*1.5-pointC_l_inner_2.y*0.5};

    var pointC_l_a_r ={x:pointC_l_inner_2.x*1.5-pointC_l_out_2.x*0.5,y:pointC_l_inner_2.y*1.5-pointC_l_out_2.y*0.5};

    var v_r_out = {x:pointC_r_out.x-pointU_3.x,y:pointC_r_out.y-pointU_3.y};
    var d_r_out = Math.sqrt(v_r_out.x*v_r_out.x+v_r_out.y*v_r_out.y);
    var v_r_out_1 = {x:v_r_out.x/d_r_out,y:v_r_out.y/d_r_out};

    var v_r_inner = {x:pointC_r_inner.x-pointU_3.x,y:pointC_r_inner.y-pointU_3.y};
    var d_r_inner = Math.sqrt(v_r_inner.x*v_r_inner.x+v_r_inner.y*v_r_inner.y);
    var v_r_inner_1 = {x:v_r_inner.x/d_r_inner,y:v_r_inner.y/d_r_inner};


    var d_r_a = d_r_out<d_r_inner?d_r_out*ab:d_r_inner*ab;
    var pointC_r_out_2 = {x:v_r_out_1.x*d_r_a+pointU_3.x,y:v_r_out_1.y*d_r_a+pointU_3.y};
    var pointC_r_inner_2 = {x:v_r_inner_1.x*d_r_a+pointU_3.x,y:v_r_inner_1.y*d_r_a+pointU_3.y};


    var pointC_r_a_r ={x:pointC_r_out_2.x*1.5-pointC_r_inner_2.x*0.5,y:pointC_r_out_2.y*1.5-pointC_r_inner_2.y*0.5};

    var pointC_r_a_l = {x:pointC_r_inner_2.x*1.5-pointC_r_out_2.x*0.5,y:pointC_r_inner_2.y*1.5-pointC_r_out_2.y*0.5};

    var points_l = _createBezierPoints([pointU_1,pointC_l_out,pointC_l_out_2],100);

    var v_U_4_3 = {x:pointU_3.x-pointU_4.x,y:pointU_3.y-pointU_4.y};

    var v_U_4_C ={x:pointU_C.x-pointU_4.x,y:pointU_C.y-pointU_4.y};
    var d_U_4_C = Math.sqrt(v_U_4_C.x*v_U_4_C.x+v_U_4_C.y*v_U_4_C.y);
    var v_U_3_C = {x:pointU_C.x-pointU_3.x,y:pointU_C.y-pointU_3.y};

    var d_U_3_C = Math.sqrt(v_U_3_C.x*v_U_3_C.x+v_U_3_C.y*v_U_3_C.y);

    var percent = 0.4;
    var v_U_4_3_ = {x:v_U_4_3.x*percent,y:v_U_4_3.y*percent};
    var v_U_4_3_l = {x:v_U_4_3_.x*d_U_4_C/(d_U_4_C+d_U_3_C),y:v_U_4_3_.y*d_U_4_C/(d_U_4_C+d_U_3_C)};
    var v_U_4_3_r = {x:v_U_4_3_.x*d_U_3_C/(d_U_4_C+d_U_3_C),y:v_U_4_3_.y*d_U_3_C/(d_U_4_C+d_U_3_C)};

    var pointC_c_l = {x:pointU_C.x-v_U_4_3_l.x,y:pointU_C.y-v_U_4_3_l.y};

    var pointC_c_r = {x:pointU_C.x+v_U_4_3_r.x,y:pointU_C.y+v_U_4_3_r.y};


    var arr = [pointC_l_inner_2,pointC_l_inner,pointC_c_l,pointU_C,pointC_c_r,pointC_r_inner,pointC_r_inner_2];
    //var arr=[pointC_r_inner_2,pointC_r_inner,pointC_c_r,pointU_C,pointC_c_l,pointC_l_inner,pointC_l_inner_2,];
    var points_c = _createBezierPoints(arr,100);
    //var points_c = SuperMap.Geometry.LineString.createBezier(arr,0.05).components;


    var points_r = _createBezierPoints([pointC_r_out_2,pointC_r_out,pointU_2],100);
    let points_x=PointcalculateIntersectionPoint(pointU_1,pointU_2,pointU_3,pointU_4);
    if (isPointInSegment(points_x, pointU_1,pointU_2) && isPointInSegment(points_x,pointU_3,pointU_4)){
        let result = points_l;
        let result1=[];
        let result2=[];
        result.push(pointC_l_a_l);
        result.push(pointU_4);
        result.push(pointC_l_a_r);
        let t=points_c[0].x;
        let s=0;
        /*for(let i=0;i<points_c.length/2;i++){
            result1.push({x:points_c[i].x,y:points_c[i].y});
            s++
        }
        for(let i=s;i<points_c.length;i++){
             result2.push({x:points_c[i].x,y:points_c[i].y});
             t=points_c[i].x;
         }*/
        let min=99999;
        for(let i=0;i<points_c.length;i++){
            let d=DistanceForPointToABLine(points_c[i],pointU_1,pointU_2);
            if(d<min){
                min=d;
                s=i;
            }
        }
        for(let i=0;i<s;i++){
            result1.push({x:points_c[i].x,y:points_c[i].y});
        }
        for(let i=s;i<points_c.length;i++){
            result2.push({x:points_c[i].x,y:points_c[i].y});
        }
        result = result.concat(result1);
        points_r.reverse();
        result = result.concat(points_r);
        result.push(pointC_r_a_r);
        result.push(pointU_3);
        result.push(pointC_r_a_l);
        result2.reverse();
        result = result.concat(result2);
        return result;
    }
    else {
        let result = points_l;
        result.push(pointC_l_a_l);
        result.push(pointU_4);
        result.push(pointC_l_a_r);
        result = result.concat(points_c);
        result.push(pointC_r_a_l);
        result.push(pointU_3);
        result.push(pointC_r_a_r);
        result = result.concat(points_r);

        return result;
    }

}
/**
 * 计算矩形特征点屏幕坐标
 * @param anchorpoints
 * @returns {Array} 屏幕坐标
 * @private
 */
function _computeRectanglePoints(anchorpoints){
    let window_points =[];
    let pointstemp = [];
    let point1 = {x:anchorpoints[1].x,y:anchorpoints[0].y};
    let point2 = {x:anchorpoints[0].x,y:anchorpoints[1].y};
    pointstemp.push(anchorpoints[0]);
    pointstemp.push(point1);
    pointstemp.push(anchorpoints[1]);
    pointstemp.push(point2);
    for (let i=0;i<pointstemp.length;i++){
        window_points.push({x:pointstemp[i].x,y:pointstemp[i].y});
    }
    return window_points;
}
/**
 * 计算椭圆特征点
 * @param anchor
 * @private
 */
function _computeEllipsePoints(anchor){
    let o_x = anchor [1].x/2+anchor[0].x/2;
    let o_y = anchor [1].y/2+anchor[0].y/2;
    let a = undefined;
    let b = undefined;
    let theta = undefined;
    if(anchor [1].x-o_x==0){
        theta = 0;
        b = anchor[1].y-o_y;
        a = 0;
    }
    else{
        theta = Math.atan((anchor[1].y-o_y)/(anchor [1].x-o_x));
        a = (anchor[1].x-o_x)/Math.sin(theta);
        b = (anchor[1].y-o_y)/Math.cos(theta);
    };
    let points = [];
    let X = undefined;
    let Y = undefined;
    for(let i=1;i<=360;i++){
        let theta1 = i * Math.PI/180;
        X = a * Math.cos(theta1)+o_x;
        Y = b * Math.sin(theta1)+o_y;
        points.push({x:X,y:Y});
    }
    return points;
}
/**
 *计算扇形特征点
 * @param anchor
 * @returns {Array}
 * @private
 */
function _computeSectorPoints(anchor) {
    let theta1 = calculateAngle(anchor[0],anchor[1]);
    let theta2 = calculateAngle(anchor[0],anchor[2]);
    if (theta1 > theta2) {
        theta2 = 2 * Math.PI + theta2;
    }
    let step = Math.PI / 180;
    let radius = theta1;
    let points = [anchor[0]];
    let r = Math.sqrt((anchor[1].x-anchor[0].x) * (anchor[1].x-anchor[0].x) + (anchor[1].y-anchor[0].y) * (anchor[1].y-anchor[0].y));
    for (let i = 0; i < Math.abs(theta1 - theta2); i += step) {
        let X = anchor[0].x + r * Math.cos(radius);
        let Y = anchor[0].y + r * Math.sin(radius);
        radius = radius + step;
        radius = radius < 0 ? 2 * Math.PI + radius : radius;
        radius = radius > 2 * Math.PI ? radius -  2 * Math.PI: radius;
        points.push({x: X, y: Y});
    }
    return points;
}
/**
 * 计算圆特征点
 * @param anchorpoints
 * @returns {Array}
 * @private
 */
function _computeCirclePoints(anchor) {
    let p_x = 2*anchor[0].x-anchor[1].x;
    let p_y = 2*anchor[0].y-anchor[1].y;
    let a = anchor[1].x-p_x;
    let b = anchor[1].y - p_y;
    let c = {x:a,y:b};
    let points_L=[];
    let points_R=[];
    for(let i=1;i<=36;i++){
        let theta = i * Math.PI/72;
        let d = Math.sqrt(a*a+b*b)*Math.cos(theta);
        let v = calculateVector(c,theta,d);
        let point_L = {x:v[0].x+p_x,y:v[0].y+p_y};
        let point_R = {x:v[1].x+p_x,y:v[1].y+p_y};
        points_L.push(point_L);
        points_R.push(point_R);
    }
    let points = points_R;
    for(let i=points_L.length-2;i>=0;i--){
        points.push(points_L[i]);
    }
    return points;
}
/**
 * 计算弓形特征点
 * @param anchorpoints
 * @returns {Array}
 * @private
 */
function _computeBowPoints(anchor){
    //根据三个点到圆心的距离相等
    let A1 = 2*(anchor[1].x - anchor[0].x);
    let B1 = 2*(anchor[1].y - anchor[0].y);
    let C1 = anchor[1].x * anchor[1].x + anchor[1].y * anchor[1].y - anchor[0].x * anchor[0].x - anchor[0].y * anchor[0].y;
    let A2 = 2*(anchor[2].x - anchor[1].x);
    let B2 = 2*(anchor[2].y - anchor[1].y);
    let C2 = anchor[2].x * anchor[2].x + anchor[2].y * anchor[2].y - anchor[1].x * anchor[1].x - anchor[1].y * anchor[1].y;
    let o_x = (C1 * B2 - C2 * B1)/(A1 * B2 - A2 * B1);
    let o_y = (A1 * C2 - A2 * C1)/(A1 * B2 - A2 * B1);
    let o = {x:o_x,y:o_y};
    let r = Math.sqrt((anchor[0].x-o_x) * (anchor[0].x-o_x) + (anchor[0].y - o_y) * (anchor[0].y - o_y));
    let theta1 = calculateAngle(o,anchor[0]);
    let theta2 = calculateAngle(o,anchor[1]);
    let theta3 = calculateAngle(o,anchor[2]);
    let step = Math.PI / 180;
    let radius = undefined;
    let points = [];
    if ((theta1 < theta3 && theta3 < theta2) || (theta2 < theta3 && theta3 < theta1)){
        radius = theta1 < theta2 ? theta1 : theta2;
        for (let i = 0; i < Math.abs(theta1 - theta2); i += step) {
            let X = o_x + r * Math.cos(radius);
            let Y = o_y + r * Math.sin(radius);
            radius = radius + step;
            radius = radius < 0 ? 2 * Math.PI + radius : radius;
            radius = radius > 2 * Math.PI ? 2 * Math.PI - radius : radius;
            points.push({x: X, y: Y});
        }
    }
    else{
        radius = theta1 > theta2 ? theta1 : theta2;
        for (let i = 0; i <  (2 * Math.PI - Math.abs(theta1 - theta2)); i += step) {
            let X = o_x + r * Math.cos(radius);
            let Y = o_y + r * Math.sin(radius);
            radius = radius + step;
            radius = radius < 0 ? 2 * Math.PI + radius : radius;
            radius = radius > 2 * Math.PI ? radius - 2 * Math.PI : radius;
            points.push({x: X, y: Y});
        }
    }
    return points;
}
/**
 * 计算圆角矩形特征点
 * @param anchor
 * @returns {Array}
 * @private
 */
function _computeRoundedRectanglePoints(anchor){
    let o_x = (anchor[0].x + anchor[1].x)/2;
    let o_y = (anchor[0].y + anchor[1].y)/2;
    let o = {x:o_x,y:o_y};
    //a为矩形的长边，b为矩形的短边
    let a = Math.abs(anchor[0].x - anchor[1].x);
    let b = Math.abs(anchor[0].y - anchor[1].y);
    let r = 1 / 10 * Math.min(a,b);
    //从左上点开始，顺时针求四个圆弧的圆心
    let o1_x = o_x - a / 2 + r;
    let o1_y = o_y - b / 2 + r;
    let o1 = {x:o1_x,y:o1_y};
    let o2 = {x:o_x + a / 2 - r,y:o_y - b / 2 + r};
    let o3 = {x:o_x + a / 2 - r,y:o_y + b / 2 - r};
    let o4 = {x:o_x - a / 2 + r,y:o_y + b / 2 - r};
    //从左上角开始画圆弧
    let step = Math.PI / 180;
    let points1 = [];
    let theta1 = Math.PI;
    let theta2 = 3 / 2 * Math.PI;
    let radius1 = theta1;
    for (let i = 0; i < Math.abs(theta1 - theta2); i += step) {
        let X = o1.x + r * Math.cos(radius1);
        let Y = o1.y + r * Math.sin(radius1);
        radius1 = radius1 + step;
        radius1 = radius1 < 0 ? 2 * Math.PI + radius1 : radius1;
        radius1 = radius1 > 2 * Math.PI ? 2 * Math.PI - radius1 : radius1;
        points1.push({x: X, y: Y});
    }
    let points2 = points1;
    let theta3 = Math.PI * 3 / 2;
    let theta4 = 2 * Math.PI;
    let radius2 = theta3;
    for (let i = 0; i < Math.abs(theta3 - theta4); i += step) {
        let X = o2.x + r * Math.cos(radius2);
        let Y = o2.y + r * Math.sin(radius2);
        radius2 = radius2 + step;
        radius2 = radius2 < 0 ? 2 * Math.PI + radius2 : radius2;
        radius2 = radius2 > 2 * Math.PI ? 2 * Math.PI - radius2 : radius2;
        points2.push({x: X, y: Y});
    }
    let points3 = points2;
    let theta5 = 0;
    let theta6 = 1 / 2 * Math.PI;
    let radius3 = theta5;
    for (let i = 0; i < Math.abs(theta5 - theta6); i += step) {
        let X = o3.x + r * Math.cos(radius3);
        let Y = o3.y + r * Math.sin(radius3);
        radius3 = radius3 + step;
        radius3 = radius3 < 0 ? 2 * Math.PI + radius3 : radius3;
        radius3 = radius3 > 2 * Math.PI ? 2 * Math.PI - radius3 : radius3;
        points3.push({x: X, y: Y});
    }
    let points = points3;
    let theta7 = 1 / 2 * Math.PI;
    let theta8 = Math.PI;
    let radius4 = theta7;
    for (let i = 0; i < Math.abs(theta7 - theta8); i += step) {
        let X = o4.x + r * Math.cos(radius4);
        let Y = o4.y + r * Math.sin(radius4);
        radius4 = radius4 + step;
        radius4 = radius4 < 0 ? 2 * Math.PI + radius4 : radius4;
        radius4 = radius4 > 2 * Math.PI ? 2 * Math.PI - radius4 : radius4;
        points.push({x: X, y: Y});
    }
    return points;
}
/**
 * 计算正多边形特征点
 * @param anchor
 * @returns {Array}
 * @private
 */
function _computeRegularPolygonPoints(anchor){
    let r = Math.sqrt((anchor[anchor.length-1].x - anchor[0].x) * (anchor[anchor.length-1].x - anchor[0].x)
        + (anchor[anchor.length-1].y - anchor[0].y) * (anchor[anchor.length-1].y - anchor[0].y));
    let num_sides = anchor.length + 1;
    let points = [];
    let step = 2 * Math.PI / num_sides;
    if(num_sides % 2 == 0){
        let radius1 = 1 / 2 * Math.PI;
        for (let i = 0; i < 2 * Math.PI; i += step) {
            let X = anchor[0].x + r * Math.cos(radius1);
            let Y = anchor[0].y + r * Math.sin(radius1);
            radius1 = radius1 + step;
            radius1 = radius1 < 0 ? 2 * Math.PI + radius1 : radius1;
            radius1 = radius1 > 2 * Math.PI ? radius1 - 2 * Math.PI : radius1;
            points.push({x: X, y: Y});
        }
    }
    else{
        let radius2 = 1 / 2 * Math.PI + step / 2;
        for (let i = 0; i < 2 * Math.PI; i += step) {
            let X = anchor[0].x + r * Math.cos(radius2);
            let Y = anchor[0].y + r * Math.sin(radius2);
            radius2 = radius2 + step;
            radius2 = radius2 < 0 ? 2 * Math.PI + radius2 : radius2;
            radius2 = radius2 > 2 * Math.PI ?  radius2 - 2 * Math.PI: radius2;
            points.push({x: X, y: Y});
        }
    }
    return points;
}
/**
 * 计算平行四边形特征点
 * @param anchor
 * @returns {*}
 * @private
 */
function _computeParallelogramPoints(anchor){
    let a = {x:anchor[1].x - anchor[0].x,y:anchor[1].y - anchor[0].y};
    let d_a = Math.sqrt(a.x * a.x + a.y * a.y);
    //利用向量的点乘求夹角
    let theta = calculateAngle(anchor[1],anchor[0]);
    let points = anchor;
    let X = anchor[2].x + d_a * Math.cos(theta);
    let Y = anchor[2].y + d_a * Math.sin(theta);
    points.push({x:X,y:Y});
    return points;
}
/**
 * 计算跑道特征点
 * @param anchor
 * @private
 */
function _computeTrackPoints(anchor){
    let d = Math.sqrt((anchor[1].x - anchor[0].x) * (anchor[1].x - anchor[0].x) + (anchor[1].y - anchor[0].y) *(anchor[1].y - anchor[0].y));
    let r = d / 10;
    //求两点的斜率，进而求出半圆的角度
    let theta0 = calculateAngle(anchor[0],anchor[1]);
    //从第一个点开始画半圆
    let step = Math.PI / 180;
    let points1 = [];
    let theta1_1 = theta0 + 1 / 2 * Math.PI;
    let theta1_2 = theta1_1 + Math.PI;
    let radius1 = theta1_1;
    for (let i = 0; i < Math.abs(theta1_1 - theta1_2); i += step) {
        radius1 = radius1 < 0 ? 2 * Math.PI + radius1 : radius1;
        radius1 = radius1 > 2 * Math.PI ?radius1  - 2 * Math.PI : radius1;
        let X = anchor[0].x + r * Math.cos(radius1);
        let Y = anchor[0].y + r * Math.sin(radius1);
        radius1 = radius1 + step;
        points1.push({x: X, y: Y});
    }
    let points = points1;
    let theta2_1 = theta0 - 1 / 2 * Math.PI;
    let theta2_2 = theta2_1 + Math.PI;
    let radius2 = theta2_1;
    for (let i = 0; i < Math.abs(theta2_1 - theta2_2); i += step) {
        radius2 = radius2 < 0 ? 2 * Math.PI + radius2 : radius2;
        radius2 = radius2 > 2 * Math.PI ? radius2 - 2 * Math.PI: radius2;
        let X = anchor[1].x + r * Math.cos(radius2);
        let Y = anchor[1].y + r * Math.sin(radius2);
        radius2 = radius2 + step;
        points.push({x: X, y: Y});
    }
    return points;
}
/**
 * 计算聚集区特征点
 * @param anchorpoints
 * @returns {Array}
 * @private
 */
function _computeGatheringPlacePoints(anchorpoints) {
    let points = [];
    if(anchorpoints.length==2){
        let originP = anchorpoints[0];
        let lastP = anchorpoints[anchorpoints.length-1];
        let vectorOL = {x:lastP.x-originP.x,y:lastP.y-originP.y};
        let dOL = Math.sqrt(vectorOL.x*vectorOL.x+vectorOL.y*vectorOL.y);
        let v_O_P1_lr = calculateVector(vectorOL,Math.PI/3,Math.sqrt(3)/12*dOL);
        let originP_P1 = v_O_P1_lr[1];
        let p1 = {x:originP.x+originP_P1.x,y:originP.y+originP_P1.y};
        let p2 = {x:(originP.x+lastP.x)/2,y:(originP.y+lastP.y)/2};
        let v_L_P3_lr = calculateVector(vectorOL,Math.PI*2/3,Math.sqrt(3)/12*dOL);
        let lastP_P3 = v_L_P3_lr[1];
        let p3 = {x:lastP.x+lastP_P3.x,y:lastP.y+lastP_P3.y};
        let v_O_P5_lr=calculateVector(vectorOL,Math.PI/2,1/2*dOL);
        let v_O_P5=v_O_P5_lr[0];
        let p5= {x:v_O_P5.x+p2.x,y:v_O_P5.y+p2.y};
        let p0 = originP;
        let p4 = lastP;
        points.push(p0,p1,p2,p3,p4,p5);
    }
    return points;
}
/**
 * 根据基准向量、夹角、长度计算指定向量
 * @param v
 * @param theta
 * @param d
 * @returns {*[]}
 */
function calculateVector(v,theta,d){
    if (!theta) theta = Math.PI / 2;
    if (!d) d = 1;

    let x_1;
    let x_2;
    let y_1;
    let y_2;
    let v_l;
    let v_r;

    let d_v = Math.sqrt(v.x * v.x + v.y * v.y);

    if (v.y == 0) {
        x_1 = x_2 = d_v * d * Math.cos(theta) / v.x;
        if (v.x > 0) {
            y_1 = Math.sqrt(d * d - x_1 * x_1);
            y_2 = -y_1;
        }
        else if (v.x < 0) {
            y_2 = Math.sqrt(d * d - x_1 * x_1);
            y_1 = -y_2;
        }
        v_l = {x:x_1, y:y_1};
        v_r = {x:x_2, y:y_2};
    }
    else {
        let n = -v.x / v.y;
        let m = d * d_v * Math.cos(theta) / v.y;
        let a = 1 + n * n;
        let b = 2 * n * m;
        let c = m * m - d * d;
        x_1 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
        x_2 = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
        y_1 = n * x_1 + m;
        y_2 = n * x_2 + m;
        if (v.y >= 0) {
            v_l = {x:x_1, y:y_1};
            v_r = {x:x_2, y:y_2};
        }
        else if (v.y < 0) {
            v_l = {x:x_2, y:y_2};
            v_r = {x:x_1, y:y_1};
        }
    }
    return [v_l, v_r];
}
/**
 * 根据输入的两点计算向量的角度
 * @param a1
 * @param a2
 * @returns {*}
 */
function  calculateAngle(a1,a2){
    let a = {x:a2.x-a1.x,y:a2.y-a1.y};
    let theta = Math.atan2(a.y,a.x);
    if (theta < 0){
        theta=theta + 2 * Math.PI;
    }
    return theta;
}
/**
 * 生成闭合的样条点
 * @param points
 * @returns {*}
 */
function createCloseCardinal(points) {
    if (points == null || points.length < 3) {
        return points;
    }
    //获取起点，作为终点，以闭合曲线。
    let lastP = points[0];
    points.push(lastP);

    //定义传入的点数组，将在点数组中央（每两个点）插入两个控制点
    let cPoints = points;
    //包含输入点和控制点的数组
    let cardinalPoints = [];

    //至少三个点以上
    //这些都是相关资料测出的经验数值
    //定义张力系数，取值在0<t<0.5
    let t = 0.4;
    //为端点张力系数因子，取值在0<b<1
    let b = 0.5;
    //误差控制，是一个大于等于0的数，用于三点非常趋近与一条直线时，减少计算量
    let e = 0.005;

    //传入的点数量，至少有三个，n至少为2
    let n = cPoints.length - 1;
    //从开始遍历到倒数第二个，其中倒数第二个用于计算起点（终点）的插值控制点
    for (let k = 0; k <= n - 1; k++) {
        //计算起点（终点）的左右控制点
        if (k == n - 1) {
            //三个基础输入点
            var p0 = cPoints[n - 1];
            var p1 = cPoints[0];
            var p2 = cPoints[1];
        }
        else {
            var p0 = cPoints[k];
            var p1 = cPoints[k + 1];
            var p2 = cPoints[k + 2];
        }

        //定义p1的左控制点和右控制点
        let p1l = {x:undefined,y:undefined};
        let p1r = {x:undefined,y:undefined};
        //通过p0、p1、p2计算p1点的做控制点p1l和又控制点p1r
        //计算向量p0_p1和p1_p2
        let p0_p1 = {x:p1.x - p0.x, y:p1.y - p0.y};
        let p1_p2 = {x:p2.x - p1.x, y:p2.y - p1.y};
        //并计算模
        let d01 = Math.sqrt(p0_p1.x * p0_p1.x + p0_p1.y * p0_p1.y);
        let d12 = Math.sqrt(p1_p2.x * p1_p2.x + p1_p2.y * p1_p2.y);
        //向量单位化
        let p0_p1_1 = {x:p0_p1.x / d01, y:p0_p1.y / d01};
        let p1_p2_1 = {x:p1_p2.x / d12, y:p1_p2.y / d12};
        //计算向量p0_p1和p1_p2的夹角平分线向量
        let p0_p1_p2 = {x:p0_p1_1.x + p1_p2_1.x, y:p0_p1_1.y + p1_p2_1.y};
        //计算向量 p0_p1_p2 的模
        let d012 = Math.sqrt(p0_p1_p2.x * p0_p1_p2.x + p0_p1_p2.y * p0_p1_p2.y);
        //单位化向量p0_p1_p2
        let p0_p1_p2_1 = {x:p0_p1_p2.x / d012, y:p0_p1_p2.y / d012};
        //判断p0、p1、p2是否共线，这里判定向量p0_p1和p1_p2的夹角的余弦和1的差值小于e就认为三点共线
        let cosE_p0p1p2 = (p0_p1_1.x * p1_p2_1.x + p0_p1_1.y * p1_p2_1.y) / 1;
        //共线
        if (Math.abs(1 - cosE_p0p1p2) < e) {
            //计算p1l的坐标
            p1l.x = p1.x - p1_p2_1.x * d01 * t;
            p1l.y = p1.y - p1_p2_1.y * d01 * t;
            //计算p1r的坐标
            p1r.x = p1.x + p0_p1_1.x * d12 * t;
            p1r.y = p1.y + p0_p1_1.y * d12 * t;
        }
        //非共线
        else {
            //计算p1l的坐标
            p1l.x = p1.x - p0_p1_p2_1.x * d01 * t;
            p1l.y = p1.y - p0_p1_p2_1.y * d01 * t;
            //计算p1r的坐标
            p1r.x = p1.x + p0_p1_p2_1.x * d12 * t;
            p1r.y = p1.y + p0_p1_p2_1.y * d12 * t;
        }

        //记录起点（终点）的左右插值控制点及倒数第二个控制点
        if (k == n - 1) {
            cardinalPoints[0] = p1;
            cardinalPoints[1] = p1r;
            cardinalPoints[(n - 2) * 3 + 2 + 3] = p1l;
            cardinalPoints[(n - 2) * 3 + 2 + 4] = cPoints[n];
        }
        else {
            //记录下这三个控制点
            cardinalPoints[k * 3 + 2 + 0] = p1l;
            cardinalPoints[k * 3 + 2 + 1] = p1;
            cardinalPoints[k * 3 + 2 + 2] = p1r;

        }

    }
    return cardinalPoints
}
/**
 * 计算贝塞尔点
 * @param anchorpoints
 * @param numpoints
 * @returns {Array}
 * @private
 */
function _createBezierPoints(anchorpoints,numpoints=100){
    let points=[];
    for (let i=0;i<=numpoints;i++){
        let point = _computeBezierPoints(anchorpoints,i/numpoints)
        points.push(point);
    }
    return points;
}
/**
 * 计算三阶贝塞尔点
 * @param points
 * @param part
 * @returns {Array}
 */
function calculatePointsFBZ3(points,part){
    if (!part) part = 20;
    //获取待拆分的点
    let bezierPts = [];
    let scale = 0.05;

    if (part > 0) {
        scale = 1 / part;
    }

    for (var i = 0; i < points.length - 3;) {
        //起始点
        var pointS = points[i];
        //第一个控制点
        var pointC1 = points[i + 1];
        //第二个控制点
        var pointC2 = points[i + 2];
        //结束点
        var pointE = points[i + 3];

        bezierPts.push(pointS);
        for (var t = 0; t < 1;) {
            //三次贝塞尔曲线公式
            var x = (1 - t) * (1 - t) * (1 - t) * pointS.x + 3 * t * (1 - t) * (1 - t) * pointC1.x + 3 * t * t * (1 - t) * pointC2.x + t * t * t * pointE.x;
            var y = (1 - t) * (1 - t) * (1 - t) * pointS.y + 3 * t * (1 - t) * (1 - t) * pointC1.y + 3 * t * t * (1 - t) * pointC2.y + t * t * t * pointE.y;
            var point = {x:x, y:y};
            bezierPts.push(point);
            t += scale;
        }

        i += 3;
        if (i >= points.length) {
            bezierPts.push(pointS);
        }
    }

    //需要判定一下最后一个点是否存在
    let poRE = bezierPts[bezierPts.length - 1];
    let popE = points[points.length - 1];
    /*if (!poRE.equals(popE)) {
        bezierPts.push(popE.clone());
    }*/
    return bezierPts;
}
/**
 *根据特征点屏幕坐标计算地理坐标
 * @param viewer
 * @param window_points 屏幕坐标
 * @returns {Array} 地理坐标（经纬度）
 * @private
 */
function _createGeoPoints(viewer,window_points){
    let points=[];
    for (let i=0;i<window_points.length;i++){
        let ellipsoid = viewer.scene.globe.ellipsoid;
        let temp_cartesian = viewer.camera.pickEllipsoid(window_points[i],ellipsoid);
        let cartographic = ellipsoid.cartesianToCartographic(temp_cartesian);
        let lng = Cesium.Math.toDegrees(cartographic.longitude);
        let lat = Cesium.Math.toDegrees(cartographic.latitude);
        points.push(lng);
        points.push(lat);
    }
    return points;
}
function calculateVectorProduct(P1,  P2,  P3, P4) {
    return(P2.x-P1.x) * (P4.y-P3.y) - (P2.y-P1.y) * (P4.x-P3.x);
}
function calculateIntersectionFromTwoCorner(pointS, pointE, a_S, a_E) {
    if (!a_S) a_S = Math.PI / 4;
    if (!a_E) a_E = Math.PI / 4;

    var v_SE ={x:pointE.x - pointS.x, y:pointE.y - pointS.y};

    var v_SI_lr = calculateVector(v_SE, a_S, 1);
    var v_SI_l = v_SI_lr[0];
    var v_SI_r = v_SI_lr[1];

    var v_EI_lr = calculateVector(v_SE, Math.PI - a_S, 1);
    var v_EI_l = v_EI_lr[0];
    var v_EI_r = v_EI_lr[1];

    var pointI_l = calculateIntersection(v_SI_l, v_EI_l, pointS, pointE);

    var pointI_r = calculateIntersection(v_SI_r, v_EI_r, pointS, pointE);
    return [pointI_l, pointI_r];

}
function calculateIntersection(v_1, v_2, point1, point2) {
    var x;
    var y;
    if (v_1.y * v_2.x - v_1.x * v_2.y == 0) {
        if (v_1.x * v_2.x > 0 || v_1.y * v_2.y > 0) {
            x = (point1.x + point2.x) / 2;
            y = (point1.y + point2.y) / 2;
        }
        else {
            x = point2.x;
            y = point2.y;
        }
    }
    else {
        //
        x = (v_1.x * v_2.x * (point2.y - point1.y) + point1.x * v_1.y * v_2.x - point2.x * v_2.y * v_1.x) / (v_1.y * v_2.x - v_1.x * v_2.y);
        if (v_1.x != 0) {
            y = (x - point1.x) * v_1.y / v_1.x + point1.y;
        }
        else {
            y = (x - point2.x) * v_2.y / v_2.x + point2.y;
        }
    }
    return {x:x, y:y};

}
function PointcalculateIntersectionPoint( A,  B,  C,  D){
    let t1 =calculateVectorProduct(C, D, A, B);
    let t2 = calculateVectorProduct(A, B, A, C);
    let  x = C.x +(D.x-C.x) * t2 / t1;
    let y = C.y +(D.y-C.y) * t2 / t1;
    return {x:x,y:y};
}
function isPointInSegment( P1, LineStart,  LineEnd) {
    return(isBetween(P1.x, LineStart.x,LineEnd.x)  &&  isBetween(P1.y, LineStart.y,LineEnd.y));
}
function isBetween( Num, Num1,  Num2) {

    let deviation =0.1;      //   由于浮点数的精度问题，因此引入误差防止误判

    return (Num >= min(Num1, Num2)-deviation && Num <= max(Num1,Num2)+deviation);

}
function min( Num1,  Num2) {
    return Num1 > Num2 ? Num2 : Num1;
}
function max( Num1,  Num2) {

    return Num1 > Num2 ? Num1 : Num2;

}
function  DistanceForPointToABLine(A, B, C){
    let reVal = 0;
    let retData = false;
    let  cross = (C.x - B.x) * (A.x - B.x) + (C.y - B.y) * (A.y - B.y);
    if (cross <= 0)
    {
        reVal = Math.sqrt((A.x - B.x) * (A.x - B.x) + (A.y - B.y) * (A.y - B.y));
        retData = true;
    }

    let d2 = (C.x - B.x) * (C.x - B.x) + (C.y - B.y) * (C.y - B.y);
    if (cross >= d2)
    {
        reVal = Math.sqrt((A.x - C.x) * (A.x - C.x) + (A.y - C.y) * (A.y - C.y));
        retData = true;
    }

    if (!retData)
    {
        let r = cross / d2;
        let px = B.x + (C.x - B.x) * r;
        let py = B.y + (C.y - B.y) * r;
        reVal = Math.sqrt((A.x - px) * (A.x - px) + (py - A.y) * (py - A.y));
    }

    return reVal;
}

