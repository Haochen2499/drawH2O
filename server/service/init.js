const Comment = require("../models/comment");

Comment.sync({ force: false });
