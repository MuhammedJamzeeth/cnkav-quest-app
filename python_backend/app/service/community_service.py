import logging
import traceback
from fastapi import HTTPException
from starlette import status

from app.db.database import post_collection,user_collection,comment_collection,SharedBy_collection
from datetime import datetime, date, time
from decimal import Decimal
from typing import Any, Dict
from bson import ObjectId

from app.models.community_post import CommunityPost

logger = logging.getLogger(__name__)

async def service_create_post(user_data):
    try:
        # If user_data is already a dict, use it directly
        communityPost = user_data if isinstance(user_data, dict) else user_data.dict()

        # Insert the document into the collection
        result = await post_collection.insert_one(communityPost)

        # Retrieve the inserted document
        inserted_post = await post_collection.find_one({"_id": result.inserted_id})

        # Ensure ObjectId is converted to string
        if inserted_post:
            inserted_post["_id"] = str(inserted_post["_id"])

        return inserted_post

    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to insert data")

async def service_update_post(post_id, update_data):
    try:
        # Update the document in the collection
        result = await post_collection.update_one(
            {"_id": ObjectId(post_id)},
            {"$set": update_data}
        )

        if result.modified_count == 0:
            return None

        # Retrieve the updated document
        updated_post = await post_collection.find_one({"_id": ObjectId(post_id)})

        # Ensure ObjectId is converted to string
        if updated_post:
            updated_post["_id"] = str(updated_post["_id"])

        return updated_post

    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to update data")

async def service_get_post_by_id(post_id):
    try:
        post = await post_collection.find_one({"_id": ObjectId(post_id)})
        if post:
            post["_id"] = str(post["_id"])
        return post
    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to fetch post")

async def service_delete_post(post_id: str):
    try:
        result = await post_collection.delete_one({"_id": ObjectId(post_id)})
        return result.deleted_count > 0
    except Exception as e:
        logger.error(f"Error in service_delete_post: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to delete post")

