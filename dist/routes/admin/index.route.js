"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const system_1 = require("../../config/system");
const dashboard_route_1 = require("./dashboard.route");
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const upload_route_1 = require("./upload.route");
const adminRoutes = (app) => {
    const ADMIN_PATH = '/' + system_1.systemConfig.adminPrefix;
    app.use(ADMIN_PATH + '/dashboard', dashboard_route_1.dashboardRoutes);
    app.use(ADMIN_PATH + '/topics', topic_route_1.topicRoutes);
    app.use(ADMIN_PATH + '/songs', song_route_1.songRoutes);
    app.use(ADMIN_PATH + '/upload', upload_route_1.uploadRoutes);
};
exports.default = adminRoutes;
