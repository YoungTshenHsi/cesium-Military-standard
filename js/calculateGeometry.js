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
function min( Num1,  Num2) {
    return Num1 > Num2 ? Num2 : Num1;
}
function max( Num1,  Num2) {

    return Num1 > Num2 ? Num1 : Num2;

}
function isBetween( Num, Num1,  Num2) {

   let deviation =0.1;      //   由于浮点数的精度问题，因此引入误差防止误判

    return (Num >= min(Num1, Num2)-deviation && Num <= max(Num1,Num2)+deviation);

}
function isPointInSegment( P1, LineStart,  LineEnd) {
    return(isBetween(P1.x, LineStart.x,LineEnd.x)  &&  isBetween(P1.y, LineStart.y,LineEnd.y));
}
function  DistanceForPointToABLine(A, B, C)//所在点到AB线段的垂线长度
{
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