async def get_posts(user_id: str):
    try:
        # Find multiple records
        posts_cursor = post_collection.find({'creator_user_id': user_id})
        # Convert the cursor to a list of documents
        posts = []
        async for post in posts_cursor:
            post['_id'] = str(post['_id'])  # Convert ObjectId to string
            post['likes'] = len(post.get('likes', []))  # Count the number of likes (defaults to 0 if missing)
            post['comments_count'] = len(post.get('comments', []))  # Count the number of comments (defaults to 0 if missing)

            # Fetch the comments and structure them like Instagram comments
            comments = []
            for comment_id in post.get('comments', []):
                comment = await comment_collection.find_one({"_id": comment_id})
                if comment:
                    # Check if the user already exists in the comments list
                    user_exists = next((c for c in comments if c['user_id'] == comment['user_id']), None)
                    if user_exists:
                        user_exists['comments'].append(comment['text'])
                    else:
                        # Fetch user data and add the comment structure
                        user_data = await user_collection.find_one({"_id": ObjectId(comment['user_id'])})
                        if user_data:
                            comments.append({
                                "user_id": comment['user_id'],
                                "name": user_data.get('name', 'Unknown User'),
                                "comments": [comment['text']]
                            })

            post['comments'] = comments

            # Fetch the user data for creator_user_id
            if post.get('creator_user_id'):
                creator_user = await user_collection.find_one({"_id": ObjectId(post['creator_user_id'])})
                if creator_user:
                    post['creator_user'] = {
                        "user_id": str(creator_user['_id']),
                        "name": creator_user.get('name'),
                        "email": creator_user.get('email'),
                        "followers": creator_user.get('followers', [])
                    }
                else:
                    post['creator_user'] = None  # Handle case where user is not found

            posts.append(post)

        # Check if there are no posts
        if not posts:
            raise HTTPException(status_code=404, detail="No posts found")

        return posts

    except Exception as e:
        logger.error(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to retrieve data")
    ##############################################################################################################
async def get_all():
    try:
        # Find all posts and sort them by last_shared_at (descending) and created_at (descending)
        posts_cursor = post_collection.find({}).sort([
            ("last_shared_at", -1),  # Sort by most recently shared
            ("created_at", -1)  # Then by most recently created
        ])

        # Convert the cursor to a list of documents
        posts = []
        async for post in posts_cursor:
            post['_id'] = str(post['_id'])  # Convert ObjectId to string
            
            # Safely handle missing fields
            post['likes'] = len(post.get('likes', []))  # Count the number of likes (defaults to 0 if missing)
            post['comments_count'] = len(post.get('comments', []))  # Count the number of comments (defaults to 0 if missing)
            shared=[]
            for shared_by in post.get('shared_by', []):
                shared_by_user = await user_collection.find_one({"_id": ObjectId(shared_by['user_id'])})
                if shared_by_user:
                    shared.append({
                        "user_id": shared_by['user_id'],
                        "name": shared_by_user.get('name', 'Unknown User'),
                        "shared_at": shared_by['shared_at']
                    })
            post['shared_by'] = shared
            # Fetch the comments and structure them like Instagram comments
            comments = []
            for comment_id in post.get('comments', []):
                comment = await comment_collection.find_one({"_id": comment_id})
                if comment:
                    # Check if the user already exists in the comments list
                    user_exists = next((c for c in comments if c['user_id'] == comment['user_id']), None)
                    if user_exists:
                        user_exists['comments'].append(comment['text'])
                    else:
                        # Fetch user data and add the comment structure
                        user_data = await user_collection.find_one({"_id": ObjectId(comment['user_id'])})
                        if user_data:
                            comments.append({
                                "user_id": comment['user_id'],
                                "name": user_data.get('name', 'Unknown User'),
                                "comments": [comment['text']]
                            })

            post['comments'] = comments

            # Fetch the user data for creator_user_id
            if post.get('creator_user_id'):
                creator_user = await user_collection.find_one({"_id": ObjectId(post['creator_user_id'])})
                if creator_user:
                    post['creator_user'] = {
                        "user_id": str(creator_user['_id']),
                        "name": creator_user.get('name'),
                        "email": creator_user.get('email'),
                        "followers": creator_user.get('followers', [])
                    }
                else:
                    post['creator_user'] = None  # Handle case where user is not found

            posts.append(post)

        # Check if there are no posts
        if not posts:
            raise HTTPException(status_code=404, detail="No posts found")

        return posts

    except Exception as e:
        logger.error(f"Failed to retrieve posts: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to retrieve data")


    ##############################################################################################################
async def like_post(post_id: str, user_id: str):
    try:
        # Find the post by post_id
        post = await post_collection.find_one({"_id": ObjectId(post_id)})
        
        # Check if post exists
        if not post:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
        
        # Check if the user has already liked the post
        if user_id in post['likes']:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Post already liked")
        
        # Add the user_id to the likes list
        post['likes'].append(user_id)
        
        # Update the post with the new likes list
        await post_collection.update_one({"_id": ObjectId(post_id)}, {"$set": {"likes": post['likes']}})
        
        return {"message": "Post liked successfully"}
    
    except HTTPException as http_exc:
        # Re-raise HTTPExceptions to be handled by the route handler
        raise http_exc
    except Exception as e:
        logger.error(f"Failed to like post: {str(e)}")
        logger.error(traceback.format_exc())  # Log the full traceback for debugging
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to like post")
    ##############################################################################################################
async def comment_post(post_id: str, user_id: str, text: str):
    try:
        # Find the post by post_id
        post = await post_collection.find_one({"_id": ObjectId(post_id)})
        if not post:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")

        # Create the comment object
        comment = {
            "_id": ObjectId(),  # Generate a unique ID for the comment
            "user_id": user_id,
            "text": text,
            "created_at": datetime.utcnow()
        }

        # Optionally, store comments separately in a `comment_collection` if needed
        comment=await comment_collection.insert_one(comment)
        if not comment:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to insert comment")
        else:
            updatedPost=await post_collection.update_one({"_id": ObjectId(post_id)}, {"$push": {"comments": comment.inserted_id}})
            if not updatedPost:
                raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to update post with comment")
            return {"message": "Comment added successfully"}

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        logger.error(f"Failed to comment on post: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to comment on post")
    ##############################################################################################################
async def share_post(post_id: str, user_id: str):
    try:
        post = await post_collection.find_one({"_id": ObjectId(post_id)})
        if not post:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")

        # Create the shared_by entry
        shared_by = {
            "user_id": user_id,
            "shared_at": datetime.utcnow()
        }

        # Update the post with the new shared information and update the last_shared_at field
        updated_post = await post_collection.update_one(
            {"_id": ObjectId(post_id)},
            {
                "$push": {"shared_by": shared_by},
                "$set": {"last_shared_at": datetime.utcnow()}
            }
        )

        if updated_post.modified_count == 0:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to update post with shared information")

        return {"message": "Post shared successfully"}

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        logger.error(f"Failed to share post: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to share post")


async def follow_post_creator(postCreatorId: str, userId: str):
    # add the user to the followers list of the post creator
    try:
        # Find the post creator by postCreatorId
        post_creator = await user_collection.find_one({"_id": ObjectId(postCreatorId)})
        if not post_creator:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post creator not found")

        if not 'followers' in post_creator:
            post_creator['followers'] = []

        # Check if the user is already following the post creator
        if userId in post_creator['followers']:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already following post creator")

        # Add the userId to the followers list
        post_creator['followers'].append(userId)

        # Update the post creator with the new followers list
        await user_collection.update_one({"_id": ObjectId(postCreatorId)}, {"$set": {"followers": post_creator['followers']}})

        return {"message": "User followed post creator successfully"}

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        logger.error(f"Failed to follow post creator: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to follow post creator")

async def un_follow_post_creator(postCreatorId: str, userId: str):
    # remove the user from the followers list of the post creator
    try:
        # Find the post creator by postCreatorId
        post_creator = await user_collection.find_one({"_id": ObjectId(postCreatorId)})
        if not post_creator:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post creator not found")

        # Check if the user is not following the post creator
        if userId not in post_creator['followers']:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not following post creator")

        # Remove the userId from the followers list
        post_creator['followers'].remove(userId)

        # Update the post creator with the new followers list
        await user_collection.update_one({"_id": ObjectId(postCreatorId)}, {"$set": {"followers": post_creator['followers']}})

        return {"message": "User unfollowed post creator successfully"}

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        logger.error(f"Failed to unfollow post creator: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to unfollow post creator")
         
