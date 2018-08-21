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
function PointcalculateIntersectionPoint( A,  B,  C,  D){
    let t1 =calculateVectorProduct(C, D, A, B);
    let t2 = calculateVectorProduct(A, B, A, C);
    let  x = C.x +(D.x-C.x) * t2 / t1;
    let y = C.y +(D.y-C.y) * t2 / t1;
    return {x:x,y:y};
}
function calculateVectorProduct(P1,  P2,  P3, P4) {
    return(P2.x-P1.x) * (P4.y-P3.y) - (P2.y-P1.y) * (P4.x-P3.x);
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
function calculateMorePoints(anchorpoints,ratio=6){
    let l=0,w,pointS,pointE;
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
    let point_t_l = {x:0,y:0};
    let point_t_r = {x:0,y:0};
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
    let v_l_h = {x:0,y:0};
    let v_r_h = {x:0,y:0};
    //定义曲线最后一个控制点，也就是头部结束点和最后一个拐角点的中点
    let point_C_l_e = {x:0,y:0};
    let point_C_r_e = {x:0,y:0};
    //定义三角形的左右两个点
    let point_triangle_l = {x:0,y:0};
    let point_triangle_r = {x:0,y:0};

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
    let pointsR = [point_t_l];
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
    return pointsR;
}