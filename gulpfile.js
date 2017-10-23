"use strict";

var gulp = require("gulp");
var csso = require("gulp-csso");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify =  require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var run = require("run-sequence");
var del = require("del");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var uglify = require("gulp-uglify");
var pump = require("pump");
var svgstore = require("gulp-svgstore");

// ============минификация стилей==========

gulp.task("style", function() {
  gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

// gulp.task("stylen", function() {
//   gulp.src("less/general/normalize.less")
//     .pipe(plumber())
//     .pipe(less())
//     .pipe(postcss([
//       autoprefixer()
//     ]))
//     .pipe(gulp.dest("build/css"))
//     .pipe(minify())
//     .pipe(rename("normalize.min.css"))
//     .pipe(gulp.dest("build/css"))
//     // .pipe(server.stream());
// });

// ==================SVG спрайт==========
gulp.task("sprite", function() {
  return gulp.src("img/*.svg")
  .pipe(svgstore({
    inlineSvg :true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
});



// ========минификация изображений=========
gulp.task("image", function() {
  return gulp.src("img/**/*.{png,svg,jpeg,jpg}")
  pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.svgo()
      ]))
    .pipe(gulp.dest("build/img"));
});

// ===========минификация JS====================

gulp.task("compress", function (cb) {
  pump([
        gulp.src((["js/*.js","!js/*.min.js"])),
        uglify(),
      rename({suffix: ".min"}),
        gulp.dest("build/js")
    ],
    cb
  );
});

// ===============posthtml==============
gulp.task("html", function() {
  return gulp.src("*.html")
  .pipe(posthtml([
    include()
  ]))
  .pipe(gulp.dest("build"));
});


// ==========Изображения WEBP===========
gulp.task("webp", function() {
  return gulp.src("img/**/*.{png,jpg}")
    .pipe(webp({quality:90}))
    .pipe(gulp.dest("build/img"));
});

// ===========копирование файлов=========
gulp.task("copy", function() {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**",
    "js/**"
  ], {
      base: "."
    })
    .pipe(gulp.dest("build"));
  })

  // ================удаление build========
  gulp.task("clean", function() {
    return del("build");
  });


// =============Последовательный запуск===
gulp.task("build", function(done) {
  run(
         "clean",
         "copy",
         "compress",
         "style",
         "html",
         "image",
         "webp",
         "sprite",
         done
       );
});

// ==============Сервер====================
gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("less/**/*.less", ["style"]);
  gulp.watch("js/*.js", ["js"]);
  gulp.watch("*.html"),["html"];
});
