const Review = require('../models/review');
const Campground = require('../models/campground');

module.exports.deleteReview = async(req, res)=>{
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted successfully!!!');
    res.redirect(`/campgrounds/${id}`);
}

module.exports.addReview = async(req, res)=>{
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    review.author = req.user._id;
    await review.save();
    await campground.save();
    req.flash('success', 'Review added successfully!!!');
    res.redirect(`/campgrounds/${campground._id}`);
}