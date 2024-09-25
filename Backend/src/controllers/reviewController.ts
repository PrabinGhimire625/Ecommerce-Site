import { Request, Response } from "express";
import ProductReview from "../database/models/productReview";
import Product from "../database/models/product";
import { AuthRequest } from "../middleware/authMiddleware";

class ReviewController {
  async addReview(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id; 
      const { rating, message, productId } = req.body;

      if (!rating || !message || !productId) {
        res.status(400).json({ message: "Rating, message, and productId are required" });
        return;
      }

      // Create the new review
      const newReview = await ProductReview.create({
        userId, 
        productId, 
        rating, 
        message, 
      });

      // Update the product's total rating score and ratings count
      const product = await Product.findByPk(productId);
      if (product) {
        const updatedTotalRatingScore = product.totalRatingScore + rating; 
        const updatedTotalRatingsCount = product.totalRatingsCount + 1; 

        await product.update({
          totalRatingScore: updatedTotalRatingScore,
          totalRatingsCount: updatedTotalRatingsCount,
        });
      }

      res.status(200).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to add review", error });
    }
  }
}

export default new ReviewController();
