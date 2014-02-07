# 17173 FED Project Template #

## 文件结构说明 ##
前端开发项目文件初始化结构如下：

	/bower_components
	/demo
		/images
		index.html
	/dist
		/css
			/lib
			/style.css
			/style.min.css
		/js
			/lib
			/script.js
			/script.min.js
	/doc
	/node_modules
	/src
		/css
			/lib
			/less
			/sass
			/style.css
			/style.min.css
		/js
			/coffee
			/lib
			/script.js
			/script.min.js
	/test
	/.jshintrc
	/bower.json
	/Gruntfile.js
	/pakage.json
	/README.md

bower_components：bower组件默认存放目录；

demo：效果预览目录；

dist：静态资源发布版本目录；

doc：YUIDoc文档存放目录；

node_modules：nodejs模块默认存放目录；

src：静态资源开发版本目录；

test：单元测试脚本存放目录；

.jshintrc：jshint默认配置文件，用于编辑器jshint配置，自动化的jshint代码审查配置在Gruntfile.js中配置；

bower.json：bower配置文件；

Gruntfile.js：grunt任务管理配置文件；

pakage.json：grunt项目配置文件；

README.md：markdown格式的说明文档；