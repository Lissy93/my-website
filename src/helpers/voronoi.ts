import * as d3 from 'd3';
import * as d3Delaunay from 'd3-delaunay';

const { Delaunay, Voronoi, Polygon } = d3Delaunay;

/**
 * Class for creating a reactive Voronoi diagram, using D3.js + D3-Delaunay
 */
export default class D3Voronoi {

  /* Defining the attributes */
  private target: d3.Selection<HTMLElement, unknown, null, undefined>;
  private svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
  private width: number;
  private height: number;
  private sites: [number, number][];
  private polygon: d3.Selection<d3.BaseType, typeof Polygon, SVGGElement, unknown>;
  private site: d3.Selection<SVGCircleElement, [number, number], SVGGElement, unknown>;
  private delaunay: typeof Delaunay<[number, number]>;
  private voronoi: typeof Voronoi<[number, number]>;

  constructor(targetContainer = '#vonoroi') {
    this.width = 0;
    this.height = 0;
    this.sites = [];
    this.target = d3.select(targetContainer);
    this.renderTheAwesome();
    this.watchForResize();
  }

  public renderTheAwesome() {
    this.svg = this.target.append('svg');
    this.width = this.target.node().getBoundingClientRect().width;
    this.height = this.target.node().getBoundingClientRect().height;

    this.svg.attr('width', this.width);
    this.svg.attr('height', this.height);

    // this.mouseLeaveEvents();

    this.sites = d3.range(300).map(() => {
      return [Math.random() * this.width, Math.random() * this.height] as [number, number];
    });

    this.delaunay = Delaunay.from(this.sites);
    this.voronoi = this.delaunay.voronoi([-1, -1, this.width + 1, this.height + 1]);

    this.polygon = this.svg.append('g')
      .attr('class', 'polygons')
      .selectAll('path')
      .data(this.voronoi.cellPolygons())
      .enter().append('path')
      .call(this.redrawPolygon.bind(this));

    this.site = this.svg.append('g')
      .attr('class', 'sites')
      .selectAll('circle')
      .data(this.sites)
      .enter().append('circle')
      .attr('r', 2.5)
      .call(this.redrawSite.bind(this));

    this.svg.on('pointermove', (event: MouseEvent) => {
      const [mx, my] = d3.pointer(event, this.svg.node());
      const siteIndex = this.delaunay.find(mx, my);
      // this.polygon.attr('class', (d: typeof Polygon, i: number) => i === siteIndex ? 'highlight' : 'v-' + i % 9);
      this.sites[0] = [mx, my];
      this.redraw();
    });
  }

  private redraw() {
    this.delaunay = Delaunay.from(this.sites);
    this.voronoi = this.delaunay.voronoi([-1, -1, this.width + 1, this.height + 1]);

    this.polygon = this.polygon.data(this.voronoi.cellPolygons()).join('path').call(this.redrawPolygon.bind(this));
    this.site = this.site.data(this.sites).join('circle').call(this.redrawSite.bind(this));
  }

  // private redrawPolygon(polygon: d3.Selection<d3.BaseType, typeof Polygon, SVGGElement, unknown>) {
  //   polygon
  //     .attr('d', (d: typeof Polygon) => d ? 'M' + d.join('L') + 'Z' : null)
  //     .attr('class', (d: typeof Polygon, i: number) => 'v-' + i % 9);
  // }

  private redrawPolygon(polygon: d3.Selection<d3.BaseType, typeof Polygon, SVGGElement, unknown>) {
    polygon
      .attr('d', (d: typeof Polygon) => d ? 'M' + d.join('L') + 'Z' : null)
      .attr('class', (d: typeof Polygon, i: number) => {
        const centroid = d3.polygonCentroid(d);
        const relativeHeight = centroid[1] / this.height;
        const classIndex = Math.ceil(relativeHeight * 10);
        const randomIndex = Math.floor(Math.random() * 10);
        return `r-${randomIndex} c-${classIndex}`;
      });
  }

  private redrawSite(site: d3.Selection<SVGCircleElement, [number, number], SVGGElement, unknown>) {
    site
      .attr('cx', (d: [number, number]) => d[0])
      .attr('cy', (d: [number, number]) => d[1]);
  }

  private rerender() {
    this.svg.remove();
    this.renderTheAwesome();
  }

  private watchForResize() {
    let resizeTimer: NodeJS.Timeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => this.rerender(), 250);
    });
  }

  // private mouseLeaveEvents() {
  //   this.svg.on('pointerout', () => {
  //     this.polygon.attr('class', (d: typeof Polygon, i: number) => 'v-' + i % 9);
  //   });
  // }
}
