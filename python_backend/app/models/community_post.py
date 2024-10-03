from typing import Optional, List, Dict
from pydantic import BaseModel, Field
from datetime import datetime
from app.models.posts_comments import Comment
from app.models.sharedBy import SharedBy

class CommunityPost(BaseModel):
    creator_user_id: str = Field(..., description="ID of the user who created the post")
    
    # List of users who shared the post, including share timestamps
    shared_by: List[SharedBy] = Field(default_factory=list, description="List of users who shared the post")
    
    post_title: str = Field(..., description="Title of the post")
    post_description: str = Field(..., description="Description of the post")
    category: str = Field(..., description="Category of the post")
    image_url: Optional[str] = Field(None, description="URL of the post image")
    video_url: Optional[str] = Field(None, description="URL of the post video")
    duration_days: Optional[int] = Field(None, description="Duration the post will be visible in days")
    
    likes: List[str] = Field(default_factory=list, description="List of user IDs who liked the post")
    comments: List[Comment] = Field(default_factory=list, description="List of comments on the post")
    followers: List[str] = Field(default_factory=list, description="List of user IDs who follow the post")

    created_at: datetime = Field(default_factory=datetime.utcnow, description="Timestamp when the post was created")
    last_shared_at: Optional[datetime] = Field(None, description="Timestamp when the post was last shared")
    
    class Config:
        orm_mode = True
