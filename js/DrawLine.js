document.write("<script language='JavaScript' src='../Build/Cesium/Cesium.js'></script>");

/**
 * 绘制贝塞尔曲线
 * @param viewer
 * @param anchorpoints
 */
function plotingBezierline(viewer,anchorpoints){
    let window_points = _createBezierPoints(anchorpoints,numpoints=100);
    let GeoPoints = _createGeoPoints(viewer,window_points);
    let Bezierline = viewer.entities.add({
        name : 'Bezierline',
        polyline : {
            positions : Cesium.Cartesian3.fromDegreesArray(GeoPoints),
            width : 2,
            material : Cesium.Color.RED
        }
    });
    return Bezierline;
}
/**
 * 绘制贝塞尔箭头
 * @param viewer
 * @param anchorpoints
 */
function plotingBezierArrow(viewer,anchorpoints){
    let window_points = _createBezierPoints(anchorpoints,numpoints=100);
    let GeoPoints = _createGeoPoints(viewer,window_points);
    let BezierArrow = viewer.entities.add({
        name : 'BezierArrow',
        polyline : {
            positions : Cesium.Cartesian3.fromDegreesArray(GeoPoints),
            width : 5,
            material : new Cesium.PolylineArrowMaterialProperty(Cesium.Color.RED)
        }
    });
    return BezierArrow;
}
/**
 * 绘制Cardinal曲线
 * @param viewer
 * @param anchorpoints
 */
function plotingCardinalline(viewer,anchorpoints){
    let n=anchorpoints.length;
    let window_points = _CubicSpline(n,anchorpoints);
    let GeoPoints = _createGeoPoints(viewer,window_points);
    let CardinalLine = viewer.entities.add({
        name : 'Cardinalline',
        polyline : {
            positions : Cesium.Cartesian3.fromDegreesArray(GeoPoints),
            width : 2,
            material : Cesium.Color.RED
        }
    });
    return CardinalLine;
}
/**
 * 绘制cardinal箭头
 * @param viewer
 * @param anchorpoints
 */
function plotingCardinalArrow(viewer,anchorpoints){
    let n=anchorpoints.length;
    let window_points = _CubicSpline(n,anchorpoints);
    let GeoPoints = _createGeoPoints(viewer,window_points);
    let CardinalArrow = viewer.entities.add({
        name : 'CardinalArrow',
        polyline : {
            positions : Cesium.Cartesian3.fromDegreesArray(GeoPoints),
            width : 5,
            material : new Cesium.PolylineArrowMaterialProperty(Cesium.Color.RED)
        }
    });
    return CardinalArrow
}
/**
 * 生成贝塞尔曲线屏幕特征点
 * @param anchorpoints
 * @param numpoints
 * @returns {Array}
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
 * 计算贝塞尔曲线特征点
 * @param anchorpoints
 * @param t
 * @returns {{x: number, y: number}}
 * @private
 */
function _computeBezierPoints(anchorpoints,t){
    let x=0,y=0,z=0;
    let Binomial_coefficient = _computeBinomial(anchorpoints);
    for(let j=0;j<anchorpoints.length;j++){
        let tempPoint = anchorpoints[j];
        x += tempPoint.x * Math.pow((1-t),(anchorpoints.length-1-j)) * Math.pow(t,j) * Binomial_coefficient[j];
        y += tempPoint.y * Math.pow((1-t),(anchorpoints.length-1-j)) * Math.pow(t,j) * Binomial_coefficient[j];
    }
    return {x:x,y:y}
}
/**
 * 计算二项式系数
 * @param anchorpoints
 * @returns {Array}
 * @private
 */
function _computeBinomial(anchorpoints){
    let lens = anchorpoints.length;
    let Binomial_coefficient = [];
    Binomial_coefficient.push(1);
    for(let k=1;k<lens-1;k++){
        let cs=1,bcs=1;
        for (let m=0;m<k;m++){
            cs = cs*(lens-1-m);
            bcs = bcs*(k-m);
        }
        Binomial_coefficient.push(cs/bcs);
    }
    Binomial_coefficient.push(1);
    return Binomial_coefficient;
}
function _CubicSpline(n,Anchorpoints, grain=1024, tension=0.5){
    let alpha = new Array(50);
    let jd=[];
    let k=(Anchorpoints[1].y-Anchorpoints[0].y)/(Anchorpoints[1].x-Anchorpoints[0].x);
    jd.push({x:Anchorpoints[0].x-100,y:Anchorpoints[0].y-k*100});
    for (let i=0;i<Anchorpoints.length;i++){
        jd.push({x:Anchorpoints[i].x,y:Anchorpoints[i].y})
    }
    k=(Anchorpoints[n-1].y-Anchorpoints[n-2].y)/(Anchorpoints[n-1].x-Anchorpoints[n-2].x);
    jd.push({x:Anchorpoints[n-1].x+100,y:Anchorpoints[n-1].y+k*100});
    let k0, kml, k1, k2;
    //获取Mc矩阵
    let spline=new Array(1024);
    let t=tension;
    //对每两个关键点之间的插值点进行参数化到0～1之间
    for(let k=0;k<grain;k++){
        alpha[k]=k*1.0/grain;
    }
    //从最开始的四个点开始，给第一段曲线插值
    kml = 0;
    k0 = 1;
    k1 = 2;
    k2 = 3;
    let s = 0; //纪录总共插值后的点数
    //两次循环第一次对输入的控制点遍历，第二次对每两个控制点之间插值，分别计算xy分量上得出的插值后的函数值，k值分别＋1
    for(let i =1; i<n; i++){
        for(let j=0; j<grain; j++){
            let cpx = _Matrix(jd[kml].x, jd[k0].x, jd[k1].x, jd[k2].x, alpha[j],t);
            let cpy = _Matrix(jd[kml].y, jd[k0].y, jd[k1].y, jd[k2].y, alpha[j],t);
            spline[s] = {x:cpx,y: cpy};
            s++;
        }
        kml++; k0++; k1++; k2++;
    }
    return spline;
}
function _GetCardinalMatrix(a1) {
    let  m=new Array(16);
    m[0]=-a1; m[1]=2.0-a1; m[2]=a1-2.; m[3]=a1;
    m[4]=2.*a1; m[5]=a1-3.; m[8]=-a1; m[9]=0.;
    m[12]=0.; m[13]=1.; m[6]=3.-2*a1; m[7]=-a1;
    m[10]=a1; m[11]=0.; m[14]=0.; m[15]=0.;
    return m;
}
function _Matrix (p0, p1, p2, p3, u,tension){
    let m=_GetCardinalMatrix(tension);
    let a, b, c, d;
    a=m[0]*p0+m[1]*p1+m[2]*p2+m[3]*p3;
    b=m[4]*p0+m[5]*p1+m[6]*p2+m[7]*p3;
    c=m[8]*p0+m[9]*p1+m[10]*p2+m[11]*p3;
    d=m[12]*p0+m[13]*p1+m[14]*p2+m[15]*p3;
    return(d+u*(c+u*(b+u*a))); //au^3+bu^2+cu+d
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
