<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D | null = null;
  let surfaces: Surface[] = [];
  let palleteNum = 0;
  let scale: number;
  let totalPoints: number;
  let dist: number;
  let mouseX = -1000;
  let mouseY = -1000;
  const viscosity = 100;
  const damping = 0.33;
  const palleteFirst = ['1c1678', '1C1678', '1C1678', '7BC9FF', 'A3FFD6', '8576FF', '7BC9FF'];
  const palletes = [palleteFirst];

  class Point {
    x: number;
    y: number;
    ix: number;
    iy: number;
    vx: number;
    vy: number;

    constructor(x: number, y: number) {
      this.x = this.ix = x;
      this.y = this.iy = y;
      this.vx = this.vy = 0;
    }

    move() {
      if (!context || !canvas) return;

      const width = canvas.width / scale;
      const height = canvas.height / scale;
      this.vx += ((this.ix - this.x) / viscosity) * width;
      this.vy += ((this.iy - this.y) / viscosity) * height;

      const dx = this.x * width - mouseX / scale;
      const dy = this.y * height - mouseY / scale;

      if (Math.sqrt(dx * dx + dy * dy) < dist) {
        const a = Math.atan2(dy, dx);
        this.vx += (Math.cos(a) * viscosity - dx) / viscosity;
        this.vy -= (Math.sin(a) * viscosity - dy) / viscosity;
      }

      this.vx *= 1 - damping;
      this.vy *= 1 - damping;
      this.x += this.vx / width;
      this.y += this.vy / height;

      if (this.y < 0) this.y = 0;
      else if (this.y > 1) this.y = 1;
    }
  }

  class Surface {
    y: number;
    points: Point[] = [];
    color: string = '';

    constructor(y: number) {
      this.y = y;
      this.resize();
    }

    draw() {
      if (!context || !canvas) return;

      const p = this.points[totalPoints - 1];
      let cx: number, cy: number;

      context.fillStyle = this.color;
      context.beginPath();
      context.moveTo(p.x * canvas.width, p.y * canvas.height);

      for (let i = totalPoints - 1; i > 0; i--) {
        const p = this.points[i];
        p.move();

        cx = ((p.x + this.points[i - 1].x) / 2) * canvas.width;
        cy = ((p.y + this.points[i - 1].y) / 2) * canvas.height;

        if (i === 1) {
          cx = canvas.width;
        } else if (i === totalPoints - 1) {
          context.bezierCurveTo(p.x * canvas.width, p.y * canvas.height, cx, cy, cx, cy);
          p.x = 0;
        }

        context.bezierCurveTo(p.x * canvas.width, p.y * canvas.height, cx, cy, cx, cy);
      }

      context.lineTo(canvas.width, canvas.height);
      context.lineTo(0, canvas.height);
      context.closePath();
      context.fill();
    }

    resize() {
      this.points = [];
      for (let i = totalPoints; i--; ) {
        this.points.push(new Point(i / (totalPoints - 3), this.y));
      }
    }

    wobble() {
      for (let i = totalPoints - 1; i > 0; i--) {
        this.points[i].vy += (Math.random() - 0.5) * dist * 0.6;
      }
    }
  }

  function setPallete() {
    if (!canvas) return;

    canvas.style.backgroundColor = `#${palletes[palleteNum][0]}`;
    for (let i = surfaces.length; i--; ) {
      console.log(`Setting Background of ${i} to #${palletes[palleteNum][i + 1]}`);
      surfaces[surfaces.length - i - 1].color = `#${palletes[palleteNum][i + 1]}`;
    }
  }

  function wobbleSurfaces() {
    resizeSurfaces();
    for (let i = surfaces.length; i--; ) {
      surfaces[i].wobble();
    }
  }

  function drawSurfaces() {
    if (!context || !canvas) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = surfaces.length; i--; ) {
      surfaces[i].draw();
    }
  }

  function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }

  function resizeSurfaces() {
    if (!canvas) return;

    scale = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * scale;
    canvas.height = window.innerHeight * scale;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    totalPoints = Math.round(clamp(Math.pow(Math.random() * 8, 2), 16, window.innerWidth / 35));
    dist = clamp(window.innerWidth / 4, 150, 200);

    for (let i = surfaces.length; i--; ) {
      surfaces[i].resize();
    }

    drawSurfaces();
  }

  function update() {
    requestAnimationFrame(update);
    drawSurfaces();
  }

  onMount(() => {
    context = canvas.getContext('2d');

    canvas.ontouchmove = (event: TouchEvent) => {
      mouseX = event.targetTouches[0].pageX * scale;
      mouseY = event.targetTouches[0].pageY * scale;
    };

    canvas.ontouchstart = (event: TouchEvent) => {
      event.preventDefault();
    };

    canvas.ontouchend = () => {
      wobbleSurfaces();
      mouseX = mouseY = -1000;
    };

    canvas.onmousemove = (event: MouseEvent) => {
      mouseX = event.pageX * scale;
      mouseY = event.pageY * scale;
    };

    canvas.onmousedown = wobbleSurfaces;

    canvas.onmouseleave = () => {
      mouseX = mouseY = -1000;
    };

    surfaces = [
      new Surface(5 / 6),
      new Surface(4 / 6),
      new Surface(3 / 6),
      new Surface(2 / 6),
      new Surface(1 / 6),
      new Surface(0 / 6)
    ];

    palletes.unshift(palleteFirst);
    setPallete();

    window.onresize = resizeSurfaces;
    resizeSurfaces();
    update();
  });
</script>

<style lang="scss">
  .wobble-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    canvas {
      width: 100%;
      height: 100%;
      -webkit-tap-highlight-color: transparent;
      tap-highlight-color: transparent;
      -webkit-user-select: none;
      user-select: none;
      cursor: pointer;
    }
  }
</style>

<div class="wobble-background">
  <canvas bind:this={canvas}></canvas>
</div>
