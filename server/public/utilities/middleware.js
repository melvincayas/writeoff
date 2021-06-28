const Notepad = require("../../models/Notepad");
const catchAsync = require("./catchAsync");
const ErrorHandler = require("./ErrorHandler");

module.exports.validateListUser = catchAsync(async (req, res, next) => {
	const { user_id } = req.session;
	const { notepadId } = req.params;
	const { creator } = await Notepad.findOne({ _id: notepadId });

	if (user_id !== creator.toString()) {
		return next(new ErrorHandler(403, "This isn't yours!", "authorization"));
	}

	next();
});
