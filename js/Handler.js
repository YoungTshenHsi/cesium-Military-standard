document.write("<script language='JavaScript' src='../Build/Cesium/Cesium.js'></script>");
document.write("<script language='JavaScript' src='./DrawLine.js'></script>");
function HandlerLine(viewer,polylineType) {
    let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    let anchorpoints = [];
    let polyline = undefined;
    handler.setInputAction((event)=>{
        let window_position = event.position;
        if(anchorpoints.length==0){
            anchorpoints.push({x:window_position.x,y:window_position.y});
        }
        anchorpoints.push({x:window_position.x+0.000001,y:window_position.y+0.000001});
    },Cesium.ScreenSpaceEventType.LEFT_DOWN);
    handler.setInputAction(function(movement){
        let w_p = movement.endPosition;
        if(anchorpoints.length>0){
            let window_points,GeoPoints;
            if(polylineType=='Bezierline'||polylineType=='BezierArrow'){
                window_points = _createBezierPoints(anchorpoints);
                GeoPoints = _createGeoPoints(viewer,window_points);
            }
            if(polylineType=='Cardinalline'||polylineType=='CardinalArrow'){
                window_points = _CubicSpline(anchorpoints.length,anchorpoints);
                GeoPoints = _createGeoPoints(viewer,window_points);
            }
            if (!Cesium.defined(polyline)) {
                let funcList = {'Bezierline':plotingBezierline(viewer,anchorpoints),
                                'BezierArrow':plotingBezierArrow(viewer,anchorpoints),
                                };
                polyline = funcList[polylineType];
            }else{
                anchorpoints.pop();
                anchorpoints.push({x:w_p.x,y:w_p.y});
                polyline.polyline.positions = new Cesium.CallbackProperty(()=>{
                    return Cesium.Cartesian3.fromDegreesArray(GeoPoints);
                },false)
            }
        }
    },Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    handler.setInputAction((event)=>{
        handler.destroy();
    },Cesium.ScreenSpaceEventType.RIGHT_DOWN);
}
function HandlerPolygon(viewer,polygonType) {
    let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    let anchorpoints = [];
    let polygon = undefined;
    handler.setInputAction((event)=>{
        let window_position = event.position;
        if(anchorpoints.length==0){
            anchorpoints.push({x:window_position.x,y:window_position.y});
        }
        anchorpoints.push({x:window_position.x+0.000001,y:window_position.y+0.000001});
        if(anchorpoints.length==3){
            handler.destroy();
        }
    },Cesium.ScreenSpaceEventType.LEFT_DOWN);
    handler.setInputAction((event)=>{
        let w_p = event.endPosition;
        if(anchorpoints.length>1){
            let window_points,GeoPoints,GatheringPlacePoints,CardinalPoints;
            if(polygonType=='Rectangle'){
                window_points=_computeRectanglePoints(anchorpoints);
                GeoPoints = _createGeoPoints(viewer,window_points);
            }
            if(polygonType=='GatheringPlace'){
                GatheringPlacePoints = _computeGatheringPlacePoints(anchorpoints);
                CardinalPoints = createCloseCardinal(GatheringPlacePoints);
                window_points = calculatePointsFBZ3(CardinalPoints,100);
                GeoPoints = _createGeoPoints(viewer,window_points);
            }
            if(!Cesium.defined(polygon)){
                if(polygonType=='Rectangle'){
                    polygon = plotingRectangle(viewer,anchorpoints);
                }
                if(polygonType=='GatheringPlace'){
                    polygon = plotingGatheringPlace(viewer,anchorpoints);
                }
            }
            else{
                anchorpoints.pop();
                anchorpoints.push({x:w_p.x,y:w_p.y});
                polygon.polygon.hierarchy = new Cesium.CallbackProperty(()=>{
                    return Cesium.Cartesian3.fromDegreesArray(GeoPoints);
                },false)
            }
        }
    },Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    return anchorpoints;
}
function HandlerStraightArrow(viewer){
    let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    let anchorpoints = [];
    let polygon = undefined;
    handler.setInputAction((event)=>{
        let w_p = event.position;
        if(anchorpoints.length==0){
            anchorpoints.push({x:w_p.x,y:w_p.y});
        }
        anchorpoints.push({x:w_p.x+1,y:w_p.y+1});
    },Cesium.ScreenSpaceEventType.LEFT_DOWN)
    handler.setInputAction((event)=>{
        let w_p = event.endPosition;
        if(anchorpoints.length>1){
            let control_w_p = calculateMorePoints(anchorpoints);
            let GeoPoints = _createGeoPoints(viewer,control_w_p);
            if(!Cesium.defined(polygon)){
                polygon = viewer.entities.add({
                    name:'StraightArrow',
                    polygon: {
                        hierarchy: Cesium.Cartesian3.fromDegreesArray(GeoPoints),
                        material: Cesium.Color.RED.withAlpha(0.5)
                    }
                })
            }
            else{
                anchorpoints.pop();
                anchorpoints.push({x:w_p.x,y:w_p.y});
                polygon.polygon.hierarchy = new Cesium.CallbackProperty(()=>{
                    return Cesium.Cartesian3.fromDegreesArray(GeoPoints);
                },false)
            }
        }
        else{
            return;
        }
    },Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    handler.setInputAction((event)=>{
        handler.destroy();
    },Cesium.ScreenSpaceEventType.RIGHT_DOWN)
}
function calculateTwoPoints(anchorpoints,ratio=6){
    let pointS = anchorpoints[0];//箭头起点
    let pointE = anchorpoints[1];//箭头终点
    let controlPois = [];
    let v_based ={x:pointE.x-pointS.x,y:pointE.y-pointS.y};//计算基准向量
    let l = Math.sqrt((pointE.x-pointS.x)*(pointE.x-pointS.x)+(pointE.y-pointS.y)*(pointE.y-pointS.y));//计算箭头长度
    let w = l/ratio;//箭头宽度
    let x_ = pointS.x+5*(pointE.x-pointS.x)/ratio;//箭头前端三角形中点坐标x
    let y_ = pointS.y+5*(pointE.y-pointS.y)/ratio;//箭头前端三角形中点坐标y
    let v_lr = calculateVector(v_based,Math.PI/2,w/2);
    let v_l = v_lr[0];
    let v_r = v_lr[1];
    let point1 = {x:pointS.x+v_l.x,y:pointS.y+v_l.y};
    let point2 = {x:x_+v_l.x,y:y_+v_l.y};
    let point3 = {x:x_+2*v_l.x,y:y_+2*v_l.y};
    let point4 = {x:pointE.x,y:pointE.y};
    let point5 = {x:x_+2*v_r.x,y:y_+2*v_r.y};
    let point6 = {x:x_+v_r.x,y:y_+v_r.y};
    let point7 = {x:pointS.x+v_r.x,y:pointS.y+v_r.y};
    controlPois.push(point1,point2,point3,point4,point5,point6,point7);
    return controlPois;
}
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
function calculateIntersection(v_1, v_2, point1, point2) {
    let x;
    let y;
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
function calculateMorePoints(anchorpoints,ratio=6){
    let pointsR;
    if(anchorpoints.length>2){
        let l=0,w,pointS,pointE;
        console.log(anchorpoints.length);
        for(let i = 0;i<anchorpoints.length-1;i++)
        {
            //取出首尾两个点
            pointS = anchorpoints[i];
            pointE = anchorpoints[i+1];
            l += Math.sqrt((pointE.y-pointS.y)*(pointE.y-pointS.y)+(pointE.x-pointS.x)*(pointE.x-pointS.x));
        }
        w = l/ratio;
        //定义左右控制点集合
        let points_C_l = [];
        let points_C_r = [];
        //定义尾部左右的起始点
        let point_t_l = {x:undefined,y:undefined};
        let point_t_r = {x:undefined,y:undefined};
        //计算中间的所有交点
        for(let j = 0;j<anchorpoints.length-2;j++)
        {
            let pointU_1 = anchorpoints[j];//第一个用户传入的点
            let pointU_2 = anchorpoints[j+1];//第二个用户传入的点
            let pointU_3 = anchorpoints[j+2];//第三个用户传入的点

            //计算向量
            let v_U_1_2 = {x:pointU_2.x-pointU_1.x,y:pointU_2.y-pointU_1.y};
            let v_U_2_3 = {x:pointU_3.x-pointU_2.x,y:pointU_3.y-pointU_2.y};
            let v_lr_1_2 = calculateVector(v_U_1_2,Math.PI/2,w/2);
            let v_l_1_2 = v_lr_1_2[0];
            let v_r_1_2 = v_lr_1_2[1];
            let v_lr_2_3 = calculateVector(v_U_2_3,Math.PI/2,w/2);
            let v_l_2_3 = v_lr_2_3[0];
            let v_r_2_3 = v_lr_2_3[1];

            //获取左右
            let point_l_1 = {x:pointU_1.x+v_l_1_2.x,y:pointU_1.y+v_l_1_2.y};
            let point_r_1 = {x:pointU_1.x+v_r_1_2.x,y:pointU_1.y+v_r_1_2.y};
            let point_l_2 = {x:pointU_2.x+v_l_2_3.x,y:pointU_2.y+v_l_2_3.y};
            let point_r_2 = {x:pointU_2.x+v_r_2_3.x,y:pointU_2.y+v_r_2_3.y};
            //向量v_U_1_2和向量v-point_l_1和point_r_1是平行的
            //如果向量a=(x1，y1)，b=(x2，y2)，则a//b等价于x1y2－x2y1=0
            //得到(x-point_l_1.x)*v_U_1_2.y=v_U_1_2.x*(y-point_l_1.y)
            //得到(point_l_2.x-x)*v_U_2_3.y=v_U_2_3.x*(point_l_2.y-y)
            //可以求出坐边的交点(x,y)，即控制点
            let point_C_l = calculateIntersection(v_U_1_2,v_U_2_3,point_l_1,point_l_2);
            let point_C_r = calculateIntersection(v_U_1_2,v_U_2_3,point_r_1,point_r_2);
            //定义中间的控制点
            let point_C_l_c;
            let point_C_r_c;
            if(j == 0)
            {
                //记录下箭头尾部的左右两个端点
                point_t_l = point_l_1;
                point_t_r = point_r_1;
                //计算第一个曲线控制点
                point_C_l_c = {x:(point_t_l.x+point_C_l.x)/2,y:(point_t_l.y+point_C_l.y)/2};
                point_C_r_c = {x:(point_t_r.x+point_C_r.x)/2,y:(point_t_r.y+point_C_r.y)/2};
                //添加两个拐角控制点中间的中间控制点
                points_C_l.push(point_C_l_c);
                points_C_r.push(point_C_r_c);
            }
            else
            {
                //获取前一个拐角控制点
                let point_C_l_q = points_C_l[points_C_l.length-1];
                let point_C_r_q = points_C_r[points_C_r.length-1];
                //计算两个拐角之间的中心控制点
                point_C_l_c = {x:(point_C_l_q.x+point_C_l.x)/2,y:(point_C_l_q.y+point_C_l.y)/2};
                point_C_r_c = {x:(point_C_r_q.x+point_C_r.x)/2,y:(point_C_r_q.y+point_C_r.y)/2};
                //添加两个拐角控制点中间的中间控制点
                points_C_l.push(point_C_l_c);
                points_C_r.push(point_C_r_c);
            }
            //添加后面的拐角控制点
            points_C_l.push(point_C_l);
            points_C_r.push(point_C_r);
        }
        //计算



        //进入计算头部
        //计算一下头部的长度
        let pointU_E2 = anchorpoints[anchorpoints.length-2];//倒数第二个用户点
        let pointU_E1 = anchorpoints[anchorpoints.length-1];//最后一个用户点
        //
        let v_U_E2_E1 = {x:pointU_E1.x-pointU_E2.x,y:pointU_E1.y-pointU_E2.y};
        let head_d = Math.sqrt(v_U_E2_E1.x*v_U_E2_E1.x + v_U_E2_E1.y*v_U_E2_E1.y);
        //定义头部的左右两结束点
        let point_h_l;
        let point_h_r;

        //头部左右两向量数组
        let v_lr_h = [];
        let v_l_h = {x:undefined,y:undefined};
        let v_r_h = {x:undefined,y:undefined};
        //定义曲线最后一个控制点，也就是头部结束点和最后一个拐角点的中点
        let point_C_l_e = {x:undefined,y:undefined};
        let point_C_r_e = {x:undefined,y:undefined};
        //定义三角形的左右两个点
        let point_triangle_l = {x:undefined,y:undefined};
        let point_triangle_r = {x:undefined,y:undefined};

        //获取当前的最后的控制点，也就是之前计算的拐角点
        let point_C_l_eq = points_C_l[points_C_l.length-1];
        let point_C_r_eq = points_C_r[points_C_r.length-1];

        //三角的高度都不够
        if(head_d <= w)
        {
            v_lr_h = calculateVector(v_U_E2_E1,Math.PI/2,w/2);
            v_l_h = v_lr_h[0];
            v_r_h = v_lr_h[1];
            //获取头部的左右两结束点
            point_h_l = {x:pointU_E2.x+v_l_h.x,y:pointU_E2.y+v_l_h.y};
            point_h_r = {x:pointU_E2.x+v_r_h.x,y:pointU_E2.y+v_r_h.y};


            //计算最后的控制点
            point_C_l_e = {x:(point_C_l_eq.x+point_h_l.x)/2,y:(point_C_l_eq.y+point_h_l.y)/2};
            point_C_r_e = {x:(point_C_r_eq.x+point_h_r.x)/2,y:(point_C_r_eq.y+point_h_r.y)/2};

            //添加最后的控制点（中心点）
            points_C_l.push(point_C_l_e);
            points_C_r.push(point_C_r_e);


            //计算三角形的左右两点
            point_triangle_l = {x:2*point_h_l.x-pointU_E2.x,y:2*point_h_l.y-pointU_E2.y};
            point_triangle_r = {x:2*point_h_r.x-pointU_E2.x,y:2*point_h_r.y-pointU_E2.y};
        }
        //足够三角的高度
        else
        {
            //由于够了三角的高度，所以首先去掉三角的高度

            //计算向量
            let v_E2_E1 = {x:pointU_E1.x-pointU_E2.x,y:pointU_E1.y-pointU_E2.y};
            //取模
            let v_E2_E1_d = Math.sqrt(v_E2_E1.x*v_E2_E1.x+v_E2_E1.y*v_E2_E1.y);
            //首先需要计算三角形的底部中心点
            let point_c = {x:pointU_E1.x-v_E2_E1.x*w/v_E2_E1_d,y:pointU_E1.y-v_E2_E1.y*w/v_E2_E1_d};
            //计算出在三角形上底边上头部结束点

            v_lr_h = calculateVector(v_U_E2_E1,Math.PI/2,w/2);
            v_l_h = v_lr_h[0];
            v_r_h = v_lr_h[1];
            //获取头部的左右两结束点
            point_h_l = {x:point_c.x+v_l_h.x,y:point_c.y+v_l_h.y};
            point_h_r = {x:point_c.x+v_r_h.x,y:point_c.y+v_r_h.y};

            //计算最后的控制点
            point_C_l_e = {x:(point_C_l_eq.x+point_h_l.x)/2,y:(point_C_l_eq.y+point_h_l.y)/2};
            point_C_r_e = {x:(point_C_r_eq.x+point_h_r.x)/2,y:(point_C_r_eq.y+point_h_r.y)/2};

            //添加最后的控制点（中心点）
            points_C_l.push(point_C_l_e);
            points_C_r.push(point_C_r_e);

            //计算三角形的左右点
            point_triangle_l = {x:2*point_h_l.x-point_c.x,y:2*point_h_l.y-point_c.y};
            point_triangle_r = {x:2*point_h_r.x-point_c.x,y:2*point_h_r.y-point_c.y};
        }

        //使用控制点计算差值
        //计算贝塞尔的控制点
        let points_BC_l=[],points_BC_r=[];
        for (let i=0;i<points_C_l.length-2;i++){
            let temp_l = [];
            let temp_r = [];
            let temp1_l = points_C_l[i];
            let temp2_l = points_C_l[i+1];
            let temp3_l = points_C_l[i+2];
            let temp1_r = points_C_r[i];
            let temp2_r = points_C_r[i+1];
            let temp3_r = points_C_r[i+2];
            temp_l.push(temp1_l,temp2_l,temp3_l);
            temp_r.push(temp1_r,temp2_r,temp3_r);
            let points_temp_l = _createBezierPoints(temp_l);
            let points_temp_r = _createBezierPoints(temp_r);
            points_BC_l = points_BC_l.concat(points_temp_l);
            points_BC_r = points_BC_r.concat(points_temp_r);
        }
        //组合左右点集和三角形三个点
        pointsR = [point_t_l];
        //首先连接左边的差值曲线
        pointsR = pointsR.concat(points_BC_l);
        //添加左边头部结束点
        pointsR.push(point_h_l);
        //添加三角形左边点
        pointsR.push(point_triangle_l);
        //添加三角形顶点
        pointsR.push(pointU_E1);
        //添加三角形右边点
        pointsR.push(point_triangle_r);
        //添加右边头部结束点
        pointsR.push(point_h_r);
        //合并右边的所有点（先把右边的点倒序）
        pointsR = pointsR.concat(points_BC_r.reverse());

        //添加右边尾部起始点
        pointsR.push(point_t_r);
        console.log(pointsR);
    }
    else{
        pointsR = calculateTwoPoints(anchorpoints)
    }
    return pointsR;
}
function _createBezierPoints(anchorpoints,numpoints=100){
    let points=[];
    for (let i=0;i<=numpoints;i++){
        let point = _computeBezierPoints(anchorpoints,i/numpoints)
        points.push(point);
    }
    return points;
}