const gulp = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
// const cssnano = require("cssnano");
const stylelint = require("stylelint");
const reporter = require("postcss-reporter");
const sass = require("gulp-sass");

//gulp.task("styles", 
gulp.task("autoprefixer", ["lint-styles"],
    () => gulp.src("src/*.css")
    .pipe(postcss([autoprefixer]))
//    .pipe(sourcemaps.init())
//    .pipe(sourcemaps.write("maps/"))
    .pipe(gulp.dest("dest/")));

// gulp.task("rename", ["styles"], () => gulp.src("dest/example.css")
//     .pipe(postcss([ cssnano ]))
//     .pipe(rename("example.min.css"))
//     .pipe(sourcemaps.init())
//     .pipe(sourcemaps.write("maps/"))
//     .pipe(gulp.dest("dest/")));

gulp.task("rename", ["lint-styles"], () => gulp.src("dest/*.css")
    .pipe(rename("style.min.css"))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write("maps/"))
    .pipe(gulp.dest("dest/")));

// gulp.task("lint-styles", () => 
//     gulp.src("src/*.css").pipe(postcss([
//         stylelint({ 
//             "rules": {
//                 "color-no-invalid-hex": true,
//                 "declaration-colon-space-before": ["never"],
//                 "indentation": [4],
//                 "number-leading-zero": ["always"]
//             }
//         }),
//         reporter({
//             "clearMessages": true,
//         })
//     ]))
// );

gulp.task("lint-styles", ["sass"], () => gulp.src("src/*.css")
    .pipe(postcss([ 
        stylelint({
            "rules": {
                "color-no-invalid-hex": true,
                "declaration-colon-space-before": ["never"],
                "indentation": [4],
                "number-leading-zero": ["always"]
            }
        }),
        reporter({
            "clearMessages": true,
        })
    ]))
);

gulp.task("sass", () => {
    gulp.src("src/*.scss")
        .pipe(sass({
            "outputStyle": "compressed"
        }).on("error", sass.logError))
        .pipe(gulp.dest("src/"));
});

// gulp.task("default", ["styles", "rename", "lint-styles"]);

gulp.task("default", ["sass", "lint-styles", "autoprefixer", "rename"]);

//const watcher = gulp.watch("src/*.css", ["default"]);
cosnt watcher = gulp.watch("src/*.scss", ["default"]);
watcher.on("change", (e) => {
    console.log(`File ${e.path} was ${e.type}, running tasks...`);
});