export default function draw(id: string): any {
  const canvas = document.getElementById(id) as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  resize();
  window.onresize = resize;
  function resize() {
    canvas.width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    canvas.height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
  }
  const RAF = (() => {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      // @ts-ignore
      window.mozRequestAnimationFrame ||
      // @ts-ignore
      window.oRequestAnimationFrame ||
      // @ts-ignore
      window.msRequestAnimationFrame ||
      // tslint:disable-next-line:only-arrow-functions
      function(callback) {
        window.setTimeout(callback, 17);
      }
    );
  })();
  // 鼠标活动时，获取鼠标坐标
  const warea = { x: null, y: null, max: 15000 };
  window.onmousemove = (e: any) => {
    e = e || window.event;
    warea.x = e.clientX;
    warea.y = e.clientY;
  };
  window.onmouseout = (e: any) => {
    warea.x = null;
    warea.y = null;
  };
  // 添加粒子
  // x，y为粒子坐标，xa, ya为粒子xy轴加速度，max为连线的最大距离
  const dots: any[] = [];
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const xa = Math.random() * 2 - 1;
    const ya = Math.random() * 2 - 1;
    dots.push({
      x,
      y,
      xa,
      ya,
      max: 6000
    });
  }
  // 延迟100秒开始执行动画，如果立即执行有时位置计算会出错
  setTimeout(() => {
    animate();
  }, 100);

  // 每一帧循环的逻辑
  function animate() {
    // @ts-ignore
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 将鼠标坐标添加进去，产生一个用于比对距离的点数组
    const ndots = [warea].concat(dots);
    dots.forEach(dot => {
      // 粒子位移
      dot.x += dot.xa;
      dot.y += dot.ya;
      // 遇到边界将加速度反向
      dot.xa *= dot.x > canvas.width || dot.x < 0 ? -1 : 1;
      dot.ya *= dot.y > canvas.height || dot.y < 0 ? -1 : 1;
      // 绘制点
      // @ts-ignore
      ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1);
      // 循环比对粒子间的距离
      const length = ndots.length;
      for (let i = 0; i < length; i++) {
        const d2 = ndots[i];
        if (dot === d2 || d2.x === null || d2.y === null) {
          continue;
        }
        // @ts-ignore
        const xc = dot.x - d2.x;
        // @ts-ignore
        const yc = dot.y - d2.y;
        // 两个粒子之间的距离
        const dis = xc * xc + yc * yc;
        // 距离比
        let ratio;
        // 如果两个粒子之间的距离小于粒子对象的max值，则在两个粒子间画线
        if (dis < d2.max) {
          // 如果是鼠标，则让粒子向鼠标的位置移动
          if (d2 === warea && dis > d2.max / 2) {
            dot.x -= xc * 0.03;
            dot.y -= yc * 0.03;
          }
          // 计算距离比
          ratio = (d2.max - dis) / d2.max;
          // 画线
          // @ts-ignore
          ctx.beginPath();
          // @ts-ignore
          ctx.lineWidth = ratio / 2;
          // @ts-ignore
          ctx.strokeStyle = 'rgba(0,0,0,' + (ratio + 0.2) + ')';
          // @ts-ignore
          ctx.moveTo(dot.x, dot.y);
          // @ts-ignore
          ctx.lineTo(d2.x, d2.y);
          // @ts-ignore
          ctx.stroke();
        }
      }
      // 将已经计算过的粒子从数组中删除
      ndots.splice(ndots.indexOf(dot), 1);
    });
    RAF(animate);
  }
}
