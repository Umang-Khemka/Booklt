dotenv.config({path: "../../.env"});

import mongoose from "mongoose";
import dotenv from "dotenv";
import cloudinary from "../config/cloudinary.config.js";
import Experience from "../models/experience.model.js";
import demoExperiences from "./data.js";

console.log(process.env.CLOUDINARY_API_KEY ? "✅ Cloudinary key loaded" : "❌ Cloudinary key missing");
mongoose.connect(process.env.MONGO_URI)
    .then(async()=> {
        console.log("MongoDB connected");

        await Experience.deleteMany({});
        console.log("🗑️  Cleared old experiences");

        for (let exp of demoExperiences){
            let imageData = {
                url: "",
                filename: ""
            };

            if(exp.image && exp.image.url){
                try{
                    const uploadResponse = await cloudinary.uploader.upload(exp.image.url,{
                        folder: "booklt",
                    });
                    imageData.url = uploadResponse.secure_url;
                    imageData.filename = uploadResponse.public_id;

                    console.log(`📸 Uploaded: ${exp.title}`);
                } catch(error){
                    console.error(`❌ Upload failed for ${exp.title}:`, error.message);
                }
            }

            const newExp = await Experience.create({
                title: exp.title,
                description: exp.description,
                location: exp.location,
                image: imageData,
                price: exp.price,
            });

            console.log(`✅ Created: ${newExp.title} | Image: ${newExp.image.url}`);
        }
          console.log("🎉 All listings uploaded successfully!");
          mongoose.connection.close();
    })
    .catch(err=> console.error(err));
