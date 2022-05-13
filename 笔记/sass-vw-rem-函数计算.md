```

$sp-bgc-px-width: 465; // 精灵图原宽度
$sp-bgc-px-height: 423; // 精灵图原高度 
$sp-bgc-vw-width :$sp-bgc-px-width / 750 * 100; // 精灵图的转换宽度   vw
$sp-bgc-vw-height: $sp-bgc-px-height / 750 * 100; // 精灵图的转换高度      vw
$sp-bgc-rem-width : $sp-bgc-px-width * 10 / 750; // 精灵图的转换宽度   rem
$sp-bgc-rem-height : $sp-bgc-px-height * 10 / 750; // 精灵图的转换宽度   rem


/*  
    返回 精灵图宽高 vw
*/
@function bgc-size-vw () {
  @return $sp-bgc-vw-width+vw $sp-bgc-vw-height+vw;
}

/* 
    返回精灵图宽高 rem
*/
@function bgc-size-rem () {
  @return $sp-bgc-rem-width+rem $sp-bgc-rem-height+rem;
}


/* 
    px 转vw
    *$w  必填 传入测量的宽或者高度
*/
@function toVw($w) {
  @return ($w / 750) * 100+vw;
}

/* 
    计算精灵图定位 vw
    * $x   图标的X轴坐标
    * $y   图标的Y轴坐标
    $sp-bgc-vw-width 精灵图的转换宽度 选填 默认为$sp-bgc-vw-width
    $sp-bgc-px-width 精灵图的原宽度   选填 默认为 $sp-bgc-px-width

*/
@function bgc-posit-vw($x, $y, $sp-bgc-vw-width: $sp-bgc-vw-width, $sp-bgc-px-width: $sp-bgc-px-width) {

  @return (-$x * $sp-bgc-vw-width / $sp-bgc-px-width + vw) (-$y * $sp-bgc-vw-width / $sp-bgc-px-width + vw);

}

/* 
    计算精灵图定位 rem
    * $x   图标的X轴坐标
    * $y   图标的Y轴坐标
    $sp-bgc-rem-width 精灵图的转换宽度 选填 默认为$sp-bgc-rem-width
    $sp-bgc-px-width 精灵图的原宽度   选填 默认为 $sp-bgc-px-width

*/

@function bgc-posit-rem($x, $y, $sp-bgc-rem-width: $sp-bgc-rem-width, $sp-bgc-px-width: $sp-bgc-px-width) {
  @return (-$x * $sp-bgc-rem-width / $sp-bgc-px-width + rem) (-$y * $sp-bgc-rem-width / $sp-bgc-px-width + rem);
}

// 调用示例 VW background: url("./../assets/images/jinglingtu.png") no-repeat bgc-posit-vw(299, 371) / bgc-size-vw();

```