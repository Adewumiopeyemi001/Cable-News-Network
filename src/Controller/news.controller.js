import News from "../Models/news.models.js";
import { errorResMsg, successResMsg } from "../lib/response.js";
import cloudinary from "../Public/Images/cloudinary.js";
import { findAllNews, findNewsById } from "../middleware/service.js";

export const createNews = async (req, res) => {
    try {
      const user = req.user;

      // Check if the user is a Chief Editor (role = 2)
      if (!user || user.role !== 2) {
        return errorResMsg(
          res,
          403,
          "Access forbidden. Only Chief Editors can create news."
        );
      }

      // Next: create the news and ensure the createdBy is the chief editor ID
      const { title, newsContent } = req.body;
      if (!title || !newsContent) {
        return errorResMsg(
          res,
          400,
          "Title and News content must not be empty"
        );
      }
      // Create the news document
      const newNews = await News.create({
        title,
        newsContent,
        createdBy: user._id,
      });

      return successResMsg(res, 201, {
        success: true,
        data: newNews,
        message: "News created successfully",
      });
    } catch (error) {
        console.error(error);
        return errorResMsg(res, 500, {
            error: error.message,
            message: "Internal Server Error",
        });
    }
};

export const updateNews = async (req, res) => { 
  try {
    const user = req.user;
    const id = req.params.id;

    if (!user || user.role !== 2) {
      return errorResMsg(
        res,
        403,
        "Access forbidden. Only Chief Editors can edit news."
      );
    }
    const { title, newsContent } = req.body;
    if (!title || !newsContent) {
      return errorResMsg(res, 400, "Title and News content must not be empty");
    }
    // Check if the news exists and update
    const updatedNews = await News.findByIdAndUpdate(
      { _id: id },
      {
        title,
        newsContent,
      },
      { new: true }
    ).select("-__v");
    // Check if the news was updated
    if (!updatedNews) {
      return errorResMsg(res, 404, "News not found");
    }
    // Return the updated news
    return successResMsg(res, 200, {
      success: true,
      data: updatedNews,
      message: "News updated successfully",
    });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, {
      error: error.message,
      message: "Internal Server Error",
    });
    
  }
};

export const newsPicture = async (req, res) => {
  try {
    const user = req.user;
    const picture = req.file;
    
    const news = await News.findOne({ _id: req.params.id });
    if (!news) {
      return errorResMsg(res, 400, "News not found");
    }

    if (!picture) {
      return errorResMsg(res, 400, "Picture is required ");
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!user || user.role !== 2) {
      return errorResMsg(
        res,
        403,
        "Access forbidden. Only Chief Editors upload a picture."
      );
    }
    // const result = await cloudinary.v2.uploader.upload(video.path);
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const pictureUploaded = await News.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      { picture: result.secure_url },
      {
        new: true,
      }
    ).select("-__v");

    return res.status(200).json({
      message: "Picture uploaded Successfully",
      data: pictureUploaded,
    });
  } catch (err) {
    // console.log(error);
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error Uploading picture", err });
  }
};

export const newsVideo = async (req, res) => {
  try {
    const user = req.user;
    const video = req.file;

    const news = await News.findOne({ _id: req.params.id });
    if (!news) {
      return errorResMsg(res, 400, "News not found");
    }

    if (!video) {
      return errorResMsg(res, 400, "Video is required ");
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!user || user.role !== 2) {
      return errorResMsg(
        res,
        403,
        "Access forbidden. Only Chief Editors can upload a video."
      );
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      resource_type: "video",
    });
    const videoUploaded = await News.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      { video: result.secure_url },
      {
        new: true,
      }
    ).select("-__v");

    return res.status(200).json({
      message: "Video uploaded Successfully",
      data: videoUploaded,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error uploading video", err });
  }
};

export const deleteNews = async (req, res) => { 
  try {
    const user = req.user;
    const id = req.params.id;

    if (!user || user.role!== 2) {
      return errorResMsg(
        res,
        403,
        "Access forbidden. Only Chief Editors can delete news."
      );
    }
    const deletedNews = await News.findByIdAndDelete({ _id: id });
    if (!deletedNews) {
      return errorResMsg(res, 404, "News not found");
    }
    return successResMsg(res, 200, {
      success: true,
      data: deletedNews,
      message: "News deleted successfully",
    });
    
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, {
      error: error.message,
      message: "Internal Server Error",
    }); 
  }
};
  
export const getNews = async (req, res) => { 
  try {
    const user = req.user;
    const id = req.params.id;
    
    if (!user) { 
      return errorResMsg(
        res,
        403,
        "Access forbidden. Only logged in users can retrieve news."
      );
    }
    const news = await findNewsById(id);
    if (!news) {
      return errorResMsg(res, 404, "News not found");
    }
    return successResMsg(res, 200, {
      success: true,
      data: news,
      message: "News retrieved successfully",
    });
    
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, {
      error: error.message,
      message: "Internal Server Error",
    });
  }
};

export const getAllNews = async (req, res) => {
  try {
    const user = req.user;
    
    if (!user) {
      return errorResMsg(
        res,
        403,
        "Access forbidden. Only logged in users can retrieve news."
      );
    }
    const news = await findAllNews();
    if (!news) {
      return errorResMsg(res, 404, "News not found");
    }
    return successResMsg(res, 200, {
      success: true,
      data: news,
      message: "News retrieved successfully",
    });
    
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, {
      error: error.message,
      message: "Internal Server Error",
    });
    
  }
};

export const searchNewsByTitle = async (req, res) => {
  try {
    const user = req.user;
     if (!user) {
       return errorResMsg(
         res,
         403,
         "Access forbidden. Only logged in users can retrieve news."
       );
     }

    const keyword = req.query.search
      ? { title: { $regex: req.query.search, $options: "i" } }
      : {};
  
    const news = await News.find(keyword);
    if (!news) {
      return errorResMsg(res, 404, "News not found");
    }
     return successResMsg(res, 200, {
       success: true,
       data: news,
       message: "News retrieved successfully",
     });
    
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, {
      error: error.message,
      message: "Internal Server Error",
    });
  }
};


