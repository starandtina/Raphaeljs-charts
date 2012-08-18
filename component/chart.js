/**
 * The base class for all charts
 * @param {Object} 	opts 创建图形的选项参数
 * @config {Object} paper  Raphael对象
 * @config {Object} offset 图形相对于页面的偏移，{left: offsetLeft, top: offsetTop}
 * @config {Number} canvasWidth canvas宽度
 * @config {Number} canvasHeight canvas高度
 * @config {HTMLElement} container 图形的容器
 * @config {Object} defaultOpts 默认选项
 */
T.charts.Chart = T.charts.Class({
	paper: null,
	offset: null,
	container: null,
	_data: null,
	defaultOpts: {
		exportSVG: false,
		containerId: 'ContainerId'
	},
	/**
	 * The constructor of the chart
	 * @param  {Object} data 图形绘制所需要的数据
	 * @param  {Object} opts 用户选项参数
	 */
	initialize: function (data, opts) {
		//合并默认选项
		var extend = T.charts.Util.extend;
		opts = opts || {};
		opts = extend(T.object.clone(this.defaultOpts), T.object.clone(opts));
		this.opts = extend(T.object.clone(this.opts), opts);

		//设置默认值
		this.container = T.g(this.opts.containerId);

		if (!this.container) {
			return;
		}

		//清空容器
		this.container.firstChild && this.container.removeChild(this.container.firstChild);

		//初始化Raphael
		this.paper = Raphael(opts.containerId);
		this._data = T.object.clone(data);

		//初始化offset
		this.offset = {
			left: this.container.offsetLeft,
			top: this.container.offsetTop
		};
	},
	showLoading: function (msg) {
		msg = msg || 'loading...';
		this.paper.text(this.paper.width / 2, this.paper.canvasHeight / 2, msg);
	},
	CLASS_NAME: 'T.charts.Chart'
});
