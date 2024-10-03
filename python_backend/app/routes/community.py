import logging
import os
from typing import List
from fastapi import APIRouter, HTTPException, Request, UploadFile, File, Query, Form, Body, Response

from starlette import status
from app.schema.user_schema import Community_Post
from app.service.community_service import get_posts, service_create_post,service_update_post, service_get_post_by_id,service_delete_post,get_all,like_post,comment_post,share_post,follow_post_creator,un_follow_post_creator
from app.utils.file_upload import save_uploaded_file, ALLOWED_VIDEOS, ALLOWED_IMAGES
from bson import ObjectId
from app.db.database import get_gridfs
import gridfs

logger = logging.getLogger(__name__)

fs = get_gridfs()

router = APIRouter(
    prefix='/community',
    tags=['Community']
)

@router.get("/")
async def community_post(request: Request):
    return [{"postName": "post 1 name", "postImage": "post image url"},
            {"postName": "post 1 name", "postImage": "post image url"},
            {"postName": "post 1 name", "postImage": "post image url"}]

@router.get("/get", response_model=[])
async def get(user_id: str=Query(...,description="id of the user to reteive posts")):
    """
    Retrieve a list of posts for the given user_id.
    """
    posts = await get_posts(user_id)
    return posts

## ============================================================================
# create post
@router.post('/create-post', status_code=status.HTTP_201_CREATED)
async def create_community_post(
    post_title: str = Form(..., description="Title of the post"),
    post_description: str = Form(..., description="Description of the post"),
    category: str = Form(..., description="Category of the post"),
    creator_user_id: str = Form(..., description="ID of the user who created the post"),
    duration_days: int = Form(..., description="Duration the post will be visible in days"),
    image: UploadFile = File(None),
    video: UploadFile = File(None)
):
    """
    Create a new post in the community and store files using GridFS.
    """
    try:
        if image is None and video is None:
            raise HTTPException(status_code=400, detail="At least one of 'image' or 'video' must be provided")

        post_data = {
            "post_title": post_title,
            "post_description": post_description,
            "creator_user_id": creator_user_id,
            "category": category,
            "duration_days": duration_days,
            "likes": [],
            "comments": [],
            "shared_by_user_ids": [],
        }

        # Handle the image file if provided
        if image:
            image_content = await image.read()
            fs = get_gridfs()
            image_id = fs.put(image_content, filename=image.filename, content_type=image.content_type)
            post_data["image_id"] = str(image_id)

        # Handle the video file if provided
        if video:
            video_content = await video.read()
            fs = get_gridfs()
            video_id = fs.put(video_content, filename=video.filename, content_type=video.content_type)
            post_data["video_id"] = str(video_id)

        # Insert the post data
        result = await service_create_post(post_data)
        
        # Check if the insert was successful
        if result:
            return {"message": "Post created successfully"}
        else:
            raise HTTPException(status_code=500, detail="Failed to insert post")

    except Exception as e:
        print(f"Error in create_community_post: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

## ============================================================================


# edit post
@router.put('/edit-post/{post_id}', status_code=status.HTTP_200_OK)
async def edit_community_post(
    post_id: str,
    post_title: str = Form(None, description="Title of the post"),
    post_description: str = Form(None, description="Description of the post"),
    category: str = Form(None, description="Category of the post"),
    duration_days: int = Form(None, description="Duration the post will be visible in days"),
    image: UploadFile = File(None),
    video: UploadFile = File(None)
):
    """
    Edit an existing post in the community and update files using GridFS.
    """
    try:
        # Fetch the existing post
        existing_post = await service_get_post_by_id(post_id)
        if not existing_post:
            raise HTTPException(status_code=404, detail="Post not found")

        update_data = {}

        # Update fields if provided
        if post_title is not None:
            update_data["post_title"] = post_title
        if post_description is not None:
            update_data["post_description"] = post_description
        if category is not None:
            update_data["category"] = category
        if duration_days is not None:
            update_data["duration_days"] = duration_days

        # Handle the image file if provided
        if image:
            image_content = await image.read()
            fs = get_gridfs()
            # Delete old image if exists
            if "image_id" in existing_post:
                fs.delete(ObjectId(existing_post["image_id"]))
            image_id = fs.put(image_content, filename=image.filename, content_type=image.content_type)
            update_data["image_id"] = str(image_id)

        # Handle the video file if provided
        if video:
            video_content = await video.read()
            fs = get_gridfs()
            # Delete old video if exists
            if "video_id" in existing_post:
                fs.delete(ObjectId(existing_post["video_id"]))
            video_id = fs.put(video_content, filename=video.filename, content_type=video.content_type)
            update_data["video_id"] = str(video_id)

        # Update the post data
        result = await service_update_post(post_id, update_data)
        
        # Check if the update was successful
        if result:
            return {"message": "Post updated successfully"}
        else:
            raise HTTPException(status_code=500, detail="Failed to update post")

    except Exception as e:
        print(f"Error in edit_community_post: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

## ============================================================================

@router.delete('/delete-post/{post_id}', status_code=status.HTTP_200_OK)
async def delete_community_post(post_id: str):
    """
    Delete an existing post from the community and remove associated files from GridFS.
    """
    try:
        # Fetch the existing post
        existing_post = await service_get_post_by_id(post_id)
        if not existing_post:
            raise HTTPException(status_code=404, detail="Post not found")

        # Delete associated files from GridFS
        fs = get_gridfs()
        if "image_id" in existing_post:
            fs.delete(ObjectId(existing_post["image_id"]))
        if "video_id" in existing_post:
            fs.delete(ObjectId(existing_post["video_id"]))

        # Delete the post from the database
        result = await service_delete_post(post_id)
        
        if result:
            return {"message": "Post deleted successfully"}
        else:
            raise HTTPException(status_code=500, detail="Failed to delete post")

    except Exception as e:
        logger.error(f"Error in delete_community_post: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

#get files

@router.get('/get-file/{file_id}')
async def get_file(file_id: str):
    """
    Retrieve a file from GridFS.
    """
    try:
        file_obj = fs.get(ObjectId(file_id))
        if not file_obj:
            raise HTTPException(status_code=404, detail="File not found")
        
        # Return the binary file content with the correct media type
        return Response(content=file_obj.read(), media_type=file_obj.content_type)
    
    except gridfs.errors.NoFile as e:
        raise HTTPException(status_code=404, detail="File not found in GridFS")
    
    except Exception as e:
        # Log the error and file ID for debugging, converting ObjectId to string
        print(f"Error retrieving file with ID {file_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

## ============================================================================

@router.get('/get-all', response_model=[])
async def get():
    """
    Retrieve all posts.
    """
    try:
        posts = await get_all()
        return posts
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
## ============================================================================

@router.put('/like')
async def like(
    post_id: str = Query(..., description="ID of the post to like"),
    user_id: str = Query(..., description="ID of the user who liked the post")
):
    """
    Like a post.
    """
    try:
        # Like the post
        result = await like_post(post_id, user_id)
        return result
    except HTTPException as http_exc:
        # Directly raise the HTTPException to return the appropriate status code and message
        raise http_exc
    except Exception as e:
        # Log unexpected errors and raise a generic 500 Internal Server Error
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An unexpected error occurred")
    
## ============================================================================
@router.put('/comment')
async def comment(
     post_id: str = Body(..., description="ID of the post to comment"),
    user_id: str = Body(..., description="ID of the user who commented"),
    text: str = Body(..., description="Comment text")):
    """
    Comment on a post.
    """
    try:
        # comment on a post
        result = await comment_post(post_id, user_id, text)
        return result
    except HTTPException as http_exc:
        # Directly raise the HTTPException to return the appropriate status code and message
        raise http_exc
    except Exception as e:
        # Log unexpected errors and raise a generic 500 Internal Server Error
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An unexpected error occurred")
## ============================================================================
@router.get('/share-post')
async def share(
    post_id:str = Query(...,description="ID of the post to share"),
    user_id:str = Query(...,description="ID of the user who shared the post")):
    """
    Share a post.
    """
    try:
        # share the post
        result = await share_post(post_id, user_id)
        return result
    except HTTPException as http_exc:
        # Directly raise the HTTPException to return the appropriate status code and message
        raise http_exc
    except Exception as e:
        # Log unexpected errors and raise a generic 500 Internal Server Error
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An unexpected error occurred")
## ============================================================================

@router.post('/follow')
async def follow(postCreatorId: str = Body(..., description="ID of the creator of the post to follow") , userId: str = Body(..., description="ID of the user who followed the creator")):
    """
    Follow a post.
    """

    try:
        # follow the post
        result = await follow_post_creator(postCreatorId, userId)
        return result
    except HTTPException as http_exc:
        # Directly raise the HTTPException to return the appropriate status code and message
        raise http_exc
    except Exception as e:
        # Log unexpected errors and raise a generic 500 Internal Server Error
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An unexpected error occurred")

@router.post("/unfollow")
async def unfollow(postCreatorId: str = Body(..., description="ID of the creator of the post to unfollow") , userId: str = Body(..., description="ID of the user who unfollowed the creator")):
    """
    Unfollow a post.
    """

    try:
        # unfollow the post
        result = await un_follow_post_creator(postCreatorId, userId)
        return result
    except HTTPException as http_exc:
        # Directly raise the HTTPException to return the appropriate status code and message
        raise http_exc
    except Exception as e:
        # Log unexpected errors and raise a generic 500 Internal Server Error
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An unexpected error occurred")
