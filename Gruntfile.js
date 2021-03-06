/**
 * Created by ErikJohnson on 6/10/15.
 */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        uglify: {
            options: {
                banner: "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %>*/\n"
            },
            build: {
                src: "client/scripts/app.js",
                dest: "server/public/assets/app.min.js"
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "angular/angular.min.js",
                    "angular/angular.min.js.map",
                    "angular/angular-csp.css",
                    "bootstrap/dist/js/bootstrap.min.js",
                    "jquery/dist/jquery.min.js",
                    "jquery/dist/jquery.min.map"

                ],
                "dest": "server/public/vendor/"

            }

        }
    });
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.registerTask("default", ["copy", "uglify"]);
};

