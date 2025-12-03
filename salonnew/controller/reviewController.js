// controllers/reviewController.js
const Review = require('../models/review'); // Import your Review model
const jwt = require('jsonwebtoken');
const User=require('../models/user')
exports.submitReview = async (req, res) => {
    const { serviceId, review } = req.body;

    // Check if the user is authenticated
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id; // Assuming the token contains the user ID

        // Create a new review
        const newReview = await Review.create({
            user_id: userId, // Use the authenticated user's ID
            service_id: serviceId,
            review_text: review,
            created_at: new Date()
        });

        console.log('Review submitted:', newReview);
        res.status(201).json({ message: 'Review submitted successfully!', review: newReview });
    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.getTotalReviews = async (req, res) => {
    try {
        const totalReviews = await Review.count(); // Assuming you have a Review model
        res.status(200).json({ totalReviews });
    } catch (error) {
        console.error('Error fetching total reviews:', error);
        res.status(500).json({ message: 'Error fetching total reviews', error });
    }
};
// exports.getReviews = async (req, res) => {
//     const { serviceId } = req.params; // Get the service ID from the request parameters

//     try {
//         // Fetch reviews for the specified service ID
//         const reviews = await Review.findAll({
//             where: { service_id: serviceId },
//             include: [{ model: User, attributes: ['name'] }] // Assuming you want to include user details
//         });

//         // Check if reviews exist
//         if (reviews.length === 0) {
//             return res.status(404).json({ message: 'No reviews found for this service.' });
//         }

//         res.status(200).json(reviews); // Send the reviews as a response
//     } catch (error) {
//         console.error('Error fetching reviews:', error);
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };

exports.getReviews = async (req, res) => {
    const { serviceId } = req.params; // Get the service ID from the request parameters
    console.log(`Received request to fetch reviews for service ID: ${serviceId}`);

    try {
        // Fetch reviews for the specified service ID
        const reviews = await Review.findAll({
            where: { service_id: serviceId },
            // include: [{ model: User, attributes: ['name'] }] // Assuming you want to include user details
        });

        console.log(`Fetched ${reviews.length} reviews for service ID: ${serviceId}`);

        // Check if reviews exist
        if (reviews.length === 0) {
            console.log(`No reviews found for service ID: ${serviceId}`);
            return res.status(404).json({ message: 'No reviews found for this service.' });
        }

        // Log the reviews being sent in the response
        console.log('Reviews:', JSON.stringify(reviews, null, 2));

        res.status(200).json(reviews); // Send the reviews as a response
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};